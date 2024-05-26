using BarberShop.Domain.Entities;
using BarberShop.Domain.Filters;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using static BarberShop.Domain.Common.Specification.TransactionSpecification;

namespace BarberShop.Domain.Common.Specification
{
    public static class ServicesSpecification
    {
        public static Expression<Func<BarberShop.Domain.Entities.Services, bool>> ToSearchExpression(this ServicesFilter criteria)
        {
            GenericSpecification<BarberShop.Domain.Entities.Services, bool> spec = null;
            if (criteria.CategoryId != null)
            {
                spec = new ServicesCategoryIdSpc(criteria.CategoryId.Value);
            }

            if (criteria.ServiceName != null)
            {
                if (spec != null)
                    spec = spec.And(new ServicesNameSpc(criteria.ServiceName));
                else
                    spec = new ServicesNameSpc(criteria.ServiceName);
            }

            if (criteria.EmployeeId != null)
            {
                if (spec != null)
                    spec = spec.And(new ServicesEmployeesIdSpc(criteria.EmployeeId.Value));
                else
                    spec = new ServicesEmployeesIdSpc(criteria.EmployeeId.Value);
            }



            if (spec != null)
                return spec.ToExpression();

            return null;
        }

        public class ServicesCategoryIdSpc : GenericSpecification<BarberShop.Domain.Entities.Services, bool>
        {
            private readonly int categoryId;
            public ServicesCategoryIdSpc(int categoryId)
            {
                this.categoryId = categoryId;
            }
            public override Expression<Func<BarberShop.Domain.Entities.Services, bool>> ToExpression()
            {

                return (t) => t.CategoryId == categoryId;
            }
        }
        public class ServicesEmployeesIdSpc : GenericSpecification<BarberShop.Domain.Entities.Services, bool>
        {
            private readonly int employeeId;
            public ServicesEmployeesIdSpc(int employeeId)
            {
                this.employeeId = employeeId;
            }
            public override Expression<Func<BarberShop.Domain.Entities.Services, bool>> ToExpression()
            {

                return (t) => t.ServicesEmployees.Any(f => f.EmployeeId == employeeId);
            }
        }


        public class ServicesNameSpc : GenericSpecification<BarberShop.Domain.Entities.Services, bool>
        {
            private readonly string name;
            public ServicesNameSpc(string name)
            {
                this.name = name;
            }
            public override Expression<Func<BarberShop.Domain.Entities.Services, bool>> ToExpression()
            {

                return (t) => t.Name.Contains(name);
            }
        }


    }
}
