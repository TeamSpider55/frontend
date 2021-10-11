import axios from 'axios';
import { LoginResponse } from '../dto/LoginResponse';

export interface LoginInput {
  id: string;
  password: string;
}

class AuthService {
  static async login(
    {
      id,
      password,
    }: LoginInput,
  ): Promise<LoginResponse> {
    const response: LoginResponse = await axios.post(
      '/auth/login/', {
        id,
        password,
      },
    );

    return response;
  }
}

export default AuthService;
