using BarberShop.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.Filters
{
    public class UserFilters : EntityBaseFilter
    {
        public string? Name { get; set; }
        public string? PhoneNumber { get; set; }
    }
}
