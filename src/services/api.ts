import type { User, ConnectedAccount } from '../types/auth';

export async function connectOAuthProvider(provider: string): Promise<ConnectedAccount> {
  // Simulate OAuth flow
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        provider,
        connected: true
      });
    }, 1000);
  });
}

export async function fetchUserProfile(): Promise<User> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: '1',
        name: 'Demo User',
        email: 'demo@example.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&q=80',
        connectedAccounts: [
          { provider: 'github', connected: true },
          { provider: 'google', connected: false },
          { provider: 'twitter', connected: false }
        ]
      });
    }, 500);
  });
}