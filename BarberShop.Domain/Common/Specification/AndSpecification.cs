using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace BarberShop.Domain.Common.Specification
{
    public class AndSpecification<TEntity, TResult> : GenericSpecification<TEntity, TResult>
    {
        private readonly GenericSpecification<TEntity, TResult> _left;
        private readonly GenericSpecification<TEntity, TResult> _right;


        public AndSpecification(GenericSpecification<TEntity, TResult> left, GenericSpecification<TEntity, TResult> right)
        {
            _right = right;
            _left = left;
        }
        public override Expression<Func<TEntity, TResult>> ToExpression()
        {
            Expression<Func<TEntity, TResult>> leftExpression = _left.ToExpression();
            Expression<Func<TEntity, TResult>> rightExpression = _right.ToExpression();

            var paramExpr = Expression.Parameter(typeof(TEntity));
            var exprBody = Expression.AndAlso(leftExpression.Body, rightExpression.Body);
            exprBody = (BinaryExpression)new ParameterReplacer(paramExpr).Visit(exprBody);
            var finalExpr = Expression.Lambda<Func<TEntity, TResult>>(exprBody, paramExpr);

            return finalExpr;
        }
    }
}
