import { db } from '@/db';
import { users, passwordResetTokens } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { comparePassword, hashPassword } from '@/lib/password';
import { AuthUser } from '../types';
import crypto from 'crypto';

export const authService = {
    async getUserByEmail(email: string) {
        const [user] = await db.select().from(users).where(eq(users.email, email.toLowerCase()));
        return user || null;
    },

    async validateUserCredentials(email: string, password: string): Promise<AuthUser | null> {
        const user = await this.getUserByEmail(email);
        if (!user) return null;

        const isValid = await comparePassword(password, user.passwordHash);
        if (!isValid) return null;

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
    },

    async createResetToken(email: string) {
        const user = await this.getUserByEmail(email);
        if (!user) return null;

        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour from now

        const [newToken] = await db.insert(passwordResetTokens).values({
            id: crypto.randomUUID(),
            userId: user.id,
            token,
            expiresAt,
        }).returning();

        return newToken.token;
    },

    async verifyResetToken(token: string) {
        const [record] = await db
            .select()
            .from(passwordResetTokens)
            .where(
                and(
                    eq(passwordResetTokens.token, token),
                    eq(passwordResetTokens.usedAt, null as any) // usedAt is null
                )
            );

        if (!record || new Date(record.expiresAt) < new Date()) {
            return null;
        }

        return record;
    },

    async resetPassword(token: string, newPassword: string) {
        const record = await this.verifyResetToken(token);
        if (!record) return false;

        const passwordHash = await hashPassword(newPassword);

        await db.transaction(async (tx) => {
            // Update user password
            await tx.update(users).set({ passwordHash }).where(eq(users.id, record.userId));

            // Mark token as used
            await tx.update(passwordResetTokens).set({ usedAt: new Date() }).where(eq(passwordResetTokens.id, record.id));
        });

        return true;
    }
};
