import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../context";
import { getUserByFirebaseId, cleanUserState } from "../../redux/features/users/usersGetSlice";
import SideBar from "../SideBar/SideBar";
import style from "./likedSongs.module.css";
import CardSong from "./CardSong";
import { getSongsLikesByUserId } from "../../redux/features/like/likeGetSlice";
import PlayAllButton from "../PlayAllButton/PlayAllButton";

export default function LikedSongs() {
  const dispatch = useDispatch();
  const userDB = useSelector((state) => state.users.currentUser);
  const likesCurrentUser = useSelector(
    (state) => state.likes.likesSongCurrentUser
  );
  const { userFirebase } = useAuth();

  useEffect(() => {
    dispatch(cleanUserState())
    dispatch(getUserByFirebaseId(userFirebase.uid));
  }, []);

  useEffect(() => {
    if (Object.keys(userDB).length > 0) {
      dispatch(getSongsLikesByUserId(userDB.id));
    }
  }, [userDB]);

  return (
    <Grid container className={style.likedVideos} xs={12}>
      <Grid style={{maxWidth: "266px"}} item container xs={2.5}>
        <SideBar userDB={userDB} />
      </Grid>
      <Grid item container xs={9.5} p={`2%`}>
        {likesCurrentUser.length > 0 ? (
          <div style={{width: "100%"}}>
            <PlayAllButton songs={likesCurrentUser} />
            <div style={{marginTop: "30px"}}>
              {likesCurrentUser?.map((post, index) => (
                <CardSong arrayMap={likesCurrentUser} post={post} index={index} />
              ))}
            </div>
          </div>
        ) : (
          <p style={{ margin: "0 auto", color: "white" }}>No liked songs yet</p>
        )}
      </Grid>
    </Grid>
  );
}
