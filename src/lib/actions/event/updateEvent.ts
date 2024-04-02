'use server'

import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs';
import eventShcema from '@/lib/schema-validations/eventShcema';

export async function updateEvent(id: number, prevState: any, formData: FormData) {
    const validatedData = eventShcema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedData.success) {
        return {
            Error: validatedData.error.flatten().fieldErrors
        };
    }

    try {
        await prisma.event.update({
            data: {
                name: validatedData.data.name,
                registrationStart: dayjs(validatedData.data.registrationStart, 'MM/DD/YYYY hh:mm A').toISOString(),
                registrationEnd: dayjs(validatedData.data.registrationEnd, 'MM/DD/YYYY hh:mm A').toISOString(),
                eventDate: dayjs(validatedData.data.eventDate, 'MM/DD/YYYY hh:mm A').toISOString(),
                status: validatedData.data.status === 'true' ? true : false,
            },
            where: {
                id
            }
        });

        return { status: 'success', message: 'Event updated successfully' };
    } catch (error) {
        console.error('Failed to update event:', error);
        return { status: 'error', message: 'Failed to update event' };
    }
}