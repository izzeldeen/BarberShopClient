using BarberShop.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Repository
{
    public class SqlDBContext : DbContext
    {
        public SqlDBContext()
        {

        }
        public SqlDBContext(DbContextOptions<SqlDBContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new UserMap());
            modelBuilder.ApplyConfiguration(new RoleMap());
            modelBuilder.ApplyConfiguration(new UserRoleMap());
            modelBuilder.ApplyConfiguration(new EmployeeMap());
            modelBuilder.ApplyConfiguration(new ContactInfoMap());
            modelBuilder.ApplyConfiguration(new ShopMap());
            modelBuilder.ApplyConfiguration(new ServicesMap());
            modelBuilder.ApplyConfiguration(new ServicesEmployeesMap());
            modelBuilder.ApplyConfiguration(new AppointmentMap());
            modelBuilder.ApplyConfiguration(new AppointmentServicesMap());
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string connectionStr = "Data Source=DESKTOP-1R9SNJP;Initial Catalog=BarberShop;Integrated Security=True;TrustServerCertificate=True";
            optionsBuilder.UseSqlServer(connectionStr);
        }
    }
}
