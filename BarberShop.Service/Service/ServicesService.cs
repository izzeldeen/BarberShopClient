using AutoMapper;
using BarberShop.Domain.Common;
using BarberShop.Domain.Dtos;
using BarberShop.Domain.Entities;
using BarberShop.Domain.Enum;
using BarberShop.Domain.Filters;
using BarberShop.Domain.IHandlers;
using BarberShop.Domain.Repositories;
using BarberShop.Domain.Services;
using BarberShop.Repository.Repositories;
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
        public ServicesService(IServicesRepository ServicesRepository, IMapper mapper, IAuthHandler authHandler,
            IEmployeeRepository employeeRepository
            , IServicesEmployeesRepository servicesEmployeesRepository) : base(ServicesRepository, mapper)
        {
            this.authHandler = authHandler;
            this.employeeRepository = employeeRepository;
            this.servicesEmployeesRepository = servicesEmployeesRepository;
        }

        public async Task<ServiceResultDto<List<ServicesEmployees>>> AssignServices(AssignServicesDto assignServicesDto)
        {
            var serviceResult = new ServiceResultDto<List<ServicesEmployees>>();
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
            return serviceResult.SetSuccess(services);
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
            await repository.AddAsync(mappedEntity);
            await repository.SaveChangesAsync();
            return serviceResult.SetSuccess(entityDto);

        }

        public async Task<ServiceResultDto<List<ServicesDto>>> GetEmployeeServices()
        {
            var serviceResult = new ServiceResultDto<List<ServicesDto>>();
            var userId = authHandler.GetUserId();
            var employee = await employeeRepository.FirstOrDefaultAsync(x => x.UserId == userId, x => x.Include(f => f.User)
            .Include(f => f.Services).ThenInclude(f => f.Services));
            if (employee == null) return serviceResult.SetError(ErrorMessages.EmployeeNotExists);
            var services = employee.Services.Select(x => x.Services).ToList();
            var mappedServices = mapper.Map<List<ServicesDto>>(services);
            return serviceResult.SetSuccess(mappedServices);

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
