using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.Entities
{
    public class AppointmentServices : BaseEntity
    {
        public int AppointmentId { get; set; }
        public int ServicesId { get; set; }
        public Appointment Appointment { get; set; }
        public Services Services { get; set; }

    }

    public sealed class AppointmentServicesMap : IEntityTypeConfiguration<AppointmentServices>
    {
        public void Configure(EntityTypeBuilder<AppointmentServices> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasOne(x => x.Appointment)
                .WithMany(x=> x.AppointmentServices)
                .HasForeignKey(x => x.AppointmentId);

            builder.HasOne(x => x.Services)
               .WithMany()
               .HasForeignKey(x => x.ServicesId);

            builder.Ignore(x => x.IsDeleted);
            builder.Ignore(x => x.CreatedDate);
            builder.Ignore(x => x.CreatedBy);
            builder.Ignore(x => x.ModificationBy);
            builder.Ignore(x => x.ModificationDate);
        }
    }
}
