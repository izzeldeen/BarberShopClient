using BarberShop.Domain.Dtos;
using BarberShop.Domain.Entities;
using BarberShop.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.Common
{
    public static class MappingExtensions
    {
        public static Employee MapToEmployee(this RegisterDto registerDto, Employee employee)
        {
            employee.Position = registerDto.Position;
            employee.EmploymentStartDate = registerDto.EmploymentStartDate;
            employee.EmploymentEndDate = registerDto.EmploymentEndDate;
            employee.PercentageValue = registerDto.PercentageValue;
            employee.SalaryCalculationType = registerDto.SalaryCalculationType;
            employee.Description = registerDto.Description;
            employee.FixedValue = registerDto.FixedValue;
            if (employee.User != null)
            {
                employee.User.PhoneNumber = registerDto.PhoneNumber;
                employee.User.Email = registerDto.Email;
                employee.User.FirstName = registerDto.FirstName;
                employee.User.LastName = registerDto.LastName;
                employee.User.ModificationDate = DateTime.Now;
            }
            return employee;
        }

        public static Transaction MapToTransaction(this UpdateAppointmentStatusDto appointmentStatusDto, Appointment appointment)
        {
            var transaction = new Transaction()
            {
                EmployeeId = appointment.EmployeeId,
                ClientId = appointment.UserId,
                TotalAmount = appointment.TotalAmount,
                DiscountAmount = appointment.DiscountPrice,
                NetAmount = appointment.NetAmount,
                AppointmentId = appointment.Id,
                GrossProfitAmount = CalculateRevenue(appointmentStatusDto, appointment),
                TransactionType = TransactionTypeEnum.Credit,
                TransactionDate = DateTime.Now
            };
            return transaction;
        }

        public static Transaction MapToTransaction(this TransactionDto transactionDto, Transaction transaction)
        {
            transaction.TotalAmount = transactionDto.NetAmount.Value;
            transaction.NetAmount = transactionDto.NetAmount.Value;
            transaction.Description = transactionDto.Description;
            transaction.TransactionType = transactionDto.TransactionType;
            transaction.TransactionDate = transactionDto.TransactionDate;
            transaction.TransactionSubType = transactionDto.TransactionSubType;
            transaction.EmployeeId = transactionDto.EmployeeId;
            return transaction;
        }

        public static double CalculateRevenue(UpdateAppointmentStatusDto appointmentStatusDto, Appointment appointment)
        {
            switch (appointment.Employee.SalaryCalculationType)
            {
                case SalaryCalculationType.Percentage:
                case SalaryCalculationType.Compound:
                    double percentage = ((double)appointment.Employee.PercentageValue.Value / 100);
                    return appointmentStatusDto.CollectedPrice * percentage;
                default:
                    return appointmentStatusDto.CollectedPrice;
            }
        }

        public static User MapToUser(this UserDto userDto, User user)
        {
            //user.PhoneNumber = userDto.PhoneNumber;
            user.Email = userDto.Email ?? user.Email;
            user.FirstName = userDto.FirstName ?? user.FirstName;
            user.LastName = userDto.LastName ?? user.LastName;
            return user;
        }


    }
}
