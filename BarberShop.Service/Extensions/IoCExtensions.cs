using BarberShop.Domain.Dtos;
using BarberShop.Domain.IHandlers;
using BarberShop.Domain.Repositories;
using BarberShop.Domain.Services;
using BarberShop.Repository.Repositories;
using BarberShop.Service.Handlers;
using BarberShop.Service.Service;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Service.Extensions
{
    public static  class IoCExtensions
    {
        public static IServiceProvider RegisterServices(this IServiceCollection services)
        {
            #region Handlers 
            services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<IAuthHandler, AuthHandler>();
            #endregion

            #region Register Services 
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IEmployeeService, EmployeeService>();
            services.AddScoped<IAppointmentService, AppointmentService>();
            services.AddScoped<IServicesService, ServicesService>();

            #endregion

            #region Register Repository
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IEmployeeRepository, EmployeeRepository>();
            services.AddScoped<IAppointmentRepository, AppointmentRepository>();
            services.AddScoped<IServicesRepository, ServicesRepository>();
            services.AddScoped<IServicesEmployeesRepository, ServicesEmployeesRepository>();
            services.AddScoped<IRoleRepository, RoleRepository>();
            services.AddScoped<IContactInfoRepository, ContactInfoRepository>();


            #endregion

            return services.BuildServiceProvider();
        }


    }
}
