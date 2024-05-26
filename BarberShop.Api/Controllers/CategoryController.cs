using BarberShop.Domain.Dtos;
using BarberShop.Domain.Entities;
using BarberShop.Domain.Enum;
using BarberShop.Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BarberShop.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            this.categoryService = categoryService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            var result = await categoryService.GetAll();
            return Ok(result);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await categoryService.GetById(id);
            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = $"{RolesName.Manager},{RolesName.Admin}")]
        public async Task<IActionResult> Create([FromForm]CategoryDto category)
        {
            var result = await categoryService.CreateCategory(category);
            return Ok(result);
        }

        [HttpPut]
        [Authorize(Roles = $"{RolesName.Manager},{RolesName.Admin}")]
        public async Task<IActionResult> Update([FromForm] CategoryDto category)
        {
            var result = await categoryService.UpdateCategory(category);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = $"{RolesName.Manager},{RolesName.Admin}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await categoryService.Delete(id);
            return Ok(result);
        }

    }
}
