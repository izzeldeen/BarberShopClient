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
    public class ServicesDto : BaseDto
    {
        public string Name { get; set; }
        public int Duration { get; set; }
        public double Amount { get; set; }
        public int ShopId { get; set; }
        public bool IsDiscountApply { get; set; }
        public DiscountPriceTypes? DiscountPriceType { get; set; }
        public double DiscountValue { get; set; }
        public int CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public string? Image { get; set; }
        public string? DiscountPriceTypeName => DiscountPriceType?.ToString();
        public IFormFile? File { get; set; }
        public string? Description { get; set; }

    }

    public class ServiceAppoDto
    {
        public int Id { get; set; }
        public string? CategoryName { get; set; }
        public string Name { get; set; }
        public string? Image { get; set; }
    }
}
