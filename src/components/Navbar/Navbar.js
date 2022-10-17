import React from "react";
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { LockOpen } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


function Navbar() {

    let navigate = useNavigate();

    const onClick = () => {
        localStorage.removeItem("tokenKey")
        localStorage.removeItem("currentUser")
        localStorage.removeItem("refreshKey")
        localStorage.removeItem("userName")
        localStorage.removeItem("message")
        navigate(0)
    }

    return (
        <div>
            <Box sx={{ flexGrow: 1, textAlign: "left" }}>
                <AppBar position="static" style={{ backgroundColor: '#06283D' }}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link to="/" style={{ textDecoration: "none", boxShadow: "none", color: "white" }}>Home</Link>
                        </Typography>
                        <Typography variant="h6" component="div">
                            {localStorage.getItem("currentUser") == null ? <Link to="/auth" style={{ textDecoration: "none", boxShadow: "none", color: "white" }}>Login/Register</Link> : <div><IconButton onClick={onClick}><LockOpen style={{ color: '#EAE3D2' }}></LockOpen></IconButton> <Link to={"/users/" + localStorage.getItem("currentUser")} style={{ textDecoration: "none", boxShadow: "none", color: "white" }}>Profile</Link> </div>}
                        </Typography>


                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}
export default Navbar;