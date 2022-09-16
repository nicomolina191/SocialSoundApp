import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faChevronRight,
  faChevronLeft,
  faChevronDown,
  faPlay,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import styles from "./Explore.module.css";
import logoIcon from "../../images/logoicon.png";
import { getUser } from "../../redux/features/users/usersGetSlice";
import { getPost } from "../../redux/features/post/postGetSlice";
import { useEffect } from "react";

const Explore = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.usersList);
  const posts = useSelector((state) => state.posts.postList);
  const genres = [
    "Pop",
    "Reggae",
    "Cumbia",
    "Reggaeton",
    "Jazz",
    "Blues",
    "Rock and Roll",
    "Country",
    "Trap",
  ];
  const [inputValue, setInputValue] = useState("");
  let [artistsPerPage, setArtistsPerPage] = useState(8);
  let currentArtists = posibleArtist().slice(0, artistsPerPage);
  let [songsPerPage, setSongsPerPage] = useState(9);
  let currentSongs = posibleSong().slice(0, songsPerPage);

  const [open, setOpen] = useState(false);
  const [orderChecked, setOrderChecked] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const genrePerPage = 6;
  const lastGenre = currentPage * genrePerPage;
  const firstGenre = lastGenre - genrePerPage;
  const currentGenres = genres.slice(firstGenre, lastGenre);
  const pageNumbers = Math.ceil(genres.length / genrePerPage);

  useEffect(() => {
    dispatch(getUser());
    dispatch(getPost());
  }, []);

  function nextPage() {
    if (currentPage < pageNumbers) {
      setCurrentPage(currentPage + 1);
    }
  }

  function previousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleChecked(el) {
    setOrderChecked("");
    setOrderChecked(el.target.value);
  }

  function handleArtistsPerPage() {
    setArtistsPerPage(artistsPerPage + 8);
    currentArtists = posibleArtist().slice(0, artistsPerPage);
  }

  function handleSongsPerPage() {
    setSongsPerPage(songsPerPage + 8);
    currentSongs = posibleSong().slice(0, songsPerPage);
  }

  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }

  function posibleArtist() {
    const posibles = [];
    users.map((user) => {
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
    posts.map((post) => {
      if (
        post.title.toLowerCase().includes(inputValue.toLowerCase()) ||
        songArtist(post).toLowerCase().includes(inputValue.toLowerCase())
      ) {
        posibles.push(post);
      }
      return null;
    });
    return posibles;
  }

  function songArtist(el) {
    const artist = users.filter((user) => user.id === el.userId);
    return artist[0].username;
  }

  function handleInputChange(e) {
    setInputValue(e.target.value);
    posibleArtist();
    posibleSong();
  }

  return (
    <div
      className={styles.container}
      style={{
        height: "100vh",
        paddingLeft: "15px",
        paddingRight: "15px",
      }}
    >
      <div className={styles.fondo}></div>
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
        <Stack
          direction="row"
          justifyContent="left"
          alignItems="center"
          sx={{
            backgroundColor: "white",
            height: "40px",
            borderRadius: "8px",
          }}
        >
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
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "rgba(129, 129, 129, 1)",
              width: "500px",
              outline: "none",
              border: "none",
            }}
          />
        </Stack>
        <div>
          <Button
            onClick={handleOpen}
            variant="contained"
            sx={{
              backgroundColor: "rgba(0, 255, 214, 1)",
              color: "rgba(0, 10, 31, 1)",
              fontWeight: 500,
              height: "40px",
              textTransform: "none",
              width: "110px",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "rgba(0, 255, 214, 0.7)",
              },
            }}
          >
            Filters
          </Button>
          <Modal open={open} onClose={handleClose}>
            <Stack
              direction="column"
              justifyContent="space-between"
              sx={{
                width: "600px",
                position: "absolute",
                right: "15px",
                top: "160px",
                backgroundColor: "rgba(4, 14, 36, 1)",
                borderRadius: "20px",
                padding: "10px 20px",
              }}
              className={styles.modalContainer}
            >
              <div>
                <h2>Genres</h2>
                <Stack direction="row" justifyContent="space-between">
                  {currentPage > 1 ? (
                    <button className={styles.buttonPages}>
                      <p onClick={previousPage}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                      </p>
                    </button>
                  ) : (
                    <button className={styles.buttonPagesDisabled} disabled>
                      <p onClick={previousPage}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                      </p>
                    </button>
                  )}
                  <Stack
                    direction="row"
                    justifyContent="center"
                    flexWrap="wrap"
                    sx={{ marginBottom: "-10px" }}
                  >
                    {currentGenres.map((genre) => {
                      return (
                        <div className={styles.genresContainer}>
                          <input id={genre} type="checkbox"></input>
                          <label htmlFor={genre}>{genre}</label>
                        </div>
                      );
                    })}
                  </Stack>
                  {currentPage !== pageNumbers ? (
                    <button className={styles.buttonPages}>
                      <p onClick={nextPage}>
                        <FontAwesomeIcon icon={faChevronRight} />
                      </p>
                    </button>
                  ) : (
                    <button className={styles.buttonPagesDisabled} disabled>
                      <p onClick={nextPage}>
                        <FontAwesomeIcon icon={faChevronRight} />
                      </p>
                    </button>
                  )}
                </Stack>
              </div>
              <div>
                <h2 style={{ marginBottom: "15px" }}>Sort by</h2>
                <div className={styles.sortContainer}>
                  <input
                    onClick={(e) => handleChecked(e)}
                    name="order"
                    id="mostRecent"
                    type="radio"
                    value="mostRecent"
                  />
                  {orderChecked === "mostRecent" ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                      }}
                    >
                      <label
                        style={{ color: "rgba(0, 226, 190, 1)" }}
                        htmlFor="mostRecent"
                      >
                        Most Recent
                      </label>
                      <FontAwesomeIcon
                        style={{
                          fontSize: "18px",
                          marginLeft: "8px",
                          color: "rgba(0, 226, 190, 1)",
                        }}
                        icon={faCircleCheck}
                      />
                    </div>
                  ) : (
                    <label htmlFor="mostRecent">Most Recent</label>
                  )}

                  <input
                    onClick={(e) => handleChecked(e)}
                    name="order"
                    id="oldest"
                    type="radio"
                    value="oldest"
                  />
                  {orderChecked === "oldest" ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                      }}
                    >
                      <label
                        style={{ color: "rgba(0, 226, 190, 1)" }}
                        htmlFor="oldest"
                      >
                        Oldest
                      </label>
                      <FontAwesomeIcon
                        style={{
                          fontSize: "18px",
                          marginLeft: "8px",
                          color: "rgba(0, 226, 190, 1)",
                        }}
                        icon={faCircleCheck}
                      />
                    </div>
                  ) : (
                    <label htmlFor="oldest">Oldest</label>
                  )}

                  <input
                    onClick={(e) => handleChecked(e)}
                    name="order"
                    id="popularity"
                    type="radio"
                    value="popularity"
                  />
                  {orderChecked === "popularity" ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                      }}
                    >
                      <label
                        style={{ color: "rgba(0, 226, 190, 1)" }}
                        htmlFor="popularity"
                      >
                        Popularity
                      </label>
                      <FontAwesomeIcon
                        style={{
                          fontSize: "18px",
                          marginLeft: "8px",
                          color: "rgba(0, 226, 190, 1)",
                        }}
                        icon={faCircleCheck}
                      />
                    </div>
                  ) : (
                    <label htmlFor="popularity">Popularity</label>
                  )}

                  <input
                    onClick={(e) => handleChecked(e)}
                    name="order"
                    id="relevance"
                    type="radio"
                    value="relevance"
                  />
                  {orderChecked === "relevance" ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                      }}
                    >
                      <label
                        style={{ color: "rgba(0, 226, 190, 1)" }}
                        htmlFor="relevance"
                      >
                        Relevance
                      </label>
                      <FontAwesomeIcon
                        style={{
                          fontSize: "18px",
                          marginLeft: "8px",
                          color: "rgba(0, 226, 190, 1)",
                        }}
                        icon={faCircleCheck}
                      />
                    </div>
                  ) : (
                    <label htmlFor="relevance">Relevance</label>
                  )}
                </div>
              </div>
            </Stack>
          </Modal>
        </div>
      </Stack>

      {!inputValue ? (
        <Typography
          variant="h4"
          component="h3"
          sx={{ color: "white", fontWeight: "600", marginTop: "50px" }}
        >
          For you.
        </Typography>
      ) : posibleArtist().length === 0 && posibleSong().length === 0 ? (
        <h1 style={{ color: "white", textAlign: "center", marginTop: "200px" }}>
          No results
        </h1>
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
                {currentSongs.map((results) => {
                  return (
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="start"
                      alignItems="center"
                      sx={{
                        position: "relative",
                        color: "white",
                        backgroundColor: "rgba(0, 7, 20, 0.40)",
                        padding: "10px",
                        borderRadius: "15px",
                        boxShadow: "0px 40px 40px 8px rgba(0, 0, 0, 0.2)",
                        width: "400px",
                        margin: "20px 20px 10px 0",
                        "&:hover": {
                          transform: "scale(1.03)",
                          transition: "0.5s",
                        },
                      }}
                    >
                      <div
                        className={styles.songContainer}
                        style={{ position: "relative" }}
                      >
                        <img
                          src={logoIcon}
                          alt=""
                          style={{
                            height: "80px",
                            width: "80px",
                            borderRadius: "50px",
                          }}
                        />
                        <p>
                          <FontAwesomeIcon icon={faPlay} />
                        </p>
                      </div>
                      <div>
                        <p>{results.title}</p>
                        <Link className={styles.artistSong} to={results.userId}>
                          <p style={{ fontSize: "13px", marginTop: "20px" }}>
                            {songArtist(results)}
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
            </div>
          ) : null}

          {currentSongs.length < posibleSong().length ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <FontAwesomeIcon
                onClick={handleSongsPerPage}
                style={{
                  fontSize: "50px",
                  margin: "20px auto 30px",
                  color: "white",
                }}
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
                {currentArtists.map((results) => {
                  if (results.plan === "Premium") {
                    return (
                      <Link
                        to={`/home/explore/${results.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Stack
                          direction="row"
                          spacing={2}
                          justifyContent="start"
                          alignItems="center"
                          sx={{
                            cursor: "pointer",
                            color: "white",
                            backgroundColor: "rgba(0, 7, 20, 0.40)",
                            padding: "10px",
                            borderRadius: "15px",
                            boxShadow: "0px 40px 40px 8px rgba(0, 0, 0, 0.2)",
                            width: "300px",
                            margin: "20px 20px 10px 0",
                            "&:hover": {
                              color: "rgba(0, 226, 190, 1)",
                              transform: "scale(1.03)",
                              transition: "0.5s",
                            },
                          }}
                        >
                          <div>
                            <img
                              style={{
                                height: "80px",
                                width: "80px",
                                borderRadius: "50px",
                                marginTop: "5px",
                              }}
                              src={results.avatar}
                              alt=""
                            />
                          </div>
                          <div>
                            <p style={{ fontSize: "19px", marginTop: "10px" }}>
                              {results.name}
                            </p>
                            <p
                              style={{
                                fontSize: "13px",
                                marginTop: "-10px",
                                color: "rgba(129, 129, 129, 1)",
                              }}
                            >
                              @{results.username}
                            </p>
                          </div>
                        </Stack>
                      </Link>
                    );
                  } else {
                    return (
                      <Link
                        to={`/home/explore/${results.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Stack
                          direction="row"
                          spacing={2}
                          justifyContent="start"
                          alignItems="center"
                          sx={{
                            cursor: "pointer",
                            color: "white",
                            backgroundColor: "rgba(0, 7, 20, 0.40)",
                            padding: "10px",
                            borderRadius: "15px",
                            boxShadow: "0px 40px 40px 8px rgba(0, 0, 0, 0.2)",
                            width: "300px",
                            margin: "20px 20px 10px 0",
                            "&:hover": {
                              color: "rgba(0, 226, 190, 1)",
                              transform: "scale(1.03)",
                              transition: "0.5s",
                            },
                          }}
                        >
                          <div>
                            <img
                              style={{
                                height: "80px",
                                width: "80px",
                                borderRadius: "50px",
                                marginTop: "5px",
                              }}
                              src={results.avatar}
                              alt=""
                            />
                          </div>
                          <div>
                            <p style={{ fontSize: "19px", marginTop: "10px" }}>
                              {results.name}
                            </p>
                            <p
                              style={{
                                fontSize: "13px",
                                marginTop: "-10px",
                                color: "rgba(129, 129, 129, 1)",
                              }}
                            >
                              @{results.username}
                            </p>
                          </div>
                        </Stack>
                      </Link>
                    );
                  }
                })}
                {currentArtists.length < posibleArtist().length ? (
                  <FontAwesomeIcon
                    onClick={handleArtistsPerPage}
                    style={{
                      fontSize: "50px",
                      margin: "30px auto 0",
                      color: "white",
                    }}
                    icon={faChevronDown}
                  />
                ) : null}
              </Stack>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Explore;
