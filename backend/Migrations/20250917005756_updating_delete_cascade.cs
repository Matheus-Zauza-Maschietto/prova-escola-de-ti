using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class updating_delete_cascade : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ingredientes_Receitas_ReceitaId",
                table: "Ingredientes");

            migrationBuilder.AddForeignKey(
                name: "FK_Ingredientes_Receitas_ReceitaId",
                table: "Ingredientes",
                column: "ReceitaId",
                principalTable: "Receitas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ingredientes_Receitas_ReceitaId",
                table: "Ingredientes");

            migrationBuilder.AddForeignKey(
                name: "FK_Ingredientes_Receitas_ReceitaId",
                table: "Ingredientes",
                column: "ReceitaId",
                principalTable: "Receitas",
                principalColumn: "Id");
        }
    }
}
