
using AutoMapper;
using BarberShop.Domain.Common;
using BarberShop.Domain.Common.Specification;
using BarberShop.Domain.Dtos;
using BarberShop.Domain.Entities;
using BarberShop.Domain.Filters;
using BarberShop.Domain.Repositories;
using BarberShop.Domain.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;

namespace BarberShop.Service.Service
{
    public class EmployeeService : Services<Employee, EmployeeFilter, EmployeeDto>, IEmployeeService
    {
        private readonly IEmployeeRepository employeeRepository;
        private readonly IUserRepository userRepository;
        private readonly IMapper mapper;
        private readonly IWebHostEnvironment hostingEnvironment;
        private readonly ITransactionRepository transactionRepository;
        public EmployeeService(IEmployeeRepository employeeRepository, IMapper mapper
                            , IUserRepository userRepository,
            ITransactionRepository transactionRepository
            , IWebHostEnvironment hostingEnvironment) : base(employeeRepository, mapper)
        {
            this.employeeRepository = employeeRepository;
            this.mapper = mapper;
            this.userRepository = userRepository;
            this.hostingEnvironment = hostingEnvironment;
        }

        public async Task<ServiceResultDto<PageSearchResultDTO<EmployeeDto>>> GetAllEmployees(EmployeeFilter filter)
        {
            var serviceResult = new ServiceResultDto<PageSearchResultDTO<EmployeeDto>>();
            try
            {
                var employees = employeeRepository.GetAllPageination(include: x => x.Include(f => f.User).Include(f => f.Transactions),
              pageIndex: filter.PageIndex, PageSize: filter.PageSize);
                var mappedEmployees = mapper.Map<List<EmployeeDto>>(employees.Collection);
                var transactionFilter = new TransactionFilter()
                {
                    ToDate = filter.ToDate,
                    FromDate = filter.FromDate,
                };
                var transactionExp = transactionFilter.ToSearchExpression();
                var exp = GetTransactionExp(filter);
                mappedEmployees.ForEach(item =>
                {
                    var transactions = employees.Collection?.FirstOrDefault(x => x.Id == item.Id)?.Transactions?.Where(exp);
                    item.TotalAmount = transactions.Sum(x => x.TotalAmount);
                    item.DiscountAmount = transactions.Sum(x => x.DiscountAmount);
                    item.NetAmount = transactions.Sum(x => x.NetAmount);
                    item.CurrentAmount = transactions.Sum(x => x.NetAmount) - transactions.Sum(x => x.GrossProfitAmount);
                });
                return serviceResult.SetSuccess(new PageSearchResultDTO<EmployeeDto>()
                {
                    Collection = mappedEmployees,
                    NumberOfRecords = employees.NumberOfRecords
                });
            }
            catch (Exception ex)
            {
                return serviceResult.SetError(ex.Message);
            }

        }

        public async Task<ServiceResultDto<EmployeeDto>> GetEmployeeDetails()
        {
            var serviceResult = new ServiceResultDto<EmployeeDto>();
            var userId = repository.GetLoggedInUserId();
            var employee = await repository.FirstOrDefaultAsync(x => x.User.Id == userId
            , x => x.Include(f => f.User));
            if (employee == null) return serviceResult.SetError(ErrorMessages.EmployeeNotExists);
            var mappedEmployee = mapper.Map<EmployeeDto>(employee);
            return serviceResult.SetSuccess(mappedEmployee);
        }
        public async Task<ServiceResultDto<EmployeeDto>> GetById(int id)
        {
            var serviceResult = new ServiceResultDto<EmployeeDto>();
            var employee = await repository.FirstOrDefaultAsync(x => x.Id == id
            , x =>
            x.Include(f => f.User)
            .Include(x => x.Services)
            .ThenInclude(x => x.Services)
            .ThenInclude(f => f.Category));

            if (employee == null) return serviceResult.SetError(ErrorMessages.EmployeeNotExists);
            var mappedEmployee = mapper.Map<EmployeeDto>(employee);
            mappedEmployee.AssignedServices = employee.Services.Select(x => new AssignedServicesDto
            {
                Id = x.ServicesId.ToString(),
                Name = x.Services?.Name,
                Duration = x.Services?.Duration,
                Amount = x.Services?.Amount,
                CategoryName = x.Services?.CategoryName
            }).ToList();
            return serviceResult.SetSuccess(mappedEmployee);
        }

        public async Task<ServiceResultDto<RegisterDto>> RegisterEmployee(RegisterDto registerDto)
        {
            var serviceResult = new ServiceResultDto<RegisterDto>();
            try
            {
                var isPhoneNumberExists = userRepository.Any(f => f.PhoneNumber == registerDto.PhoneNumber);
                if (isPhoneNumberExists) return serviceResult.SetError(ErrorMessages.PhoneNumberAlreadyExists);
                var employee = mapper.Map<RegisterDto, Employee>(registerDto);
                var user = mapper.Map<RegisterDto, User>(registerDto);
                employee.User = user;

                if (registerDto.file != null)
                {
                    var file = registerDto.file;
                    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(registerDto.FirstName + file.FileName);
                    var filePath = Path.Combine(hostingEnvironment.WebRootPath, "Files", fileName);
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                        employee.Image = fileName;
                    }

                }

                await employeeRepository.AddAsync(employee);
                await employeeRepository.SaveChangesAsync();

                serviceResult.SetSuccess(registerDto);
                return serviceResult;
            }
            catch (Exception ex)
            {
                serviceResult.SetError(ex.Message);
                return serviceResult;
            }

        }

        public async Task<ServiceResultDto<RegisterDto>> UpdateEmployee(RegisterDto registerDto)
        {
            var serviceResult = new ServiceResultDto<RegisterDto>();
            var employee = await employeeRepository.FirstOrDefaultAsync(x => x.Id == registerDto.EmployeeId
            , x => x.Include(f => f.User));
            if (employee == null) return serviceResult.SetError(ErrorMessages.EmployeeNotExists);
            var mappedEmployee = registerDto.MapToEmployee(employee);
            #region Upload Employee Image
            if (registerDto.file != null)
            {
                #region Delete Old Image
                if (employee.Image != null)
                {
                    string deleteFilePath = Path.Combine(hostingEnvironment.WebRootPath, "Files", employee.Image);
                    if (File.Exists(deleteFilePath)) File.Delete(deleteFilePath);
                }
                #endregion

                var file = registerDto.file;
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(registerDto.FirstName + file.FileName);
                var filePath = Path.Combine(hostingEnvironment.WebRootPath, "Files", fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                    employee.Image = fileName;
                }

            }
            #endregion

            await repository.UpdateAsync(mappedEmployee);
            await repository.SaveChangesAsync();
            return serviceResult.SetSuccess(registerDto);
        }

        private Func<Transaction, bool> GetTransactionExp(EmployeeFilter filter) =>
             x => (filter.FromDate != null ? x.CreatedDate.Value >= filter.FromDate : true)
                        && (filter.ToDate != null ? x.CreatedDate.Value <= filter.ToDate : true);

    }
}
