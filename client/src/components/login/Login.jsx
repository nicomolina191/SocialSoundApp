import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  TextField,
  DialogActions,
  DialogContent,
  DialogContentText,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import { Arrow, EmailIcon, GoogleIcon, PadLock } from "../componentsIcons";
import style from "./login.module.css";
import logo from "../../images/logoicon.png";
import axios from "axios";
import { getUser } from "../../redux/features/users/usersGetSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.usersListAll);
  const [googleUser, setGoogleUser] = useState();
  const [user, setUser] = useState({ password: "", email: "" });
  const [open, setOpen] = useState(false);
  const [userToResetPassword, setUserToResetPassword] = useState("");
  const [openAlert, setOpenAlert] = useState({
    show: false,
    msg: "",
    severity: "",
  });
  const { login, loginWithGoogle, userFirebase, resetPassword } = useAuth();
  const navigate = useNavigate();
  //const [error, setError] = useState({ password: "", email: "" });
  //const usersListAll = useSelector((state) => state.usersListAll);

  // useEffect(() => {
  //   if (userFirebase !== null) navigate("/home");
  // });

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.password || !user.email) {
      return;
    }
    try {
      await login(user.email, user.password);
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (
      googleUser &&
      users.filter((u) => u.email === googleUser.email).length === 0
    ) {
      axios
        .post("/users", {
          ...googleUser,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    if (userFirebase !== null) navigate("/home");
  }, [googleUser]);

  const handleSignInGoogle = async () => {
    try {
      const res = await loginWithGoogle();
      setGoogleUser({
        name: res.user.email.split("@")[0],
        username: res.user.email.split("@")[0],
        password: res.user.email,
        email: res.user.email,
        idgoogle: res.user.uid,
        avatar: res.user.photoURL,
      });
    } catch (err) {
      console.log(err);
      return;
    }
  };

  const handleSendPasswordReset = async (email) => {
    try {
      await resetPassword(email);
      setOpenAlert({
        show: true,
        msg: "The email has been sent",
        severity: "success",
      });
      setTimeout(function () {
        setOpenAlert({
          show: false,
          msg: "",
          severity: "",
        });
      }, 2000);
    } catch (err) {
      setOpenAlert({
        show: true,
        msg: "There is no account for this email",
        severity: "error",
      });
      setTimeout(function () {
        setOpenAlert({
          show: false,
          msg: "",
          severity: "",
        });
      }, 2000);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  return (
    <Box>
      <Snackbar open={openAlert.show && openAlert.severity === "success"}>
        <Alert severity="success">{openAlert.msg}</Alert>
      </Snackbar>
      <Snackbar open={openAlert.show && openAlert.severity === "error"}>
        <Alert severity="error">{openAlert.msg}</Alert>
      </Snackbar>
      <Box className={style.containerLoginDiv}>
        <Box className={style.divBackground}>
          <button onClick={() => navigate("/")} className={style.arrow}>
            <Arrow />
          </button>

          <h1
            style={{
              fontSize: "5em",
              padding: "5px 0 5px 10%",
              position: "relative",
              zIndex: "5",
              margin: "5px",
            }}
          >
            Hey!
            <br />
            Welcome
            <br />
            Back.
          </h1>
          <Box className={style.divBackgroundColor} />
          <Box className={style.backgroundImage} />
          <img className={style.logo} src={logo} alt="logo" />
        </Box>

        <Box className={style.loginContainer}>
          <Box className={style.containAll}>
            <Box className={style.space} />

            <Box className={style.containerTitle}>
              <h1 style={{ fontSize: "40px" }}>Log in</h1>
              <h4 style={{ margin: "5px 0", height: "20px" }}>
                If you don’t have an account{" "}
              </h4>
              <h4 style={{ margin: "5px 0", height: "20px" }}>
                you can
                <Link
                  style={{ color: "#00FFD6", textDecoration: "none" }}
                  to="/register"
                >
                  {" "}
                  Register here !
                </Link>
              </h4>
            </Box>

            <form style={{ width: "100%" }} onSubmit={(e) => handleSubmit(e)}>
              <Box className={style.orderForm}>
                <Box
                  sx={{ display: "flex", alignItems: "flex-end", gap: "5px" }}
                >
                  <EmailIcon />
                  <TextField
                    className={style.input}
                    type="email"
                    required={true}
                    autoComplete="off"
                    variant="standard"
                    label="Email"
                    name="email"
                    onChange={(e) => handleChange(e)}
                    value={user.email}
                  />
                </Box>

                <Box
                  sx={{ display: "flex", alignItems: "flex-end", gap: "5px" }}
                >
                  <PadLock />
                  <TextField
                    className={style.input}
                    type="password"
                    required={true}
                    autoComplete="off"
                    variant="standard"
                    label="Password"
                    name="password"
                    onChange={(e) => handleChange(e)}
                    value={user.password}
                  />
                </Box>
                <Box textAlign={"right"}>
                  <Link
                    onClick={handleClickOpen}
                    style={{ color: "#00FFD6", textDecoration: "none" }}
                  >
                    Forgot your password?
                  </Link>
                </Box>
                <Box style={{ display: "flex", justifyContent: "center" }}>
                  <Button className={style.btnRL} type="submit">
                    Login
                  </Button>
                </Box>
              </Box>
            </form>

            <Grid
              className={style.googleBox}
              alignItems="center"
              justifyContent="center"
              direction="column"
              container
            >
              <h5 style={{ width: "auto", margin: "5px" }}>or continue with</h5>
              <Button
                sx={{ padding: "20px", borderRadius: "50%" }}
                onClick={() => handleSignInGoogle("/")}
                className={style.googleButton}
              >
                <GoogleIcon />
              </Button>
            </Grid>
          </Box>
        </Box>
      </Box>
      {open && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle
            sx={{
              backgroundColor: "var(--main-page-color)",
              color: "white",
            }}
          >
            Reset Password
          </DialogTitle>
          <DialogContent
            sx={{
              backgroundColor: "var(--main-page-color)",
              color: "white",
            }}
          >
            <DialogContentText
              sx={{
                backgroundColor: "var(--main-page-color)",
                color: "white",
              }}
            >
              An email will be sent to reset your password
            </DialogContentText>
            <Box sx={{ display: "flex", alignItems: "flex-end", gap: "5px" }}>
              <EmailIcon style={{ padding: "10px" }} />
              <TextField
                sx={{
                  backgroundColor: "var(--main-page-color)",
                  color: "white",
                }}
                className={style.input}
                autoFocus
                margin="dense"
                id="Email"
                label="Email Address"
                type="email"
                fullWidth
                autoComplete="off"
                variant="standard"
                value={userToResetPassword}
                onChange={(e) => setUserToResetPassword(e.target.value)}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ backgroundColor: "var(--main-page-color)" }}>
            <Button
              className={style.btnDialog}
              onClick={handleClose}
              sx={{
                backgroundColor: "#00FFD6",
                color: "black",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#00FFD6" }
              }}
            >
              Cancel
            </Button>
            <Button
              className={style.btnDialog}
              onClick={() => handleSendPasswordReset(userToResetPassword)}
              sx={{
                backgroundColor: "#00FFD6",
                color: "black",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#00FFD6" },
              }}
            >
              Send
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default Login;
