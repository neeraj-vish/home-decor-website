using Microsoft.AspNetCore.Mvc;
using BackEnd_DotNet.DAL;
using BackEnd_DotNet.Models;
using BackEnd_DotNet.Services;
using System.Threading.Tasks;
using System.Linq;

namespace BackEnd_DotNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductDAL _dal = new ProductDAL();
        private readonly CloudinaryService _cloudinaryService = new CloudinaryService();

        // GET: api/Product/{id}
        [HttpGet("{id}")]
        public IActionResult GetProductById(int id)
        {
            var product = _dal.GetProductById(id);
            if (product == null)
                return NotFound("Product not found.");
            return Ok(product);
        }

        // GET: api/Product/ByCategory/{categoryName}
        [HttpGet("ByCategory/{categoryName}")]
        public IActionResult GetByCategory(string categoryName)
        {
            var products = _dal.GetProductsByCategory(categoryName);
            if (products == null || !products.Any())
                return NotFound("No products found.");
            return Ok(products);
        }

        // GET: api/Product/byseller/{sellerId}
        [HttpGet("byseller/{sellerId}")]
        public IActionResult GetProductsBySellerId(int sellerId)
        {
            var products = _dal.GetProductsBySellerId(sellerId);
            if (products == null || !products.Any())
                return NotFound("No products found.");
            return Ok(products);
        }

        // POST: api/Product/upload
        [HttpPost("upload")]
        public async Task<IActionResult> UploadProduct([FromForm] ProductUploadDto model)
        {
            if (model.Image == null)
                return BadRequest("Please upload an image.");

            // Upload to Cloudinary
            string imageUrl = await _cloudinaryService.UploadImageAsync(model.Image);
            if (string.IsNullOrEmpty(imageUrl))
                return BadRequest("Image upload failed.");

            // Save product info with image URL
            _dal.InsertProduct(
                model.ProductName,
                model.CategoryId,
                model.Price,
                model.Description,
                model.SellerId,
                imageUrl
            );

            return Ok(new { message = "Product uploaded successfully.", imageUrl });
        }

        // PUT: api/Product/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateProduct(int id, [FromBody] ProductUpdateDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                _dal.UpdateProduct(id, model.ProductName, model.CategoryId, model.Price, model.Description);
                return Ok(new { message = "Product updated successfully." });
            }
            catch (Exception ex)
            {
                return BadRequest($"Update failed: {ex.Message}");
            }
        }

        

    }

    // DTO for updating product
    public class ProductUpdateDto
    {
        public string ProductName { get; set; }
        public int CategoryId { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
    }
}