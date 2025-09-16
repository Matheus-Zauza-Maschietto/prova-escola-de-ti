using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Entities;

public class Ingrediente
{
    [Key]
    public int Id { get; private set; }
    public string Nome { get; private set; }
    public int ReceitaId { get; private set; }
    public Receita Receita { get; private set; }

    public Ingrediente() { }

    public Ingrediente(string? nome, int? receitaId)
    {
        Nome = nome ?? throw new ArgumentNullException(nameof(nome));
        ReceitaId = receitaId ?? throw new ArgumentNullException(nameof(receitaId));
    }

    public void Update(string nome)
    {
        Nome = nome ?? throw new ArgumentNullException(nameof(nome));
    }
}
