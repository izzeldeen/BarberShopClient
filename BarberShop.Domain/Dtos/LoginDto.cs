﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.Dtos
{
    public class LoginDto
    {
        public string PhoneNumber { get; set; }
        public string? Code { get; set; }
        public string? Password { get; set; }
    }
}
