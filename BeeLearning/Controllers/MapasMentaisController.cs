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
    public class MapasMentaisController : Controller
    {
        private readonly BeeLearningContext _context;

        public MapasMentaisController(BeeLearningContext context)
        {
            _context = context;
        }

        // GET: MapasMentais
        public async Task<IActionResult> Index()
        {
            return View(await _context.MapaMental.ToListAsync());
        }

        // GET: MapasMentais/Details/5
        public async Task<IActionResult> Details(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var mapaMental = await _context.MapaMental
                .FirstOrDefaultAsync(m => m.Id == id);
            if (mapaMental == null)
            {
                return NotFound();
            }

            return View(mapaMental);
        }

        // GET: MapasMentais/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: MapasMentais/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Titulo,Img")] MapaMental mapaMental)
        {
            if (ModelState.IsValid)
            {
                mapaMental.Id = Guid.NewGuid();
                _context.Add(mapaMental);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(mapaMental);
        }

        // GET: MapasMentais/Edit/5
        public async Task<IActionResult> Edit(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var mapaMental = await _context.MapaMental.FindAsync(id);
            if (mapaMental == null)
            {
                return NotFound();
            }
            return View(mapaMental);
        }

        // POST: MapasMentais/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Guid id, [Bind("Id,Titulo,Img")] MapaMental mapaMental)
        {
            if (id != mapaMental.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(mapaMental);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!MapaMentalExists(mapaMental.Id))
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
            return View(mapaMental);
        }

        // GET: MapasMentais/Delete/5
        public async Task<IActionResult> Delete(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var mapaMental = await _context.MapaMental
                .FirstOrDefaultAsync(m => m.Id == id);
            if (mapaMental == null)
            {
                return NotFound();
            }

            return View(mapaMental);
        }

        // POST: MapasMentais/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(Guid id)
        {
            var mapaMental = await _context.MapaMental.FindAsync(id);
            if (mapaMental != null)
            {
                _context.MapaMental.Remove(mapaMental);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool MapaMentalExists(Guid id)
        {
            return _context.MapaMental.Any(e => e.Id == id);
        }


        /**************MapaMental**************/
        public IActionResult Mapamental()
        {
            return View();
        }
    }
}
