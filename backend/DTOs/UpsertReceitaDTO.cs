namespace backend.DTOs;

public record UpsertReceitaDTO
{
    public string Nome { get; set; }
    public int TempoPreparo { get; set; }
    public decimal CustoAproximado { get; set; }
}
