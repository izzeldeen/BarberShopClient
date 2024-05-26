using AutoMapper;
using BarberShop.Domain.Common;
using BarberShop.Domain.Dtos;
using BarberShop.Domain.Entities;
using BarberShop.Domain.Enum;
using BarberShop.Domain.Filters;
using BarberShop.Domain.IHandlers;
using BarberShop.Domain.Repositories;
using BarberShop.Domain.Response;
using BarberShop.Domain.Services;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Service.Service
{
    public class UserService : Services<User, UserFilters, UserDto>, IUserService
    {
        private readonly IUserRepository userRepository;
        private readonly IMapper mapper;
        private readonly IAuthHandler authHandler;
        private readonly IWhatsappHandler whatsappHandler;
        public UserService(IUserRepository userRepository, IMapper mapper,
              IWhatsappHandler whatsappHandler
            , IAuthHandler authHandler) : base(userRepository, mapper)
        {
            this.userRepository = userRepository;
            this.mapper = mapper;
            this.authHandler = authHandler;
            this.whatsappHandler = whatsappHandler;
        }
        public async Task<ServiceResultDto<int>> SendCode(string phoneNumber)
        {
            var serviceResult = new ServiceResultDto<int>();
            User user = await userRepository.FirstOrDefaultAsync(x => x.PhoneNumber == phoneNumber);
            if (user == null) return serviceResult.SetError(ErrorMessages.UserIsNotExists);
            //user.Code = Utlities.GenerateRandom6Digits();
            //await whatsappHandler.SendWhatsAppMessage(user.PhoneNumber, user.Code);
            //(user.Password, user.Salt) = GeneratePassword("Barber@1234");
            user.Code = "000000";
            await userRepository.UpdateAsync(user);
            await userRepository.SaveChangesAsync();
            return serviceResult.SetSuccess(1);
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
                return serviceResult.SetError(ErrorMessages.PhoneNumberOrCodeIsInCorrect);
            }

            return serviceResult.SetSuccess(new LoginResponse()
            {
                Token = authHandler.GenerateToken(user, user?.Roles?.FirstOrDefault()?.Role?.Name),
                Name = user.GetFullName(),
                ShopName = user.Shop != null ? user.Shop.Name : string.Empty,
                Role = user?.Roles?.FirstOrDefault()?.Role?.Name

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
            await whatsappHandler.SendWhatsAppMessage(user.PhoneNumber, user.Code);
            return serviceResult.SetSuccess(registerClientDto);
        }

        public async Task<ServiceResultDto<PageSearchResultDTO<User>>> GetAllClients()
        {
            var serviceResult = new ServiceResultDto<PageSearchResultDTO<User>>();
            int clientRoleId = (int)RoleEnum.Client;
            var users = userRepository.GetAllPageination(x => x.Roles.Any(f => f.RoleId == clientRoleId));
            return serviceResult.SetSuccess(users);

        }

        public async Task<ServiceResultDto<UserDto>> GetClientById(int Id)
        {
            var serviceResult = new ServiceResultDto<UserDto>();
            int clientRoleId = (int)RoleEnum.Client;
            var client = await userRepository.FirstOrDefaultAsync(x => x.Id == Id && x.Roles.Any(f => f.RoleId == clientRoleId),
                x => x.Include(f => f.Roles));
            if (client == null) return serviceResult.SetError(ErrorMessages.UserIsNotExists);
            var mappedClient = mapper.Map<UserDto>(client);
            return serviceResult.SetSuccess(mappedClient);

        }
        public async Task<ServiceResultDto<UserDto>> GetClientProfile()
        {
            var userId = repository.GetLoggedInUserId();
            var serviceResult = new ServiceResultDto<UserDto>();
            int clientRoleId = (int)RoleEnum.Client;
            var client = await userRepository.FirstOrDefaultAsync(x => x.Id == userId && x.Roles.Any(f => f.RoleId == clientRoleId),
                x => x.Include(f => f.Roles));
            if (client == null) return serviceResult.SetError(ErrorMessages.UserIsNotExists);
            var mappedClient = mapper.Map<UserDto>(client);
            return serviceResult.SetSuccess(mappedClient);

        }
        public async Task<ServiceResultDto<UserDto>> UpdateProfile(UserDto userDto)
        {
            var serviceResult = new ServiceResultDto<UserDto>();
            var userId = repository.GetLoggedInUserId();
            var user = await repository.Get(userId.Value);
            if (user == null) return serviceResult.SetError(ErrorMessages.UserIsNotExists);
            user = userDto.MapToUser(user);
            await repository.UpdateAsync(user);
            await repository.SaveChangesAsync();
            return serviceResult.SetSuccess(userDto);

        }

        private (string, byte[]) GeneratePassword(string password, byte[]? salt = null)
        {
            if (salt == null)
            {
                salt = RandomNumberGenerator.GetBytes(128 / 8);
            }

            string hash = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                     password: password,
                     salt: salt,
                     prf: KeyDerivationPrf.HMACSHA256,
                     iterationCount: 100000,
                     numBytesRequested: 256 / 8));
            return (hash, salt);
        }

        public async Task<ServiceResultDto<LoginResponse>> LoginAdmin(LoginDto loginDto)
        {
            var serviceResult = new ServiceResultDto<LoginResponse>();
            User user = await userRepository.FirstOrDefaultAsync(x => x.PhoneNumber == loginDto.PhoneNumber
            || x.Email == loginDto.PhoneNumber
            , x => x.Include(f => f.Roles)
                   .ThenInclude(f => f.Role)
                   .Include(f => f.Shop)
                   );

            if (user == null)
            {
                return serviceResult.SetError(ErrorMessages.PhoneNumberOrCodeIsInCorrect);
            }

            var hashPassword = GeneratePassword(loginDto.Password, user.Salt);
            if (user.Password == hashPassword.Item1)
            {
                return serviceResult.SetSuccess(new LoginResponse()
                {
                    Token = authHandler.GenerateToken(user, user?.Roles?.FirstOrDefault()?.Role?.Name),
                    Name = user.GetFullName(),
                    ShopName = user.Shop != null ? user.Shop.Name : string.Empty
                });
            }
            return serviceResult.SetError(ErrorMessages.PhoneNumberOrCodeIsInCorrect);

        }
    }
}
