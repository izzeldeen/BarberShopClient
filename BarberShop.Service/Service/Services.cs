using AutoMapper;
using BarberShop.Domain.Common;
using BarberShop.Domain.Dtos;
using BarberShop.Domain.Entities;
using BarberShop.Domain.Repositories;
using BarberShop.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Service.Service
{
    public class Services<TEntity, TEntityFilter, TEntityBaseDto> : IService<TEntity, TEntityFilter, TEntityBaseDto> where TEntity : BaseEntity where TEntityFilter : EntityBaseFilter where TEntityBaseDto : BaseDto
    {
        protected readonly IRepository<TEntity> repository;
        protected readonly IMapper mapper;
        public Services(IRepository<TEntity> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        public async Task<ServiceResultDto<TEntityBaseDto>> Create(TEntityBaseDto entityDto)
        {
            var serviceResult = new ServiceResultDto<TEntityBaseDto>();
            var mappedEntity = mapper.Map<TEntityBaseDto, TEntity>(entityDto);
            try
            {
                repository.Add(mappedEntity);
                await repository.SaveChangesAsync();
                serviceResult.SetSuccess(entityDto);
                return serviceResult;
            }
            catch (Exception ex)
            {
                serviceResult.SetError(ex.Message);
                return serviceResult;
            }

        }

        public async Task<ServiceResultDto<TEntityBaseDto>> Delete(int Id)
        {
            var serviceResult = new ServiceResultDto<TEntityBaseDto>();
            var entity = await repository.Get(Id);
            if (entity == null) return serviceResult.SetError(ErrorMessages.EntityNotExists);
            await repository.DeleteAsync(entity);
            await repository.SaveChangesAsync();
            var mappedEntity = mapper.Map<TEntityBaseDto>(entity);
            return serviceResult.SetSuccess(mappedEntity);
        }

        public void Dispose()
        {

        }

        public async Task<ServiceResultDto<List<TEntityBaseDto>>> GetAll()
        {
            var serviceResult = new ServiceResultDto<List<TEntityBaseDto>>();
            var entity = repository.GetAll().ToList();
            var mappedEntity = mapper.Map<List<TEntity>, List<TEntityBaseDto>>(entity);
            serviceResult.SetSuccess(mappedEntity);
            return serviceResult;
        }

        public Task<ServiceResultDto<TEntityBaseDto>> GetById(int Id)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResultDto<TEntityBaseDto>> Update(TEntity entity)
        {
            throw new NotImplementedException();
        }
    }
}
