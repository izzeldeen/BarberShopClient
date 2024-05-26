using BarberShop.Domain.Entities;
using BarberShop.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.Dtos
{
    public class EmployeeDto : BaseDto
    {
        public string? Position { get; set; }
        public DateTime? EmploymentStartDate { get; set; }
        public DateTime? EmploymentEndDate { get; set; }
        public int? PercentageValue { get; set; }
        public double? FixedValue { get; set; }
        public SalaryCalculationType SalaryCalculationType { get; set; }
        public bool IsAvailabile { get; set; }
        public string? FullName { get; set; }
        public string? PhoneNumber { get; set; }
        public double? TotalAmount { get; set; }
        public double? DiscountAmount { get; set; }
        public double? NetAmount { get; set; }
        public double? CurrentAmount { get; set; }
        public string? Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Image { get; set; }
        public string? Description { get; set; }
        public List<AssignedServicesDto>? AssignedServices { get; set; }
    }
}
