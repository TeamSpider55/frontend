import axios from 'axios';
import { LoginResponse } from '../dto/LoginResponse';

class AuthService {
  static async login(): Promise<LoginResponse> {
    return axios.post('/auth/login/', {
      userName: '123',
      password: '123',
    });
  }
}

export default AuthService;
