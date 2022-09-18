import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState } from "react";
import { EmailIcon } from "../componentsIcons";
import Loading from "../loading/Loading";
import style from "../resetPassword/resetPassword.module.css";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const handleLoading = () => {
    setLoading(true);
    setTimeout(function () {
      setLoading(false);
    }, 4000);
  };

  return (
    <Box className={style.containerAll}>
      <Box display={"flex"} justifyContent="center" alignItems={"center"}>
        <Box className={style.containerCard}>
          <Box className={style.text}>
            <Typography variant="h4" component="h4">
              Reset password
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end", gap: "5px" }}>
            <EmailIcon />
            <TextField
              className={style.input}
              type="password"
              autoComplete="off"
              variant="standard"
              label="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          {loading && (
            <Box position={"absolute"} top={"20%"}>
              <Loading width={"100px"} height={"100px"} />
            </Box>
          )}
          <Box className={style.buttonContainer}>
            <Button onClick={() => handleLoading()} className={style.btnRL}>
              Send
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPassword;

/* <Snackbar
  open={state.open}
  onClose={handleClose}
  TransitionComponent={state.Transition}
  message="I love snacks"
  key={state.Transition.name}
/> */
