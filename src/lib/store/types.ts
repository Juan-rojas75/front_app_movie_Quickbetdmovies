export interface AuthState {
  token: string | null;
  user:string | null;
}

export interface RootState {
  auth: AuthState;
}