import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../redux/features/users/usersGetSlice";
import { Stack, ThemeProvider } from "@mui/system";
import { Button, createTheme } from "@mui/material";
import styles from "./ProfilePage.module.css";
import SideBar from "../SideBar/SideBar";
import checkIcon from "../../images/checkIcon.png";
import playIcon from "../../images/play.png";
import Popular from "./Popular";
import LikedSongs from "./LikedSongs";
import AllPosts from "./AllPosts";
import Loading from "../loading/Loading";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loaded, setLoaded] = useState(false);
  const profileUser = useSelector((state) => state.users.user);

  useEffect(() => {
    dispatch(getUserById(id));
    setLoaded(true);
  }, []);

  const theme = createTheme({
    typography: {
      fontFamily: [
        "Inter",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "sans-serif",
      ].join(","),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Stack direction="row">
        <div className={styles.fondo}></div>

        <div className={styles.containerSideBar}>
          <SideBar />
        </div>

        {loaded ? (
          <div className={styles.containerProfile}>
            <div className={styles.containerImgName}>
              <img src={profileUser.avatar} alt="" />
              <div className={styles.artistData}>
                {profileUser.plan === "Premium" ? (
                  <div className={styles.badge}>
                    <img src={checkIcon} alt="" />
                    <p>Premium Artist</p>
                  </div>
                ) : null}
                <h1>{profileUser.name}</h1>
                <p className={styles.followersCount}>
                  {profileUser.followersCount} Followers
                </p>
              </div>
            </div>

            <div className={styles.contentContainer}>
              <div className={styles.playFollowContainer}>
                <img src={playIcon} className={styles.playButton} alt="" />
                <Button
                  variant="contained"
                  sx={{
                    height: "48px",
                    marginLeft: "30px",
                    fontSize: "18px",
                    color: "black",
                    fontWeight: "500",
                    backgroundColor: "rgba(0, 255, 214, 1)",
                    width: "110px",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "rgba(0, 255, 214, 1)",
                    },
                  }}
                >
                  Follow
                </Button>
              </div>
              <div className={styles.popuAndLiked}>
                <div className={styles.popu}>
                  <Popular id={id} />
                </div>
                <div className={styles.liked}>
                  <LikedSongs />
                </div>
              </div>
              <div className={styles.allPosts}>
                <AllPosts id={id} status={loaded} />
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </Stack>
    </ThemeProvider>
  );
};

export default ProfilePage;
