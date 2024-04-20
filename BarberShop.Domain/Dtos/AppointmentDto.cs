using BarberShop.Domain.Entities;
using BarberShop.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.Dtos
{
    public class AppointmentDto : BaseDto
    {
        public int EmployeeId { get; set; }
        public double TotalAmount { get; set; }
        public AppointmentStatus AppointmentStatus { get; set; }
        public List<int> ServicesIds { get; set; }
        public DateTime StartDate { get; set; }
        public int? UserId { get; set; }
        public int TotalServicesDuration { get; set; }
        public double FinalPrice { get; set; }
        public double DiscountPrice { get; set; }

    }

    public class AppointmentDetails
    {
        public double TotalAmount { get; set; }
        public int TotalServicesDuration { get; set; }
        public double FinalPrice { get; set; }
        public double DiscountPrice { get; set; }
        public string EmployeeName { get; set; }
        public string UserName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public List<ServicesDto> Services { get; set; }

    }
}
