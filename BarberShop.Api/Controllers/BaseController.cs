using BarberShop.Domain.Dtos;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace BarberShop.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController<T> : ControllerBase where T : class
    {
        private IValidator<T> validator;

        public BaseController(IValidator<T> validator)
        {
            this.validator = validator;
        }

        public async Task<ServiceResultDto<T>> ValidateObject(T entity)
        {
            var response = new ServiceResultDto<T>();
            var result = await validator.ValidateAsync(entity);

            if (!result.IsValid)
            {
                var error = result.Errors.FirstOrDefault().ErrorMessage;
                var responseError = new ServiceResultDto<T>(error);
                return responseError;
            }
            response.SetSuccess(entity);
            return response;
        }
    }
}
