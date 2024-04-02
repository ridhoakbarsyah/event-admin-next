import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Link from 'next/link';
import { FaRegEdit } from 'react-icons/fa';
import DeleteEvent from './Delete';
import { getEvent } from '@/lib/actions/event/getEvent ';

export default async function EventList() {
    const events = await getEvent()

    return (
        <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="dark:text-white">No</TableCell>
                        <TableCell className="dark:text-white">Nama Event</TableCell>
                        <TableCell className="dark:text-white">Registrasi Dimulai</TableCell>
                        <TableCell className="dark:text-white">Registrasi Berakhir</TableCell>
                        <TableCell className="dark:text-white">Tanggal Event</TableCell>
                        <TableCell className="dark:text-white">Status</TableCell>
                        <TableCell className="dark:text-white" align='center'>Aksi</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.isArray(events) && events.map((event, index) => (
                        <TableRow key={index}>
                            <TableCell className="dark:text-white">{index + 1}</TableCell>
                            <TableCell className="dark:text-white">{event.name}</TableCell>
                            <TableCell className="dark:text-white">{event.registrationStart.toLocaleDateString()}</TableCell>
                            <TableCell className="dark:text-white">{event.registrationEnd.toLocaleDateString()}</TableCell>
                            <TableCell className="dark:text-white">{event.eventDate.toLocaleDateString()}</TableCell>
                            <TableCell className="dark:text-white">{event.status ? 'Aktif' : 'Tidak Aktif'}</TableCell>
                            <TableCell>
                                <div className="flex gap-x-3 justify-center">
                                    <Link href={`/event/edit/${event.id}`}>
                                        <Button className="bg-blue-700" variant="contained" color="primary" endIcon={< FaRegEdit />}>Edit</Button>
                                    </Link>
                                    <DeleteEvent id={Number(event.id)} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
