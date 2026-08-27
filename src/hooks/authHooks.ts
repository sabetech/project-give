import pb from '../lib/pocketbase';
import type { TUser } from '../types/user';
import { useMutation } from '@tanstack/react-query';

export const useSignIn = () => {
    return async () => {
        try {
            const authData = await pb.collection('users').authWithOAuth2({ provider: 'google' });
            return authData;
        } catch (error) {
            console.error('Sign in failed:', error);
            throw error;
        }
    };
};

export const useAuthUser = () => {
    return (): TUser | null => {
        if (!pb.authStore.isValid) return null;
        return pb.authStore.record as unknown as TUser;
    };
};

export const useAuthToken = () => {
    return pb.authStore.token;
};

export const useSignOut = () => {
    return () => {
        pb.authStore.clear();
    };
};

export const useIsAuthenticated = () => {
    return pb.authStore.isValid;
};

export const useUserImageUpload = () => {
    return useMutation({
        mutationFn: async (image: File) => {
            const user = pb.authStore.record;
            if (!user) throw new Error('Not authenticated');

            const formData = new FormData();
            formData.append('avatar', image);

            const record = await pb.collection('users').update(user.id, formData);
            return record;
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
        const record = await pb.collection('users').getOne(id);
        return record;
    };
};
