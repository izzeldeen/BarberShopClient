using BarberShop.Domain.Dtos;
using BarberShop.Domain.Entities;
using BarberShop.Domain.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.Services
{
    public interface IEmployeeService : IService<Employee , EmployeeFilter, EmployeeDto>
    {
        Task<ServiceResultDto<RegisterDto>> RegisterEmployee(RegisterDto registerDto);
        Task<ServiceResultDto<RegisterDto>> UpdateEmployee(RegisterDto registerDto);

        Task<ServiceResultDto<PageSearchResultDTO<EmployeeDto>>> GetAllEmployees(EmployeeFilter filter);
        Task<ServiceResultDto<EmployeeDto>> GetEmployeeDetails();
        Task<ServiceResultDto<EmployeeDto>> GetById(int id);


    }
}
