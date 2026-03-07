import { db } from '../src/db';
import { users } from '../src/db/schema';
import { hashPassword } from '../src/lib/password';
import crypto from 'crypto';

async function seed() {
    console.log('🌱 Seeding database...');

    const passwordHash = await hashPassword('admin123');

    await db.insert(users).values({
        id: crypto.randomUUID(),
        name: 'Admin User',
        email: 'admin@byteflow.dev',
        passwordHash,
        role: 'admin',
    }).onConflictDoNothing();

    console.log('✅ Seeding completed.');
}

seed().catch((err) => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
});
