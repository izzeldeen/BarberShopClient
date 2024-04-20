using BarberShop.Domain.Enum;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.Entities
{
    public class Services : BaseEntity
    {
        public string Name { get; set; }
        public int Duration { get; set; }
        public double Amount { get; set; }
        public int ShopId { get; set; }
        public Shop Shop { get; set; }
        public bool IsDiscountApply { get; set; }
        public DiscountPriceTypes? DiscountPriceType { get; set; }
        public double? DiscountValue { get; set; }
        public virtual ICollection<ServicesEmployees> ServicesEmployees { get; set; }

    }

    public sealed class ServicesMap : IEntityTypeConfiguration<Services>
    {
        public void Configure(EntityTypeBuilder<Services> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasQueryFilter(x => !x.IsDeleted);

           
            builder.HasOne(x => x.Shop)
                .WithMany()
                .HasForeignKey(x => x.ShopId);

            builder.HasMany(x => x.ServicesEmployees)
                .WithOne(x => x.Services)
                .HasForeignKey(x => x.ServicesId);



        }
    }
}
