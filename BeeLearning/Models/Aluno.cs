using System.ComponentModel;

namespace BeeLearning.Models
{
    public class Aluno
    {
        public Guid Id { get; set; }
        public string Nome { get; set; }
        public string Endereco { get; set; }
        public string Cpf { get; set; }
        public string Rg { get; set; }
        public DateOnly DataNascimento { get; set; }
    }
}
