'use server'

import { prisma } from '@/lib/prisma'

export async function deleteEvent(id: number) {

    try {
        const category = await prisma.category.count({
            where: {
                eventId: id
            }
        });

        if (category < 0) return { status: 'error', message: 'Cant delete, event has category' }

        await prisma.event.delete({
            where: {
                id
            }
        });
        return { status: 'success', message: 'Event deleted successfully' };
    } catch (error) {
        console.error('Failed to delete event:', error);
        return { status: 'error', message: 'Failed to delete event' };
    }
}