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
            modelBuilder.ApplyConfiguration(new TransactionMap());
            modelBuilder.ApplyConfiguration(new CategoryMap());
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

          //  string connectionStr = "Data Source=DESKTOP-1R9SNJP;Initial Catalog=BarberShop;Integrated Security=True;TrustServerCertificate=True";
             string connectionStr = "Data Source=20.46.144.183;Initial Catalog=Alqasor;Persist Security Info=True;User ID=Alqasor01;Password=SIn#Kh$300124;TrustServerCertificate=True";
            optionsBuilder.UseSqlServer(connectionStr);
        }
    }
}
