using AutoMapper;
using BarberShop.Domain.Common;
using BarberShop.Domain.Dtos;
using BarberShop.Domain.Entities;
using BarberShop.Domain.Enum;

namespace BarberShop.Api.Extensions
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            #region User
            CreateMap<User, UserDto>()
                .ForMember(dest => dest.ShopName, src => src.MapFrom(f => f.Shop != null ? f.Shop.Name : string.Empty))
                .ReverseMap();
            //Utlities.GenerateRandom6Digits()
            CreateMap<RegisterDto, User>()
                .ForMember(dest => dest.ShopId, src => src.MapFrom(f => 1))
                .ForMember(dest => dest.Code, src => src.MapFrom(u => "000000"))
                .ForMember(dest => dest.Roles, src => src.MapFrom(u => new List<UserRole>() { new UserRole()
                {
                    RoleId = (int)RoleEnum.Employee,

                }}));
            //Utlities.GenerateRandom6Digits()
            CreateMap<RegisterClientDto, User>()
                .ForMember(dest => dest.ShopId, src => src.MapFrom(f => 1))
                .ForMember(dest => dest.Code, src => src.MapFrom(u => "000000"))
                .ForMember(dest => dest.Roles, src => src.MapFrom(u => new List<UserRole>() { new UserRole()
                {
                    RoleId = (int)RoleEnum.Client,

                }}));




            #endregion

            #region Category
            CreateMap<Category, CategoryDto>().ReverseMap();
            #endregion

            #region Services

            CreateMap<ServicesDto, Services>()
                .ForMember(dest => dest.ShopId, src => src.MapFrom(f => 1))
                .ReverseMap();

            #endregion

            #region Employee
            CreateMap<RegisterDto, Employee>()
               .ForMember(dest => dest.IsAvailabile, src => src.MapFrom(f => true));

            CreateMap<Employee, EmployeeDto>()
                .ForMember(dest => dest.FullName , src => src.MapFrom(e=> e.User != null ? e.User.GetFullName() : string.Empty))
                .ForMember(dest => dest.FirstName, src => src.MapFrom(e=> e.User != null ? e.User.FirstName : string.Empty))
                .ForMember(dest => dest.LastName, src => src.MapFrom(e=> e.User != null ? e.User.LastName : string.Empty))
                .ForMember(dest => dest.Email, src => src.MapFrom(e=> e.User != null ? e.User.Email : string.Empty))
                .ReverseMap();

            #endregion

            #region Appointment

            CreateMap<Appointment, AppointmentDto>()
                .ReverseMap();  
            CreateMap<Appointment, AppointmentDetails>().ReverseMap();
            CreateMap<Services, ServiceAppoDto>();
            #endregion

            #region Transactions
            CreateMap<Transaction , TransactionDto>()
                .ReverseMap(); 

            #endregion

        }
    }
}
