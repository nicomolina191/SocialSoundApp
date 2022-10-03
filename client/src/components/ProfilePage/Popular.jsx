import React from "react";
import { useSelector } from "react-redux";
import styles from "./Popular.module.css";
import PopularPost from "./PopularPost";

const Popular = ({ id }) => {
  const allPosts = useSelector((state) => state.posts.postList);
  const popularPosts = allPosts
    .filter((post) => post.userId === id)
    .slice(0, 5);

  return (
    <div className={styles.containerPopularSongs}>
      <h2>Popular</h2>
      <div>
        {popularPosts.map((post, index) => {
          return (
            <div className={styles.containerSong}>
              <p className={styles.songFirstHalfIndex}>{index + 1}</p>
              <PopularPost post={post} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
