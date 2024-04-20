using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.Entities
{
    public class BaseEntity
    {
        public int Id { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? ModificationDate { get; set; }
        public int? ModificationBy { get; set; }
        public bool IsDeleted { get; set; }
    }

    public class EntityBaseFilter
    {
        public int? PageIndex { get; set; }

        public int? PageSize { get; set; }

        public string? OrderBy { get; set; }

        public bool? DescendingDirection { get; set; }

        public string Direction
        {
            get => DescendingDirection.HasValue && DescendingDirection.Value ? "desc" : "asc";
        }
        public int? Skip
        {
            get => PageSize * ((PageIndex == 0 ? 1 : PageIndex) - 1);
        }
    }
}
