import React, { useState } from "react";
import { Avatar, CardContent, InputAdornment, OutlinedInput } from "@mui/material";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

function CommentForm(props) {
    const { userId, userName, postId, setCommentRefresh } = props;
    const [text, setText] = useState("");
    let navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("tokenKey")
        localStorage.removeItem("currentUser")
        localStorage.removeItem("refreshKey")
        localStorage.removeItem("userName")
        navigate(0)
    }

    const saveComment = () => {
        fetch("/comments",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("tokenKey"),
                },
                body: JSON.stringify({
                    postId: postId,
                    userId: userId,
                    text: text,
                }),
            })
            .then((res) => {
                if (!res.ok) {
                    RefreshToken()
                        .then((res) => {
                            if (!res.ok) {
                                logout();
                            } else {
                                return res.json()
                            }
                        })
                        .then((result) => {
                            console.log(result)

                            if (result != undefined) {
                                localStorage.setItem("tokenKey", result.accessToken);
                                saveComment();
                                setCommentRefresh();
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                } else
                    res.json()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const RefreshToken = () => {

        var request = fetch("/auth/refresh", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: localStorage.getItem("currentUser"),
                refreshToken: localStorage.getItem("refreshKey"),
            }),
        })
        return request
    }

    const handleSubmit = () => {
        saveComment();
        setText("");
        setCommentRefresh();
    }
    const handleChange = (value) => {
        setText(value);
    }

    return (
        <CardContent className="comment" style={{ display: 'flex', flexWrap: 'wrap', bgcolor: '#f0f5ff', justifyContent: 'center', alignItems: 'center' }}>
            <OutlinedInput

                id="outlined-adornment-amount"
                multiline
                inputProps={{ maxLength: 250 }}
                fullWidth
                onChange={(i) => handleChange(i.target.value)}
                startAdornment={
                    <InputAdornment position="start">
                        <Link to={"/users/" + userId} style={{ textDecoration: "none", boxShadow: "none", color: "white" }}>
                            <Avatar sx={{ color: 'white', backgroundColor: 'darkgrey' }} aria-label="recipe">
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment position="end">
                        <Button
                            variant="contained"
                            style={{
                                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                color: 'white'
                            }}
                            onClick={handleSubmit}
                        >Comment</Button>
                    </InputAdornment>
                }
                value={text}
                style={{ color: 'black', backgroundColor: 'white' }}
            >
            </OutlinedInput>

        </CardContent>
    )

}

export default CommentForm;