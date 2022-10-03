import { Grid, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../post/Post";
import style from "./home.module.css";
import { useEffect } from "react";
import { clearPost, getPost } from "../../redux/features/post/postGetSlice";
import SideBar from "../SideBar/SideBar";
import { getUserByFirebaseId } from "../../redux/features/users/usersGetSlice";
import { useAuth } from "../../context";
import PostShared from "../postShared/PostShared";

export default function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.possListAll);
  const userDB = useSelector((state) => state.users.currentUser);
  const { userFirebase } = useAuth();
  useEffect(() => {
    dispatch(getPost());
    dispatch(getUserByFirebaseId(userFirebase.uid))
    dispatch(clearPost())
  }, []);

console.log(userDB);

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
        <SideBar userDB={userDB} />
      </Grid>
      <Grid container item xs={9} direction="column" className={style.posts}>
        <Typography variant="h3" className={style.text}>
          Home.
        </Typography>
        {/* <PostShared postShared={postShared}/> */}
        {posts.length > 0 &&
          posts.slice(0).reverse().map((post, i) => post.idShared ? <PostShared postShared={post} /> : <Post key={i} post={post} comments={false} />)}
      </Grid>
    </Grid>
  );
}
