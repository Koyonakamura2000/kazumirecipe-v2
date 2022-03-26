import { Box, AppBar, Toolbar, Typography, Button, Modal, TextField, Alert} from '@mui/material';
import React, { useState } from 'react';
import { auth } from './App';
import { signInWithCustomToken, signOut } from 'firebase/auth';

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

interface NavProps {
    setAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}


function NavigationBar(props: NavProps) {
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [loginBtnText, setLoginBtnText] = useState('Login');
    const [failedLogin, setFailedLogin] = useState(false);
    
    const handleOpen = () => {
        if(loginBtnText === 'Login') {
            setOpen(true);
        } else {
            handleLogout();
        }
    }
    
    const handleClose = () => {
        setOpen(false);
        setDisabled(true);
        setFailedLogin(false);
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

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const usernameInput = document.getElementById('username') as HTMLInputElement;
        const passwordInput = document.getElementById('password') as HTMLInputElement;
        verifyUser(usernameInput.value, passwordInput.value);
    }

    // fetch POST request to kazumirecipeapi to see if user in database, update isAdmin prop if so
    function verifyUser(username: string, password: string) {
        let data = new FormData();
        data.append('username', username);
        data.append('password', password);
        fetch('https://kazumirecipeapi.uw.r.appspot.com/login', {
            method: 'POST',
            body: data
        }).then(res => res.json()).then(readResponse).catch(console.error);
    }

    function readResponse(json: any) {
        if(json.isAdmin) {
            handleLogin(json.token);
            setOpen(false);
        } else {
            setFailedLogin(true);
        }
    }

    function handleLogin(token: string) {
        props.setAdmin(true);
        signInWithCustomToken(auth, token).catch(console.log);
        setLoginBtnText('Log Out');
    }

    function handleLogout() {
        signOut(auth).then(() => {
            props.setAdmin(false);
            setLoginBtnText('Login');
        }).catch((error) => console.log(error));
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between'}} >
                <h1 className='logo'>和美のレシピ</h1>
                <Button onClick={handleOpen} color="inherit">{loginBtnText}</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                >
                    <Box sx={modalStyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginBottom: '1rem'}}>
                            Login
                        </Typography>
                        <form method='POST' onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <TextField id="username" onChange={handleChange} label="Username" variant="outlined" autoComplete='on'/>
                            <TextField id="password" onChange={handleChange} label="Password" type='password' variant="outlined" autoComplete='off' />
                            <Button type='submit' id='submit' variant="contained" disabled={disabled}>
                                Submit
                            </Button>
                            {failedLogin && <Alert severity="error">This is an error alert — check it out!</Alert>}
                        </form>
                    </Box>
                </Modal>
            </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavigationBar;