import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import EventList from "@/components/pages/event/EventList";
import { Button, Snackbar } from "@mui/material";
import Link from "next/link";

export default function Page() {

    return (
        <>
            <Breadcrumb pageName={"Event"} />

            <div className="flex justify-end">
                <Link href="/event/create">
                    <Button variant="outlined" className="mb-4" >
                        Tambah Event
                    </Button>
                </Link>
            </div>

            <EventList />

        </>
    );
}
