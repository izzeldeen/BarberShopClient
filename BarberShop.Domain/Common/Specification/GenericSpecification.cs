using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace BarberShop.Domain.Common.Specification
{
    public abstract class GenericSpecification<TEntity, TResult>
    { 
        public abstract Expression<Func<TEntity, TResult>> ToExpression();
         
        public GenericSpecification<TEntity, TResult> And(GenericSpecification<TEntity, TResult> specification)
        {
            return new AndSpecification<TEntity, TResult>(this, specification);
        }
        public GenericSpecification<TEntity, TResult> Or(GenericSpecification<TEntity, TResult> specification)
        {
            return new OrSpecification<TEntity, TResult>(this, specification);
        }


    }
     
}
