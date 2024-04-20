using BarberShop.Domain.Dtos;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Service.Validators
{
    public  class LoginDtoValidator : AbstractValidator<LoginDto>
    {

        public LoginDtoValidator()
        {
            RuleFor(x=> x.PhoneNumber).NotNull().NotEmpty();    
            RuleFor(x=> x.Code).NotNull().NotEmpty();    
        }
    }
}
