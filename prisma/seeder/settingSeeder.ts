import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function settingSeeder() {
    try {
        // Create new setting record
        await prisma.setting.create({
            data: {
                webName: 'Dieng Run',
                webSlogan: 'Run to Thrive: Muda, Kreatif dan Berdaya',
                webDescription: 'Mendorong pemuda untuk mengekspresikan energi positif dan semangat kehidupan melalui kegiatan lari, menunjukkan vitalitas dan antusiasme generasi muda.',
                webDescriptionEn: 'Encouraging youth to express positive energy and enthusiasm for life through running activities, showing the vitality and enthusiasm of the younger generation.',
                webKeyword: 'lari, maraton, dieng run run, lari maraton',
                webLogo: 'media/logo-cyr.png',
                canRegister: true,
                canLogin: true,
                adminContact: '081234567890',
            },
        });
        console.log('Settings seeded successfully!');
    } catch (error) {
        console.error('Error seeding villages:', error);
    }
}