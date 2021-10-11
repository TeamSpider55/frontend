import axios from 'axios';
import { User } from '../dto/User';

class UserService {
  static async getUser() {
    const response = await axios.get<User>(
      '/user/profile/',
      {
        withCredentials: true,
      },
    );

    return response.data;
  }

  static async logout() {
    return axios.post('/user/logout/');
  }
}

export default UserService;
