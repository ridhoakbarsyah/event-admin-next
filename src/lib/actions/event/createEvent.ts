'use server'

import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs';
import eventShcema from '@/lib/schema-validations/eventShcema';

export async function createEvent(prevState: any, formData: FormData) {
    const validatedData = eventShcema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedData.success) {
        return {
            Error: validatedData.error.flatten().fieldErrors
        };
    }

    try {
        await prisma.event.create({
            data: {
                name: validatedData.data.name,
                registrationStart: dayjs(validatedData.data.registrationStart, 'MM/DD/YYYY hh:mm A').toISOString(),
                registrationEnd: dayjs(validatedData.data.registrationEnd, 'MM/DD/YYYY hh:mm A').toISOString(),
                eventDate: dayjs(validatedData.data.eventDate, 'MM/DD/YYYY hh:mm A').toISOString(),
                status: validatedData.data.status === 'true' ? true : false,
            },
        });

        return { status: 'success', message: 'Event created successfully' };
    } catch (error) {
        console.error('Failed to create event:', error);
        return { status: 'error', message: 'Failed to delete event' };
    }
}