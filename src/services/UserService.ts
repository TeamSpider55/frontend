import axios from 'axios';

class UserService {
  static async getUser() {
    return axios.get('/user/profile/');
  }

  static async logout() {
    return axios.post('/user/logout/');
  }
}

export default UserService;
