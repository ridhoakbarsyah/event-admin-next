import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function eventSeeder() {
    try {
        // Create new event record
        await prisma.event.create({
            data: {
                name: 'Dieng Run 2024',
                registrationStart: new Date('2024-02-01'),
                registrationEnd: new Date('2024-05-01'),
                eventDate: new Date('2024-09-01'),
                status: true,
            },
        });

        console.log('Events seeded successfully!');
    } catch (error) {
        console.error('Error seeding events:', error);
    }
}
