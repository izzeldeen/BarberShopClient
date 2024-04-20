using BarberShop.Domain.Dtos;
using BarberShop.Domain.Entities;
using BarberShop.Domain.Enum;
using BarberShop.Domain.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.Services
{
    public interface IAppointmentService : IService<Appointment, AppointmentFilter, AppointmentDto>
    {
        Task<ServiceResultDto<AppointmentDto>> EmployeeCreateAppoinment(AppointmentDto appointment);
        Task<ServiceResultDto<List<AppointmentDto>>> GetEmployeeAppoinments();
        Task<ServiceResultDto<AppointmentDetails>> GetAppointmentDetails(int id);
        Task<ServiceResultDto<AppointmentDto>> UpdateAppointmentStatus(UpdateAppointmentStatusDto updateAppointmentStatusDto);
    }
}
