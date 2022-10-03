import React, { useEffect, useState } from "react";
import styles from "./PopularPost.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const PopularPost = (post) => {
  const [likes, setLikes] = useState();

  useEffect(() => {
    getLikes();
  }, []);

  async function getLikes() {
    const res = await axios.get(`/likes/posts/${post.post.id}`);
    setLikes(res.data);
  }

  return (
    <div className={styles.containerSong}>
      <div className={styles.songFirstHalf}>
        <img src={post.post.cover} alt="" />
        <p>{post.post.title}</p>
      </div>
      <div className={styles.songSecondHalf}>
        <p>
          <FontAwesomeIcon icon={faHeart} />{" "}
          {likes?.filter((likes) => likes.isActive).length}
        </p>
        <p>03:66</p>
      </div>
    </div>
  );
};

export default PopularPost;
