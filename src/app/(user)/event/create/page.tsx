'use client'

import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import CreateEvent from '@/components/pages/event/Create';

export default function Create() {

    return (

        <>
            <Breadcrumb pageName={"Tambah Event"} />

            <CreateEvent />
        </>

    );
}
