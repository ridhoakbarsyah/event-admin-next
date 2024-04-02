'use client'

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { AlertColor, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useFormState } from 'react-dom';
import { FiSend } from "react-icons/fi";
import React, { useEffect } from 'react';
import { Event } from '@prisma/client';
import dayjs from 'dayjs';
import { updateEvent } from '@/lib/actions/event/updateEvent';
import { AlertSnackbar } from '@/components/alert/AlertSnackbar';
import { useRouter } from 'next/navigation';

export default function UpdateEvent({ event }: { event: Event }) {

    const updateEventById = updateEvent.bind(null, event.id)

    const [state, formAction] = useFormState(updateEventById, null)

    const [status, setStatus] = React.useState(event.status.toString());

    const router = useRouter();

    const handleChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as string);
    };

    // Redirect to event page if status is true
    useEffect(() => {
        if (state?.status == 'success') {
            setTimeout(() => {
                router.push('/event');
                router.refresh();
            }, 1500)
        }
    }, [state, router]);

    return (

        <>
            <AlertSnackbar
                openSnackBar={(state?.status === 'success' || state?.status === 'error') && true}
                type={state?.status === 'success' ? 'success' : 'error'}
                message={state?.message as string}
            />

            <Box sx={{ flexGrow: 1 }}>
                <form action={formAction}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} className='dark:border-white dark:bg-slate-300'>
                        <Grid xs={12} md={6}>
                            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                                <TextField
                                    label="Nama event"
                                    name='name'
                                    error={state?.Error?.name ? true : false}
                                    helperText={state?.Error?.name}
                                    defaultValue={event.name}
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        label="Registrasi Dimulai"
                                        name='registrationStart'
                                        defaultValue={dayjs(event.registrationStart)}
                                    />
                                    <p className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-1wc848c-MuiFormHelperText-root" >
                                        {state?.Error?.registrationStart}
                                    </p>
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>

                        <Grid xs={12} md={6}>
                            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        label="Registrasi Berakhir"
                                        name='registrationEnd'
                                        defaultValue={dayjs(event.registrationEnd)}
                                    />
                                    <p className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-1wc848c-MuiFormHelperText-root" >
                                        {state?.Error?.registrationEnd}
                                    </p>
                                </LocalizationProvider>
                            </FormControl>
                            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        label="Tanggal Event"
                                        name='eventDate'
                                        defaultValue={dayjs(event.eventDate)}
                                    />
                                    <p className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-1wc848c-MuiFormHelperText-root" >
                                        {state?.Error?.eventDate}
                                    </p>
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>

                        <Grid xs={12} md={6}>
                            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                                <InputLabel id="status">Status</InputLabel>
                                <Select
                                    labelId="status"
                                    id="demo-simple-select"
                                    value={status}
                                    label="Status"
                                    name='status'
                                    onChange={handleChange}
                                >
                                    <MenuItem value={'true'}>Aktif</MenuItem>
                                    <MenuItem value={'false'}>Non Aktif</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid xs={12} md={12}>
                            <Button className='bg-green-700' variant='contained' type='submit' color="success" endIcon={< FiSend />}>Update</Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>

        </>

    );
}
