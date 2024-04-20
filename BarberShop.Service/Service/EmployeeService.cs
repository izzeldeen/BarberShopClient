
using AutoMapper;
using BarberShop.Domain.Common;
using BarberShop.Domain.Dtos;
using BarberShop.Domain.Entities;
using BarberShop.Domain.Filters;
using BarberShop.Domain.Repositories;
using BarberShop.Domain.Services;
using Microsoft.EntityFrameworkCore;

namespace BarberShop.Service.Service
{
    public class EmployeeService : Services<Employee, EmployeeFilter, EmployeeDto>, IEmployeeService
    {
        private readonly IEmployeeRepository employeeRepository;
        private readonly IUserRepository userRepository;
        private readonly IMapper mapper;

        public EmployeeService(IEmployeeRepository employeeRepository, IMapper mapper
                            , IUserRepository userRepository) : base(employeeRepository, mapper)
        {
            this.employeeRepository = employeeRepository;
            this.mapper = mapper;
            this.userRepository = userRepository;
        }

        public async Task<ServiceResultDto<List<EmployeeDto>>> GetAllEmployees()
        {
            var serviceResult = new ServiceResultDto<List<EmployeeDto>>();
            var employees = await employeeRepository.GetAllAsync();
            var mappedEmployees = mapper.Map<List<EmployeeDto>>(employees);
            return serviceResult.SetSuccess(mappedEmployees);
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
            , x => x.Include(f => f.User));
            if (employee == null) return serviceResult.SetError(ErrorMessages.EmployeeNotExists);
            var mappedEmployee = mapper.Map<EmployeeDto>(employee);
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
            await repository.UpdateAsync(mappedEmployee);
            await repository.SaveChangesAsync();
            return serviceResult.SetSuccess(registerDto);
        }
    }
}
