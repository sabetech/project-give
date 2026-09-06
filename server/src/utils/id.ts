import { nanoid } from 'nanoid';

export const generateId = (): string => {
  return nanoid(21);
};
