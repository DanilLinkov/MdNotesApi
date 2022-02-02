using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Note_taker.Data;
using Note_taker.Models;
using Note_taker.Repository.IRepository;

namespace Note_taker.Repository
{
    public class SubjectRepo : ISubjectRepo
    {
        private readonly ApplicationDbContext _db;

        public SubjectRepo(ApplicationDbContext db)
        {
            _db = db;
        }
        public bool CreateSubject(Subject subject)
        {
            _db.AppSubjects.Add(subject);
            return Save();
        }

        public bool DeleteSubject(Subject subject)
        {
            _db.AppSubjects.Remove(subject);
            return Save();
        }

        public Subject GetSubject(int subjectId)
        {
            return _db.AppSubjects.FirstOrDefault(a => a.Id == subjectId);
        }

        public ICollection<Subject> GetSubjects()
        {
            return _db.AppSubjects.OrderBy(a => a.Title).ToList();
        }

        public ICollection<Subject> GetSubjectsInUser(int subjectId)
        {
            return _db.AppSubjects.Include(c => c.User).Where(c => c.UserId == subjectId).ToList();
        }

        public bool Save()
        {
            return _db.SaveChanges() >= 0 ? true : false;
        }

        public bool SubjectExists(string name)
        {
            bool value = _db.AppSubjects.Any(a => a.Title.ToLower().Trim() == name.ToLower().Trim());
            return value;
        }

        public bool SubjectExists(int Id)
        {
            return _db.AppSubjects.Any(a => a.Id == Id);
        }

        public bool UpdateSubject(Subject subject)
        {
            _db.AppSubjects.Update(subject);
            return Save();
        }
    }
}
