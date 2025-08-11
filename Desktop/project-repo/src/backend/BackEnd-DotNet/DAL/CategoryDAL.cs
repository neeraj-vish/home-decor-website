using BackEnd_DotNet.Models;
using MySqlConnector;
using System;
using System.Collections.Generic;

namespace BackEnd_DotNet.DAL
{
    public class CategoryDAL
    {
        private readonly string con = "server=localhost;userid=root;password=root;database=p21_homedecore";

        public List<Category>? GetAllCategories()
        {
            List<Category> categories = new List<Category>();
            try
            {
                using MySqlConnection connection = new MySqlConnection(con);
                connection.Open();
                string query = "SELECT category_id AS CategoryId, category_name AS CategoryName FROM category";
                using MySqlCommand cmd = new MySqlCommand(query, connection);
                using var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    categories.Add(new Category
                    {
                        CategoryId = Convert.ToInt32(reader["CategoryId"]),
                        CategoryName = reader["CategoryName"].ToString() ?? ""
                    });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Database error: {ex.Message}");
                return null;
            }
            return categories;
        }
    }
}
