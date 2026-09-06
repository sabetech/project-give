import api from '../lib/api';
import type { TGiving, GivingType } from '../types/giving';

export const createGiving = async (data: {
  amount: number;
  type: GivingType;
  date: string;
  description?: string;
}) => {
  const token = localStorage.getItem('auth_token');
  if (!token) throw new Error('Not authenticated');

  const result = await api.createGiving(data);
  return result as unknown as TGiving;
};

export const getGivings = async (page = 1, perPage = 30) => {
  const token = localStorage.getItem('auth_token');
  if (!token) throw new Error('Not authenticated');

  const result = await api.getGivings(page, perPage, '-date,-created');
  return result;
};

export const getRecentGivings = async (limit = 5) => {
  const token = localStorage.getItem('auth_token');
  if (!token) throw new Error('Not authenticated');

  const result = await api.getGivings(1, limit, '-date,-created');
  return result.items as unknown as TGiving[];
};

export const getGivingById = async (id: string) => {
  const token = localStorage.getItem('auth_token');
  if (!token) throw new Error('Not authenticated');

  const record = await api.getGiving(id);
  return record as unknown as TGiving;
};

export const deleteGiving = async (id: string) => {
  const token = localStorage.getItem('auth_token');
  if (!token) throw new Error('Not authenticated');

  await api.deleteGiving(id);
};
