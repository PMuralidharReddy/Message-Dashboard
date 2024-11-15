import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { User, AuthState } from '../types/auth';
import { fetchUserProfile, connectOAuthProvider } from '../services/api';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  connectAccount: (provider: string) => Promise<void>;
}

const initialState: AuthState = {
  user: null,
  isLoading: true,
  error: null,
};

type AuthAction = 
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_ERROR'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User };

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'UPDATE_USER':
      return { ...state, user: action.payload, isLoading: false, error: null };
    case 'LOGIN_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'LOGOUT':
      return { ...state, user: null, isLoading: false, error: null };
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await fetchUserProfile();
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } catch (error) {
        dispatch({ type: 'LOGIN_ERROR', payload: 'Failed to load user profile' });
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const user = await fetchUserProfile(); // Replace with actual login API call
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', payload: 'Invalid credentials' });
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const connectAccount = async (provider: string) => {
    if (!state.user) return;

    try {
      const connectedAccount = await connectOAuthProvider(provider);
      const updatedUser = {
        ...state.user,
        connectedAccounts: state.user.connectedAccounts.map(account =>
          account.provider === provider ? connectedAccount : account
        ),
      };
      dispatch({ type: 'UPDATE_USER', payload: updatedUser });
    } catch (error) {
      console.error('Failed to connect account:', error);
      dispatch({ type: 'LOGIN_ERROR', payload: 'Failed to connect account' });
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, connectAccount }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}