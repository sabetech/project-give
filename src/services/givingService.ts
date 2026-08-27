import pb from '../lib/pocketbase';
import type { TGiving, GivingType } from '../types/giving';

export const createGiving = async (data: {
  amount: number;
  type: GivingType;
  date: string;
  description?: string;
}) => {
  const user = pb.authStore.record;
  if (!user) throw new Error('Not authenticated');

  const record = await pb.collection('givings').create({
    ...data,
    user: user.id,
  });
  return record as unknown as TGiving;
};

export const getGivings = async (page = 1, perPage = 30) => {
  const result = await pb.collection('givings').getList(page, perPage, {
    sort: '-date,-created',
    expand: 'user',
  });
  return result;
};

export const getRecentGivings = async (limit = 5) => {
  const result = await pb.collection('givings').getList(1, limit, {
    sort: '-date,-created',
    expand: 'user',
  });
  return result.items as unknown as TGiving[];
};

export const getGivingById = async (id: string) => {
  const record = await pb.collection('givings').getOne(id, {
    expand: 'user',
  });
  return record as unknown as TGiving;
};

export const deleteGiving = async (id: string) => {
  await pb.collection('givings').delete(id);
};
