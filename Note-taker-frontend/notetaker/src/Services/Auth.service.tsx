import axios from "axios";

const API_URL = "https://localhost:44346/api/Users/";

class AuthService {
  login(username: any, password: any) {
    return axios
      .post(API_URL + "authenticate", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username: any, password: any) {
    return axios.post(API_URL + "register", {
      username,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user")!);
  }
}

export default new AuthService();
