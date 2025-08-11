using Microsoft.AspNetCore.Mvc;
using BackEnd_DotNet.DAL;
using BackEnd_DotNet.DTO;
using Microsoft.Extensions.Configuration;

namespace BackEnd_DotNet.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly OrderDAL _orderDal;

        public OrdersController(IConfiguration configuration)
        {
            _orderDal = new OrderDAL(configuration);
        }

        [HttpPost("place")]
        public IActionResult PlaceOrder([FromBody] OrderTableDto orderTableDto)
        {
            if (orderTableDto == null || orderTableDto.OrderDetails == null || orderTableDto.OrderDetails.Count == 0)
                return BadRequest(new
                {
                    success = false,
                    message = "Invalid order data"
                });

            try
            {
                var orderId = _orderDal.PlaceOrder(orderTableDto);

                return Ok(new
                {
                    success = true,
                    message = "Your order has been placed successfully!",
                    orderId = orderId
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = "Failed to place the order",
                    error = ex.Message
                });
            }
        }
    }
}
