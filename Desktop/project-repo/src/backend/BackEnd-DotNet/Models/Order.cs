using System;

namespace BackEnd_DotNet.Models
{
    public class Order
    {
        public int OrderId { get; set; }          
        public string TransactionId { get; set; } 
        public decimal TotalAmount { get; set; }  
        public int UserId { get; set; }            
        public int ModeId { get; set; }            
        public DateTime OrderDate { get; set; }    
    }
}
