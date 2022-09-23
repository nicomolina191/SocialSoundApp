import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../redux/features/users/usersGetSlice";
import { getPost } from "../../redux/features/post/postGetSlice";
import { Stack, ThemeProvider } from "@mui/system";
import { Button, createTheme, Menu, MenuItem, Modal } from "@mui/material";
import styles from "./ProfilePage.module.css";
import SideBar from "../SideBar/SideBar";
import checkIcon from "../../images/checkIcon.png";
import playIcon from "../../images/play.png";
import Popular from "./Popular";
import LikedSongs from "./LikedSongs";
import AllPosts from "./AllPosts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import EditProfile from "./EditProfile";
import Upload from "../Upload/Upload";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const profileUser = useSelector((state) => state.users.user);
  const currentUser = useSelector((state) => state.users.currentUser);
  const allPosts = useSelector((state) => state.posts.postList);
  const artistPosts = allPosts.filter((post) => post.userId === id);
  const userDB = useSelector((state) => state.users.currentUser);
  const [open, setOpen] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

  useEffect(() => {
    dispatch(getUserById(id));
    dispatch(getPost());
  }, [dispatch]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenSettings = () => {
    setOpenSettings(true);
  };

  const handleCloseSettings = () => {
    setOpenSettings(false);
  };

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
          <SideBar userDB={userDB} />
        </div>

        <div className={styles.containerProfile}>
          <div className={styles.containerProfileData}>
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
                <div className={styles.followersCount}>
                  <p className={styles.followersCount}>
                    {profileUser.followersCount} Followers
                    {profileUser.followingCount > 0
                      ? profileUser.followingCount === 1
                        ? ` ・ Follow ${profileUser.followingCount} user`
                        : ` ・ Follow ${profileUser.followingCount} users`
                      : null}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.optionsContainer}>
              {currentUser.id === profileUser.id ? (
                <FontAwesomeIcon
                  onClick={handleOpen}
                  className={styles.optionsButton}
                  icon={faEllipsis}
                />
              ) : null}
              <Menu
                className={styles.optionsModal}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  horizontal: "right",
                  vertical: "top",
                }}
              >
                <MenuItem onClick={handleOpenSettings}>Edit profile</MenuItem>
              </Menu>
              <Modal
                open={openSettings}
                onClose={handleCloseSettings}
                sx={{ backdropFilter: "blur(3px)" }}
              >
                <EditProfile
                  close={handleCloseSettings}
                  setOpenSettings={setOpenSettings}
                />
              </Modal>
            </div>
          </div>

          <div className={styles.contentContainer}>
            <div className={styles.playFollowContainer}>
              {artistPosts.length > 0 ? (
                <img src={playIcon} className={styles.playButton} alt="" />
              ) : null}
              {currentUser.id !== profileUser.id ? (
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
              ) : null}
            </div>
            {artistPosts.length > 0 ? (
              <div>
                <div className={styles.popuAndLiked}>
                  <div className={styles.popu}>
                    <Popular id={id} />
                  </div>
                  <div className={styles.liked}>
                    <LikedSongs />
                  </div>
                </div>
                <div className={styles.allPosts}>
                  <AllPosts id={id} />
                </div>
              </div>
            ) : (
              <div>
                <div className={styles.popuAndLiked}>
                  {currentUser.id === profileUser.id ? (
                    <div className={styles.noPostsYet}>
                      <p>Share your music with other users</p>
                      <button className={styles.buttonPost}>
                        <Upload />
                      </button>
                    </div>
                  ) : (
                    <p className={styles.noPostsYet}>
                      This user has not posted anything yet
                    </p>
                  )}

                  <div className={styles.liked}>
                    <LikedSongs />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Stack>
    </ThemeProvider>
  );
};

export default ProfilePage;
