using Microsoft.AspNetCore.Mvc;
using Steeltoe.Discovery.Client;

namespace BackEnd_DotNet
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add controller support
            builder.Services.AddControllers();

            // Enable CORS for React frontend
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactFrontend", policy =>
                {
                    policy.WithOrigins("http://localhost:5173")
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            // Add Steeltoe Discovery Client
            builder.Services.AddDiscoveryClient(builder.Configuration);
            var app = builder.Build();
            // Use Steeltoe Discovery Client
            app.UseDiscoveryClient();

           

            // Middleware setup
            app.UseCors("AllowReactFrontend");
            app.UseStaticFiles();
            app.UseRouting();
            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}
