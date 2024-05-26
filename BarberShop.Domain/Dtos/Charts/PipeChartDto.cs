using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.Dtos.Charts
{
    public class PipeChartDto
    {
        public PipeChartDto()
        {
            Series = new List<double>();
            Labels = new List<string>();
        }
        public List<double> Series { get; set; } 
        public List<string> Labels { get; set; } 
    }
}
