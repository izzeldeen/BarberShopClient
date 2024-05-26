using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace BarberShop.Domain.Common.Specification
{
    public class OrSpecification<TEntity, TResult> : GenericSpecification<TEntity, TResult>
    {
        private readonly GenericSpecification<TEntity, TResult> _left;
        private readonly GenericSpecification<TEntity, TResult> _right;


        public OrSpecification(GenericSpecification<TEntity, TResult> left, GenericSpecification<TEntity, TResult> right)
        {
            _right = right;
            _left = left;
        }

        public override Expression<Func<TEntity, TResult>> ToExpression()
        {
            var leftExpression = _left.ToExpression();
            var rightExpression = _right.ToExpression();
            var paramExpr = Expression.Parameter(typeof(TEntity));
            var exprBody = Expression.OrElse(leftExpression.Body, rightExpression.Body);
            exprBody = (BinaryExpression)new ParameterReplacer(paramExpr).Visit(exprBody);
            var finalExpr = Expression.Lambda<Func<TEntity, TResult>>(exprBody, paramExpr);

            return finalExpr;
        }
    }
}
