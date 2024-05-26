using AutoMapper;
using BarberShop.Domain.Common.Specification;
using BarberShop.Domain.Dtos;
using BarberShop.Domain.Entities;
using BarberShop.Domain.Filters;
using BarberShop.Domain.Repositories;
using BarberShop.Domain.Services;
using BarberShop.Repository.Repositories;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Service.Service
{
    public class CategoryService : Services<Category, CategoryFilter, CategoryDto>, ICategoryService
    {
        private readonly IWebHostEnvironment hostingEnvironment;

        public CategoryService(ICategoryRepository transacationRepository, IMapper mapper
            , IWebHostEnvironment hostingEnvironment) : base(transacationRepository, mapper)
        {
            this.hostingEnvironment = hostingEnvironment;
        }

        public async Task<ServiceResultDto<CategoryDto>> CreateCategory(CategoryDto categoryDto)
        {
            var serviceResult = new ServiceResultDto<CategoryDto>();
            var category = mapper.Map<Category>(categoryDto);
            if (categoryDto.File != null)
            {
                var file = categoryDto.File;
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(categoryDto.Name + file.FileName);
                var filePath = Path.Combine(hostingEnvironment.WebRootPath, "Files", fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                    category.Image = fileName;
                }
            }
            repository.AddAsync(category);
            await repository.SaveChangesAsync();
            return serviceResult.SetSuccess(categoryDto);
        }
        public async Task<ServiceResultDto<CategoryDto>> UpdateCategory(CategoryDto categoryDto)
        {
            var serviceResult = new ServiceResultDto<CategoryDto>();
            var category = await repository.Get(categoryDto.Id.Value);
            category.Name = categoryDto.Name;
            category.DisplayOrder = categoryDto.DisplayOrder;
            if (categoryDto.File != null)
            {
                if (category.Image != null)
                {
                    string deleteFilePath = Path.Combine(hostingEnvironment.WebRootPath, "Files", category.Image);
                    if (File.Exists(deleteFilePath)) File.Delete(deleteFilePath);
                }
                var file = categoryDto.File;
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(categoryDto.Name + file.FileName);
                var filePath = Path.Combine(hostingEnvironment.WebRootPath, "Files", fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                    category.Image = fileName;
                }
            }
            repository.AddAsync(category);
            await repository.SaveChangesAsync();
            return serviceResult.SetSuccess(categoryDto);
        }



    }
}

