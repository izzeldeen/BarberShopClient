using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.Dtos
{
    public class CategoryDto : BaseDto
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public int DisplayOrder { get; set; }
        public IFormFile? File { get; set; }
        public string? Image { get; set; }
    }
}
