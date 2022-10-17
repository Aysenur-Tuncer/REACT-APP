import React, { useState, useEffect } from "react";
import Post from "../Post/Post";
import CssBaseline from '@mui/material/CssBaseline';
import PostForm from "../Post/PostForm";
import { Box } from "@mui/material";

function Home() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [postList, setPostList] = useState([]);

    const refreshPosts = () => {
        fetch("/posts")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPostList(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    useEffect(() => {
        refreshPosts()
    }, [])

    if (error) {
        return <div>Error!!</div>
    } else if (!isLoaded) {
        return <div>Loading...</div>
    } else {
        return (
            <React.Fragment>
                <CssBaseline />
                <div className="container">
                    {localStorage.getItem("currentUser") == null ? "" : <PostForm userId={localStorage.getItem("currentUser")} userName={localStorage.getItem("userName")} refreshPosts={refreshPosts}></PostForm>}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                        {postList.map(
                            post => (
                                <Post likes={post.postLikes} postId={post.id} userId={post.userId} userName={post.userName} title={post.title} text={post.text}></Post>
                            )
                        )}
                    </Box>

                </div>
            </React.Fragment>

        )
    }
}
export default Home;