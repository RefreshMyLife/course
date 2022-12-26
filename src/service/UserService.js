import $api from '../http';

export default class UserService {
  static async getUserByEmail(email) {
    return $api.get(`/GetUserByEmail/${email}`);
  }

  static async getAllUsers() {
    return $api.get('/GetAllUsers');
  }

  static async deleteUserById(id) {
    return $api.delete(`/DeleteUser/${id}`);
  }

  static async updateUser(user) {
    return $api.put(`/UpdateUser`, {
      Id: user[0].id,
      Name: user[0].name,
      Email: user[0].email,
      Password: user[0].password,
      RoleId: user[0].roleId,
    });
  }
}
