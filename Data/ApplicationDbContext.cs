using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Note_taker.Models;

namespace Note_taker.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<Subject> AppSubjects { get; set; }
        public DbSet<Note> AppNotes { get; set; }
        public DbSet<User> AppUsers { get; set; }
    }
}
