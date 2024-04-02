'use server'

import { prisma } from '@/lib/prisma'

export async function getEvent() {
    try {
        const events = await prisma.event.findMany();
        return events
    } catch (error) {
        return { status: 'error', message: 'Failed to get event' };
    }
}

export async function getEventById(id: number) {
    try {
        const event = await prisma.event.findUnique({
            where: {
                id
            }
        });
        return event
    } catch (error) {
        console.error('Failed to get event by id:', error);
        return { status: 'error', message: 'Failed to get event' };
    }
}