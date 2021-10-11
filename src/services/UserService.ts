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
    // return {
    //   status: response.data.status,
    //   email: response.data.email,
    //   userName: response.data.userName,
    //   familyName: response.data.familyName,
    //   givenName: response.data.givenName,
    //   phone: response.data.phone,
    //   address: response.data.address,
    //   contacts: response.data.contacts,
    // };
  }

  static async logout() {
    return axios.post('/user/logout/');
  }
}

export default UserService;
