export interface LoginRequest {
  model: {
    login: string;
    password: string;
    internalAuth: boolean;
  };
}