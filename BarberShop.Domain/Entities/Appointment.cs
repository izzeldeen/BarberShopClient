using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BarberShop.Domain.Enum;

namespace BarberShop.Domain.Entities
{
    public class Appointment : BaseEntity
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
        public double TotalAmount { get; set; }
        public virtual ICollection<AppointmentServices>? AppointmentServices { get; set; }
        public AppointmentStatus AppointmentStatus { get; set; }
        public int? UserId { get; set; }
        public User? User { get; set; }
        public int TotalServicesDuration { get; set; }
        public double FinalPrice { get; set; }
        public double DiscountPrice { get; set; }

    }

    public sealed class AppointmentMap : IEntityTypeConfiguration<Appointment>
    {
        public void Configure(EntityTypeBuilder<Appointment> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasQueryFilter(x => !x.IsDeleted);

            builder.HasOne(x => x.Employee)
                .WithMany(x => x.Appointments)
                .HasForeignKey(x => x.EmployeeId);

            builder.HasOne(x => x.User)
                .WithMany(x=> x.Appointments)
                .HasForeignKey(x => x.UserId);


        }
    }
}
