import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import { Arrow, EmailIcon, GoogleIcon, PadLock } from "../componentsIcons";
import style from "./login.module.css";
import logo from "../../images/logoicon.png";

const Login = () => {
  const [user, setUser] = useState({ password: "", email: "" });
  const [error, setError] = useState({ password: "", email: "" });
  const { login, loginWithGoogle, userFirebase } = useAuth();
  const navigate = useNavigate();

    useEffect(()=>{
      console.log(userFirebase)
        if (userFirebase !== null) navigate("/home");
    })
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

  const handleSignInGoogle = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      console.log(err);
      return;
    }
    navigate("/home");
  };

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };
  return (
    <Box>
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
    </Box>
  );
};

export default Login;
