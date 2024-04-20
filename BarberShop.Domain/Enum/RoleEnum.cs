using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace BarberShop.Domain.Enum
{
    public enum RoleEnum
    {
        Admin = 1,
        Barber = 2,
        Employee = 3,
        Client = 4
    }

    public static class RolesName
    {
        public const string Admin = "Admin";  
        public const string Barber = "Barber";  
        public const string Employee = "Employee";  
        public const string Client = "Client";  
    }
}
