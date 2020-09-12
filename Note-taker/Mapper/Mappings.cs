using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Note_taker.Models;
using Note_taker.Models.Dtos;

namespace Note_taker.Mapper
{
    public class Mappings : Profile
    {
        public Mappings()
        {
            CreateMap<Subject, GetSubjectsDTO>().ReverseMap();
            CreateMap<Subject, GetSubjectDTO>().ReverseMap();
            CreateMap<Subject, CreateSubjectDTO>().ReverseMap();
            CreateMap<Subject, UpdateSubjectDTO>().ReverseMap();
            CreateMap<Note, CreateNoteDTO>().ReverseMap();
            CreateMap<Note, UpdateNoteDTO>().ReverseMap();
            CreateMap<Note, NoteDTO>().ReverseMap();
        }
    }
}
