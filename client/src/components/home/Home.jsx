import { Grid, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Post from "../post/Post";
import style from "./home.module.css";
import { useEffect } from "react";
import { getPost } from "../../redux/features/post/postGetSlice";
import { useAuth } from "../../context";
import SideBar from "../SideBar/SideBar";

export default function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.possListAll);
  const { userFirebase } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    //if (typeof userFirebase !== "object") navigate("/login");
    dispatch(getPost());
  }, []);

  return (
    <Grid container item xs={12} className={style.home} justifyContent="space-between">
      <Grid
        item
        container
        xs={3}
        direction="column"
        className={style.sideBar}
        p={`1%`}
       >
        <SideBar />
      </Grid>
      <Grid container item xs={9} direction="column" className={style.posts}>
        <Typography variant="h3" className={style.text}>
          Home.
        </Typography>
        {posts.length > 0 &&
          posts.map((post, i) => <Post key={i} post={post}/>)}
      </Grid>
    </Grid>
  );
}
