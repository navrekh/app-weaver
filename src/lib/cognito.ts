// AWS Cognito Authentication Helper
import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { AWS_CONFIG } from '@/config/aws';

const userPool = new CognitoUserPool({
  UserPoolId: AWS_CONFIG.cognitoUserPoolId,
  ClientId: AWS_CONFIG.cognitoClientId,
});

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

export const cognitoAuth = {
  signUp: async ({ email, password, firstName, lastName }: CognitoSignUpParams): Promise<{ user: AuthUser | null; error: string | null }> => {
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
    return new Promise((resolve) => {
      const authenticationDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
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
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
    }
  },

  getCurrentUser: (): Promise<{ user: AuthUser | null; token: string | null }> => {
    return new Promise((resolve) => {
      const cognitoUser = userPool.getCurrentUser();

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
    return new Promise((resolve) => {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
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
    return new Promise((resolve) => {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
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
