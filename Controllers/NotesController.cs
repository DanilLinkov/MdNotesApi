using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Note_taker.Models;
using Note_taker.Models.Dtos;
using Note_taker.Repository.IRepository;

namespace Note_taker.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private readonly INoteRepo _noteRepo;
        private readonly IMapper _mapper;

        public NotesController(INoteRepo noteRepo, IMapper mapper)
        {
            _noteRepo = noteRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetNotes()
        {
            var objList = _noteRepo.GetNotes();
            var objDto = new List<NoteDTO>();
            foreach (var obj in objList)
            {
                objDto.Add(_mapper.Map<NoteDTO>(obj));
            }
            return Ok(objDto);
        }

        [HttpGet("{noteId:int}", Name = "GetNote")]
        public IActionResult GetNote(int noteId)
        {
            var obj = _noteRepo.GetNote(noteId);
            if (obj == null)
            {
                return NotFound();
            }
            var objDto = _mapper.Map<NoteDTO>(obj);

            return Ok(objDto);

        }

        [HttpGet("[action]/{subjectId:int}")]
        public IActionResult GetNotesInSubject(int subjectId)
        {
            var objList = _noteRepo.GetNotesInSubject(subjectId);
            if (objList == null)
            {
                return NotFound();
            }
            var objDto = new List<NoteDTO>();
            foreach (var obj in objList)
            {
                objDto.Add(_mapper.Map<NoteDTO>(obj));
            }


            return Ok(objDto);

        }

        [HttpPost]
        public IActionResult CreateNote([FromBody] CreateNoteDTO createNoteDTO)
        {
            if (createNoteDTO == null)
            {
                return BadRequest(ModelState);
            }

            var noteObj = _mapper.Map<Note>(createNoteDTO);
            if (!_noteRepo.CreateNote(noteObj))
            {
                ModelState.AddModelError("", $"Something went wrong when saving the record {noteObj.Title}");
                return StatusCode(500, ModelState);
            }
            return CreatedAtRoute("GetNote", new { noteId = noteObj.Id }, noteObj);
        }

        [HttpPatch("{noteId:int}", Name = "UpdateNote")]
        public IActionResult UpdateNote(int noteId, [FromBody] UpdateNoteDTO updateNoteDTO)
        {
            if (updateNoteDTO == null || noteId != updateNoteDTO.Id)
            {
                return BadRequest(ModelState);
            }

            var noteObj = _mapper.Map<Note>(updateNoteDTO);
            if (!_noteRepo.UpdateNote(noteObj))
            {
                ModelState.AddModelError("", $"Something went wrong when updating the record {noteObj.Title}");
                return StatusCode(500, ModelState);
            }

            return NoContent();

        }


        [HttpDelete("{noteId:int}", Name = "DeleteNote")]
        public IActionResult DeleteNote(int noteId)
        {
            if (!_noteRepo.NoteExists(noteId))
            {
                return NotFound();
            }

            var noteObj = _noteRepo.GetNote(noteId);
            if (!_noteRepo.DeleteNote(noteObj))
            {
                ModelState.AddModelError("", $"Something went wrong when deleting the record {noteObj.Title}");
                return StatusCode(500, ModelState);
            }

            return NoContent();

        }
    }
}
