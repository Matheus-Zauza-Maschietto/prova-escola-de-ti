using System;
using Microsoft.EntityFrameworkCore;

namespace backend;

public static class DbMigrationConfig
{
    public static void ExecuteMigrations(this WebApplication app)
    {
        using var serviceScope = app.Services.CreateScope();

        try{
            using AppDbContext? context = serviceScope.ServiceProvider.GetService<AppDbContext>();
            context?.Database.Migrate();
            Console.WriteLine("Migração feita com sucesso");
        }
        catch(Exception ex){
            Console.WriteLine(ex.Message);
        }
        
    }
}
