// Types prepared for AWS Cognito integration

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'staff';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Placeholder for AWS Cognito token
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  idToken: string;
}
