import axios from "axios";
import React from "react";
import style from "./register.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import { Box, Grid, TextField } from "@mui/material";
import {
  Arrow,
  EmailIcon,
  GoogleIcon,
  PadLock,
  UserIcon,
} from "../componentsIcons/index";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [equal, setEqual] = useState(false);
  const { signup, signupWithGoogle } = useAuth();
  const navigate = useNavigate();
  const handleSignUpGoogle = async () => {
    try {
      await signupWithGoogle();
    } catch (err) {
      console.log(err);
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !user.name ||
      !user.email ||
      !user.username ||
      !user.password ||
      !user.confirmPassword ||
      user.password !== user.confirmPassword
    ) {
      for (const key in user) {
        if (!user[key]) {
          setErrors({ ...errors, [key]: `${key} most have a value` });
        }
      }
      return;
    }
    setErrors({
      name: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
    //registro fallido manda a home: arreglar
    try {
      await signup(user.email, user.password);
      axios
        .post("/users", {
          ...user,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (err) {
      return console.log(err);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
    /* 
        Estado [usuarios]: [usuarios.some(u => RegExp.test(u))]
        */
  };

  return (
    <Box>
      <Box className={style.containerRegisterDiv}>
        <Box className={style.divBackground}>
          <Box className={style.divTitle}>
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
              Welcome,
              <br />
              the best is <br />
              yet to come.
            </h1>
          </Box>
          <Box className={style.divBackgroundColor} />
          <Box className={style.backgroundImage} />
        </Box>

        <Box className={style.registerContainer}>
          <Box className={style.containAll}>
            <Box className={style.containerTitle}>
              <h1 style={{ fontSize: "40px" }}>Sign up</h1>
              <h4 style={{ margin: "5px 0", height: "20px" }}>
                if you already have an account
              </h4>
              <h4 style={{ margin: "5px 0", height: "20px" }}>
                you can{" "}
                <Link
                  style={{ color: "#00FFD6", textDecoration: "none" }}
                  to="/login"
                >
                  {" "}
                  Login here !
                </Link>
              </h4>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                flexDirection: "column",
              }}
            >
              <form onSubmit={(e) => handleSubmit(e)}>
                <Box className={style.orderForm}>
                  <Box
                    sx={{ display: "flex", alignItems: "flex-end", gap: "5px" }}
                  >
                    <UserIcon />
                    <TextField
                      className={style.input}
                      type="text"
                      required={true}
                      autoComplete="off"
                      variant="standard"
                      label="Name"
                      name="name"
                      onChange={(e) => handleChange(e)}
                      value={user.name}
                    />
                  </Box>

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
                    <UserIcon />
                    <TextField
                      className={style.input}
                      type="text"
                      required={true}
                      autoComplete="off"
                      variant="standard"
                      label="Username"
                      name="username"
                      onChange={(e) => handleChange(e)}
                      value={user.username}
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
                      label="Confirm Password"
                      name="confirmPassword"
                      onChange={(e) => handleChange(e)}
                      value={user.confirmPassword}
                    />
                  </Box>

                  <Box style={{ display: "flex", justifyContent: "center" }}>
                    <button className={style.btnRL} type="submit">
                      Register
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

                <Box className={{ width: "auto" }}>
                  <button
                    className={style.googleButton}
                    onClick={() => handleSignUpGoogle()}
                  >
                    <GoogleIcon />
                  </button>
                </Box>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
