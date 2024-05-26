using BarberShop.Domain.Entities;
using BarberShop.Domain.IHandlers;
using BarberShop.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taxi24.Infra.Repository;

namespace BarberShop.Repository.Repositories
{
    public class CategoryRepository : Repository<Category>, ICategoryRepository
    {
        public CategoryRepository(SqlDBContext context, IAuthHandler authHandler) : base(context, authHandler)
        {

        }
    }
}
