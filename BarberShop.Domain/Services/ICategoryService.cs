using BarberShop.Domain.Dtos;
using BarberShop.Domain.Entities;
using BarberShop.Domain.Enum;
using BarberShop.Domain.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.Services
{
    public interface ICategoryService : IService<Category, CategoryFilter, CategoryDto>
    {
        Task<ServiceResultDto<CategoryDto>> CreateCategory(CategoryDto categoryDto);
        Task<ServiceResultDto<CategoryDto>> UpdateCategory(CategoryDto categoryDto);
    }
}
