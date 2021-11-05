import axios from 'axios';
import API_URL from '../util/constants';

export interface LoginInput {
  id: string;
  password: string;
}

export interface LoginResponse {
  token?: string
  expiresIn?: number;
  success: boolean;
  msg: string;
  error?: string;
}

class AuthService {
  static async login(
    {
      id,
      password,
    }: LoginInput,
  ): Promise<LoginResponse> {
    const response: LoginResponse = await axios.post(
      // 'http://localhost:8080/auth/login/', {
      '/auth/login/', {
      // `${API_URL}/auth/login/`, {
        id,
        password,
      },
      { withCredentials: true },
    );

    return response;
  }
}

export default AuthService;
