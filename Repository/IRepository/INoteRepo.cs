using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Note_taker.Models;
using Note_taker.Models.Dtos;

namespace Note_taker.Repository.IRepository
{
    public interface INoteRepo
    {
        ICollection<Note> GetNotes();
        ICollection<Note> GetNotesInSubject(int noteId);
        Note GetNote(int noteId);
        bool NoteExists(int id);
        bool CreateNote(Note note);
        bool UpdateNote(Note note);
        bool DeleteNote(Note note);
        bool Save();
    }
}
