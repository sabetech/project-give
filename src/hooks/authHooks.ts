import { useState, useEffect } from 'react';
import api from '../lib/api';
import type { TUser } from '../types/user';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useSignIn = () => {
  return async () => {
    try {
      // Get Google OAuth2 URL
      const { url } = await api.getGoogleAuthUrl();

      // Open popup for Google auth
      const popup = window.open(
        url,
        'google-auth',
        'width=500,height=600,left=100,top=100'
      );

      if (!popup) {
        throw new Error('Failed to open popup. Please allow popups for this site.');
      }

      // Wait for message from popup (callback page sends token back)
      return new Promise<{ token: string; userId: string }>((resolve, reject) => {
        let resolved = false;

        const handleMessage = (event: MessageEvent) => {
          // Accept messages from both frontend and backend origins
          const validOrigins = [
            'http://localhost:5173',
            'http://127.0.0.1:5173',
            'http://127.0.0.1:3000',
            'http://localhost:3000'
          ];
          if (!validOrigins.includes(event.origin)) return;

          const { token, userId, error } = event.data;

          if (resolved) return;

          if (error) {
            resolved = true;
            window.removeEventListener('message', handleMessage);
            clearInterval(checkPopup);
            reject(new Error(error));
            return;
          }

          if (token && userId) {
            resolved = true;
            window.removeEventListener('message', handleMessage);
            clearInterval(checkPopup);
            localStorage.setItem('auth_token', token);
            window.dispatchEvent(new Event('auth-change'));
            resolve({ token, userId });
          }
        };

        window.addEventListener('message', handleMessage);

        // Check if popup was closed manually
        const checkPopup = setInterval(() => {
          if (popup.closed) {
            clearInterval(checkPopup);
            window.removeEventListener('message', handleMessage);
            if (!resolved) {
              reject(new Error('Login cancelled'));
            }
          }
        }, 2000);
      });
    } catch (error) {
      console.error('Sign in failed:', error);
      throw error;
    }
  };
};

export const useAuthUser = () => {
  const token = localStorage.getItem('auth_token');

  const { data: currentUser } = useQuery({
    queryKey: ['auth-user', token],
    queryFn: () => api.getCurrentUser() as Promise<TUser>,
    enabled: !!token,
  });

  return (): TUser | null => {
    if (currentUser) return currentUser;

    if (!token) return null;

    // Decode JWT to get user info (simple decode fallback)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.userId,
        email: payload.email,
        name: '',
        verified: true,
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        collectionId: '',
        collectionName: 'users',
      } as TUser;
    } catch {
      return null;
    }
  };
};

export const useAuthToken = () => {
  return localStorage.getItem('auth_token');
};

export const useSignOut = () => {
  return () => {
    localStorage.removeItem('auth_token');
  };
};

export const useIsAuthenticated = () => {
  const checkToken = () => {
    const token = localStorage.getItem('auth_token');
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000;
      return Date.now() < exp;
    } catch {
      return false;
    }
  };

  const [isAuth, setIsAuth] = useState(checkToken);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuth(checkToken());
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('auth-change', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth-change', handleStorageChange);
    };
  }, []);

  return isAuth;
};

export const useUserImageUpload = () => {
  return useMutation({
    mutationFn: async (image: File) => {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error('Not authenticated');

      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.userId;

      const result = await api.updateUserAvatar(userId, image);
      return result;
    },
    onSuccess: (data) => {
      console.log('Avatar updated:', data);
    },
    onError: (error) => {
      console.error('Upload failed:', error);
    }
  });
};

export const useGetUser = () => {
  return async (id: string) => {
    const record = await api.getUser(id);
    return record;
  };
};
