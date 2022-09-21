import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostByTime } from "../../redux/features/post/postGetSlice";
import styles from "./Popular.module.css";
import portada from "./Play.png";

const Popular = ({ id }) => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.posts.postList);
  const popularPosts = allPosts
    .filter((post) => post.userId === id)
    .slice(0, 5);

  useEffect(() => {
    dispatch(getPostByTime("popu"));
  }, [dispatch]);

  return (
    <div className={styles.containerPopularSongs}>
      <h2>Popular</h2>
      <div className={styles.containerFiveSongs}>
        {popularPosts.map((post, index) => {
          return (
            <div className={styles.containerSong}>
              <div className={styles.songFirstHalf}>
                <div className={styles.songFirstHalfIndex}>
                  <p>{index + 1}</p>
                </div>
                  <img src={portada} alt="" />
                  <p>{post.title}</p>
              </div>
              <div className={styles.songSecondHalf}>
                <p>6,145,232</p>
                <p>03:22</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
