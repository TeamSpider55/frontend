import axios from 'axios';
import { LoginResponse } from '../dto/LoginResponse';

interface LoginInput {
  username: string;
  password: string;
}

class AuthService {
  static async login(
    {
      username,
      password,
    }: LoginInput,
  ): Promise<LoginResponse> {
    const response: LoginResponse = await axios.post('/auth/login/', {
      userName: username,
      password,
    });

    return response;
  }
}

export default AuthService;
