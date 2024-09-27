using BeeLearning.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace BeeLearning.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Quem()
        {
            return View();
        }

        public IActionResult Beeflix()
        {
            return View();
        }
        /**************Matérias**************/
        public IActionResult Linguagens()
        {
            return View();
        }


        public IActionResult Portugues()
        {
            return View();
        }


        public IActionResult Fisica()
        {
            return View();
        }

        public IActionResult Quimica()
        {
            return View();
        }

        public IActionResult Matematica()
        {
            return View();
        }


        public IActionResult Historia()
        {
            return View();
        }


        public IActionResult Geografia()
        {
            return View();
        }

        public IActionResult Biologia()
        {
            return View();
        }
        public IActionResult Tecnologia()
        {
            return View();
        }

        public IActionResult Sociologia()
        {
            return View();
        }

        public IActionResult Filosofia()
        {
            return View();
        }

        /***********************PRIVACIDADE************************/
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
