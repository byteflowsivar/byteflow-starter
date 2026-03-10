import { db } from '@/db';
import { users } from '@/db/schema';
import { eq, desc, ne } from 'drizzle-orm';
import { hashPassword } from '@/lib/password';
import crypto from 'crypto';
import { CreateUserPayload, UpdateUserPayload, UserListItem } from '../types';

export const userService = {
    async getAllUsers(): Promise<UserListItem[]> {
        const result = await db
            .select({
                id: users.id,
                name: users.name,
                email: users.email,
                role: users.role,
                isActive: users.isActive,
                createdAt: users.createdAt,
                updatedAt: users.updatedAt,
            })
            .from(users)
            .orderBy(desc(users.createdAt));

        return result as UserListItem[];
    },

    async getUserById(id: string): Promise<UserListItem | null> {
        const [user] = await db
            .select({
                id: users.id,
                name: users.name,
                email: users.email,
                role: users.role,
                isActive: users.isActive,
                createdAt: users.createdAt,
                updatedAt: users.updatedAt,
            })
            .from(users)
            .where(eq(users.id, id));

        return (user as UserListItem) || null;
    },

    async createUser(data: CreateUserPayload) {
        const id = crypto.randomUUID();
        const passwordHash = await hashPassword(data.password || 'TemporaryPassword123!');

        const [newUser] = await db.insert(users).values({
            id,
            name: data.name,
            email: data.email.toLowerCase(),
            passwordHash,
            role: data.role,
            isActive: true,
        }).returning();

        return newUser;
    },

    async updateUser(id: string, data: UpdateUserPayload) {
        const updateData: any = {
            name: data.name,
            role: data.role,
            isActive: data.isActive,
            updatedAt: new Date(),
        };

        if (data.password && data.password.trim() !== '') {
            updateData.passwordHash = await hashPassword(data.password);
        }

        const [updatedUser] = await db
            .update(users)
            .set(updateData)
            .where(eq(users.id, id))
            .returning();

        return updatedUser;
    },

    async deleteUser(id: string, currentUserId: string) {
        if (id === currentUserId) {
            throw new Error('No puedes eliminar tu propia cuenta');
        }

        await db.delete(users).where(eq(users.id, id));
        return true;
    }
};
