using BarberShop.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.Dtos
{
    public class ServiceResultDto<T> 
    {
        public ServiceResultDto(ResultCodeTypes resultCode = ResultCodeTypes.BadRequest)
        {
            ResultCode = resultCode;

        }
        public ServiceResultDto(string ErrorMessage)
        {
            SetError(ErrorMessage);
        }
        public ServiceResultDto(T entity)
        {
            SetSuccess(entity);
            
        }
        public ResultCodeTypes ResultCode { get; set; }
        public string ErrorMessage { get; set; }
        public bool IsSuccess { get; set; }
        public T Data { get; set; }

        public ServiceResultDto<T> SetSuccess(T data)
        {
            ResultCode = ResultCodeTypes.Ok;
            IsSuccess = true;
            Data = data;
            return this;
        }
        public ServiceResultDto<T> SetError(string error)
        {
            ErrorMessage = error;
            IsSuccess = false;
            ResultCode = ResultCodeTypes.BadRequest;
            return this;
        }
    }
}
