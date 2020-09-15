import axios from "axios";
import authHeader from "./Auth-header";

const API_URL = "https://localhost:44346/api/";

class UserService {
  getSubjectsForUser(userId: any) {
    return axios.get(API_URL + `Subjects/GetSubjectsInUser/${userId}`, {
      headers: authHeader(),
    });
  }

  getNotesForSubjectId(subjectId: any) {
    return axios.get(API_URL + `Notes/GetNotesInSubject/${subjectId}`, {
      headers: authHeader(),
    });
  }

  getNoteForNoteId(noteId: any) {
    return axios.get(API_URL + `Notes/${noteId}`, { headers: authHeader() });
  }

  postSubjectToUserId(userId: any, title: any, description: any) {
    const newSubject = {
      title: title,
      description: description,
      userId: userId,
    };

    const headerTest = {
      headers: authHeader(),
    };

    return axios.post(API_URL + `Subjects`, newSubject, headerTest);
  }

  deleteSubjectForSubjectId(subjectId: any) {
    return axios.delete(API_URL + `Subjects/${subjectId}`, { headers: authHeader() });
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
