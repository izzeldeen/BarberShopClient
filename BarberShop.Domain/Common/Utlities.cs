using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.Common
{
    public static class Utlities
    {

        public static string GenerateRandom6Digits()
        {
            Random rand = new Random();
            int randomNumber = rand.Next(100000, 1000000);
            return randomNumber.ToString();
        }
    }
}
