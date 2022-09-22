import React, { useState } from "react";
import styles from "./EditProfile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import { updateUser } from "../../redux/features/users/usersGetSlice";

const EditProfile = (close) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.currentUser);
  const [input, setInput] = useState({
    name: currentUser.name,
    username: currentUser.username,
    avatar: currentUser.avatar,
  });

  function handleChange(el) {
    setInput({
      ...input,
      [el.target.name]: el.target.value,
    });
  }

  function handleSubmit() {
    try {
      dispatch(updateUser(currentUser.id, input));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerSettings}>
        <div className={styles.header}>
          <h1>Edit your profile</h1>
          <p>
            <FontAwesomeIcon onClick={close.close} icon={faXmark} />
          </p>
        </div>
        <div className={styles.content}>
          <img src={currentUser.avatar} alt="" />
          <div className={styles.inputs}>
            <TextField
              onChange={(e) => handleChange(e)}
              label="Choose your name"
              defaultValue={currentUser.name}
              variant="standard"
              sx={{ marginBottom: "25px" }}
              name="name"
            />
            <TextField
              onChange={(e) => handleChange(e)}
              label="Choose your username"
              defaultValue={currentUser.username}
              variant="standard"
              name="username"
            />
          </div>
          <Button
            sx={{
              position: "absolute",
              right: "5px",
              bottom: "5px",
              fontSize: "16px",
            }}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
