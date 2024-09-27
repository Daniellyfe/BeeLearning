using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using BeeLearning.Models;

namespace BeeLearning.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Aluno> Alunos { get; set; }
        public DbSet<Artigo> Artigos { get; set; }
        public DbSet<ArtigoAluno> ArtigosAlunos { get; set; }
        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<CategoriaVideo> CategoriasVideos { get; set; }
        public DbSet<Materia> Materias { get; set; }
        public DbSet<Video> Videos { get; set; }
        public DbSet<VideoAluno> VideosAlunos { get; set; }
    }
}
