using BarberShop.Domain.Dtos;
using BarberShop.Domain.Entities;
using BarberShop.Domain.Filters;
using BarberShop.Domain.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.Services
{
    public interface IUserService : IService<User , UserFilters , UserDto>
    {
        Task<ServiceResultDto<LoginResponse>> Login(LoginDto loginDto);
        Task<ServiceResultDto<RegisterClientDto>> RegisterClient(RegisterClientDto registerClientDto);
        
    }
}
