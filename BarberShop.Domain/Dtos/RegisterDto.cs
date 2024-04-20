using BarberShop.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.Dtos
{
    public class RegisterDto
    {
        public int? EmployeeId { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string Position { get; set; }
        public DateTime? EmploymentStartDate { get; set; }
        public DateTime? EmploymentEndDate { get; set; }
        public int? PercentageValue { get; set; }
        public double? FixedValue { get; set; }
        public SalaryCalculationType SalaryCalculationType { get; set; }
    }
}
