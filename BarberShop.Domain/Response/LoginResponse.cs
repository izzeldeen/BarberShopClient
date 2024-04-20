using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.Response
{
    public class LoginResponse
    {
        public string Name { get; set; }
        public string Token { get; set; }
        public string ShopName { get; set; }
    }
}
