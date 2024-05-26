using AutoMapper;
using BarberShop.Domain.Common;
using BarberShop.Domain.Common.Specification;
using BarberShop.Domain.Dtos;
using BarberShop.Domain.Dtos.Charts;
using BarberShop.Domain.Entities;
using BarberShop.Domain.Enum;
using BarberShop.Domain.Filters;
using BarberShop.Domain.Repositories;
using BarberShop.Domain.Services;
using BarberShop.Repository.Repositories;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting.Internal;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Service.Service
{
    public class TransactionService : Services<Transaction, TransactionFilter, TransactionDto>, ITransactionService
    {
        private readonly IEmployeeRepository employeeRepository;
        private readonly IWebHostEnvironment hostingEnvironment;
        public TransactionService(ITransactionRepository transacationRepository, IMapper mapper,
            IWebHostEnvironment hostingEnvironment
            , IEmployeeRepository employeeRepository) : base(transacationRepository, mapper)
        {
            this.employeeRepository = employeeRepository;
            this.hostingEnvironment = hostingEnvironment;
        }

        public async Task<ServiceResultDto<PageSearchResultDTO<TransactionDto>>> GetAllTransactions(TransactionFilter filter)
        {
            var serviceResult = new ServiceResultDto<PageSearchResultDTO<TransactionDto>>();
            var exp = filter.ToSearchExpression();
            var transctions = repository.GetAllPageination(exp, include: x =>
            x.Include(f => f.Appointment)
            .Include(f => f.Employee).ThenInclude(f => f.User)
            .Include(x => x.Client),
            pageIndex: filter.PageIndex, PageSize: filter.PageSize);
            var mappedEntity = mapper.Map<List<TransactionDto>>(transctions.Collection);
            return serviceResult.SetSuccess(new PageSearchResultDTO<TransactionDto>()
            {
                Collection = mappedEntity,
                NumberOfRecords = transctions.NumberOfRecords
            });
        }

        public async Task<ServiceResultDto<TransactionsAnalysisDto>> GetTransactionsAnalysisDto(TransactionFilter filter)
        {
            var serviceResult = new ServiceResultDto<TransactionsAnalysisDto>();
            var exp = filter.ToSearchExpression();
            var transactions = await repository.GetAll(exp, include: x =>
            x.Include(f => f.Employee).ThenInclude(f => f.User)
            .Include(f => f.Appointment).ThenInclude(f => f.AppointmentServices)).ToListAsync();
            var transactionsCredit = transactions.Where(x => x.TransactionType == TransactionTypeEnum.Credit).ToList();
            var transactionsDepit = transactions.Where(x => x.TransactionType == TransactionTypeEnum.Depit).ToList();
            var entity = new TransactionsAnalysisDto
            {
                TotalAmount = transactionsCredit.Sum(f => f.TotalAmount),
                DiscountAmount = transactionsCredit.Sum(f => f.DiscountAmount),
                NetAmount = transactionsCredit.Sum(f => f.NetAmount) - transactionsDepit.Sum(x => x.TotalAmount),
                GrossProfitAmount = transactionsDepit.Sum(f => f.TotalAmount),
                EmployeesCollectedAmount = new PipeChartDto(),
                EmployeesClinetsServing = new PipeChartDto(),
                EmployeesServices = new PipeChartDto()

            };
            transactionsCredit.GroupBy(x => x.EmployeeName).ToList().ForEach(item =>
            {
                entity.EmployeesCollectedAmount.Labels.Add(item.Key);
                entity.EmployeesCollectedAmount.Series.Add(item.Sum(f => f.TotalAmount));
                entity.EmployeesClinetsServing.Labels.Add(item.Key);
                entity.EmployeesClinetsServing.Series.Add(item.Count());
                entity.EmployeesServices.Labels.Add(item.Key);
                entity.EmployeesServices.Series.Add(item.Select(x => x.Appointment?.AppointmentServices).Count());
            });
            return serviceResult.SetSuccess(entity);
        }

        public async Task<ServiceResultDto<BarChartDto>> GetBarChartData(TransactionFilter filter)
        {
            var serviceResult = new ServiceResultDto<BarChartDto>(new BarChartDto());
            var employees = employeeRepository.GetAll(include: x => x.Include(e => e.User)).ToList();
            var exp = filter.ToSearchExpression();
            var transactions = await repository.GetAll(exp).ToListAsync();
            int month = DateTime.Now.Month;

            bool monthAdded = false;
            employees.ForEach(employee =>
            {
                var columnChartDto = new ColumnChartData();
                columnChartDto.Name = employee.FullName;
                for (int i = 1; i <= month; i++)
                {
                    var employeeCollectedPricePerMonth = transactions.Where(x => x.EmployeeId == employee.Id
                    && x.CreatedDate.Value.Month == i).Sum(f => f.NetAmount);
                    columnChartDto.Data.Add(employeeCollectedPricePerMonth);

                    if (!monthAdded)
                    {
                        CultureInfo culture = new CultureInfo("en-US");
                        string monthName = culture.DateTimeFormat.GetMonthName(i);
                        serviceResult.Data.Months.Add(monthName);
                    }

                }
                serviceResult.Data.Series.Add(columnChartDto);
                monthAdded = true;
            });
            return serviceResult;
        }

        public async Task<ServiceResultDto<TransactionDto>> Create(TransactionDto transactionDto)
        {
            var serviceResult = new ServiceResultDto<TransactionDto>();
            var mappedEntity = mapper.Map<Transaction>(transactionDto);
            mappedEntity.TotalAmount = mappedEntity.NetAmount;
            mappedEntity.GrossProfitAmount = 0;
            if (transactionDto.file != null)
            {
                var file = transactionDto.file;
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(Guid.NewGuid().ToString() + file.FileName);
                var filePath = Path.Combine(hostingEnvironment.WebRootPath, "Files", fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                    mappedEntity.Image = fileName;
                }

            }
            await repository.AddAsync(mappedEntity);
            await repository.SaveChangesAsync();
            return serviceResult.SetSuccess(transactionDto);
        }

        public async Task<ServiceResultDto<TransactionDto>> Update(TransactionDto transactionDto)
        {
            var serviceResult = new ServiceResultDto<TransactionDto>();
            var transaction = await repository.Get(transactionDto.Id.Value);
            transaction = transactionDto.MapToTransaction(transaction);
            if (transactionDto.file != null)
            {
                var file = transactionDto.file;
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(Guid.NewGuid().ToString() + file.FileName);
                var filePath = Path.Combine(hostingEnvironment.WebRootPath, "Files", fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                    transaction.Image = fileName;
                }

            }
            await repository.UpdateAsync(transaction);
            await repository.SaveChangesAsync();
            return serviceResult.SetSuccess(transactionDto);
        }


    }
}

