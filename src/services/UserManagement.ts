import api from '../lib/api';

export const uploadUserPhoto = async (image: File) => {
  const token = localStorage.getItem('auth_token');
  if (!token) throw new Error('Not authenticated');

  const payload = JSON.parse(atob(token.split('.')[1]));
  const userId = payload.userId;

  const result = await api.updateUserAvatar(userId, image);
  return result;
};

export const getUser = async (id: string) => {
  const record = await api.getUser(id);
  return record;
};
