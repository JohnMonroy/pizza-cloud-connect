import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';
import { User, AuthState } from '@/types/auth';
import { cognitoConfig } from '@/config/cognito';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const userPool = new CognitoUserPool({
  UserPoolId: cognitoConfig.userPoolId,
  ClientId: cognitoConfig.clientId,
});

const mapCognitoUserToUser = (cognitoUser: CognitoUser, attributes?: Record<string, string>): User => {
  return {
    id: cognitoUser.getUsername(),
    email: attributes?.email || cognitoUser.getUsername(),
    name: attributes?.name || attributes?.email || cognitoUser.getUsername(),
    role: 'admin', // You can map this from a custom Cognito attribute
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Check for existing session on mount
  useEffect(() => {
    const currentUser = userPool.getCurrentUser();
    
    if (currentUser) {
      currentUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
        if (err || !session || !session.isValid()) {
          setAuthState({ user: null, isAuthenticated: false, isLoading: false });
          return;
        }

        currentUser.getUserAttributes((attrErr, attributes) => {
          const attrs: Record<string, string> = {};
          if (!attrErr && attributes) {
            attributes.forEach(attr => {
              attrs[attr.getName()] = attr.getValue();
            });
          }
          
          setAuthState({
            user: mapCognitoUserToUser(currentUser, attrs),
            isAuthenticated: true,
            isLoading: false,
          });
        });
      });
    } else {
      setAuthState({ user: null, isAuthenticated: false, isLoading: false });
    }
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));

    return new Promise((resolve) => {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
      });

      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      cognitoUser.authenticateUser(authDetails, {
        onSuccess: (session: CognitoUserSession) => {
          cognitoUser.getUserAttributes((err, attributes) => {
            const attrs: Record<string, string> = {};
            if (!err && attributes) {
              attributes.forEach(attr => {
                attrs[attr.getName()] = attr.getValue();
              });
            }

            setAuthState({
              user: mapCognitoUserToUser(cognitoUser, attrs),
              isAuthenticated: true,
              isLoading: false,
            });
            resolve(true);
          });
        },
        onFailure: (err) => {
          console.error('Login failed:', err.message);
          setAuthState(prev => ({ ...prev, isLoading: false }));
          resolve(false);
        },
        newPasswordRequired: () => {
          // Handle new password requirement if needed
          console.log('New password required');
          setAuthState(prev => ({ ...prev, isLoading: false }));
          resolve(false);
        },
      });
    });
  }, []);

  const logout = useCallback(() => {
    const currentUser = userPool.getCurrentUser();
    if (currentUser) {
      currentUser.signOut();
    }
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
