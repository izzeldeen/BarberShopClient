using BarberShop.Domain.Entities;
using BarberShop.Domain.Enum;
using BarberShop.Domain.Filters;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.Common.Specification
{
    public static class TransactionSpecification
    {
        public static Expression<Func<Transaction, bool>> ToSearchExpression(this TransactionFilter criteria)
        {
            GenericSpecification<Transaction, bool> spec = null;
            if (criteria.EmployeeId != null)
            {
                spec = new TransactionEmployeeIdSpc(criteria.EmployeeId.Value);
            }
            if (criteria.UserId != null)
            {
                if (spec != null)
                    spec = spec.And(new TransactionClientIdSpc(criteria.UserId.Value));
                else
                    spec = new TransactionClientIdSpc(criteria.UserId.Value);
            }
            if (criteria.MonthId != null)
            {
                if (spec != null)
                    spec = spec.And(new TransactionMonthSpc(criteria.MonthId.Value));
                else
                    spec = new TransactionMonthSpc(criteria.MonthId.Value);
            }
            if (criteria.FromDate != null)
            {
                if (spec != null)
                    spec = spec.And(new TransactionDateFromSpc(criteria.FromDate.Value));
                else
                    spec = new TransactionDateFromSpc(criteria.FromDate.Value);
            }
            if (criteria.ToDate != null)
            {
                if (spec != null)
                    spec = spec.And(new TransactionDateToSpc(criteria.ToDate.Value));
                else
                    spec = new TransactionDateToSpc(criteria.ToDate.Value);
            }

            if (criteria.TransactionType != null)
            {
                if (spec != null)
                    spec = spec.And(new TransactionTransactionTypeSpc(criteria.TransactionType.Value));
                else
                    spec = new TransactionTransactionTypeSpc(criteria.TransactionType.Value);
            }

            if (spec != null)
                return spec.ToExpression();

            return null;
        }

        public class TransactionEmployeeIdSpc : GenericSpecification<Transaction, bool>
        {
            private readonly int employeeId;
            public TransactionEmployeeIdSpc(int employeeId)
            {
                this.employeeId = employeeId;
            }
            public override Expression<Func<Transaction, bool>> ToExpression()
            {

                return (t) => t.EmployeeId == employeeId;
            }
        }
        public class TransactionClientIdSpc : GenericSpecification<Transaction, bool>
        {
            private readonly int userId;
            public TransactionClientIdSpc(int userId)
            {
                this.userId = userId;
            }
            public override Expression<Func<Transaction, bool>> ToExpression()
            {

                return (t) => t.ClientId == userId;
            }
        }
        public class TransactionMonthSpc : GenericSpecification<Transaction, bool>
        {
            private readonly int month;
            public TransactionMonthSpc(int month)
            {
                this.month = month;
            }
            public override Expression<Func<Transaction, bool>> ToExpression()
            {

                return (t) => t.CreatedDate.Value.Month == month;
            }
        }
        public class TransactionTransactionTypeSpc : GenericSpecification<Transaction, bool>
        {
            private readonly TransactionTypeEnum transactionType;
            public TransactionTransactionTypeSpc(TransactionTypeEnum transactionType)
            {
                this.transactionType = transactionType;
            }
            public override Expression<Func<Transaction, bool>> ToExpression()
            {

                return (t) => t.TransactionType == transactionType;
            }
        }

        public class TransactionDateFromSpc : GenericSpecification<Transaction, bool>
        {
            private readonly DateTime fromDate;
            public TransactionDateFromSpc(DateTime fromDate)
            {
                this.fromDate = fromDate;
            }
            public override Expression<Func<Transaction, bool>> ToExpression()
            {

                return (t) => t.CreatedDate >= fromDate;
            }
        }
        public class TransactionDateToSpc : GenericSpecification<Transaction, bool>
        {
            private readonly DateTime toDate;
            public TransactionDateToSpc(DateTime toDate)
            {
                this.toDate = toDate;
            }
            public override Expression<Func<Transaction, bool>> ToExpression()
            {

                return (t) => t.CreatedDate <= toDate;
            }
        }



    }
}
