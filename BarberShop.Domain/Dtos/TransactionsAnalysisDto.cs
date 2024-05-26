using BarberShop.Domain.Dtos.Charts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.Dtos
{
    public class TransactionsAnalysisDto
    {
        public double TotalAmount { get; set; }
        public double DiscountAmount { get; set; }
        public double NetAmount { get; set; }
        public double GrossProfitAmount { get; set; }
        public PipeChartDto EmployeesCollectedAmount { get; set; }
        public PipeChartDto EmployeesClinetsServing { get; set; }
        public PipeChartDto EmployeesServices { get; set; }
    }

 
  

    
}
