import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Popular.module.css";

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
              <div className={styles.songFirstHalf}>
                <div className={styles.songFirstHalfIndex}>
                  <p>{index + 1}</p>
                </div>
                <img src={post.cover} alt="" />
                <p>{post.title}</p>
              </div>
              <div className={styles.songSecondHalf}>
                <p>6,145,232</p>
                <p>03:66</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
