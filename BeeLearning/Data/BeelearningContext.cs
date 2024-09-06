using Microsoft.EntityFrameworkCore;
using Beelearning.Models;

namespace Beelearning.Data
{
    public class BeelearningContext : DbContext
    {
        public BeelearningContext(DbContextOptions<BeelearningContext> options)
            : base(options)
        {
        }

        public DbSet<Aula> Aulas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Aula>().ToTable("Aula");
        }
    }
}
