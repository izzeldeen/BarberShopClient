using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BarberShop.Domain.Enum;
using Microsoft.EntityFrameworkCore.Metadata.Conventions.Infrastructure;

namespace BarberShop.Domain.Entities
{
    public class Employee : BaseEntity
    {

        public string Position { get; set; }
        public DateTime? EmploymentStartDate { get; set; }
        public DateTime? EmploymentEndDate { get; set; }
        public int? PercentageValue { get; set; }
        public double? FixedValue { get; set; }
        public SalaryCalculationType SalaryCalculationType { get; set; }
        public bool IsAvailabile { get; set; }
        public int UserId { get; set; }
        public string? Image { get; set; }
        public string? Description { get; set; }
        public User User { get; set; }
        public virtual ICollection<ContactInfo> ContactsInfo { get; set; }
        public virtual ICollection<ServicesEmployees> Services { get; set; }
        public virtual ICollection<Appointment> Appointments { get; set; }
        public virtual ICollection<AppointmentServices> AppointmentServices { get; set; }
        public virtual ICollection<Transaction>? Transactions { get; set; }
        public string FullName
        {
            get
            {
                return $"{User?.FirstName} {User?.LastName}";
            }
        }
         public string PhoneNumber
        {
            get
            {
                return $"{User?.PhoneNumber}";
            }
        }


    }

    public sealed class EmployeeMap : IEntityTypeConfiguration<Employee>
    {
        public void Configure(EntityTypeBuilder<Employee> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasQueryFilter(x => !x.IsDeleted);

            builder.HasOne(x => x.User)
                .WithOne(x => x.Employee)
                .HasForeignKey<Employee>(x => x.UserId);

            builder.HasMany(f => f.Services)
                .WithOne(f => f.Employee)
                .HasForeignKey(f => f.EmployeeId);
            builder.Ignore(x => x.FullName);
            builder.Ignore(x => x.PhoneNumber);
        }
    }

    public class ContactInfo : BaseEntity
    {
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
    }
    public sealed class ContactInfoMap : IEntityTypeConfiguration<ContactInfo>
    {
        public void Configure(EntityTypeBuilder<ContactInfo> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasQueryFilter(x => !x.IsDeleted);

            builder.HasOne(x => x.Employee)
                .WithMany(x => x.ContactsInfo)
                .HasForeignKey(x => x.EmployeeId);
        }
    }
}
