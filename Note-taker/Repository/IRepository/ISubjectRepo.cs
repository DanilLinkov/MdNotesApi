using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Note_taker.Models;

namespace Note_taker.Repository.IRepository
{
    public interface ISubjectRepo
    {
        ICollection<Subject> GetSubjects();
        Subject GetSubject(int subjectId);
        bool SubjectExists(string name);
        bool SubjectExists(int id);
        bool CreateSubject(Subject subject);
        bool UpdateSubject(Subject subject);
        bool DeleteSubject(Subject subject);
        bool Save();

    }
}
