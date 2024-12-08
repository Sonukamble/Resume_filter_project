import { Box, Snackbar, Alert, SnackbarOrigin } from '@mui/material';
import { useState } from 'react';

interface State extends SnackbarOrigin {
    open: boolean;
}

interface SnackBarProps {
    message: string | null;
    severity: "success" | "error" | "warning" | "info";
    open: boolean;
    handleClose: () => void;
}

const SnackBar = ({ message, severity, open, handleClose }: SnackBarProps) => {
    const [state] = useState<State>({
        open: open,
        vertical: 'top',
        horizontal: 'center',
    });

    const { vertical, horizontal } = state;

    return (
        <Box sx={{ width: 500 }}>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert variant="filled" onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default SnackBar;
