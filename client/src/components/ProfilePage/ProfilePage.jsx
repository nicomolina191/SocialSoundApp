import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserById,
  getUserLikes,
  cleanUserState,
  setUserFollow,
  setUserUnfollow,
} from "../../redux/features/users/usersGetSlice";
import { getPost } from "../../redux/features/post/postGetSlice";
import { Stack, ThemeProvider } from "@mui/system";
import { Button, createTheme, Menu, MenuItem, Modal } from "@mui/material";
import styles from "./ProfilePage.module.css";
import SideBar from "../SideBar/SideBar";
import checkIcon from "../../images/checkIcon.png";
import Popular from "./Popular";
import LikedSongs from "./LikedSongs";
import AllPosts from "./AllPosts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import EditProfile from "./EditProfile";
import Upload from "../Upload/Upload";
import { changeUserChat } from "../../redux/features/chat/chatGetSlice";
import PlayAllButton from "../PlayAllButton/PlayAllButton";
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase'

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const profileUser = useSelector((state) => state.users.user);
  const currentUser = useSelector((state) => state.users.currentUser);
  const profileUserFollowers = useSelector(
    (state) => state.users.user.FollowerUsers
  );
  const allPosts = useSelector((state) => state.posts.possListAll);
  const artistPosts = Array.isArray(allPosts)
    ? allPosts.filter((post) => post.userId === id)
    : [];
  const userDB = useSelector((state) => state.users.currentUser);
  const [open, setOpen] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    dispatch(cleanUserState());
  }, []);

  useEffect(() => {
    dispatch(getPost());
    dispatch(getUserById(id));
    dispatch(getUserLikes(id));
  }, [dispatch]);

  useEffect(() => {
    getFollowOfThisUser();
  });

  function getFollowOfThisUser() {
    let check
    if (profileUserFollowers) {
      check = profileUserFollowers.find(
        (user) => user.id === currentUser.id
      );
    }
    if (check !== undefined) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
    return check
  }

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

  const handleFollow = () => {
    dispatch(
      setUserFollow({
        idUser: currentUser.id,
        followTo: profileUser.id,
      })
    );
    setFollowed(true);
  };

  const handleUnfollow = () => {
    dispatch(
      setUserUnfollow({
        idUser: currentUser.id,
        followTo: profileUser.id,
      })
    );
    setFollowed(false);
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

  const handleOnSelect = async() => {
    const combinedId = currentUser.idgoogle > profileUser.idgoogle ? currentUser.idgoogle + profileUser.idgoogle : profileUser.idgoogle + currentUser.idgoogle;
    dispatch(changeUserChat({destination: profileUser, chatId: combinedId}))
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userConversations", currentUser.idgoogle), {
          [combinedId + ".userInfo"]: {
            uid: profileUser.idgoogle,
            displayName: profileUser.name,
            photoURL: profileUser.avatar,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userConversations", profileUser.idgoogle), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.idgoogle,
            displayName: currentUser.name,
            photoURL: currentUser.avatar,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err){console.log(err)}
  };

  return (
    <ThemeProvider theme={theme}>
      <Stack direction="row">
        <div className={styles.fondo}></div>

        <div className={styles.containerSideBar}>
          <SideBar userDB={userDB} />
        </div>

        <div className={styles.containerProfile}>
          <div className={styles.containerProfileData}>
            <div
              style={{
                background: `url(${profileUser?.banner})`,
                backgroundSize: "cover",
                backgroundColor: "brightness(50%)",
                position: "absolute",
                width: "100%",
                height: "100%",
                zIndex: "-100",
                filter: "blur(1px)",
              }}
            ></div>
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
                    {profileUser.FollowerUsers?.length === 1
                      ? `${profileUser?.FollowerUsers?.length} follower `
                      : `${profileUser?.FollowerUsers?.length} followers `}
                    {profileUser.FollowingUsers?.length > 0
                      ? profileUser.FollowingUsers.length === 1
                        ? ` ・ Follow ${profileUser?.FollowingUsers?.length} user`
                        : ` ・ Follow ${profileUser?.FollowingUsers?.length} users`
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
            <div className={styles.playFollowMessageContainer}>
              <div className={styles.playFollowContainer}>
                {artistPosts.length > 0 ? (
                  <div>
                    <PlayAllButton songs={artistPosts} />
                  </div>
                ) : null}
                {currentUser.id !== profileUser.id ? (
                  !followed ? (
                    <Button
                      onClick={handleFollow}
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
                  ) : (
                    <Button
                      onClick={handleUnfollow}
                      variant="contained"
                      sx={{
                        height: "48px",
                        marginLeft: "30px",
                        fontSize: "18px",
                        color: "black",
                        fontWeight: "500",
                        backgroundColor: "rgba(195, 195, 195, 1)",
                        width: "110px",
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "rgba(195, 195, 195, 0.8)",
                        },
                      }}
                    >
                      Following
                    </Button>
                  )
                ) : null}
              </div>
              {currentUser.id !== profileUser.id ? (
                <div>
                  <p
                    style={{
                      color: "white",
                      fontSize: "30px",
                      marginLeft: "10px",
                    }}
                  >
                    <Link to="/messages">
                      <FontAwesomeIcon
                        onClick={handleOnSelect}
                        icon={faEnvelope}
                      />
                    </Link>
                  </p>
                </div>
              ) : null}
            </div>
            {artistPosts.length > 0 ? (
              <div>
                <div className={styles.popuAndLiked}>
                  <div className={styles.popu}>
                    <Popular id={id} />
                  </div>
                  <div className={styles.liked}>
                    <LikedSongs id={id} />
                  </div>
                </div>
                <div className={styles.allPosts}>
                  <AllPosts artistPostsObj={artistPosts} />
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
