// AWS Cognito Authentication Helper
import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { AWS_CONFIG } from '@/config/aws';

// Only initialize Cognito if credentials are provided
const userPool = AWS_CONFIG.cognitoUserPoolId && AWS_CONFIG.cognitoClientId
  ? new CognitoUserPool({
      UserPoolId: AWS_CONFIG.cognitoUserPoolId,
      ClientId: AWS_CONFIG.cognitoClientId,
    })
  : null;

export interface CognitoSignUpParams {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface CognitoSignInParams {
  email: string;
  password: string;
}

export interface AuthUser {
  username: string;
  email: string;
  attributes?: { [key: string]: string };
}

// Check if Cognito is configured
const isCognitoConfigured = () => !!userPool;

// Mock storage for development
const mockUsers = new Map<string, { email: string; password: string; name: string }>();
const mockSessions = new Map<string, { email: string; token: string }>();

export const cognitoAuth = {
  signUp: async ({ email, password, firstName, lastName }: CognitoSignUpParams): Promise<{ user: AuthUser | null; error: string | null }> => {
    // Use mock auth if Cognito not configured
    if (!isCognitoConfigured()) {
      try {
        if (mockUsers.has(email)) {
          return { user: null, error: 'User already exists' };
        }
        
        mockUsers.set(email, {
          email,
          password,
          name: `${firstName || ''} ${lastName || ''}`.trim(),
        });
        
        return {
          user: {
            username: email,
            email,
            attributes: { given_name: firstName || '', family_name: lastName || '' },
          },
          error: null,
        };
      } catch (error) {
        return { user: null, error: 'Sign up failed' };
      }
    }

    // AWS Cognito implementation
    return new Promise((resolve) => {
      const attributeList: CognitoUserAttribute[] = [
        new CognitoUserAttribute({ Name: 'email', Value: email }),
      ];

      if (firstName) {
        attributeList.push(new CognitoUserAttribute({ Name: 'given_name', Value: firstName }));
      }

      if (lastName) {
        attributeList.push(new CognitoUserAttribute({ Name: 'family_name', Value: lastName }));
      }

      userPool.signUp(email, password, attributeList, [], (err, result) => {
        if (err) {
          resolve({ user: null, error: err.message });
          return;
        }

        if (!result) {
          resolve({ user: null, error: 'Sign up failed' });
          return;
        }

        resolve({
          user: {
            username: result.user.getUsername(),
            email,
            attributes: { given_name: firstName || '', family_name: lastName || '' },
          },
          error: null,
        });
      });
    });
  },

  signIn: async ({ email, password }: CognitoSignInParams): Promise<{ user: AuthUser | null; token: string | null; error: string | null }> => {
    // Use mock auth if Cognito not configured
    if (!isCognitoConfigured()) {
      try {
        const mockUser = mockUsers.get(email);
        
        if (!mockUser || mockUser.password !== password) {
          return { user: null, token: null, error: 'Invalid email or password' };
        }
        
        const token = `mock_token_${Date.now()}`;
        mockSessions.set(email, { email, token });
        
        const [firstName, ...lastNameParts] = mockUser.name.split(' ');
        
        return {
          user: {
            username: email,
            email,
            attributes: {
              given_name: firstName || '',
              family_name: lastNameParts.join(' ') || '',
            },
          },
          token,
          error: null,
        };
      } catch (error) {
        return { user: null, token: null, error: 'Sign in failed' };
      }
    }

    // AWS Cognito implementation
    return new Promise((resolve) => {
      const authenticationDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool!,
      });

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          const token = result.getIdToken().getJwtToken();
          
          cognitoUser.getUserAttributes((err, attributes) => {
            if (err) {
              resolve({ user: null, token: null, error: err.message });
              return;
            }

            const userAttributes: { [key: string]: string } = {};
            attributes?.forEach((attr) => {
              userAttributes[attr.getName()] = attr.getValue();
            });

            resolve({
              user: {
                username: cognitoUser.getUsername(),
                email: userAttributes['email'],
                attributes: userAttributes,
              },
              token,
              error: null,
            });
          });
        },
        onFailure: (err) => {
          resolve({ user: null, token: null, error: err.message });
        },
      });
    });
  },

  signOut: () => {
    if (!isCognitoConfigured()) {
      // Clear mock session
      mockSessions.clear();
      return;
    }

    const cognitoUser = userPool!.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
    }
  },

  getCurrentUser: (): Promise<{ user: AuthUser | null; token: string | null }> => {
    // Use mock auth if Cognito not configured
    if (!isCognitoConfigured()) {
      const session = Array.from(mockSessions.values())[0];
      if (!session) {
        return Promise.resolve({ user: null, token: null });
      }
      
      const mockUser = mockUsers.get(session.email);
      if (!mockUser) {
        return Promise.resolve({ user: null, token: null });
      }
      
      const [firstName, ...lastNameParts] = mockUser.name.split(' ');
      
      return Promise.resolve({
        user: {
          username: session.email,
          email: session.email,
          attributes: {
            given_name: firstName || '',
            family_name: lastNameParts.join(' ') || '',
          },
        },
        token: session.token,
      });
    }

    // AWS Cognito implementation
    return new Promise((resolve) => {
      const cognitoUser = userPool!.getCurrentUser();

      if (!cognitoUser) {
        resolve({ user: null, token: null });
        return;
      }

      cognitoUser.getSession((err: Error | null, session: any) => {
        if (err || !session.isValid()) {
          resolve({ user: null, token: null });
          return;
        }

        const token = session.getIdToken().getJwtToken();

        cognitoUser.getUserAttributes((err, attributes) => {
          if (err) {
            resolve({ user: null, token: null });
            return;
          }

          const userAttributes: { [key: string]: string } = {};
          attributes?.forEach((attr) => {
            userAttributes[attr.getName()] = attr.getValue();
          });

          resolve({
            user: {
              username: cognitoUser.getUsername(),
              email: userAttributes['email'],
              attributes: userAttributes,
            },
            token,
          });
        });
      });
    });
  },

  forgotPassword: async (email: string): Promise<{ error: string | null }> => {
    // Mock implementation if Cognito not configured
    if (!isCognitoConfigured()) {
      if (!mockUsers.has(email)) {
        return { error: 'User not found' };
      }
      // Simulate successful password reset email
      console.log('Mock: Password reset email sent to', email);
      return { error: null };
    }

    // AWS Cognito implementation
    return new Promise((resolve) => {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool!,
      });

      cognitoUser.forgotPassword({
        onSuccess: () => {
          resolve({ error: null });
        },
        onFailure: (err) => {
          resolve({ error: err.message });
        },
      });
    });
  },

  confirmPassword: async (email: string, code: string, newPassword: string): Promise<{ error: string | null }> => {
    // Mock implementation if Cognito not configured
    if (!isCognitoConfigured()) {
      const mockUser = mockUsers.get(email);
      if (!mockUser) {
        return { error: 'User not found' };
      }
      // Update password in mock storage
      mockUser.password = newPassword;
      return { error: null };
    }

    // AWS Cognito implementation
    return new Promise((resolve) => {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool!,
      });

      cognitoUser.confirmPassword(code, newPassword, {
        onSuccess: () => {
          resolve({ error: null });
        },
        onFailure: (err) => {
          resolve({ error: err.message });
        },
      });
    });
  },
};
