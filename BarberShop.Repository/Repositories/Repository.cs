

using BarberShop.Domain.Entities;
using BarberShop.Domain.IHandlers;
using BarberShop.Domain.Repositories;
using BarberShop.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace Taxi24.Infra.Repository
{
    public class Repository<T> : IRepository<T> where T : BaseEntity
    {
        private readonly SqlDBContext context;
        private readonly DbSet<T> dbSet;
        protected readonly IAuthHandler authHandler;
        public Repository(SqlDBContext context,
            IAuthHandler authHandler)
        {
            this.context = context;
            this.dbSet = context.Set<T>();
            this.authHandler = authHandler;
        }

        public void Add(T item)
        {
            item.CreatedDate = DateTime.Now;
            dbSet.Add(item);
        }

        public async Task AddAsync(T item)
        {
            item.CreatedDate = DateTime.Now;
            item.CreatedBy = authHandler.GetUserId();
            dbSet.Add(item);
        }
         public async Task UpdateAsync(T item)
        {
            item.ModificationDate = DateTime.Now;
            item.ModificationBy = authHandler.GetUserId();
            dbSet.Update(item);
        }

        public async Task<int> SaveChangesAsync()
        {
            return await context.SaveChangesAsync();
        }
        public async Task AddRangeAsync(List<T> item)
        {
            await dbSet.AddRangeAsync(item);
        }

        public async Task UpdateRangeAsync(List<T> item)
        {

            dbSet.UpdateRange(item);
        }



        public async Task DeleteAsync(T item)
        {
            item.IsDeleted = true;
            dbSet.Update(item);
        }

        public async Task DeleteAsync(int id)
        {
            T entity = await dbSet.FindAsync(id);
            entity.IsDeleted = true;
            dbSet.Update(entity);
        }

        public async Task DeleteAsync(Expression<Func<T, bool>> predicate)
        {
            var list = dbSet.Where(predicate);
            dbSet.RemoveRange(list);
            await SaveChangesAsync();
        }

        public async Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate = null, Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null, bool AsNoTracking = false)
        {
            IQueryable<T> query = dbSet;
            if (include != null)
            {
                query = include(query);
            }
            if (AsNoTracking)
            {
                query = query.AsNoTracking();
            }
            if (predicate != null)
            {
                return await query.FirstOrDefaultAsync(predicate);
            }
            return await query.FirstOrDefaultAsync();
        }

        public async Task<T> Get(int id)
        {
            return await dbSet.FindAsync(id);
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            return await dbSet.ToListAsync();
        }

        public IQueryable<T> GetAll(Expression<Func<T, bool>> predicate = null, Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null)
        {
            IQueryable<T> query = dbSet;

            if (include != null)
            {
                query = include(query);
            }

            if (predicate != null)
            {
                query = query.Where(predicate);
            }


            return query;
        }




        public async Task<List<T>> GetAllAsync(Expression<Func<T, bool>> predicate = null, Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null, bool AsNoTracking = false)
        {
            IQueryable<T> query = dbSet;

            if (include != null)
            {
                query = include(query);
            }

            if (predicate != null)
            {
                query = query.Where(predicate);
            }
            if (AsNoTracking)
            {
                query = query.AsNoTracking();
            }
            return await query.ToListAsync();
        }

       

        public async Task UpdateWithoutUserIdAsync(T item)
        {
            item.ModificationDate = DateTime.Now;
            dbSet.Update(item);
        }


        public int? GetLoggedInUserId() => authHandler.GetUserId();




        public bool Any(Expression<Func<T, bool>> predicate = null)
        {
            if (predicate != null) return dbSet.Any(predicate);
            return dbSet.Any();
        }
    }
}
