using BarberShop.Domain.Dtos;
using BarberShop.Domain.Entities;
using BarberShop.Domain.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.Services
{
    public interface IServicesService : IService<BarberShop.Domain.Entities.Services, ServicesFilter, ServicesDto>
    {

        Task<ServiceResultDto<ServicesDto>> Create(ServicesDto entityDto);
        Task<ServiceResultDto<ServicesDto>> Update(ServicesDto entityDto);
        Task<ServiceResultDto<AssignServicesDto>> AssignServices(AssignServicesDto assignServicesDto);
        Task<ServiceResultDto<List<ServicesDto>>> GetEmployeeServices(int? id);
        Task<ServiceResultDto<PageSearchResultDTO<ServicesDto>>> GetAll(ServicesFilter filter);
    }
}
