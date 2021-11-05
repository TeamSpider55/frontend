import axios from 'axios';
import API_URL from '../util/constants';

export interface LogoutResponse {
  success: boolean;
  redirect: boolean;
}

class UserService {
  static async getUser() {
    const response = await axios.get(
      // 'http://localhost:8080/user/profile/',
      '/user/profile/',
      // `${API_URL}/user/profile/`,
      {
        withCredentials: true,
      },
    );

    return (response.data as any).data;
  }

  static async updatePassword(newPassword: string) {
    const response = await axios.post(
      // 'http://localhost:8080/user/profile/',
      '/user/change-password/',
      // `${API_URL}/user/profile/`,
      { password: newPassword },
      {
        withCredentials: true,
      },
    );

    return (response.data as any).data;
  }

  static async logout(): Promise<LogoutResponse> {
    const response: LogoutResponse = await axios.post(
      '/user/logout/',
      // `${API_URL}/user/logout/`,
      {},
      { withCredentials: true },
    );

    return response;
  }
}

export default UserService;
