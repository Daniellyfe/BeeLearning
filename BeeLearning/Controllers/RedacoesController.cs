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
    public class RedacoesController : Controller
    {
        private readonly BeeLearningContext _context;

        public RedacoesController(BeeLearningContext context)
        {
            _context = context;
        }

        // GET: Redacoes
        public async Task<IActionResult> Index()
        {
            return View(await _context.Redacao.ToListAsync());
        }

        // GET: Redacoes/Details/5
        public async Task<IActionResult> Details(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var redacao = await _context.Redacao
                .FirstOrDefaultAsync(m => m.Id == id);
            if (redacao == null)
            {
                return NotFound();
            }

            return View(redacao);
        }

        // GET: Redacoes/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Redacoes/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Titulo,Nome")] Redacao redacao)
        {
            if (ModelState.IsValid)
            {
                redacao.Id = Guid.NewGuid();
                _context.Add(redacao);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(redacao);
        }

        // GET: Redacoes/Edit/5
        public async Task<IActionResult> Edit(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var redacao = await _context.Redacao.FindAsync(id);
            if (redacao == null)
            {
                return NotFound();
            }
            return View(redacao);
        }

        // POST: Redacoes/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Guid id, [Bind("Id,Titulo,Nome")] Redacao redacao)
        {
            if (id != redacao.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(redacao);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!RedacaoExists(redacao.Id))
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
            return View(redacao);
        }

        // GET: Redacoes/Delete/5
        public async Task<IActionResult> Delete(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var redacao = await _context.Redacao
                .FirstOrDefaultAsync(m => m.Id == id);
            if (redacao == null)
            {
                return NotFound();
            }

            return View(redacao);
        }

        // POST: Redacoes/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(Guid id)
        {
            var redacao = await _context.Redacao.FindAsync(id);
            if (redacao != null)
            {
                _context.Redacao.Remove(redacao);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool RedacaoExists(Guid id)
        {
            return _context.Redacao.Any(e => e.Id == id);
        }
   

    /**************Matérias**************/
    public IActionResult Redacao()
    {
        return View();
    }

    }
}
