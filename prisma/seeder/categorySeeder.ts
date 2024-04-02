// Import necessary modules and types
import { PrismaClient } from '@prisma/client';

// Create a new instance of the PrismaClient
const prisma = new PrismaClient();

// Define the seeder function
export default async function categorySeeder() {
    try {
        // Fetch all existing events from the database
        const events = await prisma.event.findMany();

        // Generate random category data and create entries in the database
        for (let i = 1; i <= 4; i++) {
            // Select an event from the fetched list
            const randomEventIndex = Math.floor(Math.random() * events.length);
            const randomEvent = events[randomEventIndex];

            // Create a new category entry in the database
            await prisma.category.create({
                data: {
                    eventId: randomEvent.id,
                    name: i === 1 ? '10K Umum' : i === 2 ? '10K Pelajar' : i === 3 ? '5K Umum' : '5K Pelajar',
                    description: i === 1 ? 'Lari jarak menengah dengan panjang rute sekitar 10 kilometer atau 6,2 mil untuk masyarakat umum.' : i === 2 ? 'Lari jarak menengah dengan panjang rute sekitar 10 kilometer atau 6,2 mil untuk kalangan pelajar.' : i === 3 ? 'Lari jarak pendek dengan panjang rute sekitar 5 kilometer atau 3,1 mil untuk masyarakat umum.' : 'Lari jarak pendek dengan panjang rute sekitar 5 kilometer atau 3,1 mil untuk kalangan pelajar.',
                    descriptionEn: i === 1 ? 'Middle distance running with a route length of around 10 kilometers or 6.2 miles for the general public.' : i === 2 ? 'Middle distance running with a route length of around 10 kilometers or 6.2 miles for the student.' : i === 3 ? 'Short distance running with a route length of around 5 kilometers or 3.1 miles for the general public.' : 'Short distance running with a route length of around 5 kilometers or 3.1 miles for the student.',
                    price: i === 1 || i === 3 ? 175000 : 150000,
                    bibCodePutra: i === 1 ? 'UM-10000' : i === 2 ? 'PM-30000' : i === 3 ? 'MM-50000' : 'YM-70000',
                    bibCodePutri: i === 1 ? 'UF-20000' : i === 2 ? 'PF-40000' : i === 3 ? 'MF-60000' : 'YF-80000',
                    status: true,
                    category: i === 1 || i === 3 ? 'Umum' : 'Pelajar',
                }
            });
        }

        console.log('Categories seeded successfully!');
    } catch (error) {
        console.error('Error seeding categories:', error);
    } finally {
        // Disconnect the PrismaClient after seeding is done
        await prisma.$disconnect();
    }
}
