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
    public class Transaction : BaseEntity
    {
        public double TotalAmount { get; set; }
        public double DiscountAmount { get; set; }
        public double NetAmount { get; set; }
        public double GrossProfitAmount { get; set; }
        public int? EmployeeId { get; set; }
        public Employee? Employee { get; set; }
        public int? ClientId { get; set; }
        public User? Client { get; set; }
        public int? AppointmentId { get; set; }
        public Appointment? Appointment { get; set; }
        public TransactionTypeEnum TransactionType { get; set; }
        public string? Description { get; set; }
        public string? EmployeeName => $"{Employee?.User?.FirstName} {Employee?.User?.LastName}";
        public string? ClientName => $"{Client?.FirstName} {Client?.LastName}";
        public DateTime? StartDate => Appointment?.StartDate;
        public DateTime? EndDate => Appointment?.EndDate;
        public DateTime? TransactionDate { get; set; }
        public string? Image { get; set; }
        public int? TransactionSubType { get; set; }


    }

    public sealed class TransactionMap : IEntityTypeConfiguration<Transaction>
    {
        public void Configure(EntityTypeBuilder<Transaction> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasQueryFilter(x => !x.IsDeleted);

            builder.HasOne(x => x.Employee)
                .WithMany(x => x.Transactions)
                .HasForeignKey(x => x.EmployeeId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(x => x.Appointment)
                .WithMany(x => x.Transactions)
                .HasForeignKey(x => x.AppointmentId);

            builder.HasOne(x => x.Client)
                .WithMany(x => x.Transactions)
                .HasForeignKey(x => x.ClientId);

            builder.Ignore(x => x.EmployeeName);
            builder.Ignore(x => x.ClientName);
        }
    }
}
