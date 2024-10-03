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
