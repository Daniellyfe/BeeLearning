namespace BeeLearning.Models
{
    public class Video
    {
        public Guid Id { get; set; }
        public string Titulo{ get; set; }
        public string Descricao { get; set; }
        public string Url { get; set; }
        public Guid IdMateria { get; set; }
        public Guid IdBeeflixmodel { get; set; }
        public Materia MateriaVideo { get; set; }
        public Beeflixmodel BeeflixVideo { get; set; }

    }
}
