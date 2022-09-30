import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../redux/features/users/usersGetSlice";
import styles from "./LikedSongs.module.css";
import heart from "../../images/heartLikes.png";

const LikedSongs = (id) => {
  const dispatch = useDispatch();
  const profileUser = useSelector((state) => state.users.user);
  const userLikes = useSelector((state) => state.users.userLikes);
  const posts = useSelector((state) => state.posts.postList);

  useEffect(() => {
    dispatch(getUserById(id));
  }, [dispatch]);

  function likePostCover(id) {
    const postLiked = posts.find((post) => post.id === id);
    return postLiked;
  }

  return (
    <div className={styles.containerLikedSongs}>
      <h3>Liked Songs</h3>
      <div className={styles.likedSongs}>
        {userLikes.length > 0 ? (
          <div className={styles.containerImageHeart}>
            <img
              className={styles.coverLikedSongs}
              src={likePostCover(userLikes[userLikes.length - 1].postId)?.cover}
              alt=""
            />
            <img className={styles.heart} src={heart} alt="" />
          </div>
        ) : null}
        {userLikes.length < 1 ? (
          <p>{profileUser.name} has not liked any post</p>
        ) : userLikes.length === 1 ? (
          <p>
            {profileUser.name} has liked {userLikes.length} song
          </p>
        ) : (
          <p>
            {profileUser.name} has liked {userLikes.length} songs
          </p>
        )}
      </div>
    </div>
  );
};

export default LikedSongs;
