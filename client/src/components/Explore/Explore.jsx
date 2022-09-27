import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faChevronDown,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { Typography, createTheme, ThemeProvider } from "@mui/material";
import { Stack } from "@mui/system";
import styles from "./Explore.module.css";
import logoIcon from "../../images/logoicon.png";
import {
  getUser,
  getUserByFirebaseId,
  getUserById,
} from "../../redux/features/users/usersGetSlice";
import { getPost } from "../../redux/features/post/postGetSlice";
import { useEffect } from "react";
import Post from "../post/Post";
import SideBar from "../SideBar/SideBar";
import { useAuth } from "../../context";
import Filters from "./Filters";

//hay que sacar el preload revisar el tipo si es video o audio
const Explore = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.usersList);
  const user = useSelector((state) => state.users.user);
  const posts = useSelector((state) => state.posts.postList);
  const userDB = useSelector((state) => state.users.currentUser);

  const [inputValue, setInputValue] = useState("");
  let [artistsPerPage, setArtistsPerPage] = useState(10);
  let currentArtists = posibleArtist().slice(0, artistsPerPage);
  let [songsPerPage, setSongsPerPage] = useState(9);
  let currentSongs;
  if (inputValue) {
    currentSongs = posibleSong().slice(0, songsPerPage);
  }

  const { userFirebase } = useAuth();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getPost());
    dispatch(getUserById(posts.userId));
    dispatch(getUserByFirebaseId(userFirebase.uid));
  }, [dispatch]);

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

  function handleArtistsPerPage() {
    setArtistsPerPage(artistsPerPage + 10);
    currentArtists = posibleArtist().slice(0, artistsPerPage);
  }

  function handleSongsPerPage() {
    setSongsPerPage(songsPerPage + 8);
    currentSongs = posibleSong().slice(0, songsPerPage);
  }

  function posibleArtist() {
    const posibles = [];
    users?.map((user) => {
      if (
        user.username.toLowerCase().includes(inputValue.toLowerCase()) ||
        user.name.toLowerCase().includes(inputValue.toLowerCase())
      ) {
        posibles.push(user);
      }
      return null;
    });
    return posibles;
  }

  function posibleSong() {
    const posibles = [];
    posts?.map((post) => {
      if (post.title.toLowerCase().includes(inputValue.toLowerCase())) {
        posibles.push(post);
      }
      return null;
    });
    return posibles;
  }

  function handleInputChange(e) {
    setInputValue(e.target.value);
    setSongsPerPage(8);
    setArtistsPerPage(10);
    posibleArtist();
    posibleSong();
  }
  return (
    <ThemeProvider theme={theme}>
      <Stack direction="row">
        <div className={styles.fondo}></div>
        <div style={{ minWidth: "266px" }}>
          <SideBar userDB={userDB} />
        </div>
        <div className={styles.container}>
          <Typography
            variant="h2"
            component="h1"
            sx={{ fontWeight: "700", color: "white", paddingTop: "30px" }}
          >
            Explore.
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            sx={{ marginTop: "13px" }}
          >
            <div className={styles.containerSearchBar}>
              <FontAwesomeIcon
                style={{
                  color: "rgba(129, 129, 129, 1)",
                  fontSize: "15px",
                  padding: "0 10px",
                }}
                icon={faMagnifyingGlass}
              />
              <input
                onChange={(e) => handleInputChange(e)}
                placeholder="Search for users or songs..."
              />
            </div>
            <Filters />
          </Stack>

          <div className={styles.containerContent}>
            {!inputValue ? (
              <Stack>
                <Typography
                  className={styles.forYouText}
                  variant="h4"
                  component="h3"
                >
                  For you.
                </Typography>

                {posts.length === 0 ? (
                  <h1 className={styles.noResultsText}>No results</h1>
                ) : (
                  <Stack spacing={0} sx={{ marginTop: "20px" }}>
                    {posts.length > 0 &&
                      posts?.map((post, i) => <Post key={i} post={post} />)}
                  </Stack>
                )}
              </Stack>
            ) : (posibleArtist().length === 0 && posibleSong().length === 0) ||
              !posts ? (
              <h1 className={styles.noResultsText}>No results</h1>
            ) : (
              <div style={{ marginTop: "30px" }}>
                <div>
                  <Typography
                    variant="h4"
                    component="h3"
                    sx={{ color: "white", fontWeight: "600" }}
                  >
                    Results
                  </Typography>
                </div>
                {posibleSong().length > 0 ? (
                  <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                    <Typography
                      variant="h5"
                      component="h4"
                      sx={{ color: "rgba(0, 226, 190, 1)", fontWeight: "600" }}
                    >
                      Songs
                    </Typography>
                    <Stack
                      direction="row"
                      justifyContent="start"
                      alignItems="center"
                      flexWrap="wrap"
                    >
                      <Stack direction="row" flexWrap="wrap">
                        {currentSongs.map((results) => {
                          return (
                            <Stack
                              direction="row"
                              spacing={2}
                              justifyContent="start"
                              alignItems="center"
                              className={styles.songsContainer}
                            >
                              <div
                                className={styles.songContainer}
                                style={{ position: "relative" }}
                              >
                                <img src={logoIcon} alt="" />
                                <p className={styles.playButton}>
                                  <FontAwesomeIcon icon={faPlay} />
                                </p>
                              </div>
                              <div>
                                <p>{results.title}</p>

                                <Link
                                  className={styles.artistSong}
                                  to={results.userId}
                                >
                                  <p
                                    style={{
                                      fontSize: "13px",
                                      marginTop: "20px",
                                    }}
                                  >
                                    {user && user.username}
                                  </p>
                                </Link>
                              </div>
                              <p className={styles.songDate}>
                                {results.postDate.slice(0, 10)}
                              </p>
                            </Stack>
                          );
                        })}
                      </Stack>
                    </Stack>
                  </div>
                ) : null}
                {currentSongs.length < posibleSong().length ? (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <FontAwesomeIcon
                      className={styles.showMoreButton}
                      onClick={handleSongsPerPage}
                      icon={faChevronDown}
                    />
                  </div>
                ) : null}

                {posibleArtist().length > 0 ? (
                  <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                    <Typography
                      variant="h5"
                      component="h4"
                      sx={{ color: "rgba(0, 226, 190, 1)", fontWeight: "600" }}
                    >
                      Artists
                    </Typography>
                    <Stack
                      direction="row"
                      justifyContent="start"
                      alignItems="center"
                      flexWrap="wrap"
                    >
                      <Stack>
                        <Stack direction="row" flexWrap="wrap">
                          {currentArtists.map((results) => {
                            if (results.plan === "Premium") {
                              return (
                                <Link
                                  to={`/home/explore/${results.id}`}
                                  style={{ textDecoration: "none" }}
                                >
                                  <div className={styles.artistContainer}>
                                    <div>
                                      <img src={results.avatar} alt="" />
                                    </div>
                                    <div className={styles.containerArtistData}>
                                      <p className={styles.artistName}>
                                        {results.name}
                                      </p>
                                      <p className={styles.artistUsername}>
                                        @{results.username}
                                      </p>
                                    </div>
                                  </div>
                                </Link>
                              );
                            } else {
                              return (
                                <Link
                                  to={`/home/explore/${results.id}`}
                                  style={{ textDecoration: "none" }}
                                >
                                  <div className={styles.artistContainer}>
                                    <div>
                                      <img src={results.avatar} alt="" />
                                    </div>
                                    <div className={styles.containerArtistData}>
                                      <p className={styles.artistName}>
                                        {results.name}
                                      </p>
                                      <p className={styles.artistUsername}>
                                        @{results.username}
                                      </p>
                                    </div>
                                  </div>
                                </Link>
                              );
                            }
                          })}
                        </Stack>
                        {currentArtists.length < posibleArtist().length ? (
                          <FontAwesomeIcon
                            className={styles.showMoreButton}
                            onClick={handleArtistsPerPage}
                            icon={faChevronDown}
                          />
                        ) : null}
                      </Stack>
                    </Stack>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </Stack>
    </ThemeProvider>
  );
};

export default Explore;
