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
    public class CategoriaVideosController : Controller
    {
        private readonly BeeLearningContext _context;

        public CategoriaVideosController(BeeLearningContext context)
        {
            _context = context;
        }

        // GET: CategoriaVideos
        public async Task<IActionResult> Index()
        {
            return View(await _context.CategoriasVideos.ToListAsync());
        }

        // GET: CategoriaVideos/Details/5
        public async Task<IActionResult> Details(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var categoriaVideo = await _context.CategoriasVideos
                .FirstOrDefaultAsync(m => m.Id == id);
            if (categoriaVideo == null)
            {
                return NotFound();
            }

            return View(categoriaVideo);
        }

        // GET: CategoriaVideos/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: CategoriaVideos/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,IdVideo,IdCategoria")] CategoriaVideo categoriaVideo)
        {
            if (ModelState.IsValid)
            {
                categoriaVideo.Id = Guid.NewGuid();
                _context.Add(categoriaVideo);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(categoriaVideo);
        }

        // GET: CategoriaVideos/Edit/5
        public async Task<IActionResult> Edit(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var categoriaVideo = await _context.CategoriasVideos.FindAsync(id);
            if (categoriaVideo == null)
            {
                return NotFound();
            }
            return View(categoriaVideo);
        }

        // POST: CategoriaVideos/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Guid id, [Bind("Id,IdVideo,IdCategoria")] CategoriaVideo categoriaVideo)
        {
            if (id != categoriaVideo.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(categoriaVideo);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CategoriaVideoExists(categoriaVideo.Id))
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
            return View(categoriaVideo);
        }

        // GET: CategoriaVideos/Delete/5
        public async Task<IActionResult> Delete(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var categoriaVideo = await _context.CategoriasVideos
                .FirstOrDefaultAsync(m => m.Id == id);
            if (categoriaVideo == null)
            {
                return NotFound();
            }

            return View(categoriaVideo);
        }

        // POST: CategoriaVideos/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(Guid id)
        {
            var categoriaVideo = await _context.CategoriasVideos.FindAsync(id);
            if (categoriaVideo != null)
            {
                _context.CategoriasVideos.Remove(categoriaVideo);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool CategoriaVideoExists(Guid id)
        {
            return _context.CategoriasVideos.Any(e => e.Id == id);
        }
    }
}
