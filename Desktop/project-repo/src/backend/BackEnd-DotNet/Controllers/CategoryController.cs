using Microsoft.AspNetCore.Mvc;
using BackEnd_DotNet.DAL;
using BackEnd_DotNet.Models;
using System.Linq;

namespace BackEnd_DotNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly CategoryDAL _dal = new CategoryDAL();

        [HttpGet]
        public IActionResult GetCategories()
        {
            var categories = _dal.GetAllCategories();
            if (categories == null)
                return StatusCode(500, "Database error occurred.");
            if (!categories.Any())
                return NotFound("No categories found.");
            return Ok(categories);
        }
    }
}