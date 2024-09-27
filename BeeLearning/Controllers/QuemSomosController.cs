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
    public class QuemSomosController : Controller
    {
        private readonly ApplicationDbContext _context;

        public QuemSomosController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: QuemSomos
        public async Task<IActionResult> Index()
        {
            return View(await _context.QuemSomos.ToListAsync());
        }

        // GET: QuemSomos/Details/5
        public async Task<IActionResult> Details(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var quemSomos = await _context.QuemSomos
                .FirstOrDefaultAsync(m => m.QuemsomosId == id);
            if (quemSomos == null)
            {
                return NotFound();
            }

            return View(quemSomos);
        }

        // GET: QuemSomos/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: QuemSomos/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("QuemsomosId,Nome")] QuemSomos quemSomos)
        {
            if (ModelState.IsValid)
            {
                quemSomos.QuemsomosId = Guid.NewGuid();
                _context.Add(quemSomos);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(quemSomos);
        }

        // GET: QuemSomos/Edit/5
        public async Task<IActionResult> Edit(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var quemSomos = await _context.QuemSomos.FindAsync(id);
            if (quemSomos == null)
            {
                return NotFound();
            }
            return View(quemSomos);
        }

        // POST: QuemSomos/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Guid id, [Bind("QuemsomosId,Nome")] QuemSomos quemSomos)
        {
            if (id != quemSomos.QuemsomosId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(quemSomos);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!QuemSomosExists(quemSomos.QuemsomosId))
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
            return View(quemSomos);
        }

        // GET: QuemSomos/Delete/5
        public async Task<IActionResult> Delete(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var quemSomos = await _context.QuemSomos
                .FirstOrDefaultAsync(m => m.QuemsomosId == id);
            if (quemSomos == null)
            {
                return NotFound();
            }

            return View(quemSomos);
        }

        // POST: QuemSomos/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(Guid id)
        {
            var quemSomos = await _context.QuemSomos.FindAsync(id);
            if (quemSomos != null)
            {
                _context.QuemSomos.Remove(quemSomos);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool QuemSomosExists(Guid id)
        {
            return _context.QuemSomos.Any(e => e.QuemsomosId == id);
        }
    }
}
