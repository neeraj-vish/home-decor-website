using BackEnd_DotNet.DTO;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using System;

namespace BackEnd_DotNet.DAL
{
    public class OrderDAL
    {
        private readonly string _connectionString;

        public OrderDAL(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public (int OrderId, string Message) PlaceOrder(OrderTableDto orderDto)
        {
            int orderId = 0;
            orderDto.TransactionId = "TXN-" + DateTime.Now.ToString("yyyyMMddHHmmss");

            using (var conn = new MySqlConnection(_connectionString))
            {
                conn.Open();
                using (var trans = conn.BeginTransaction())
                {
                    try
                    {
                        // Get user_id from buyer table
                        using (var getUserIdCmd = new MySqlCommand(
                            "SELECT user_id FROM buyer WHERE buyer_id = @BuyerId", conn, trans))
                        {
                            getUserIdCmd.Parameters.AddWithValue("@BuyerId", orderDto.UserId);
                            object userIdObj = getUserIdCmd.ExecuteScalar();

                            if (userIdObj == null)
                                throw new Exception($"No user found for buyer ID {orderDto.UserId}");

                            int userId = Convert.ToInt32(userIdObj);

                            // Insert into order_table
                            using (var insertOrderCmd = new MySqlCommand(@"
                                INSERT INTO order_table (transaction_id, total_amount, user_id, mode_id, date)
                                VALUES (@TransactionId, @TotalAmount, @UserId, @ModeId, CURDATE());", conn, trans))
                            {
                                insertOrderCmd.Parameters.AddWithValue("@TransactionId", orderDto.TransactionId);
                                insertOrderCmd.Parameters.AddWithValue("@TotalAmount", orderDto.TotalAmount);
                                insertOrderCmd.Parameters.AddWithValue("@UserId", userId);
                                insertOrderCmd.Parameters.AddWithValue("@ModeId", orderDto.ModeId);

                                insertOrderCmd.ExecuteNonQuery();
                            }

                            // Get last inserted order_table_id
                            using (var lastIdCmd = new MySqlCommand("SELECT LAST_INSERT_ID();", conn, trans))
                            {
                                object lastIdObj = lastIdCmd.ExecuteScalar();
                                if (lastIdObj == null)
                                    throw new Exception("Failed to retrieve the last inserted order ID.");

                                orderId = Convert.ToInt32(lastIdObj);
                            }

                            // Insert order details
                            foreach (var detail in orderDto.OrderDetails)
                            {
                                // Validate product_seller_id
                                using (var checkProductSellerCmd = new MySqlCommand(
                                    "SELECT COUNT(*) FROM product_seller WHERE product_seller_id = @ProductSellerId", conn, trans))
                                {
                                    checkProductSellerCmd.Parameters.AddWithValue("@ProductSellerId", detail.ProductSellerId);
                                    int count = Convert.ToInt32(checkProductSellerCmd.ExecuteScalar());

                                    if (count == 0)
                                        throw new Exception($"Invalid productSellerId: {detail.ProductSellerId} not found.");
                                }

                                // Insert detail record
                                using (var insertDetailCmd = new MySqlCommand(@"
                                    INSERT INTO order_details (order_table_id, product_seller_id, qty, price)
                                    VALUES (@OrderTableId, @ProductSellerId, @Qty, @Price);", conn, trans))
                                {
                                    insertDetailCmd.Parameters.AddWithValue("@OrderTableId", orderId);
                                    insertDetailCmd.Parameters.AddWithValue("@ProductSellerId", detail.ProductSellerId);
                                    insertDetailCmd.Parameters.AddWithValue("@Qty", detail.Qty);
                                    insertDetailCmd.Parameters.AddWithValue("@Price", detail.Price);

                                    insertDetailCmd.ExecuteNonQuery();
                                }
                            }
                        }

                        trans.Commit();

                  
                        string successMessage = $"Order placed successfully! Order ID: {orderId}, Transaction ID: {orderDto.TransactionId}";
                        Console.WriteLine(successMessage);

                        return (orderId, successMessage);
                    }
                    catch (Exception ex)
                    {
                        trans.Rollback();
                        Console.WriteLine($"[ERROR] PlaceOrder failed: {ex.Message}");
                        throw;
                    }
                }
            }
        }
    }
}
