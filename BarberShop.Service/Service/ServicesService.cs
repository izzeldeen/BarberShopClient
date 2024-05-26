using AutoMapper;
using BarberShop.Domain.Common;
using BarberShop.Domain.Common.Specification;
using BarberShop.Domain.Dtos;
using BarberShop.Domain.Entities;
using BarberShop.Domain.Enum;
using BarberShop.Domain.Filters;
using BarberShop.Domain.IHandlers;
using BarberShop.Domain.Repositories;
using BarberShop.Domain.Services;
using BarberShop.Repository.Repositories;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taxi24.Infra.Repository;

namespace BarberShop.Service.Service
{
    public class ServicesService : Services<Services, ServicesFilter, ServicesDto>, IServicesService
    {

        private readonly IAuthHandler authHandler;
        private readonly IEmployeeRepository employeeRepository;
        private readonly IServicesEmployeesRepository servicesEmployeesRepository;
        private readonly IWebHostEnvironment hostingEnvironment;
        public ServicesService(IServicesRepository ServicesRepository, IMapper mapper, IAuthHandler authHandler,
            IWebHostEnvironment hostingEnvironment,
            IEmployeeRepository employeeRepository
            , IServicesEmployeesRepository servicesEmployeesRepository) : base(ServicesRepository, mapper)
        {
            this.authHandler = authHandler;
            this.employeeRepository = employeeRepository;
            this.servicesEmployeesRepository = servicesEmployeesRepository;
            this.hostingEnvironment = hostingEnvironment;
        }

        public async Task<ServiceResultDto<AssignServicesDto>> AssignServices(AssignServicesDto assignServicesDto)
        {
            var serviceResult = new ServiceResultDto<AssignServicesDto>();
            var employee = await employeeRepository.Get(assignServicesDto.EmployeeId);
            if (employee == null) return serviceResult.SetError(ErrorMessages.EmployeeNotExists);

            var services = repository.GetAll(x => assignServicesDto.ServicesIds.Any(s => x.Id == s))
                .Select(x => new ServicesEmployees()
                {
                    EmployeeId = assignServicesDto.EmployeeId,
                    ServicesId = x.Id
                }).ToList();

            if (services.Count() == 0) return serviceResult.SetError(ErrorMessages.ServicesNotExists);

            //Remove assigined services & Assign new services 
            await servicesEmployeesRepository.DeleteAsync(x => x.EmployeeId == assignServicesDto.EmployeeId);
            await servicesEmployeesRepository.AddRangeAsync(services);
            await servicesEmployeesRepository.SaveChangesAsync();
            return serviceResult.SetSuccess(assignServicesDto);
        }

        public async Task<ServiceResultDto<ServicesDto>> Create(ServicesDto entityDto)
        {
            var serviceResult = new ServiceResultDto<ServicesDto>();

            if (entityDto.DiscountPriceType == DiscountPriceTypes.Fixed && entityDto.DiscountValue > entityDto.Amount)
            {
                return serviceResult.SetError(ErrorMessages.DiscountAmountMustBeLessThanAmount);
            }
            if (entityDto.DiscountPriceType == DiscountPriceTypes.Percentage && entityDto.DiscountValue >= 100)
            {
                return serviceResult.SetError(ErrorMessages.DiscountAmountMustBeLessThanAmount);
            }
            var mappedEntity = mapper.Map<Services>(entityDto);
            if (!entityDto.IsDiscountApply)
            {
                mappedEntity.DiscountPriceType = null;
                mappedEntity.DiscountValue = null;
            }

            if (entityDto.File != null)
            {
                var file = entityDto.File;
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(entityDto.Name + file.FileName);
                var filePath = Path.Combine(hostingEnvironment.WebRootPath, "Files", fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                    mappedEntity.Image = fileName;
                }

            }

            await repository.AddAsync(mappedEntity);
            await repository.SaveChangesAsync();
            return serviceResult.SetSuccess(entityDto);

        }

        public async Task<ServiceResultDto<List<ServicesDto>>> GetEmployeeServices(int? id)
        {
            var serviceResult = new ServiceResultDto<List<ServicesDto>>();
            var userId = id == null ? authHandler.GetUserId() :
                 employeeRepository.FirstOrDefaultAsync(x => x.Id == id)?.Result?.UserId;
            var employee = await employeeRepository.FirstOrDefaultAsync(x =>
            x.UserId == userId,
            x => x.Include(f => f.User)
                  .Include(f => f.Services)
                  .ThenInclude(f => f.Services)
                  .ThenInclude(f => f.Category));
            if (employee == null) return serviceResult.SetError(ErrorMessages.EmployeeNotExists);
            var services = employee.Services.Select(x => x.Services).ToList();
            var mappedServices = mapper.Map<List<ServicesDto>>(services);
            return serviceResult.SetSuccess(mappedServices);

        }
        public async Task<ServiceResultDto<PageSearchResultDTO<ServicesDto>>> GetAll(ServicesFilter filter)
        {
            var serviceResult = new ServiceResultDto<PageSearchResultDTO<ServicesDto>>();
            var exp = filter.ToSearchExpression();
            var services = repository.GetAllPageination(exp, x => x.Include(f => f.Category).Include(x=> x.ServicesEmployees));
            var mappedEntity = mapper.Map<List<ServicesDto>>(services.Collection);
            return serviceResult.SetSuccess(new PageSearchResultDTO<ServicesDto>()
            {
                Collection = mappedEntity,
                NumberOfRecords = services.NumberOfRecords
            });
        }

        public async Task<ServiceResultDto<ServicesDto>> Update(ServicesDto entityDto)
        {
            var serviceResult = new ServiceResultDto<ServicesDto>();
            var service = await repository.Get(entityDto.Id);
            if (service == null) return serviceResult.SetError(ErrorMessages.ServiceNotExists);
            service.Name = entityDto.Name;
            service.Amount = entityDto.Amount;
            service.Duration = entityDto.Duration;
            service.IsDiscountApply = entityDto.IsDiscountApply;
            service.DiscountPriceType = entityDto.DiscountPriceType;
            service.DiscountValue = entityDto.DiscountValue;
            service.CategoryId = entityDto.CategoryId;
            if (entityDto.File != null)
            {
                if(service.Image != null)
                {
                    string deleteFilePath = Path.Combine(hostingEnvironment.WebRootPath, "Files", service.Image);
                    if (File.Exists(deleteFilePath))  File.Delete(deleteFilePath);
                }
                var file = entityDto.File;
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(entityDto.Name + file.FileName);
                var filePath = Path.Combine(hostingEnvironment.WebRootPath, "Files", fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                    service.Image = fileName;
                }

            }

            await repository.UpdateAsync(service);
            await repository.SaveChangesAsync();
            return serviceResult.SetSuccess(entityDto);
        }

        public async Task<ServiceResultDto<ServicesDto>> GetById(int id)
        {
            var serviceResult = new ServiceResultDto<ServicesDto>();
            var service = await repository.Get(id);
            if (service == null) return serviceResult.SetError(ErrorMessages.ServiceNotExists);
            var mappedServices = mapper.Map<ServicesDto>(service);
            return serviceResult.SetSuccess(mappedServices);
        }
    }
}
