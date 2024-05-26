using BarberShop.Domain.IHandlers;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Service.Handlers
{
    public class WhatsappHandler : IWhatsappHandler
    {
        public async Task<bool> SendWhatsAppMessage(string phoneNumber, string code)
        {
            var options = new RestClientOptions("https://qylv6q.api.infobip.com")
            {
                MaxTimeout = -1,
            };
            var client = new RestClient(options);
            var request = new RestRequest("/whatsapp/1/message/template", Method.Post);
            request.AddHeader("Authorization", "App 3fea1d1c8572716f118ac8e5c4678eeb-45a26579-9921-4cc6-9412-e437f3a33541");
            request.AddHeader("Content-Type", "application/json");
            request.AddHeader("Accept", "application/json");
            var body = @"{""messages"":[{""from"":""447860099299"",""to"":""phoneNumber"",""messageId"":""messageId"",""content"":{""templateName"":""200000000081834"",""templateData"":{""body"":{""placeholders"":[""code""]}},""language"":""en""}}]}";
            body = body.Replace("phoneNumber", phoneNumber).Replace("code", code).Replace("messageId", Guid.NewGuid().ToString());
            request.AddStringBody(body, DataFormat.Json);
            RestResponse response = await client.ExecuteAsync(request);
            return response.StatusCode == HttpStatusCode.OK;

        }
    }
}
