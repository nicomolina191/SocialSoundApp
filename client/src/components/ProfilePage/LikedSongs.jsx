import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserById } from "../../redux/features/users/usersGetSlice";
import styles from "./LikedSongs.module.css";
import heart from "../../images/heartLikes.png";
import portada from "./Play.png";

const LikedSongs = (user) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const profileUser = useSelector((state) => state.users.user);

  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch]);

  return (
    <div className={styles.containerLikedSongs}>
      <h3>Liked Songs</h3>
      <div className={styles.likedSongs}>
        <div className={styles.containerImageHeart}>
          <img src={portada} alt="" />
          <img className={styles.heart} src={heart} alt="" />
        </div>
        <p>{profileUser.name} has liked 30 songs</p>
      </div>
    </div>
  );
};

export default LikedSongs;
