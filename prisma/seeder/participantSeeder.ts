// seeder.ts

import { PrismaClient, Gender } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function participantseeder() {

    try {
        const genderMappings: { [key: string]: Gender } = {
            'Laki-laki': Gender.LakiLaki,
            'Perempuan': Gender.Perempuan,
        };

        for (var i = 1; i <= 105; i++) {

            let email = `user${i}@mail.com`;

            const registerStatus = Math.random() < 0.5 ? 'Online' : 'Offline';

            let user = await prisma.user.create({
                data: {
                    name: `User ${i}`,
                    email: email,
                    password: await bcrypt.hash('password', 10),
                    role: 'Participant',
                    isCompleted: true,
                    UserDetail: {
                        create: {
                            participantCategory: Math.random() < 0.5 ? 'Pelajar' : 'Umum',
                            phoneNumber: `08${Math.floor(10000000000 + Math.random() * 90000000000)}`,
                            gender: Math.random() < 0.5 ? genderMappings['Laki-laki'] : genderMappings['Perempuan'],
                            birthPlace: `Kota ${i}`,
                            birthDate: new Date(),
                            bloodGroup: ['A', 'B', 'AB', 'O'][Math.floor(Math.random() * 4)]
                        }
                    },
                    UserQuisioner: {
                        create: {
                            type: 'reference',
                            answer: ['Facebook', 'Instagram', 'Berita Online', 'Lainnya'][Math.floor(Math.random() * 4)]
                        }
                    },
                    UserCommunity: {
                        create: {
                            name: `Community ${i}`
                        }
                    },
                    UserAddress: {
                        create: {
                            provinceCode: '33',
                            cityCode: '3301',
                            districtCode: '330122',
                            villageCode: '3301221002',
                            address: `Jl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ${i}`
                        }
                    },
                    Register: {
                        create: {
                            categoryId: Math.floor(Math.random() * 4) + 1,
                            status: registerStatus === 'Offline' ? 1 : Math.floor(Math.random() * 3),
                            registerType: registerStatus,
                            bib: Math.floor(Math.random() * 3) === 1 ? (Math.floor(Math.random() * 9000) + 1000).toString() : null
                        },
                    }
                }

            });

            if ((Math.random() < 0.5 ? 'Online' : 'Offline') === 'Online') {
                await prisma.invoice.create({
                    data: {
                        registerId: i,
                        invoiceXenditUrl: `https://invoice.xendit.co/${Math.floor(1000000000000000 + Math.random() * 9000000000000000)}`,
                        invoiceXenditId: Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString(),
                        invoiceEventId: Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString(),
                        title: `Pendaftaran Lomba Lari ${i}`,
                        amount: Math.floor(100000 + Math.random() * 900000).toString(),
                        status: Math.floor(Math.random() * 3),
                    }
                });
            }
        }
        console.log('Participants seeded successfully!');
    } catch (error) {
        console.error('Error seeding Participants:', error);
    } finally {
        await prisma.$disconnect();
    }
}
