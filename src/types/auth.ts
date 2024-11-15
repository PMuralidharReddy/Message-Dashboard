export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  connectedAccounts: ConnectedAccount[];
}

export interface ConnectedAccount {
  provider: string;
  connected: boolean;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}