using BarberShop.Domain.Dtos;
using BarberShop.Domain.Enum;
using BarberShop.Domain.Services;
using BarberShop.Service.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BarberShop.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService employeeService;
        public EmployeeController(IEmployeeService employeeService)
        {
            this.employeeService = employeeService;
        }

        [HttpGet]
        [Authorize(Roles = "Barber,Admin")]
        public async Task<IActionResult> GetAllEmployees()
        {
            var serviceResult = await employeeService.GetAllEmployees();
            return Ok(serviceResult);
        }

        [HttpPost]
        [Authorize(Roles = "Barber,Admin")]
        public async Task<IActionResult> RegisterEmployee(RegisterDto registerDto)
        {
            var serviceResult = await employeeService.RegisterEmployee(registerDto);
            return Ok(serviceResult);
        }
        [HttpPut]
        [Authorize(Roles = "Barber,Admin")]
        public async Task<IActionResult> UpdateEmployee(RegisterDto registerDto)
        {
            var serviceResult = await employeeService.UpdateEmployee(registerDto);
            return Ok(serviceResult);
        }
        [HttpGet("details")]
        [Authorize(Roles = RolesName.Employee)]
        public async Task<IActionResult> GetEmployeeDetails()
        {
            var serviceResult = await employeeService.GetEmployeeDetails();
            return Ok(serviceResult);
        }
        [HttpGet("{id}")]
        [Authorize(Roles = RolesName.Barber)]
        public async Task<IActionResult> GetEmployeeDetails(int id)
        {
            var serviceResult = await employeeService.GetById(id);
            return Ok(serviceResult);
        }

    }
}
