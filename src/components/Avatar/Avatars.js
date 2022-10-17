import * as React from 'react';
import { useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Radio from '@mui/material/Radio';
import { ListItemSecondaryAction } from '@mui/material';

function Avatars(props) {
  const { avatarId, userId, userName } = props;
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(avatarId);

  const saveAvatar = () => {
    fetch("/users/" + localStorage.getItem("currentUser"), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("tokenKey"),
      },
      body: JSON.stringify({
        avatar: selectedValue,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err))
  }

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    saveAvatar();
  };

  return (
    <div>
      <Card style={{ maxWidth: 345, margin: 50 }}>
        <CardMedia
          component="img"
          alt="User Avatar"
          image={`/avatars/avatar${selectedValue}.png`}
          title="User Avatar"
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="h2">
            {userName}
          </Typography>
        </CardContent>
        <CardActions>
          {localStorage.getItem("currentUser") == userId ? <Button size="small" onClick={handleOpen}>Change avatar</Button> : ""}

        </CardActions>
      </Card>
      <Modal style={{ display: "flex", maxWidth: 200, }}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <List dense>
          {[1, 2, 3, 4, 5, 6].map((key) => {
            const labelId = `checkbox-list-secondary-label-${key}`;
            return (
              <ListItem key={key} button>
                <CardMedia
                  style={{ maxWidth: 100 }}
                  component="img"
                  alt={`Avatar n°${key}`}
                  image={`/avatars/avatar${key}.png`}
                  title="User Avatar"
                />
                <ListItemSecondaryAction>
                  <Radio
                    edge="end"
                    value={key}
                    onChange={handleChange}
                    checked={"" + selectedValue === "" + key}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </Modal>
    </div>
  );
}

export default Avatars;