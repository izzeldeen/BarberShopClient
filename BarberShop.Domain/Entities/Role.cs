using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.Entities
{
    public class Role : BaseEntity
    {
        public string Name { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }
    }
    public sealed class RoleMap : IEntityTypeConfiguration<Role>
    {
        public void Configure(EntityTypeBuilder<Role> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasQueryFilter(x => !x.IsDeleted);

            builder.HasMany(x => x.UserRoles)
                .WithOne(x => x.Role)
                .HasForeignKey(x => x.RoleId);

            builder.HasData(
                new Role() { Id = 1, Name = "Admin" },
                new Role() { Id = 2, Name = "Manager" },
                new Role() { Id = 3, Name = "Employee" },
                new Role() { Id = 4, Name = "Client" }
                );
        }
    }
}
