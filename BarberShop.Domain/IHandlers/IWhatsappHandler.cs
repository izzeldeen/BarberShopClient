using Infobip.Api.SDK;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
//using RestSharp;

namespace BarberShop.Domain.IHandlers
{
    public interface IWhatsappHandler
    {
        Task<bool> SendWhatsAppMessage(string phoneNumber, string code);
    }
}
