using Microsoft.AspNetCore.Http;

public class ProductUploadDto
{
    public string ProductName { get; set; }
    public int CategoryId { get; set; }
    public decimal Price { get; set; }
    public string Description { get; set; }
    public int SellerId { get; set; }
    public IFormFile Image { get; set; } 
}
