import { Box, AppBar, Toolbar, Typography, Button, Modal, TextField} from '@mui/material';
import { useState } from 'react';

/*
    Resources:
    https://mui.com/components/app-bar/
    https://mui.com/components/modal/
*/

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'min(400px, 80%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

function NavigationBar() {
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(true);
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setDisabled(true);
    }

    function handleChange() {
        const usernameInput = document.getElementById('username') as HTMLInputElement;
        const passwordInput = document.getElementById('password') as HTMLInputElement;
        if(isValid(usernameInput.value) && isValid(passwordInput.value)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }

    function isValid(str: string) {
        let isValid = false;
        if(str.length > 1) {
            isValid = true;
        }
        return isValid;
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between'}} >
                <h1 className='logo'>和美のレシピ</h1>
                <Button onClick={handleOpen} color="inherit">Login</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                >
                    <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginBottom: '1rem'}}>
                        Login
                    </Typography>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <TextField id="username" onChange={handleChange} label="Username" variant="outlined" />
                        <TextField id="password" onChange={handleChange} label="Password" variant="outlined" />
                        <Button type='submit' id='submit' variant="contained" disabled={disabled}>
                            Submit
                        </Button>
                    </form>
                    </Box>
                </Modal>
            </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavigationBar;