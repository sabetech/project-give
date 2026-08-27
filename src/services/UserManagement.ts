import pb from '../lib/pocketbase';

export const uploadUserPhoto = async (image: File) => {
  const user = pb.authStore.record;
  if (!user) throw new Error('Not authenticated');

  const formData = new FormData();
  formData.append('avatar', image);

  const record = await pb.collection('users').update(user.id, formData);
  return record;
};

export const getUser = async (id: string) => {
  const record = await pb.collection('users').getOne(id);
  return record;
};
