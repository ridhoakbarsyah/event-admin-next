'use client'

import { AlertSnackbar } from '@/components/alert/AlertSnackbar';
import { createEvent } from '@/lib/actions/event/createEvent';
import { Button, FormControl, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { FiSend } from "react-icons/fi";

export default function CreateEvent() {
    const [state, formAction] = useFormState(createEvent, null)
    const router = useRouter();

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
                                    fullWidth
                                    label="Nama event"
                                    name='name'
                                    error={state?.Error?.name ? true : false}
                                    helperText={state?.Error?.name} />
                            </FormControl>
                            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        label="Registrasi Dimulai"
                                        name='registrationStart'
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
                                    />
                                    <p className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-1wc848c-MuiFormHelperText-root" >
                                        {state?.Error?.eventDate}
                                    </p>
                                </LocalizationProvider>
                            </FormControl>
                            <input type="hidden" name='status' value={'true'} />
                        </Grid>
                        <Grid xs={12} md={6}>
                            <Button className='bg-green-700' variant='contained' type='submit' color="success" endIcon={< FiSend />}>Simpan</Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </>
    )
}
