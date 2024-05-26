using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.Dtos.Charts
{
    public class BarChartDto
    {
        public BarChartDto()
        {
            Months = new List<string>();
            Series = new List<ColumnChartData>();
        }
        public List<string> Months { get; set; }
        public List<ColumnChartData> Series { get; set; }
    }

    public class ColumnChartData
    {
        public ColumnChartData()
        {

            Data = new List<double>();
        }
        public string Name { get; set; }
        public List<double> Data { get; set; }
    }
}
