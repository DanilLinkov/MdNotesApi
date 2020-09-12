using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Note_taker.Data;
using Note_taker.Models;
using Note_taker.Models.Dtos;
using Note_taker.Repository.IRepository;

namespace Note_taker.Repository
{
    public class NoteRepo : INoteRepo
    {
        private readonly ApplicationDbContext _db;

        public NoteRepo(ApplicationDbContext db)
        {
            _db = db;
        }

        public bool CreateNote(Note note)
        {
            _db.Notes.Add(note);
            return Save();
        }

        public bool DeleteNote(Note note)
        {
            _db.Notes.Remove(note);
            return Save();
        }

        public Note GetNote(int noteId)
        {
            return _db.Notes.Include(c => c.Subject).FirstOrDefault(a => a.Id == noteId);
        }

        public ICollection<Note> GetNotes()
        {
            // Check back later to a.Title
            return _db.Notes.Include(c => c.Subject).OrderBy(a => a.Title).ToList();
        }

        public ICollection<Note> GetNotesInSubject(int noteId)
        {
            return _db.Notes.Include(c => c.Subject).Where(c => c.SubjectId == noteId).ToList();
        }

        public bool NoteExists(int id)
        {
            return _db.Notes.Any(a => a.Id == id);
        }

        public bool Save()
        {
            return _db.SaveChanges() >= 0 ? true : false;
        }

        public bool UpdateNote(Note note)
        {
            _db.Notes.Update(note);
            return Save();
        }
    }
}
