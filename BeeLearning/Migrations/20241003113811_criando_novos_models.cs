using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BeeLearning.Migrations
{
    /// <inheritdoc />
    public partial class criando_novos_models : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "BeeflixVideoId",
                table: "tbVideos",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "IdBeeflixmodel",
                table: "tbVideos",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "Beeflixmodel",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Titulo = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Beeflixmodel", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Redacao",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Titulo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Redacao", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tbVideos_BeeflixVideoId",
                table: "tbVideos",
                column: "BeeflixVideoId");

            migrationBuilder.AddForeignKey(
                name: "FK_tbVideos_Beeflixmodel_BeeflixVideoId",
                table: "tbVideos",
                column: "BeeflixVideoId",
                principalTable: "Beeflixmodel",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbVideos_Beeflixmodel_BeeflixVideoId",
                table: "tbVideos");

            migrationBuilder.DropTable(
                name: "Beeflixmodel");

            migrationBuilder.DropTable(
                name: "Redacao");

            migrationBuilder.DropIndex(
                name: "IX_tbVideos_BeeflixVideoId",
                table: "tbVideos");

            migrationBuilder.DropColumn(
                name: "BeeflixVideoId",
                table: "tbVideos");

            migrationBuilder.DropColumn(
                name: "IdBeeflixmodel",
                table: "tbVideos");
        }
    }
}
