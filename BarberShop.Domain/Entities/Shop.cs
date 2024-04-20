using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.Entities
{
    public class Shop : BaseEntity
    {
        public string Name { get; set; }
        public string? Image { get; set; }
        public virtual ICollection<User>? Users { get; set; }

    }

    public sealed class ShopMap : IEntityTypeConfiguration<Shop>
    {
        public void Configure(EntityTypeBuilder<Shop> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasQueryFilter(x => !x.IsDeleted);

            builder.HasData(new Shop()
            {
                Id = 1,
                Name = "Barber Shop",
                CreatedDate = new DateTime(2024, 4, 17),
                IsDeleted = false,

            });
        }
    }


}
