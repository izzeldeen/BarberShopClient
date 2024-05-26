using BarberShop.Domain.Dtos;
using BarberShop.Domain.Enum;
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

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> EmployeeCreateAppoinment(AppointmentDto appointmentDto)
        {
            var serviceResult = await appointmentService.CreateAppoinment(appointmentDto);
            return Ok(serviceResult);

        }

        [HttpGet]
        [Authorize(Roles = $"{RolesName.Admin},{RolesName.Manager}")]
        public async Task<IActionResult> GetEmployeeAppoinments()
        {
            var serviceResult = await appointmentService.GetAppoinments();
            return Ok(serviceResult);

        }


        [HttpGet("Employee")]
        [Authorize]
        public async Task<IActionResult> GetEmployeeAppoinments([FromQuery]int? id)
        {
            var serviceResult = await appointmentService.GetEmployeeAppoinments(id);
            return Ok(serviceResult);

        }

        [HttpGet("Client")]
        [Authorize(Roles = RolesName.Client)]
        public async Task<IActionResult> GetClientAppoinments()
        {
            var serviceResult = await appointmentService.GetClientAppoinments();
            return Ok(serviceResult);

        }

        [HttpPut("UpdateAppointmentStatus")]
        [Authorize(Roles = "Manager,Employee")]
        public async Task<IActionResult> UpdateAppointmentStatus(UpdateAppointmentStatusDto updateAppointmentStatusDto)
        {
            var serviceResult = await appointmentService.UpdateAppointmentStatus(updateAppointmentStatusDto);
            return Ok(serviceResult);

        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Manager,Employee")]
        public async Task<IActionResult> GetAppointmentDetails(int id)
        {
            var serviceResult = await appointmentService.GetAppointmentDetails(id);
            return Ok(serviceResult);

        }


    }
}
