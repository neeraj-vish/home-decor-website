using BackEnd_DotNet.Models;
using MySqlConnector;
using System;
using System.Collections.Generic;

namespace BackEnd_DotNet.DAL
{
    public class ProductDAL
    {
        private readonly string con = "server=localhost;userid=root;password=root;database=p21_homedecore";

        // Fetch products by category name, including image URL
        public List<Product> GetProductsByCategory(string categoryName)
        {
            List<Product> products = new List<Product>();
            using MySqlConnection connection = new MySqlConnection(con);

            string query = @"
                SELECT 
               p.product_id AS ProductId,
               p.product_name AS ProductName,
               ps.description AS Description,
               ps.price AS Price,
               ps.product_seller_id AS ProductSellerId,         
               s.company_name AS CompanyName,
               c.category_name AS Category,
               p.image_url AS ImageUrl
               FROM product p
               JOIN product_seller ps ON p.product_id = ps.product_id
               JOIN seller s ON ps.seller_id = s.seller_id
               JOIN category c ON p.category_id = c.category_id
               WHERE c.category_name = @CategoryName";


            MySqlCommand cmd = new MySqlCommand(query, connection);
            cmd.Parameters.AddWithValue("@CategoryName", categoryName);

            connection.Open();
            using var reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                products.Add(new Product
                {
                    ProductId = Convert.ToInt32(reader["ProductId"]),
                    ProductName = reader["ProductName"].ToString() ?? "",
                    Description = reader["Description"].ToString() ?? "",
                    Price = Convert.ToDecimal(reader["Price"]),
                    CompanyName = reader["CompanyName"].ToString() ?? "",
                    Category = reader["Category"].ToString() ?? "",
                    ImageUrl = reader["ImageUrl"].ToString() ?? "",
                    ProductSellerId = Convert.ToInt32(reader["ProductSellerId"])


                });
            }

            return products;
        }

        //Insert product and link to seller
        public void InsertProduct(string name, int categoryId, decimal price, string description, int sellerId, string imageUrl)
        {
            using (MySqlConnection conn = new MySqlConnection(con))
            {
                conn.Open();

                // Insert into product table
                long productId;
                using (var cmd = new MySqlCommand("INSERT INTO product (product_name, category_id, image_url) VALUES (@name, @categoryId, @imageUrl)", conn))
                {
                    cmd.Parameters.AddWithValue("@name", name);
                    cmd.Parameters.AddWithValue("@categoryId", categoryId);
                    cmd.Parameters.AddWithValue("@imageUrl", imageUrl);
                    cmd.ExecuteNonQuery();
                    productId = cmd.LastInsertedId;
                }

                // Insert into product_seller table
                using (var sellerCmd = new MySqlCommand("INSERT INTO product_seller (product_id, seller_id, description, price) VALUES (@pid, @sid, @desc, @price)", conn))
                {
                    sellerCmd.Parameters.AddWithValue("@pid", productId);
                    sellerCmd.Parameters.AddWithValue("@sid", sellerId);
                    sellerCmd.Parameters.AddWithValue("@desc", description);
                    sellerCmd.Parameters.AddWithValue("@price", price);
                    sellerCmd.ExecuteNonQuery();
                }
            }
        }

        //Get products by sellerid
        public List<Product> GetProductsBySellerId(int sellerId)
        {
            List<Product> products = new List<Product>();
            using MySqlConnection connection = new MySqlConnection(con);

            string query = @"
        SELECT 
            p.product_id AS ProductId,
            p.product_name AS ProductName,
            ps.description AS Description,
            ps.price AS Price,
            s.company_name AS CompanyName,
            c.category_name AS Category,
            p.image_url AS ImageUrl
        FROM product p
        JOIN product_seller ps ON p.product_id = ps.product_id
        JOIN seller s ON ps.seller_id = s.seller_id
        JOIN category c ON p.category_id = c.category_id
        WHERE s.seller_id = @SellerId";

            MySqlCommand cmd = new MySqlCommand(query, connection);
            cmd.Parameters.AddWithValue("@SellerId", sellerId);

            connection.Open();
            using var reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                products.Add(new Product
                {
                    ProductId = Convert.ToInt32(reader["ProductId"]),
                    ProductName = reader["ProductName"].ToString() ?? "",
                    Description = reader["Description"].ToString() ?? "",
                    Price = Convert.ToDecimal(reader["Price"]),
                    CompanyName = reader["CompanyName"].ToString() ?? "",
                    Category = reader["Category"].ToString() ?? "",
                    ImageUrl = reader["ImageUrl"].ToString() ?? ""
                });
            }

            return products;
        }


        // Fetch product by ID
        public Product GetProductById(int productId)
        {
            using MySqlConnection connection = new MySqlConnection(con);

            string query = @"
                SELECT 
                    p.product_id AS ProductId,
                    p.product_name AS ProductName,
                    ps.description AS Description,
                    ps.price AS Price,
                    s.company_name AS CompanyName,
                    c.category_name AS Category,
                    p.image_url AS ImageUrl,
                    p.category_id AS CategoryId
                FROM product p
                JOIN product_seller ps ON p.product_id = ps.product_id
                JOIN seller s ON ps.seller_id = s.seller_id
                JOIN category c ON p.category_id = c.category_id
                WHERE p.product_id = @ProductId";

            MySqlCommand cmd = new MySqlCommand(query, connection);
            cmd.Parameters.AddWithValue("@ProductId", productId);

            connection.Open();
            using var reader = cmd.ExecuteReader();
            if (reader.Read())
            {
                return new Product
                {
                    ProductId = Convert.ToInt32(reader["ProductId"]),
                    ProductName = reader["ProductName"].ToString() ?? "",
                    Description = reader["Description"].ToString() ?? "",
                    Price = Convert.ToDecimal(reader["Price"]),
                    CompanyName = reader["CompanyName"].ToString() ?? "",
                    Category = reader["Category"].ToString() ?? "",
                    ImageUrl = reader["ImageUrl"].ToString() ?? "",
                    CategoryId = Convert.ToInt32(reader["CategoryId"]) 
                };
            }

            return null;
        }

        // Update product
        public void UpdateProduct(int productId, string productName, int categoryId, decimal price, string description)
        {
            using MySqlConnection conn = new MySqlConnection(con);
            conn.Open();

            // Update product table
            string productQuery = @"
                UPDATE product 
                SET product_name = @ProductName, category_id = @CategoryId
                WHERE product_id = @ProductId";
            using (var cmd = new MySqlCommand(productQuery, conn))
            {
                cmd.Parameters.AddWithValue("@ProductName", productName);
                cmd.Parameters.AddWithValue("@CategoryId", categoryId);
                cmd.Parameters.AddWithValue("@ProductId", productId);
                cmd.ExecuteNonQuery();
            }

            // Update product_seller table
            string productSellerQuery = @"
                UPDATE product_seller 
                SET description = @Description, price = @Price
                WHERE product_id = @ProductId";
            using (var cmd = new MySqlCommand(productSellerQuery, conn))
            {
                cmd.Parameters.AddWithValue("@Description", description);
                cmd.Parameters.AddWithValue("@Price", price);
                cmd.Parameters.AddWithValue("@ProductId", productId);
                cmd.ExecuteNonQuery();
            }
        }

       
    }




}

