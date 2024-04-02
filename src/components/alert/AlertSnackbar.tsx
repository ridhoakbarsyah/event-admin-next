import { Alert, AlertColor } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { SyntheticEvent, useEffect, useState } from 'react';

interface AlertSnackbarProps {
    openSnackBar: boolean;
    type: AlertColor;
    message: string;
}

export function AlertSnackbar({ openSnackBar, type, message }: AlertSnackbarProps) {
    const [open, setOpen] = useState(false);

    const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;

        setOpen(false);
    };

    useEffect(() => {
        if (openSnackBar) setOpen(true)
    }, [openSnackBar])

    return (
        <Snackbar open={open} onClose={handleClose} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Alert severity={type} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}


