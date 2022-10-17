import * as React from 'react';
import { useState } from "react";
import { useEffect } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import Post from "../Post/Post";
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const columns = [

  {
    id: 'User Activity',
    label: 'User Activity',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function PopUp(props) {
  const { isOpen, postId, setIsOpen } = props;
  const [open, setOpen] = useState(isOpen);
  const [post, setPost] = useState();

  const getPost = () => {
    fetch("/posts/" + postId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("tokenKey"),
      },
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          setPost(result);
        },
        (error) => {
          console.log(error)
        }
      )
  }

  const handleClose = () => {
    setOpen(false);
    setIsOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    getPost();
  }, [postId]);

  return (
    post != null ?
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Open full-screen dialog
        </Button>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative', backgroundColor: '#06283D' }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Close
              </Typography>
            </Toolbar>
          </AppBar>
          <Post likes={post.postLikes} postId={post.id} userId={post.userId} userName={post.userName} title={post.title} text={post.text}></Post>
        </Dialog>
      </div> : "loading"
  );
}

function UserActivity(props) {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rows, setRows] = useState([]);
  const { userId } = props;
  const [isOpen, setIsOpen] = useState();
  const [selectedPost, setSelectedPost] = useState();

  const handleNotification = (postId) => {
    setSelectedPost(postId);
    setIsOpen(true);

  };

  const getActivity = () => {
    fetch("/users/activity/" + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("tokenKey"),
      },
    })
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          console.log(result);
          setRows(result)
        },
        (error) => {
          console.log(error)
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  useEffect(() => {
    getActivity()
  }, [])

  return (
    <div>
      {isOpen ? <PopUp isOpen={isOpen} postId={selectedPost} setIsOpen={setIsOpen} /> : ""}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440, minWidth: 100, maxWidth: 800, marginTop: 10 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <h2>ACTIVITIES</h2>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .map((row) => {
                  return (
                    <Button onClick={() => handleNotification(row[1])}>
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {row[3] + " " + row[0] + " your post"}
                      </TableRow>
                    </Button>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );

}
export default UserActivity;

