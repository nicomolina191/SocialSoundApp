import { Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import Post from "../post/Post";
import styles from "./AllPosts.module.css";

const AllPosts = (artistPostsObj) => {
  const [checked, setChecked] = useState("all");
  const artistPosts = artistPostsObj.artistPostsObj
  const [posts, setPosts] = useState(artistPosts);

  function handleCheckedAll() {
    setChecked("all");
  }

  function handleCheckedVideo() {
    setChecked("video");
    setPosts(artistPosts.filter((post) => post.content.includes(".mp4")));
  }

  function handleCheckedAudio() {
    setChecked("audio");
    setPosts(artistPosts.filter((post) => post.content.includes(".mp3")));
  }

  return (
    <div className={styles.containerAllPosts}>
      <div className={styles.containerTitleFilters}>
        <h2>All Posts</h2>
        <div className={styles.containerFilters}>
          {checked === "all" ? (
            <Button
              sx={{
                backgroundColor: "rgba(0, 255, 214, 1)",
                color: "black",
                "&:hover": {
                  backgroundColor: "rgba(0, 255, 214, 1)",
                },
              }}
            >
              All
            </Button>
          ) : (
            <Button onClick={handleCheckedAll}>All</Button>
          )}
          {checked === "video" ? (
            <Button
              sx={{
                backgroundColor: "rgba(0, 255, 214, 1)",
                color: "black",
                "&:hover": {
                  backgroundColor: "rgba(0, 255, 214, 1)",
                },
              }}
            >
              Video
            </Button>
          ) : (
            <Button onClick={handleCheckedVideo}>Video</Button>
          )}
          {checked === "audio" ? (
            <Button
              sx={{
                backgroundColor: "rgba(0, 255, 214, 1)",
                color: "black",
                "&:hover": {
                  backgroundColor: "rgba(0, 255, 214, 1)",
                },
              }}
            >
              Audio
            </Button>
          ) : (
            <Button onClick={handleCheckedAudio}>Audio</Button>
          )}
        </div>
      </div>
      <div>
        {checked !== "all" ? (
          posts.length === 0 ? (
            <p className={styles.noResultsText}>No post was found</p>
          ) : (
            posts.map((post, i) => {
              return <Post key={i} post={post} />;
            })
          )
        ) : (
          artistPosts.map((post, i) => {
            return <Post key={i} post={post} />;
          })
        )}
      </div>
    </div>
  );
};

export default AllPosts;
