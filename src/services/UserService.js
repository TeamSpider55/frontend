import axios from 'axios';

class AuthService {
  static async getUser() {
    return axios.get('/user/profile/');
  }

  static async logout() {
    return axios.post('/user/logout/');
  }
}

export default AuthService;
