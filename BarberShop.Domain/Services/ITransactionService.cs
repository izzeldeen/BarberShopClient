using BarberShop.Domain.Dtos;
using BarberShop.Domain.Dtos.Charts;
using BarberShop.Domain.Entities;
using BarberShop.Domain.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BarberShop.Domain.Services
{
    public interface ITransactionService : IService<Transaction, TransactionFilter, TransactionDto>
    {
        Task<ServiceResultDto<PageSearchResultDTO<TransactionDto>>> GetAllTransactions(TransactionFilter filter);
        Task<ServiceResultDto<TransactionsAnalysisDto>> GetTransactionsAnalysisDto(TransactionFilter filter);
        Task<ServiceResultDto<BarChartDto>> GetBarChartData(TransactionFilter filter);
        Task<ServiceResultDto<TransactionDto>> Create(TransactionDto transactionDto);
    }
}
