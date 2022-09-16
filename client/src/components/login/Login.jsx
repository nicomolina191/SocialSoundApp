import { Box, Grid, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import { Arrow, EmailIcon, GoogleIcon, PadLock } from "../componentsIcons";
import style from "./login.module.css";

const Login = () => {
  const [user, setUser] = useState({ password: "", email: "" });
  const [error, setError] = useState({ password: "", email: "" });
  const { login, signupWithGoogle } = useAuth();
  const navigate = useNavigate();

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
      await signupWithGoogle();
    } catch (err) {
      console.log(err);
      return;
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };
  return (
    <Box>
      <Box className={style.containerRegisterDiv}>
        <Box className={style.divBackground}>
          <button onClick={() => navigate("/")} className={style.arrow}>
            <Arrow />
          </button>
          <h1
            style={{
              fontSize: "5em",
              padding: "5px 0 10px 10%",
              position: "relative",
              zIndex: "5",
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
        </Box>

        <Box className={style.registerContainer}>
          <Box className={style.containAll}>
            <Box className={style.containerTitle}>
              <h1 style={{ fontSize: "40px" }}>Sign up</h1>
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

            <form onSubmit={(e) => handleSubmit(e)}>
              <Box className={style.containerTitle}>
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
                  <button className={style.btnRL} type="submit">
                    Login
                  </button>
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
              <h5 style={{ width: "auto" }}>or continue with</h5>
              <button
                className={style.googleButton}
                onClick={() => handleSignInGoogle()}
              >
                <GoogleIcon />
              </button>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
