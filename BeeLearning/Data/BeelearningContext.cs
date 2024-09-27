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

    }
}
