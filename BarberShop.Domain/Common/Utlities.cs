using BarberShop.Domain.Dtos;
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

        public static PageSearchResultDTO<T> Pagination<T>(this IQueryable<T> query, int? pageIndex = 0, int? pageSize = 5) where T : class
        {
            var count = query.Count();
            pageIndex = pageIndex ?? 0;
            pageSize = pageSize ?? 5;
            return new PageSearchResultDTO<T>
            {
                Collection = query.Skip((pageIndex > 0? pageIndex.Value - 1 : 0) * pageSize.Value).Take(pageSize.Value).ToList(),
                NumberOfRecords = count,
            };
        }
    }
}
