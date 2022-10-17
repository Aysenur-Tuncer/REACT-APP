import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Avatars from "../Avatar/Avatars";
import UserActivity from "../UserActivity/UserActivity";

function User() {
  const { userId } = useParams();
  const [user, setUser] = useState();

  const getUser = () => {
    fetch("/users/" + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("tokenKey"),
      },
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(localStorage);
          setUser(result);
        },
        (error) => {
          console.log(error)
        }
      )
  }

  useEffect(() => {
    getUser()
  }, []);

  return (
    <div style={{ display: "flex" }}>
      {user ? <Avatars avatarId={user.avatarId} userId={userId} userName={user.userName} /> : ""}
      {localStorage.getItem("currentUser") === userId ? <UserActivity userId={userId} /> : ""}
    </div>
  )
}
export default User;