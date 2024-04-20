using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.Dtos
{
    public class PageSearchResultDTO<T> where T : class
    {
        public List<T> Collection { get; set; }

        public int NumberOfRecords { get; set; }
    }
}
