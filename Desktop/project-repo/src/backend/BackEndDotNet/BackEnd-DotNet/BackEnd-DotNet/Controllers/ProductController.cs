using Microsoft.AspNetCore.Mvc;
using BackEnd_DotNet.DAL;
using BackEnd_DotNet.Models;
using System.Threading.Tasks;
using System.Linq;
using BackEnd_DotNet.Services;//  this for CloudinaryService

namespace BackEnd_DotNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductDAL _dal = new ProductDAL();
        private readonly CloudinaryService _cloudinaryService = new CloudinaryService(); //  Use Cloudinary

        [HttpGet("ByCategory/{categoryName}")]
        public IActionResult GetByCategory(string categoryName)
        {
            var products = _dal.GetProductsByCategory(categoryName);
            if (products == null || !products.Any())
                return NotFound("No products found.");
            return Ok(products);
        }

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
    }
}
