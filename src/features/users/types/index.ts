import { ActionResult } from '@/features/auth/types';

export type { ActionResult };

export interface UserListItem {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateUserPayload {
    name: string;
    email: string;
    password?: string;
    role: 'admin' | 'user';
}

export interface UpdateUserPayload {
    name: string;
    role: 'admin' | 'user';
    isActive: boolean;
    password?: string;
}
