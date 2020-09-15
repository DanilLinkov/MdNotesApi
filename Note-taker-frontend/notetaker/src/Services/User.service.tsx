import axios from "axios";
import authHeader from "./Auth-header";

const API_URL = "https://localhost:44346/api/";

class UserService {

  // NOTES

  getNotesForSubjectId(subjectId: any) {
    return axios.get(API_URL + `Notes/GetNotesInSubject/${subjectId}`, {
      headers: authHeader(),
    });
  }

  getNoteForNoteId(noteId: any) {
    return axios.get(API_URL + `Notes/${noteId}`, { headers: authHeader() });
  }

  // SUBJECTS

  getSubjectsForUser(userId: any) {
    return axios.get(API_URL + `Subjects/GetSubjectsInUser/${userId}`, {
      headers: authHeader(),
    });
  }

  postSubjectToUserId(userId: any, title: any, description: any) {
    const newSubject = {
      title: title,
      description: description,
      userId: userId,
    };

    const head = {
      headers: authHeader(),
    };

    return axios.post(API_URL + `Subjects`, newSubject, head);
  }

  deleteSubjectForSubjectId(subjectId: any) {
    return axios.delete(API_URL + `Subjects/${subjectId}`, { headers: authHeader() });
  }

  editSubjectForSubjectId(subjectId: any,title:any,description:any,userId:any) {
    const patchSubject = {
        id: subjectId,
        title: title,
        description: description,
        userId: userId
      };

      console.log(patchSubject);
  
      const head = {
        headers: authHeader(),
      };

      return axios.patch(API_URL + `Subjects/${subjectId}`, patchSubject, head);
  }

}

export default new UserService();

// getPublicContent() {
//     return axios.get(API_URL + 'all');
//   }

//   getUserBoard() {
//     return axios.get(API_URL + 'user', { headers: authHeader() });
//   }

//   getModeratorBoard() {
//     return axios.get(API_URL + 'mod', { headers: authHeader() });
//   }

//   getAdminBoard() {
//     return axios.get(API_URL + 'admin', { headers: authHeader() });
//   }
