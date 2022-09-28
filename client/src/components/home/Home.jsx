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
import PostShared from "../../postShared/PostShared";

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

  const postShared = { id: 1, title: 'juan', cover: 'https://firebasestorage.googleapis.com/v0/b/socialsound-d3e2d.appspot.com/o/cover%2Fmaxresdefault.jpg0.9859373844333883?alt=media&token=d7360dc9-4d0f-448a-abf8-eaaf53b7bb90', content: 'https://firebasestorage.googleapis.com/v0/b/socialsound-d3e2d.appspot.com/o/content%2FMHD%20--%20BZRP%20Music%20Sessions%20%2344.mp40.0411232839917095?alt=media&token=21477a5d-1548-426c-bc07-7fd0aebc03ac', type: 'video', userId: 'dc08588e-3760-4cdc-8249-ce7fc46f48a4', idPostShared: 'eb380f9f-cd2c-40db-be84-61c5c6dfc9b6', postDate: '2022-09-28 11:55:16.395-03' }


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
          posts.slice(0).reverse().map((post, i) => <Post key={i} post={post} comments={false} />)}
      </Grid>
    </Grid>
  );
}
