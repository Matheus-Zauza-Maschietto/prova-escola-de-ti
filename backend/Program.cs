


using backend;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.DTOs;
using backend.Entities;
using Microsoft.AspNetCore.Http.HttpResults;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(policy =>
            {
                policy.AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials()
                    .SetIsOriginAllowed(_ => true);
            });
        });

builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors();

app.MapOpenApi();

app.UseHttpsRedirection();

app.ExecuteMigrations();

app.UseSwagger();
app.UseSwaggerUI();

app.MapPost("/receitas", async ([FromServices] AppDbContext dbContext, [FromBody] UpsertReceitaDTO dto) =>
{
    var receita = new Receita(
        dto.Nome,
        dto.TempoPreparo,
        dto.TempoPreparo
    );
    dbContext.Receitas.Add(receita);
    dbContext.SaveChanges();

    return Results.Created($"receitas/{receita.Id}", receita);
});

app.MapPut("/receitas/{id}", async ([FromServices] AppDbContext dbContext, [FromBody] UpsertReceitaDTO dto, [FromRoute] int id) =>
{
    var receita = dbContext.Receitas.Find(id);
    if (receita is null) return Results.BadRequest("Receita não encontrada");

    receita.Update(
            dto.Nome,
            dto.TempoPreparo,
            dto.TempoPreparo
        );

    dbContext.SaveChanges();

    return Results.Ok(receita);
});

app.MapGet("/receitas", async ([FromServices] AppDbContext dbContext) =>
{
    var receitas = dbContext.Receitas.ToList();

    return Results.Ok(receitas);
});

app.MapDelete("/receitas/{id}", async ([FromServices] AppDbContext dbContext, [FromRoute] int id) =>
{
    var receita = dbContext.Receitas.Find(id);
    if (receita is null) return Results.BadRequest("Receita não encontrada");

    dbContext.Receitas.Remove(receita);

    dbContext.SaveChanges();

    return Results.NoContent();
});

app.MapPost("/receitas/{receitaId}/ingredientes", async ([FromServices] AppDbContext dbContext, [FromBody] UpsertIngredienteDTO dto, [FromRoute]int receitaId) =>
{
    var ingrediente = new Ingrediente(
        dto.Nome,
        receitaId
    );
    dbContext.Add(ingrediente);
    dbContext.SaveChanges();

    return Results.Created($"ingredientes/{ingrediente.Id}", ingrediente);
});


app.MapPut("/ingredientes/{id}", async ([FromServices] AppDbContext dbContext, [FromBody] UpsertIngredienteDTO dto, [FromRoute] int id) =>
{
    var ingrediente = dbContext.Ingredientes.Find(id);
    if (ingrediente is null) return Results.BadRequest("Ingrediente não encontrada");

    ingrediente.Update(
        dto.Nome
    );

    dbContext.SaveChanges();

    return Results.Ok(ingrediente);
});

app.MapDelete("/ingredientes/{id}", async ([FromServices] AppDbContext dbContext, [FromRoute] int id) =>
{
    var ingrediente = dbContext.Ingredientes.Find(id);
    if (ingrediente is null) return Results.BadRequest("Ingrediente não encontrada");

    dbContext.Ingredientes.Remove(ingrediente);

    dbContext.SaveChanges();

    return Results.NoContent();
});

app.MapGet("/receitas/{receitaId}/ingredientes", async ([FromServices] AppDbContext dbContext, [FromRoute] int receitaId) =>
{
    var receitas = dbContext.Ingredientes.Where(p => p.ReceitaId == receitaId).ToList();

    return Results.Ok(receitas);
});

app.MapGet("ingredientes/{id}", async ([FromServices] AppDbContext dbContext, [FromRoute] int id) =>
{
    var receitas = dbContext.Ingredientes.Find(id);

    return Results.Ok(receitas);
});


app.Run();


