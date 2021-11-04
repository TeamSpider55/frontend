import axios from 'axios';

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
      /// '/auth/login/', {
      'https://spider55-api.herokuapp.com/auth/login/', {
        id,
        password,
      },
    );

    return response;
  }
}

export default AuthService;
