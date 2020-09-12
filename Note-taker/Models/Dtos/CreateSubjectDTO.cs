using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Note_taker.Models.Dtos
{
    public class CreateSubjectDTO
    {
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
    }
}
