export interface LoginResponse {
  token: string;

  userResponse: {
    email: string;
    firstName?: string;
    lastName?: string;
  };
}