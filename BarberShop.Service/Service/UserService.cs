using AutoMapper;
using BarberShop.Domain.Common;
using BarberShop.Domain.Dtos;
using BarberShop.Domain.Entities;
using BarberShop.Domain.Filters;
using BarberShop.Domain.IHandlers;
using BarberShop.Domain.Repositories;
using BarberShop.Domain.Response;
using BarberShop.Domain.Services;
using BarberShop.Service.Validators;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Service.Service
{
    public class UserService : Services<User, UserFilters, UserDto>, IUserService
    {
        private readonly IUserRepository userRepository;
        private readonly IEmployeeRepository employeeRepository;
        private readonly IMapper mapper;
        private readonly IAuthHandler authHandler;
        public UserService(IUserRepository userRepository, IMapper mapper, IEmployeeRepository employeeRepository
            , IAuthHandler authHandler) : base(userRepository, mapper)
        {
            this.userRepository = userRepository;
            this.mapper = mapper;
            this.employeeRepository = employeeRepository;
            this.authHandler = authHandler;
        }

        public async Task<ServiceResultDto<LoginResponse>> Login(LoginDto loginDto)
        {
            var serviceResult = new ServiceResultDto<LoginResponse>();
            User user = await userRepository.FirstOrDefaultAsync(x => x.PhoneNumber == loginDto.PhoneNumber
            && x.Code == loginDto.Code
            , x => x.Include(f => f.Roles)
                   .ThenInclude(f => f.Role)
                   .Include(f => f.Shop)
                   );

            if (user == null)
            {
                return serviceResult.SetError(ErrorMessages.UserIsNotExists);
            }

            return serviceResult.SetSuccess(new LoginResponse()
            {
                Token = authHandler.GenerateToken(user, user?.Roles?.FirstOrDefault()?.Role?.Name),
                Name = user.GetFullName(),
                ShopName = user.Shop != null ? user.Shop.Name : string.Empty
            });

        }

        public async Task<ServiceResultDto<RegisterClientDto>> RegisterClient(RegisterClientDto registerClientDto)
        {
            var serviceResult = new ServiceResultDto<RegisterClientDto>();
            var isPhoneNumberExists = repository.Any(x => x.PhoneNumber == registerClientDto.PhoneNumber);
            if (isPhoneNumberExists) return serviceResult.SetError(ErrorMessages.PhoneNumberAlreadyExists);
            var user = mapper.Map<User>(registerClientDto);
            await repository.AddAsync(user);
            await repository.SaveChangesAsync();
            return serviceResult.SetSuccess(registerClientDto);
        }
    }
}
