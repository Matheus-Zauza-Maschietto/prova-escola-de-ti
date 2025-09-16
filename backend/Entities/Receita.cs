using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Entities;

public class Receita
{
    [Key]
    public int Id { get; private set; }
    public string Nome { get; private set; }
    public int TempoPreparo { get; private set; }
    public decimal CustoAproximado { get; private set; }
    public ICollection<Ingrediente> Ingredientes { get; set; }

    public Receita() { }

    public Receita(string? nome, int? tempoPreparo, decimal? custoAproximado)
    {
        Nome = nome ?? throw new ArgumentNullException(nameof(nome));
        TempoPreparo = tempoPreparo ?? throw new ArgumentNullException(nameof(tempoPreparo));
        CustoAproximado = custoAproximado ?? throw new ArgumentNullException(nameof(custoAproximado));
    }

    public void Update(string? nome, int? tempoPreparo, decimal? custoAproximado)
    {
        Nome = nome ?? throw new ArgumentNullException(nameof(nome));
        TempoPreparo = tempoPreparo ?? throw new ArgumentNullException(nameof(tempoPreparo));
        CustoAproximado = custoAproximado ?? throw new ArgumentNullException(nameof(custoAproximado));
    }
}
