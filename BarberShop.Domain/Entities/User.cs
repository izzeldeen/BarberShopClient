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
    public class User : BaseEntity
    {
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Code { get; set; }
        public int? ShopId { get; set; }
        public string? Address { get; set; }
        public GenderEnum? Gender { get; set; }
        public Shop? Shop { get; set; }
        public Employee? Employee { get; set; }
        public virtual ICollection<UserRole> Roles { get; set; }
        public virtual ICollection<Appointment> Appointments { get; set; }
        public virtual ICollection<Transaction>? Transactions  { get; set; }
        public string? Password { get; set; }
        public byte[]? Salt { get; set; }
        public string GetFullName() => $"{FirstName} {LastName}";
    }

    public sealed class UserMap : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasQueryFilter(x => !x.IsDeleted);

            builder.HasMany(x => x.Roles)
                .WithOne(x => x.User)
                .HasForeignKey(x => x.UserId);

            builder.HasOne(x => x.Shop)
                .WithMany(x => x.Users)
                .HasForeignKey(x => x.ShopId);

            builder.HasOne(x => x.Employee)
                .WithOne(x => x.User)
                .HasForeignKey<Employee>(f => f.UserId);

            builder.HasData(new User()
            {
                Id = 1,
                PhoneNumber = "000000000",
                Code = "0000",
                Email = "admin@barber.com",
                FirstName = "Super",
                LastName = "Admin",
                ShopId = 1
            });
        }
    }
}
