using BackEnd_DotNet.Models;
using MySqlConnector;
using System;

namespace BackEnd_DotNet.DAL
{
    public class SellerDAL
    {
        private readonly string connectionString = "server=localhost;database=p21_homedecore;user=root;password=root;";

        public Seller? GetSellerByEmail(string email) 
        {
            Seller? seller = null;
            using (MySqlConnection conn = new MySqlConnection(connectionString))
            {
                conn.Open();
                string query = @"
                      SELECT s.seller_id, u.email
                      FROM seller s
                      JOIN user u ON s.user_id = u.user_id
                      WHERE u.email = @Email";
                MySqlCommand cmd = new MySqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@Email", email);
                var reader = cmd.ExecuteReader();
                if (reader.Read())
                {
                    seller = new Seller
                    {
                        SellerId = Convert.ToInt32(reader["seller_id"]),
                        Email = reader["email"].ToString()
                    };
                }
            }
            return seller;
        }
    }
}