using AutoMapper;
using BarberShop.Domain.Common;
using BarberShop.Domain.Dtos;
using BarberShop.Domain.Entities;
using BarberShop.Domain.Enum;
using BarberShop.Domain.Filters;
using BarberShop.Domain.Repositories;
using BarberShop.Domain.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Service.Service
{
    public class AppointmentService : Services<Appointment, AppointmentFilter, AppointmentDto>, IAppointmentService
    {
        private readonly IAppointmentRepository appointmentRepository;
        private readonly IEmployeeRepository employeeRepository;
        private readonly IServicesRepository servicesRepository;
        public AppointmentService(IAppointmentRepository appointmentRepository, IMapper mapper
            , IEmployeeRepository employeeRepository
            , IServicesRepository servicesRepository) : base(appointmentRepository, mapper)
        {
            this.appointmentRepository = appointmentRepository;
            this.employeeRepository = employeeRepository;
            this.servicesRepository = servicesRepository;
        }

        public async Task<ServiceResultDto<AppointmentDto>> EmployeeCreateAppoinment(AppointmentDto appointmentDto)
        {
            var serviceResult = new ServiceResultDto<AppointmentDto>();
            if (appointmentDto.StartDate < DateTime.Now) return serviceResult.SetError(ErrorMessages.StartDateMustBeGreaterThanNow);
            var userId = appointmentRepository.GetLoggedInUserId();
            var employee = await employeeRepository.FirstOrDefaultAsync(x => x.UserId == userId);
            if (employee == null) return serviceResult.SetError(ErrorMessages.EmployeeNotExists);
            if (!employee.IsAvailabile) return serviceResult.SetError(ErrorMessages.EmployeeNotAvalilable);

            var services = servicesRepository.GetAll(x => appointmentDto.ServicesIds.Any(s => x.Id == s)).ToList();
            double totalAmount = 0;
            double priceAfterDiscount = 0;
            int totalMin = 0;
            var appointmentServices = new List<AppointmentServices>();

            #region Calculate Discount , Duration & Total Services Amount
            foreach (var service in services)
            {
                totalAmount += service.Amount;
                if (service.IsDiscountApply)
                {
                    priceAfterDiscount += (service.DiscountPriceType == DiscountPriceTypes.Fixed ? service.Amount - service.DiscountValue.Value
                        : service.Amount * (service.DiscountValue.Value / 100));
                }
                else
                {
                    priceAfterDiscount += service.Amount;
                }
                totalMin += service.Duration;
                appointmentServices.Add(new AppointmentServices
                {
                    ServicesId = service.Id
                });
            }
            #endregion

            var appointment = new Appointment()
            {
                StartDate = appointmentDto.StartDate,
                UserId = appointmentDto.UserId,
                EmployeeId = employee.Id,
                AppointmentStatus = AppointmentStatus.Approved,
                FinalPrice = priceAfterDiscount,
                TotalAmount = totalAmount,
                AppointmentServices = appointmentServices,
                EndDate = appointmentDto.StartDate.AddMinutes(totalMin),
                TotalServicesDuration = totalMin,
                DiscountPrice = totalAmount - priceAfterDiscount
            };
            await repository.AddAsync(appointment);
            await repository.SaveChangesAsync();
            return serviceResult.SetSuccess(appointmentDto);
        }

        public async Task<ServiceResultDto<AppointmentDetails>> GetAppointmentDetails(int id)
        {
            var serviceResult = new ServiceResultDto<AppointmentDetails>();
            var appointment = await appointmentRepository.FirstOrDefaultAsync(x => x.Id == id,
                x => x.Include(a => a.Employee).Include(a => a.User)
                .Include(a => a.AppointmentServices)
                .ThenInclude(f => f.Services));
            if (appointment == null) return serviceResult.SetError(ErrorMessages.NoAppointment);

            var mappedEntity = mapper.Map<AppointmentDetails>(appointment);
            if (appointment.AppointmentServices?.Count > 0)
            {
                var services = appointment.AppointmentServices.Select(x => x.Services).ToList();
                mappedEntity.Services = mapper.Map<List<ServicesDto>>(services);
            }
            return serviceResult.SetSuccess(mappedEntity);
        }

        public async Task<ServiceResultDto<List<AppointmentDto>>> GetEmployeeAppoinments()
        {
            var serviceResult = new ServiceResultDto<List<AppointmentDto>>();
            var userId = employeeRepository.GetLoggedInUserId();
            var employee = await employeeRepository.FirstOrDefaultAsync(x => x.UserId == userId
            , x => x.Include(e => e.Appointments));

            if (employee == null) return serviceResult.SetError(ErrorMessages.EmployeeNotExists);
            var mappedAppointments = mapper.Map<List<AppointmentDto>>(employee.Appointments);
            return serviceResult.SetSuccess(mappedAppointments);

        }

        public async Task<ServiceResultDto<AppointmentDto>> UpdateAppointmentStatus(UpdateAppointmentStatusDto update)
        {
            var serviceResult = new ServiceResultDto<AppointmentDto>();
            var appointment = await repository.Get(update.Id);
            if (appointment == null) return serviceResult.SetError(ErrorMessages.NoAppointment);
            appointment.AppointmentStatus = update.AppointmentStatus;
            await repository.UpdateAsync(appointment);
            await repository.SaveChangesAsync();
            var mappedEntity = mapper.Map<AppointmentDto>(appointment);
            return serviceResult.SetSuccess(mappedEntity);
        }
    }
}
