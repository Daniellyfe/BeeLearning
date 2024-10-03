namespace BeeLearning.Models
{
    public class Artigo
    {
        public Guid Id { get; set; }
        public string Titulo { get; set; }
        public string Conteudo { get; set; }
        public Guid IdMateria { get; set; }

    }
}
