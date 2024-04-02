import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function adminUserSeeder() {
    // Define a mapping between enum values with spaces and without spaces
    const roleMappings: { [key: string]: Role } = {
        'Superadmin': Role.Superadmin,
        'Admin': Role.Admin,
        'Participant': Role.Participant,
        'Admin External': Role.AdminExternal,
        'Counter': Role.Counter,
    };

    try {
        // Create new user records
        await prisma.user.createMany({
            data: [
                {
                    name: 'Superadmin User',
                    email: 'superadmin@example.com',
                    password: await bcrypt.hash('password', 10),
                    role: roleMappings['Superadmin'],
                },
                {
                    name: 'Admin User',
                    email: 'admin@example.com',
                    password: await bcrypt.hash('password', 10),
                    role: roleMappings['Admin'],
                },
                {
                    name: 'Admin External User',
                    email: 'adminexternal@example.com',
                    password: await bcrypt.hash('password', 10),
                    role: roleMappings['Admin External'],
                },
                {
                    name: 'Counter User',
                    email: 'counter@example.com',
                    password: await bcrypt.hash('password', 10),
                    role: roleMappings['Counter'],
                },
            ],
        });

        console.log('Users seeded successfully!');
    } catch (error) {
        console.error('Error seeding users:', error);
    }
}