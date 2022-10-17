import React, { useState } from "react";
import { FormControl, InputLabel, Input, Button, FormHelperText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


function Auth() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isRegister, setIsRegister] = useState(false);
    const navigate = useNavigate();

    const handleUsername = (value) => {
        setUsername(value)
    }

    const handlePassword = (value) => {
        setPassword(value)
    }

    const sendRequest = (path) => {
        fetch("/auth/" + path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("tokenKey"),
            },
            body: JSON.stringify({
                userName: username,
                password: password,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                localStorage.setItem("tokenKey", result.accessToken);
                localStorage.setItem("refreshKey", result.refreshToken);
                localStorage.setItem("currentUser", result.userId);
                localStorage.setItem("userName", username);
                localStorage.setItem("message", result.message)
                console.log(localStorage)
            })

            .catch((err) => console.log(err))
    }

    const handleRegister = (path) => {
        sendRequest(path)
        setUsername("")
        setPassword("")
        setIsRegister(true)
        navigate(0)

    }
    const handleLogin = (path) => {
        sendRequest(path)
        setUsername("")
        setPassword("")
    }
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsRegister(false);
    };

    return (

        <FormControl>
            <Snackbar open={isRegister} autoHideDuration={1500} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {localStorage.getItem("message")}
                </Alert>
            </Snackbar>
            <InputLabel style={{ top: 150 }}>Username</InputLabel>
            <Input onChange={(i) => handleUsername(i.target.value)} style={{ top: 150 }} />
            <InputLabel style={{ top: 230 }}>Password</InputLabel>
            <Input onChange={(i) => handlePassword(i.target.value)} style={{ top: 180 }} />
            <Button variant="contained"
                style={{
                    marginTop: 200,
                    background: '#47B5FF',
                    color: 'white'
                }} onClick={() => handleRegister("register")}>Register</Button>
            <FormHelperText style={{ margin: 20 }}>Are you already registered?</FormHelperText>
            <Button variant="contained"
                style={{
                    background: '#47B5FF',
                    color: 'white'
                }} onClick={() => handleLogin("login")}>Login</Button>
        </FormControl>


    )
}

export default Auth;