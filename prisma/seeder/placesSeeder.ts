import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

export async function provinceSeeder() {
    try {
        const csvData = fs.readFileSync('./prisma/places/provinces.csv', 'utf-8');
        const rows = csvData.trim().split('\n').map(row => row.split(','));

        const data = rows.map(row => ({
            code: row[0],
            name: row[1],
            meta: JSON.stringify({ lat: row[2], long: row[3] }),
            createdAt: new Date(),
            updatedAt: new Date(),
        }));

        await prisma.province.createMany({
            data: data,
            skipDuplicates: true, // Skip insertion of duplicate entries
        });

        console.log('Provinces seeded successfully!');
    } catch (error) {
        console.error('Error seeding provinces:', error);
    } finally {
        await prisma.$disconnect();
    }
}

export async function citySeeder() {
    try {
        const csvData = fs.readFileSync('./prisma/places/cities.csv', 'utf-8');
        const rows = csvData.trim().split('\n').map(row => row.split(','));

        const data = rows.map(row => ({
            code: row[0],
            provinceCode: row[1],
            name: row[2],
            meta: JSON.stringify({ lat: row[3], long: row[4] }),
            createdAt: new Date(),
            updatedAt: new Date(),
        }));

        // Insert cities into the database
        for (let i = 0; i < data.length; i += 50) {
            const chunk = data.slice(i, i + 50);
            await prisma.city.createMany({
                data: chunk,
                skipDuplicates: true, // Skip insertion of duplicate entries
            });
        }

        console.log('Cities seeded successfully!');
    } catch (error) {
        console.error('Error seeding cities:', error);
    } finally {
        await prisma.$disconnect();
    }
}

export async function districtSeeder() {
    try {
        const csvData = fs.readFileSync('./prisma/places/districts.csv', 'utf-8');
        const rows = csvData.trim().split('\n').map(row => row.split(','));

        const data = rows.map(row => ({
            code: row[0],
            cityCode: row[1],
            name: row[2],
            meta: JSON.stringify({ lat: row[3], long: row[4] }),
            createdAt: new Date(),
            updatedAt: new Date(),
        }));

        // Insert districts into the database
        for (let i = 0; i < data.length; i += 50) {
            const chunk = data.slice(i, i + 50);
            await prisma.district.createMany({
                data: chunk,
                skipDuplicates: true, // Skip insertion of duplicate entries
            });
        }

        console.log('Districts seeded successfully!');
    } catch (error) {
        console.error('Error seeding districts:', error);
    } finally {
        await prisma.$disconnect();
    }
}

export async function villageSeeder() {
    try {
        const resourceFiles = fs.readdirSync('./prisma/places/villages');
        for (const file of resourceFiles) {
            const csvData = fs.readFileSync('./prisma/places/villages/' + file, 'utf-8');
            const rows = csvData.trim().split('\n').map(row => row.split(','));

            const data = rows.map(row => ({
                code: row[0],
                districtCode: row[1],
                name: row[2],
                meta: JSON.stringify({ lat: row[3], long: row[4], pos: row[5] }),
                createdAt: new Date(),
                updatedAt: new Date(),
            }));

            // Insert villages into the database
            for (let i = 0; i < data.length; i += 50) {
                const chunk = data.slice(i, i + 50);
                await prisma.village.createMany({
                    data: chunk,
                    skipDuplicates: true, // Skip insertion of duplicate entries
                });
            }
        }
        console.log('Villages seeded successfully!');
    } catch (error) {
        console.error('Error seeding villages:', error);
    } finally {
        await prisma.$disconnect();
    }
}