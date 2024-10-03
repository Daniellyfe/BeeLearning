using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BeeLearning.Migrations
{
    /// <inheritdoc />
    public partial class Inicial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tbAlunos",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Endereco = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Cpf = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Rg = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DataNascimento = table.Column<DateOnly>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbAlunos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tbArtigos",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Titulo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Conteudo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdMateria = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbArtigos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tbArtigosAluno",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdAluno = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdArtigo = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbArtigosAluno", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tbCategorias",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbCategorias", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tbCategoriasVideo",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdVideo = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdCategoria = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbCategoriasVideo", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tbMaterias",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbMaterias", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tbVideosAluno",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdVideo = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdAluno = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbVideosAluno", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tbVideos",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Titulo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Descricao = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdMateria = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MateriaVideoId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbVideos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tbVideos_tbMaterias_MateriaVideoId",
                        column: x => x.MateriaVideoId,
                        principalTable: "tbMaterias",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tbVideos_MateriaVideoId",
                table: "tbVideos",
                column: "MateriaVideoId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tbAlunos");

            migrationBuilder.DropTable(
                name: "tbArtigos");

            migrationBuilder.DropTable(
                name: "tbArtigosAluno");

            migrationBuilder.DropTable(
                name: "tbCategorias");

            migrationBuilder.DropTable(
                name: "tbCategoriasVideo");

            migrationBuilder.DropTable(
                name: "tbVideos");

            migrationBuilder.DropTable(
                name: "tbVideosAluno");

            migrationBuilder.DropTable(
                name: "tbMaterias");
        }
    }
}
