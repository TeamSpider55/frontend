export interface LoginResponse {
  token?: string
  expiresIn?: number;
  success: boolean;
  msg: string;
  error?: string;
}
