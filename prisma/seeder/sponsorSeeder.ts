import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function sponsorSeeder() {
    try {
        // Create new sponsor record
        await prisma.sponsor.create({
            data: {
                name: 'Serayu News',
                logo: 'media/sponsors/logo-serayunews.png',
            },
        });

        console.log('Sponsors seeded successfully!');
    } catch (error) {
        console.error('Error seeding sponsors:', error);
    }
}