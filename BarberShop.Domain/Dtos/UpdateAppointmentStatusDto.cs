using BarberShop.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.Dtos
{
    public class UpdateAppointmentStatusDto
    {
        public int Id { get; set; }
        public AppointmentStatus AppointmentStatus { get; set; }
        public List<ServicesEmployeeSelected>? ServicesEmployeeSelected { get; set; }
        public double CollectedPrice { get; set; }
    }

    public class ServicesEmployeeSelected
    {
        public int ServiceId { get; set; }
        public int EmployeeId { get; set; }
    }

}






