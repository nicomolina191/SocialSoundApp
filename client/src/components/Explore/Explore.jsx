import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faChevronRight,
  faChevronLeft,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import styles from "./Explore.module.css";
import logoIcon from "../../images/logoicon.png";
import users from "../users.json";
import posts from "../post.json";
import image from "./Avatar.jpg";
import Loading from "../loading/Loading";

const Explore = () => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const genres = [
    "Pop",
    "Reggae",
    "Cumbia",
    "Reggaeton",
    "Jazz",
    "Blues",
    "Rock and Roll",
    "Country",
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const genrePerPage = 6;
  const lastGenre = currentPage * genrePerPage;
  const firstGenre = lastGenre - genrePerPage;
  const currentGenres = genres.slice(firstGenre, lastGenre);
  const pageNumbers = Math.ceil(genres.length / genrePerPage);

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
      if (post.title.toLowerCase().includes(inputValue.toLowerCase())) {
        posibles.push(post);
      }
      return null;
    });
    return posibles;
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
                    className={styles.genresContainer}
                    direction="row"
                    justifyContent="center"
                    flexWrap="wrap"
                    sx={{ marginBottom: "-10px" }}
                  >
                    {currentGenres.map((genre) => {
                      if (genre.length > 6) {
                        return (
                          <button
                            style={{ backgroundColor: "rgba(0, 255, 214, 1)" }}
                          >
                            {genre}
                          </button>
                        );
                      } else {
                        return (
                          <button
                            style={{
                              backgroundColor: "rgba(163, 255, 240, 1)",
                            }}
                          >
                            {genre}
                          </button>
                        );
                      }
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
                <h2 style={{ marginBottom: "-7px" }}>Sort by</h2>
                <ul>
                  <li>Most Recent</li>
                  <li>Oldest</li>
                  <li>Popularity</li>
                  <li>Relevance</li>
                </ul>
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
        <h1>No results</h1>
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
                {posibleSong().map((results) => {
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
                        <Link
                          className={styles.artistSong}
                          to={results.artistId}
                        >
                          <p style={{ fontSize: "13px", marginTop: "20px" }}>
                            {results.artist}
                          </p>
                        </Link>
                      </div>
                      <p className={styles.songDate}>{results.postDate}</p>
                    </Stack>
                  );
                })}
              </Stack>
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
                {posibleArtist().map((results) => {
                  if (results.role === "Premium") {
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
                              src={image}
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
                  } else if (results.role === "Regular") {
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
                              src={image}
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
                  return null;
                })}
              </Stack>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Explore;
