using BarberShop.Domain.Dtos;
using BarberShop.Domain.Entities;
using BarberShop.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.Common
{
    public static class MappingExtensions
    {
        public static Employee MapToEmployee(this RegisterDto registerDto, Employee employee)
        {
            employee.Position = registerDto.Position;
            employee.EmploymentStartDate = registerDto.EmploymentStartDate;
            employee.EmploymentEndDate = registerDto.EmploymentEndDate;
            employee.PercentageValue = registerDto.PercentageValue;
            employee.SalaryCalculationType = registerDto.SalaryCalculationType;
            employee.FixedValue = registerDto.FixedValue;
            if (employee.User != null)
            {
                employee.User.PhoneNumber = registerDto.PhoneNumber;
                employee.User.Email = registerDto.Email;
                employee.User.FirstName = registerDto.FirstName;
                employee.User.LastName = registerDto.LastName;
                employee.User.ModificationDate = DateTime.Now;
            }
            return employee;
        }
    }
}
