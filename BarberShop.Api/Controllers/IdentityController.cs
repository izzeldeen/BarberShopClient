﻿using BarberShop.Domain.Dtos;
using BarberShop.Domain.Services;
using BarberShop.Service.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BarberShop.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IdentityController : ControllerBase
    {

        private readonly IUserService userService;
        public IdentityController(IUserService userService)
        {
            this.userService = userService;
        }


        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var serviceResult = await userService.Login(loginDto);
            return Ok(serviceResult);
        }

         [HttpPost("RegisterClient")]
        public async Task<IActionResult> RegisterClient(RegisterClientDto registerDto)
        {
            var serviceResult = await userService.RegisterClient(registerDto);
            return Ok(serviceResult);
        }


       
    }
}
