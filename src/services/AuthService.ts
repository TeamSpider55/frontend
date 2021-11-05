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

export interface RegisterInput {
  email: string,
  userName: string,
  familyName: string,
  givenName: string,
  password: string,
  phone: string,
  address: string,
}

export interface RegisterResponse {
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

  static async register(
    {
      email,
      userName,
      familyName,
      givenName,
      password,
      phone,
      address,
    }: RegisterInput,
  ): Promise<RegisterResponse> {
    const response = await axios.post(
      // 'http://localhost:8080/auth/login/', {
      '/auth/register/', {
      // `${API_URL}/auth/login/`, {
        email,
        userName,
        familyName,
        givenName,
        password,
        phone,
        address,
      },
      { withCredentials: true },
    );

    return (response.data as any).data;
  }
}

export default AuthService;
