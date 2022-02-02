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
    public class SubjectsController : ControllerBase
    {
        private readonly ISubjectRepo _sRepo;
        private readonly IMapper _mapper;

        public SubjectsController(ISubjectRepo sRepo, IMapper mapper)
        {
            _sRepo = sRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetSubjects()
        {
            var objList = _sRepo.GetSubjects();

            var objDto = new List<GetSubjectsDTO>();

            foreach (var obj in objList) {
                objDto.Add(_mapper.Map<GetSubjectsDTO>(obj));
            }

            return Ok(objDto);
        }

        [HttpGet("{subjectId:int}", Name = "GetSubject")]
        public IActionResult GetSubject(int subjectId) 
        {
            var obj = _sRepo.GetSubject(subjectId);
            if (obj == null)
            {
                return NotFound();
            }
            var objDto = _mapper.Map<GetSubjectDTO>(obj);

            return Ok(objDto);
        }

        [HttpGet("[action]/{subjectId:int}")]
        public IActionResult GetSubjectsInUser(int subjectId)
        {
            var objList = _sRepo.GetSubjectsInUser(subjectId);
            if (objList == null)
            {
                return NotFound();
            }
            var objDto = new List<GetSubjectsDTO>();
            foreach (var obj in objList)
            {
                objDto.Add(_mapper.Map<GetSubjectsDTO>(obj));
            }


            return Ok(objDto);

        }

        [HttpPost]
        public IActionResult CreateSubject([FromBody] CreateSubjectDTO createSubjectDTO)
        {
            if (createSubjectDTO == null)
            {
                return BadRequest(ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var subjectObj = _mapper.Map<Subject>(createSubjectDTO);

            if (!_sRepo.CreateSubject(subjectObj))
            {
                ModelState.AddModelError("", $"Something went wrong when saving the record {subjectObj.Title}");
                return StatusCode(500, ModelState);
            }

            return CreatedAtRoute("GetSubject",new { subjectId = subjectObj.Id }, subjectObj);
        }

        [HttpPatch("{subjectId:int}", Name = "UpdateSubject")]
        public IActionResult UpdateSubject(int subjectId, [FromBody] UpdateSubjectDTO updateSubjectDTO)
        {
            if (updateSubjectDTO == null || subjectId != updateSubjectDTO.Id)
            {
                return BadRequest(ModelState);
            }

            var subjectObj = _mapper.Map<Subject>(updateSubjectDTO);

            if (!_sRepo.UpdateSubject(subjectObj))
            {
                ModelState.AddModelError("", $"Something went wrong when updating the record {subjectObj.Title}");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

        [HttpDelete("{subjectId:int}", Name = "DeleteSubject")]
        public IActionResult DeleteSubject(int subjectId)
        {
            if (!_sRepo.SubjectExists(subjectId))
            {
                return NotFound();
            }

            var subjectObj = _sRepo.GetSubject(subjectId);

            if (!_sRepo.DeleteSubject(subjectObj))
            {
                ModelState.AddModelError("", $"Something went wrong when deleting the record {subjectObj.Title}");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

    }
}
