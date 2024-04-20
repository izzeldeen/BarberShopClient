using BarberShop.Domain.Entities;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.Repositories
{
    public interface IRepository<T> where T : BaseEntity
    {
        IQueryable<T> GetAll(Expression<Func<T, bool>> predicate = null, Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null);
        Task<List<T>> GetAllAsync(Expression<Func<T, bool>> predicate = null, Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null, bool AsNoTracking = false);
        Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate, Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null, bool AsNoTracking = false);
        Task<T> Get(int id);
        Task AddAsync(T item);
        Task AddRangeAsync(List<T> item);
        void Add(T item);
        Task UpdateAsync(T item);
        Task DeleteAsync(T item);
        Task DeleteAsync(Expression<Func<T, bool>> predicate);
        Task DeleteAsync(int id);
        Task UpdateRangeAsync(List<T> item);
        bool Any(Expression<Func<T, bool>> predicate = null);
        Task<int> SaveChangesAsync();
        int? GetLoggedInUserId();
    }
}
