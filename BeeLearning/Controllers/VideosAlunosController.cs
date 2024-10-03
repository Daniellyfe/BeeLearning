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
    public class VideosAlunosController : Controller
    {
        private readonly BeeLearningContext _context;

        public VideosAlunosController(BeeLearningContext context)
        {
            _context = context;
        }

        // GET: VideosAlunos
        public async Task<IActionResult> Index()
        {
            return View(await _context.VideosAlunos.ToListAsync());
        }

        // GET: VideosAlunos/Details/5
        public async Task<IActionResult> Details(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var videoAluno = await _context.VideosAlunos
                .FirstOrDefaultAsync(m => m.Id == id);
            if (videoAluno == null)
            {
                return NotFound();
            }

            return View(videoAluno);
        }

        // GET: VideosAlunos/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: VideosAlunos/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,IdVideo,IdAluno")] VideoAluno videoAluno)
        {
            if (ModelState.IsValid)
            {
                videoAluno.Id = Guid.NewGuid();
                _context.Add(videoAluno);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(videoAluno);
        }

        // GET: VideosAlunos/Edit/5
        public async Task<IActionResult> Edit(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var videoAluno = await _context.VideosAlunos.FindAsync(id);
            if (videoAluno == null)
            {
                return NotFound();
            }
            return View(videoAluno);
        }

        // POST: VideosAlunos/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Guid id, [Bind("Id,IdVideo,IdAluno")] VideoAluno videoAluno)
        {
            if (id != videoAluno.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(videoAluno);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!VideoAlunoExists(videoAluno.Id))
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
            return View(videoAluno);
        }

        // GET: VideosAlunos/Delete/5
        public async Task<IActionResult> Delete(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var videoAluno = await _context.VideosAlunos
                .FirstOrDefaultAsync(m => m.Id == id);
            if (videoAluno == null)
            {
                return NotFound();
            }

            return View(videoAluno);
        }

        // POST: VideosAlunos/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(Guid id)
        {
            var videoAluno = await _context.VideosAlunos.FindAsync(id);
            if (videoAluno != null)
            {
                _context.VideosAlunos.Remove(videoAluno);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool VideoAlunoExists(Guid id)
        {
            return _context.VideosAlunos.Any(e => e.Id == id);
        }
    }
}
