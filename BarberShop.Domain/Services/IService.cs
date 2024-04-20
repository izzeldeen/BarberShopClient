using BarberShop.Domain.Dtos;
using BarberShop.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.Services
{
    public interface IService<TEntity, TEntityFilter, TEntityBaseDto> : IDisposable where TEntity : BaseEntity where TEntityFilter : EntityBaseFilter where TEntityBaseDto : BaseDto
    {
        public Task<ServiceResultDto<List<TEntityBaseDto>>> GetAll();
        public Task<ServiceResultDto<TEntityBaseDto>> GetById(int Id);
        public Task<ServiceResultDto<TEntityBaseDto>> Create(TEntityBaseDto entityDto);
        public Task<ServiceResultDto<TEntityBaseDto>> Update(TEntity entity);
        public Task<ServiceResultDto<TEntityBaseDto>> Delete(int Id);
    }
}
