import { Grid, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../post/Post";
import style from "./home.module.css";
import { useEffect } from "react";
import { getPost } from "../../redux/features/post/postGetSlice";
import { useAuth } from "../../context";
import SideBar from "../SideBar/SideBar";
import { getUserByFirebaseId } from "../../redux/features/users/usersGetSlice";

export default function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.possListAll);
  const userDB = useSelector((state) => state.users.currentUser);
  const { userFirebase } = useAuth();
  useEffect(() => {
    dispatch(getPost());
    dispatch(getUserByFirebaseId(userFirebase.uid))
  }, []);

  
  return (
    <Grid container item xs={12} className={style.home} justifyContent="space-between">
      {/* <Grid
        item
        container
        xs={3}
        direction="column"
        className={style.sideBar}
        p={`1%`}
       >
        <Grid item>
          <button
            style={{ backgroundColor: "white" }}
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </button>
          <Typography variant="body1" className={style.text}>
            Home
          </Typography>
        </Grid>
        <Grid item>
          <Link to="/home/explore" style={{ textDecoration: "none" }}>
            <Typography variant="body1" className={style.text}>
              Explore
            </Typography>
          </Link>
        </Grid>
      </Grid> */}
      <Grid
        item
        container
        xs={3}
        direction="column"
        className={style.sideBar}
        p={`1%`}
       >
        <SideBar userDB={userDB} />
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
