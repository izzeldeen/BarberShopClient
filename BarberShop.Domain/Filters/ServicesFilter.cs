using BarberShop.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.Filters
{
    public class ServicesFilter : EntityBaseFilter
    {
        public int? CategoryId { get; set; }
        public string? ServiceName { get; set; }
        public int? EmployeeId { get; set; }
    }
}
