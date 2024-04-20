using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.Enum
{
    public enum ResultCodeTypes
    {
        Ok = 200,
        NoContent = 204,
        BadRequest = 400,
        UnAuthorized = 401,
        ForBiden = 403,
        NotFound = 404,
        NotAllowed = 405,
        ServerError = 500
    }
}
