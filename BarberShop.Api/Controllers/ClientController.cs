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
    public class ClientController : ControllerBase
    {
        private readonly IUserService userService;
        public ClientController(IUserService userService)
        {
            this.userService = userService; 
        }

        [HttpGet]
        [Authorize(Roles = $"{RolesName.Manager},{RolesName.Admin},{RolesName.Employee}")]
        public async Task<IActionResult> GetClient()
        {
            var serviceResult = await userService.GetAllClients();
            return Ok(serviceResult);

        }
        [HttpGet("{id}")]
        [Authorize(Roles = $"{RolesName.Manager},{RolesName.Admin},{RolesName.Employee}")]
        public async Task<IActionResult> GetClientById(int id)
        {
            var serviceResult = await userService.GetClientById(id);
            return Ok(serviceResult);

        }

        [HttpGet("profile")]
        [Authorize]
        public async Task<IActionResult> GetClientProfile()
        {
            var serviceResult = await userService.GetClientProfile();
            return Ok(serviceResult);
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> UpdateClientProfile(UserDto userDto)
        {
            var serviceResult = await userService.UpdateProfile(userDto);
            return Ok(serviceResult);
        }
    }
}
