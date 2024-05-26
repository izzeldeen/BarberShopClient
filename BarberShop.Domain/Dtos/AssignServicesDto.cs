using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.Dtos
{
    public class AssignServicesDto
    {
        public int EmployeeId { get; set; }
        public List<int> ServicesIds { get; set; }
    }

    public class AssignedServicesDto
    {
        public string  Id { get; set; }
        public string? Name { get; set; }
        public string? CategoryName { get; set; }
        public double? Amount { get; set; }
        public int? Duration { get; set; }
    }
}
