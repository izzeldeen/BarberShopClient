using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.Common
{
    public static class ErrorMessages
    {
        public const string UserIsNotExists = "User is not exists";
        public const string PhoneNumberOrCodeIsInCorrect = "Phone number or code is incorrect";
        public const string DiscountAmountMustBeLessThanAmount = "Discount amount must be less than Service Price";
        public const string DiscountPriceMustBeLessThan100 = "Discount price must be less than 100";
        public const string EmployeeNotExists = "Employee not exists";
        public const string ServicesNotExists = "Services not exists";
        public const string StartDateMustBeGreaterThanNow = "Start Appointment time must be greater than now";
        public const string EmployeeNotAvalilable = "Employee not avaliable";
        public const string NoAppointment = "Appointment id is invalid";
        public const string ServiceNotExists = "Service not exists";
        public const string EntityNotExists = "Entity not exists";
        public const string PhoneNumberAlreadyExists = "Phone number already exists";
        public const string MustSelectEmployee = "Employee Field required";
        public const string ServicesNotValid = "Services not valid";
      
    }
}
