using Microsoft.EntityFrameworkCore;
using BeeLearning.Models;

namespace BeeLearning.Data
{
    public class BeeLearningContext : DbContext
    {
        public BeeLearningContext(DbContextOptions<BeeLearningContext> options)
            : base(options)
        {
        }

        public DbSet<Aluno> Alunos { get; set; }
        public DbSet<Artigo> Artigos { get; set; }
        public DbSet<ArtigoAluno> ArtigosAlunos { get; set; }
        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<CategoriaVideo> CategoriasVideos { get; set; }
        public DbSet<Materia> Materias { get; set; }
        public DbSet<Video> Videos { get; set; }
        public DbSet<VideoAluno> VideosAlunos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Aluno>().ToTable("tbAlunos");
            modelBuilder.Entity<Artigo>().ToTable("tbArtigos");
            modelBuilder.Entity<ArtigoAluno>().ToTable("tbArtigosAluno");
            modelBuilder.Entity<Categoria>().ToTable("tbCategorias");
            modelBuilder.Entity<Video>().ToTable("tbVideos");
            modelBuilder.Entity<CategoriaVideo>().ToTable("tbCategoriasVideo");
            modelBuilder.Entity<VideoAluno>().ToTable("tbVideosAluno");
            modelBuilder.Entity<Materia>().ToTable("tbMaterias");          
            
        }

    }
}
