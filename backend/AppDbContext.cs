using System;
using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend;

public class AppDbContext : DbContext
{
    public DbSet<Ingrediente> Ingredientes { get; private set; }
    public DbSet<Receita> Receitas { get; private set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<Ingrediente>()
                .HasOne(e => e.Receita)
                .WithMany(e => e.Ingredientes)
                .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<Receita>()
                .HasMany(e => e.Ingredientes)
                .WithOne(e => e.Receita)
                .HasForeignKey(e => e.ReceitaId)
                .OnDelete(DeleteBehavior.NoAction);
    }

}
