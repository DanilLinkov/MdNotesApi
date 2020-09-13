using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Note_taker.Models;

namespace Note_taker.Repository.IRepository
{
    public interface IUserRepo
    {
        bool IsUniqueUser(string username);
        User Authenticate(string username, string password);
        User Register(string username, string password);
    }
}
