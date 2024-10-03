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
    public class ArtigosAlunosController : Controller
    {
        private readonly BeeLearningContext _context;

        public ArtigosAlunosController(BeeLearningContext context)
        {
            _context = context;
        }

        // GET: ArtigosAlunos
        public async Task<IActionResult> Index()
        {
            return View(await _context.ArtigosAlunos.ToListAsync());
        }

        // GET: ArtigosAlunos/Details/5
        public async Task<IActionResult> Details(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var artigoAluno = await _context.ArtigosAlunos
                .FirstOrDefaultAsync(m => m.Id == id);
            if (artigoAluno == null)
            {
                return NotFound();
            }

            return View(artigoAluno);
        }

        // GET: ArtigosAlunos/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: ArtigosAlunos/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,IdAluno,IdArtigo")] ArtigoAluno artigoAluno)
        {
            if (ModelState.IsValid)
            {
                artigoAluno.Id = Guid.NewGuid();
                _context.Add(artigoAluno);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(artigoAluno);
        }

        // GET: ArtigosAlunos/Edit/5
        public async Task<IActionResult> Edit(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var artigoAluno = await _context.ArtigosAlunos.FindAsync(id);
            if (artigoAluno == null)
            {
                return NotFound();
            }
            return View(artigoAluno);
        }

        // POST: ArtigosAlunos/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Guid id, [Bind("Id,IdAluno,IdArtigo")] ArtigoAluno artigoAluno)
        {
            if (id != artigoAluno.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(artigoAluno);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ArtigoAlunoExists(artigoAluno.Id))
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
            return View(artigoAluno);
        }

        // GET: ArtigosAlunos/Delete/5
        public async Task<IActionResult> Delete(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var artigoAluno = await _context.ArtigosAlunos
                .FirstOrDefaultAsync(m => m.Id == id);
            if (artigoAluno == null)
            {
                return NotFound();
            }

            return View(artigoAluno);
        }

        // POST: ArtigosAlunos/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(Guid id)
        {
            var artigoAluno = await _context.ArtigosAlunos.FindAsync(id);
            if (artigoAluno != null)
            {
                _context.ArtigosAlunos.Remove(artigoAluno);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ArtigoAlunoExists(Guid id)
        {
            return _context.ArtigosAlunos.Any(e => e.Id == id);
        }
    }
}
