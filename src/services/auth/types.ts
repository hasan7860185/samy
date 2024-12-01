import { UserProfile } from '../../types/user';

export interface AuthResponse {
  user: UserProfile;
  token: string;
}

export interface AuthError {
  message: string;
  code?: string;
}

export interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
}