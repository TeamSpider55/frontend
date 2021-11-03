import axios from 'axios';

export interface LogoutResponse {
  success: boolean;
  redirect: boolean;
}

class UserService {
  static async getUser() {
    const response = await axios.get(
      // 'http://localhost:8080/user/profile/',
      '/user/profile/',
      {
        withCredentials: true,
      },
    );

    return response.data.data;
  }

  static async logout(): Promise<LogoutResponse> {
    const response: LogoutResponse = await axios.post(
      '/user/logout/',
      {},
      { withCredentials: true },
    );

    return response;
  }
}

export default UserService;
