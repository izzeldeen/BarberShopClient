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
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService employeeService;
        public EmployeeController(IEmployeeService employeeService)
        {
            this.employeeService = employeeService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllEmployees([FromQuery] EmployeeFilter filter)
        {
            var serviceResult = await employeeService.GetAllEmployees(filter);
            return Ok(serviceResult);
        }

        [HttpPost]
        [Authorize(Roles = "Manager,Admin")]
        public async Task<IActionResult> RegisterEmployee([FromForm] RegisterDto registerDto)
        {
            var serviceResult = await employeeService.RegisterEmployee(registerDto);
            return Ok(serviceResult);
        }
        [HttpPut]
        [Authorize(Roles = "Manager,Admin,Employee")]
        public async Task<IActionResult> UpdateEmployee([FromForm] RegisterDto registerDto)
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
        //[Authorize(Roles = $"{RolesName.Manager},{RolesName.Admin}")]
        public async Task<IActionResult> GetEmployeeDetails(int id)
        {
            var serviceResult = await employeeService.GetById(id);
            return Ok(serviceResult);
        }



    }
}
