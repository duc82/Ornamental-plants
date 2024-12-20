import API from "@/api/axios.config";

class UserService {
  async getUsers(page) {
    return API.get(`/users?page=${page}`);
  }

  async createUser(user) {
    return API.post("/users", user);
  }

  async updateUser(id, user) {
    return API.put(`/users/${id}`, user);
  }

  async deleteUser(id) {
    return API.delete(`/users/${id}`);
  }
}

export default new UserService();
