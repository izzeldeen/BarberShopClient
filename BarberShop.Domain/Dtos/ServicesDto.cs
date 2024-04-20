using BarberShop.Domain.Entities;
using BarberShop.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.Dtos
{
    public class ServicesDto : BaseDto
    {
        public string Name { get; set; }
        public int Duration { get; set; }
        public double Amount { get; set; }
        public int ShopId { get; set; }
        public bool IsDiscountApply { get; set; }
        public DiscountPriceTypes? DiscountPriceType { get; set; }
        public double DiscountValue { get; set; }
    }
}
