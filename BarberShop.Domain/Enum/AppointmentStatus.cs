using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.Enum
{
    public enum AppointmentStatus
    {
        Pending,
        Approved,
        Rejected,
        InProgress,
        Completed,
        Canceled
    }
}
