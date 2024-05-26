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
        private readonly ITransactionRepository transactionRepository;
        public AppointmentService(IAppointmentRepository appointmentRepository, IMapper mapper
            , IEmployeeRepository employeeRepository, ITransactionRepository transactionRepository
            , IServicesRepository servicesRepository) : base(appointmentRepository, mapper)
        {
            this.appointmentRepository = appointmentRepository;
            this.employeeRepository = employeeRepository;
            this.servicesRepository = servicesRepository;
            this.transactionRepository = transactionRepository;
        }



        public async Task<ServiceResultDto<AppointmentDto>> CreateAppoinment(AppointmentDto appointmentDto)
        {
            var serviceResult = new ServiceResultDto<AppointmentDto>();
            if (appointmentDto.StartDate < DateTime.Now) return serviceResult.SetError(ErrorMessages.StartDateMustBeGreaterThanNow);
            var userId = appointmentRepository.GetLoggedInUserId();
            var employee = new Employee();
            if (!appointmentDto.IsClient)
                employee = await employeeRepository.FirstOrDefaultAsync(x => x.UserId == userId);
            else
            {
                if (appointmentDto.EmployeeId == null) return serviceResult.SetError(ErrorMessages.MustSelectEmployee);
                employee = await employeeRepository.FirstOrDefaultAsync(x => x.Id == appointmentDto.EmployeeId);
            }


            if (employee == null) return serviceResult.SetError(ErrorMessages.EmployeeNotExists);
            if (!employee.IsAvailabile) return serviceResult.SetError(ErrorMessages.EmployeeNotAvalilable);

            var validateEmployeeAvailability = appointmentRepository.Any(f =>
            f.StartDate <= appointmentDto.StartDate && appointmentDto.StartDate <= f.EndDate && f.EmployeeId == employee.Id
            );
            if (validateEmployeeAvailability) return serviceResult.SetError(ErrorMessages.EmployeeNotAvalilable);

            var services = servicesRepository.GetAll(x => appointmentDto.ServicesIds.Any(s => x.Id == s)).ToList();
            double totalAmount = 0;
            double priceAfterDiscount = 0;
            int totalMin = 0;
            var appointmentServices = new List<AppointmentServices>();

            #region Calculate Discount , Duration & Total Services Amount
            if (services.Count == 0) return serviceResult.SetError(ErrorMessages.ServicesNotValid);
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
                    ServicesId = service.Id,
                    EmployeeId = employee.Id,
                });
            }
            #endregion

            var appointment = new Appointment()
            {
                StartDate = appointmentDto.StartDate,
                UserId = appointmentDto.IsClient ? userId : appointmentDto.UserId,
                EmployeeId = employee.Id,
                AppointmentStatus = AppointmentStatus.Approved,
                NetAmount = priceAfterDiscount,
                TotalAmount = totalAmount,
                AppointmentServices = appointmentServices,
                EndDate = appointmentDto.StartDate.AddMinutes(totalMin),
                TotalServicesDuration = totalMin,
                DiscountPrice = totalAmount - priceAfterDiscount
            };
            await repository.AddAsync(appointment);
            await repository.SaveChangesAsync();
            var mappedDto = mapper.Map<AppointmentDto>(appointment);
            return serviceResult.SetSuccess(mappedDto);
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

        public async Task<ServiceResultDto<List<AppointmentDto>>> GetEmployeeAppoinments(int? employeeid)
        {
            var serviceResult = new ServiceResultDto<List<AppointmentDto>>();
            var userId = employeeid == null ? employeeRepository.GetLoggedInUserId()
                : employeeRepository.FirstOrDefaultAsync(x => x.Id == employeeid)?.Result?.UserId;
            var employee = await employeeRepository.FirstOrDefaultAsync(x => x.UserId == userId
            , x => x.Include(e => e.Appointments));
            if (employee == null) return serviceResult.SetError(ErrorMessages.EmployeeNotExists);
            var mappedAppointments = mapper.Map<List<AppointmentDto>>(employee.Appointments);
            mappedAppointments = mappedAppointments.Select(x =>
            {
                var appo = employee.Appointments.FirstOrDefault(f => f.Id == x.Id);
                x.Services = mapper.Map<List<ServiceAppoDto>>(appo.AppointmentServices.Select(x => x.Services));
                x.ServicesCount = x.Services.Count();
                return x;
            }).ToList();
            return serviceResult.SetSuccess(mappedAppointments);

        }
        public async Task<ServiceResultDto<List<AppointmentDto>>> GetClientAppoinments()
        {
            var serviceResult = new ServiceResultDto<List<AppointmentDto>>();
            var userId = employeeRepository.GetLoggedInUserId();
            var appointments = appointmentRepository.GetAll(x => x.UserId == userId, x => x.Include(f => f.AppointmentServices).ThenInclude(f => f.Services).ThenInclude(x => x.Category));
            var mappedAppointments = mapper.Map<List<AppointmentDto>>(appointments);
            mappedAppointments = mappedAppointments.Select(x =>
            {
                var appo = appointments.FirstOrDefault(f => f.Id == x.Id);
                x.Services = mapper.Map<List<ServiceAppoDto>>(appo.AppointmentServices.Select(x => x.Services));
                x.ServicesCount = x.Services.Count();
                return x;
            }).ToList();
            return serviceResult.SetSuccess(mappedAppointments);

        }

        public async Task<ServiceResultDto<AppointmentDto>> UpdateAppointmentStatus(UpdateAppointmentStatusDto update)
        {
            var serviceResult = new ServiceResultDto<AppointmentDto>();
            var appointment = await repository.FirstOrDefaultAsync(x => x.Id == update.Id, x => x.Include(f => f.AppointmentServices).Include(f => f.Employee));
            if (appointment == null) return serviceResult.SetError(ErrorMessages.NoAppointment);
            appointment.AppointmentStatus = update.AppointmentStatus;
            if (update.AppointmentStatus == AppointmentStatus.Completed && appointment?.AppointmentServices?.Count > 0)
            {
                appointment.AppointmentServices = appointment.AppointmentServices.Select(f =>
                {
                    var employeeId = update?.ServicesEmployeeSelected?.FirstOrDefault(s => s.ServiceId == f.ServicesId)?.EmployeeId;
                    f.EmployeeId = employeeId != null ? employeeId : appointment.EmployeeId;
                    return f;
                }).ToList();
                if (update.CollectedPrice != appointment.NetAmount)
                {
                    appointment.NetAmount = update.CollectedPrice;
                    appointment.DiscountPrice = appointment.TotalAmount - update.CollectedPrice;
                }
                var transaction = update.MapToTransaction(appointment);
                await transactionRepository.AddAsync(transaction);
            }
            await repository.UpdateAsync(appointment);
            await repository.SaveChangesAsync();
            var mappedEntity = mapper.Map<AppointmentDto>(appointment);
            return serviceResult.SetSuccess(mappedEntity);
        }

        public async Task<ServiceResultDto<List<AppointmentDto>>> GetAppoinments()
        {
            var serviceResult = new ServiceResultDto<List<AppointmentDto>>();
            var appointments = await repository.GetAllAsync(include: x => x.Include(f => f.Employee).ThenInclude(f => f.User));
            var mappedAppointments = mapper.Map<List<AppointmentDto>>(appointments);
            return serviceResult.SetSuccess(mappedAppointments);
        }
    }
}
