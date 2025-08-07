using Microsoft.AspNetCore.Mvc;
using BackEnd_DotNet.DAL;
using BackEnd_DotNet.Models;

namespace BackEnd_DotNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SellerController : ControllerBase
    {
        private readonly SellerDAL sellerDAL = new SellerDAL();

        [HttpGet("getsellerid")]
        public IActionResult GetSellerIdByEmail([FromQuery] string email)
        {

            var seller = sellerDAL.GetSellerByEmail(email);
            if (seller == null)
                return NotFound("Seller not found");

            return Ok(new { sellerId = seller.SellerId });
        }

    }
}