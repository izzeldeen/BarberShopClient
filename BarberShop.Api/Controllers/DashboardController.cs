using BarberShop.Domain.Enum;
using BarberShop.Domain.Filters;
using BarberShop.Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BarberShop.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly ITransactionService transactionService;
        public DashboardController(ITransactionService transactionService)
        {
            this.transactionService = transactionService;
        }

        [HttpGet("charts")]
        [Authorize(Roles = RolesName.Admin)]
        public async Task<IActionResult> GetPipeCharts([FromQuery] TransactionFilter filter)
        {
            var result = await transactionService.GetTransactionsAnalysisDto(filter);
            return Ok(result);

        }
        [HttpGet("barchart")]
        [Authorize(Roles = RolesName.Admin)]
        public async Task<IActionResult> GetBarChart([FromQuery] TransactionFilter filter)
        {
            var result = await transactionService.GetBarChartData(filter);
            return Ok(result);

        }

    }
}
