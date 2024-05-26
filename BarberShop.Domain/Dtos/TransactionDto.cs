using BarberShop.Domain.Entities;
using BarberShop.Domain.Enum;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.Dtos
{
    public class TransactionDto : BaseDto
    {
        public int? Id { get; set; }
        public double? TotalAmount { get; set; }
        public double? DiscountAmount { get; set; }
        public double? NetAmount { get; set; }
        public double? RevenueAmount { get; set; }
        public int? EmployeeId { get; set; }
        public string? EmployeeName { get; set; }
        public string? ClientName { get; set; }
        public int? ClientId { get; set; }
        public int? AppointmentId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? Description { get; set; }
        public DateTime? TransactionDate { get; set; }
        public TransactionTypeEnum TransactionType { get; set; }
        public int? TransactionSubType { get; set; }
        public IFormFile? file { get; set; }
        public string? Image { get; set; }

    }
}
