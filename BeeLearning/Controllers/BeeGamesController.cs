using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using BeeLearning.Data;
using BeeLearning.Models;

namespace BeeLearning.Controllers
{
    public class BeeGamesController : Controller
    {
        private readonly BeeLearningContext _context;

        public BeeGamesController(BeeLearningContext context)
        {
            _context = context;
        }

        // GET: BeeGames
        public async Task<IActionResult> Index()
        {
            return View(await _context.BeeGames.ToListAsync());
        }

        // GET: BeeGames/Details/5
        public async Task<IActionResult> Details(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var beeGames = await _context.BeeGames
                .FirstOrDefaultAsync(m => m.Id == id);
            if (beeGames == null)
            {
                return NotFound();
            }

            return View(beeGames);
        }

        // GET: BeeGames/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: BeeGames/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Titulo,Img,Jogos")] BeeGames beeGames)
        {
            if (ModelState.IsValid)
            {
                beeGames.Id = Guid.NewGuid();
                _context.Add(beeGames);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(beeGames);
        }

        // GET: BeeGames/Edit/5
        public async Task<IActionResult> Edit(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var beeGames = await _context.BeeGames.FindAsync(id);
            if (beeGames == null)
            {
                return NotFound();
            }
            return View(beeGames);
        }

        // POST: BeeGames/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Guid id, [Bind("Id,Titulo,Img,Jogos")] BeeGames beeGames)
        {
            if (id != beeGames.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(beeGames);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!BeeGamesExists(beeGames.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(beeGames);
        }

        // GET: BeeGames/Delete/5
        public async Task<IActionResult> Delete(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var beeGames = await _context.BeeGames
                .FirstOrDefaultAsync(m => m.Id == id);
            if (beeGames == null)
            {
                return NotFound();
            }

            return View(beeGames);
        }

        // POST: BeeGames/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(Guid id)
        {
            var beeGames = await _context.BeeGames.FindAsync(id);
            if (beeGames != null)
            {
                _context.BeeGames.Remove(beeGames);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool BeeGamesExists(Guid id)
        {
            return _context.BeeGames.Any(e => e.Id == id);
        }



        public IActionResult Adventure()
        {
            return View();
        }

        public IActionResult Quizes()
        {
            return View();
        }

        public IActionResult Memoria()
        {
            return View();
        }

    }
}
