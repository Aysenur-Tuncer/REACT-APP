import React from "react";
import { Avatar, CardContent, InputAdornment, OutlinedInput } from "@mui/material";
import { Link } from "react-router-dom";

function Comment(props) {
    const { text, userId, userName } = props;

    return (
        <CardContent className="comment" style={{ display: 'flex', flexWrap: 'wrap', bgcolor: '#f0f5ff', justifyContent: 'center', alignItems: 'center' }}>
            <OutlinedInput
                disabled
                id="outlined-adornment-amount"
                multiline
                inputProps={{ maxLength: 25 }}
                fullWidth
                value={text}
                startAdornment={
                    <InputAdornment position="start">
                        <Link to={"/users/" + userId} style={{ textDecoration: "none", boxShadow: "none", color: "white" }}>
                            <Avatar sx={{ color: 'white', backgroundColor: 'darkgrey' }} aria-label="recipe">
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    </InputAdornment>
                }
                style={{ color: 'black', backgroundColor: 'white' }}
            >
            </OutlinedInput>

        </CardContent>
    )

}

export default Comment;