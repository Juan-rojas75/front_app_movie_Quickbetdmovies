export interface AuthState {
  token: string | null;
}

export interface RootState {
  auth: AuthState;
}