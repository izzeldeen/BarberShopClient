using BarberShop.Domain.Entities;
using BarberShop.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.Filters
{
    public class TransactionFilter : EntityBaseFilter
    {
        public int? EmployeeId { get; set; }
        public int? UserId { get; set; }
        public int? MonthId { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public TransactionTypeEnum? TransactionType { get; set; }
    }
}
