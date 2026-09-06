export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
  google_id: string | null;
  verified: boolean;
  created: Date;
  updated: Date;
}

export interface Giving {
  id: string;
  user_id: string;
  amount: number;
  type: 'offering' | 'tithe' | 'pledge';
  date: string;
  description: string | null;
  created: Date;
  updated: Date;
}

export interface GivingWithUser extends Giving {
  user?: User;
}

export interface JWTPayload {
  userId: string;
  email: string;
}
