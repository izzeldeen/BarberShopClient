using BarberShop.Domain.Dtos;
using BarberShop.Domain.Enum;
using BarberShop.Domain.Filters;
using BarberShop.Domain.Services;
using BarberShop.Service.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BarberShop.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            this.transactionService = transactionService;
        }
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll([FromQuery]TransactionFilter filter)
        {
            var result = await transactionService.GetAllTransactions(filter);
            return Ok(result);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = $"{RolesName.Manager},{RolesName.Admin}")]
        public async Task<IActionResult> GetById(int id)
        {
            var serviceResult = await transactionService.GetById(id);
            return Ok(serviceResult);
        }


        [HttpGet("Analysis")]
        [Authorize(Roles = $"{RolesName.Manager},{RolesName.Admin}")]
        public async Task<IActionResult> GetTransactionsAnalysis([FromQuery]TransactionFilter filter)
        {
            var result = await transactionService.GetTransactionsAnalysisDto(filter);
            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = $"{RolesName.Manager},{RolesName.Admin}")]
        public async Task<IActionResult> Create([FromForm]TransactionDto transaction)
        {
            var serviceResult = await transactionService.Create(transaction);
            return Ok(serviceResult);
        }

        [HttpPut]
        [Authorize(Roles = $"{RolesName.Manager},{RolesName.Admin}")]
        public async Task<IActionResult> Update([FromForm] TransactionDto transaction)
        {
            var serviceResult = await transactionService.Update(transaction);
            return Ok(serviceResult);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = $"{RolesName.Manager},{RolesName.Admin}")]
        public async Task<IActionResult> Delete(int Id)
        {
            var serviceResult = await transactionService.Delete(Id);
            return Ok(serviceResult);
        }

    }
}
