using BarberShop.Domain.Dtos;
using BarberShop.Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BarberShop.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly IAppointmentService appointmentService;
        public AppointmentController(IAppointmentService appointmentService)
        {
            this.appointmentService = appointmentService;
        }

        [HttpPost("Employee")]
        [Authorize(Roles = "Employee")]
        public async Task<IActionResult> EmployeeCreateAppoinment(AppointmentDto appointmentDto)
        {
            var serviceResult = await appointmentService.EmployeeCreateAppoinment(appointmentDto);
            return Ok(serviceResult);

        }
        [HttpPost("Employee")]
        [Authorize(Roles = "Employee")]
        public async Task<IActionResult> ClientCreateAppoinment(AppointmentDto appointmentDto)
        {
            var serviceResult = await appointmentService.EmployeeCreateAppoinment(appointmentDto);
            return Ok(serviceResult);

        }


        [HttpGet("Employee")]
        [Authorize(Roles = "Employee")]
        public async Task<IActionResult> GetEmployeeAppoinments()
        {
            var serviceResult = await appointmentService.GetEmployeeAppoinments();
            return Ok(serviceResult);

        }

        [HttpPut("UpdateAppointmentStatus")]
        [Authorize(Roles = "Barber,Employee")]
        public async Task<IActionResult> UpdateAppointmentStatus(UpdateAppointmentStatusDto updateAppointmentStatusDto)
        {
            var serviceResult = await appointmentService.UpdateAppointmentStatus(updateAppointmentStatusDto);
            return Ok(serviceResult);

        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Barber,Employee")]
        public async Task<IActionResult> GetAppointmentDetails(int id)
        {
            var serviceResult = await appointmentService.GetAppointmentDetails(id);
            return Ok(serviceResult);

        }


    }
}
