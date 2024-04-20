﻿using BarberShop.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.IHandlers
{
    public interface IAuthHandler
    {
        int? GetUserId();
        public string GenerateToken(User user, string role);

    }
}
