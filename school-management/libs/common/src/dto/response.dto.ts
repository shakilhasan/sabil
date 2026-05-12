export class ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;

  static success<T>(data: T, message = 'Success'): ApiResponse<T> {
    return { success: true, message, data };
  }

  static error(message: string, error?: string): ApiResponse {
    return { success: false, message, error };
  }
}
