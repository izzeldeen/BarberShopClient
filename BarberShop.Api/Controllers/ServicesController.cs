using BarberShop.Domain.Dtos;
using BarberShop.Domain.Enum;
using BarberShop.Domain.Filters;
using BarberShop.Domain.Services;
using BarberShop.Service.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BarberShop.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServicesController : ControllerBase
    {
        private readonly IServicesService servicesService;
        public ServicesController(IServicesService servicesService)
        {
            this.servicesService = servicesService;
        }

        [HttpGet]
        [Authorize(Roles = RolesName.Admin)]
        public async Task<IActionResult> GetAll()
        {
            var result = await servicesService.GetAll();
            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = RolesName.Barber)]
        public async Task<IActionResult> Create(ServicesDto service)
        {
            var serviceResult = await servicesService.Create(service);
            return Ok(serviceResult);
        }

        [HttpPut]
        [Authorize(Roles = RolesName.Barber)]
        public async Task<IActionResult> Update(ServicesDto service)
        {
            var serviceResult = await servicesService.Update(service);
            return Ok(serviceResult);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetById(int Id)
        {
            var serviceResult = await servicesService.GetById(Id);
            return Ok(serviceResult);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = RolesName.Barber)]
        public async Task<IActionResult> Delete(int Id)
        {
            var serviceResult = await servicesService.Delete(Id);
            return Ok(serviceResult);
        }



        [HttpPost("AssignServices")]
        [Authorize(Roles = RolesName.Admin)]
        public async Task<IActionResult> AssignServices(AssignServicesDto assignServicesDto)
        {
            var serviceResult = await servicesService.AssignServices(assignServicesDto);
            return Ok(serviceResult);
        }

        [HttpGet("employee")]
        [Authorize(Roles = RolesName.Employee)]
        public async Task<IActionResult> EmplyeeServices()
        {
            var serviceResult = await servicesService.GetEmployeeServices();
            return Ok(serviceResult);
        }


    }
}
