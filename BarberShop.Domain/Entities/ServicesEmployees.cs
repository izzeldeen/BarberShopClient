using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.Entities
{
    public class ServicesEmployees : BaseEntity
    {
        public int EmployeeId { get; set; }
        public int ServicesId { get; set; }
        public Employee Employee { get; set; }
        public Services Services { get; set; }
    }

    public sealed class ServicesEmployeesMap : IEntityTypeConfiguration<ServicesEmployees>
    {
        public void Configure(EntityTypeBuilder<ServicesEmployees> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasOne(x => x.Employee)
                .WithMany(x=> x.Services)
                .HasForeignKey(x => x.EmployeeId);

            builder.HasOne(x => x.Services)
               .WithMany(x=> x.ServicesEmployees)
               .HasForeignKey(x => x.ServicesId);

            builder.Ignore(x => x.IsDeleted);
            builder.Ignore(x => x.CreatedDate);
            builder.Ignore(x => x.CreatedBy);
            builder.Ignore(x => x.ModificationBy);
            builder.Ignore(x => x.ModificationDate);
        }
    }
}
