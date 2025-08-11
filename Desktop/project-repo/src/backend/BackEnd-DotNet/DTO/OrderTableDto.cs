namespace BackEnd_DotNet.DTO
{
    public class OrderTableDto
    {
        public string TransactionId { get; set; }
        public decimal TotalAmount { get; set; }
        public int UserId { get; set; }
        public int ModeId { get; set; }
        public List<OrderDetailDto> OrderDetails { get; set; }
    }
}
