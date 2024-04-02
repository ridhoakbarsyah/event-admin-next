import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import React from 'react';
import { notFound } from 'next/navigation';
import UpdateEvent from '@/components/pages/event/Update';
import { getEventById } from '@/lib/actions/event/getEvent ';

export default async function Update({ params }: { params: { id: string } }) {

    const id = Number(params.id);
    const event = await getEventById(id)

    if (!event) {
        return notFound()
    }

    return (

        <>
            <Breadcrumb pageName={"Tambah Event"} />

            <UpdateEvent event={event} />

        </>

    );
}
