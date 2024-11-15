import { useState, useCallback } from 'react';
import { twitterApi, telegramApi, quoraApi } from '../services/socialMedia';

interface PlatformAuth {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

interface AuthState {
  twitter: PlatformAuth;
  telegram: PlatformAuth;
  quora: PlatformAuth;
}

const initialState: AuthState = {
  twitter: { isAuthenticated: false, loading: false, error: null },
  telegram: { isAuthenticated: false, loading: false, error: null },
  quora: { isAuthenticated: false, loading: false, error: null },
};

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  const authenticatePlatform = useCallback(async (platform: keyof AuthState) => {
    setAuthState(prev => ({
      ...prev,
      [platform]: { ...prev[platform], loading: true, error: null }
    }));

    try {
      let success = false;
      switch (platform) {
        case 'twitter':
          // Implement OAuth flow for Twitter
          await twitterApi.authenticate();
          success = true;
          break;
        case 'telegram':
          // Implement Telegram authentication
          await telegramApi.authenticate();
          success = true;
          break;
        case 'quora':
          // Implement Quora authentication
          await quoraApi.authenticate();
          success = true;
          break;
      }

      setAuthState(prev => ({
        ...prev,
        [platform]: { isAuthenticated: success, loading: false, error: null }
      }));
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        [platform]: {
          isAuthenticated: false,
          loading: false,
          error: 'Authentication failed'
        }
      }));
    }
  }, []);

  const disconnectPlatform = useCallback(async (platform: keyof AuthState) => {
    try {
      switch (platform) {
        case 'twitter':
          await twitterApi.disconnect();
          break;
        case 'telegram':
          await telegramApi.disconnect();
          break;
        case 'quora':
          await quoraApi.disconnect();
          break;
      }

      setAuthState(prev => ({
        ...prev,
        [platform]: { isAuthenticated: false, loading: false, error: null }
      }));
    } catch (error) {
      console.error(`Failed to disconnect ${platform}:`, error);
    }
  }, []);

  return {
    authState,
    authenticatePlatform,
    disconnectPlatform,
  };
}