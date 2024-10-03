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
    public class BeeflixmodelsController : Controller
    {
        private readonly BeeLearningContext _context;

        public BeeflixmodelsController(BeeLearningContext context)
        {
            _context = context;
        }

        // GET: Beeflixmodels
        public async Task<IActionResult> Index()
        {
            return View(await _context.Beeflixmodel.ToListAsync());
        }

        // GET: Beeflixmodels/Details/5
        public async Task<IActionResult> Details(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var beeflixmodel = await _context.Beeflixmodel
                .FirstOrDefaultAsync(m => m.Id == id);
            if (beeflixmodel == null)
            {
                return NotFound();
            }

            return View(beeflixmodel);
        }

        // GET: Beeflixmodels/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Beeflixmodels/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Titulo")] Beeflixmodel beeflixmodel)
        {
            if (ModelState.IsValid)
            {
                beeflixmodel.Id = Guid.NewGuid();
                _context.Add(beeflixmodel);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(beeflixmodel);
        }

        // GET: Beeflixmodels/Edit/5
        public async Task<IActionResult> Edit(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var beeflixmodel = await _context.Beeflixmodel.FindAsync(id);
            if (beeflixmodel == null)
            {
                return NotFound();
            }
            return View(beeflixmodel);
        }

        // POST: Beeflixmodels/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Guid id, [Bind("Id,Titulo")] Beeflixmodel beeflixmodel)
        {
            if (id != beeflixmodel.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(beeflixmodel);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!BeeflixmodelExists(beeflixmodel.Id))
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
            return View(beeflixmodel);
        }

        // GET: Beeflixmodels/Delete/5
        public async Task<IActionResult> Delete(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var beeflixmodel = await _context.Beeflixmodel
                .FirstOrDefaultAsync(m => m.Id == id);
            if (beeflixmodel == null)
            {
                return NotFound();
            }

            return View(beeflixmodel);
        }

        // POST: Beeflixmodels/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(Guid id)
        {
            var beeflixmodel = await _context.Beeflixmodel.FindAsync(id);
            if (beeflixmodel != null)
            {
                _context.Beeflixmodel.Remove(beeflixmodel);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool BeeflixmodelExists(Guid id)
        {
            return _context.Beeflixmodel.Any(e => e.Id == id);
        }



        public IActionResult Beeflix()
        {
            return View();
        }


    }
}
