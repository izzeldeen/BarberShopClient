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
    public interface IUserService : IService<User, UserFilters, UserDto>
    {
        Task<ServiceResultDto<int>> SendCode(string phoneNumber);
        Task<ServiceResultDto<LoginResponse>> Login(LoginDto loginDto);
        Task<ServiceResultDto<LoginResponse>> LoginAdmin(LoginDto loginDto);
        Task<ServiceResultDto<RegisterClientDto>> RegisterClient(RegisterClientDto registerClientDto);
        Task<ServiceResultDto<PageSearchResultDTO<User>>> GetAllClients();
        Task<ServiceResultDto<UserDto>> GetClientById(int Id);
        Task<ServiceResultDto<UserDto>> UpdateProfile(UserDto userDto);
        Task<ServiceResultDto<UserDto>> GetClientProfile();

    }
}
