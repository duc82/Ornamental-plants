import API from "@/api/axios.config";

class AuthService {
  async loginAdmin(email, password) {
    const { data } = await API.post("/auth/login-admin", {
      email,
      password,
    });
    return data;
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
  }

  forgotPassword(email) {
    return API.post("/auth/forgot-password", {
      email,
    });
  }

  resetPassword(token, email, password, password2) {
    return API.post("auth/reset-password", {
      token,
      email,
      password,
      password2,
    });
  }

  checkToken(token, email) {
    return API.post("auth/check-token", {
      token,
      email,
    });
  }

  getCurrentUser() {
    return API.get("/users/profile");
  }
}

export default new AuthService();
