import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPost,
  getPostByGenre,
  getPostByTime,
} from "../../redux/features/post/postGetSlice";
import { getGenre } from "../../redux/features/genres/genreGetSlice";
import { Button, Modal, Stack } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Explore.module.css";

const Filters = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres.genreList).slice(1);
  const [open, setOpen] = useState(false);
  const [genresFiltered, setGenresFiltered] = useState([]);
  const [orderChecked, setOrderChecked] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const genrePerPage = 6;
  const lastGenre = currentPage * genrePerPage;
  const firstGenre = lastGenre - genrePerPage;
  const currentGenres = genres.slice(firstGenre, lastGenre);
  const pageNumbers = Math.ceil(genres.length / genrePerPage);

  useEffect(() => {
    dispatch(getGenre());
  }, [dispatch]);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

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

  function handleGenresSelected(e) {
    const currentGenresChecked = genresFiltered.indexOf(e.target.value);
    const newChecked = { genres: [...genresFiltered] };

    if (currentGenresChecked === -1) {
      newChecked.genres.push(e.target.value);
    } else {
      newChecked.genres.splice(currentGenresChecked, 1);
    }
    setGenresFiltered(newChecked.genres.map((el) => el));
    if (newChecked.genres.length === 0) {
      dispatch(getPost());
    } else {
      dispatch(getPostByGenre(newChecked));
    }
    setOrderChecked("relevance"); // borrar al hacer filtrado y orden combinado
  }

  function handleChecked(el) {
    setOrderChecked(el.target.value);
    dispatch(getPostByTime(el.target.value));
    setGenresFiltered([]); // borrar al hacer filtrado y orden combinado
  }
  return (
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
                alignItems="center"
                flexWrap="wrap"
                sx={{ height: "110px", margin: "20px 0" }}
              >
                {currentGenres.map((genre, key) => {
                  return (
                    <div key={key} className={styles.genresContainer}>
                      <input
                        onClick={handleGenresSelected}
                        id={genre.id}
                        type="checkbox"
                        value={genre.name}
                      ></input>
                      {!genresFiltered.find((el) => el === genre.name) ? (
                        <label htmlFor={genre.id}>{genre.name}</label>
                      ) : (
                        <label
                          style={{
                            backgroundColor: "rgba(0, 255, 214, 1)",
                          }}
                          htmlFor={genre.id}
                        >
                          {genre.name}
                        </label>
                      )}
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
                value="desc"
              />
              {orderChecked === "desc" ? (
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
                value="asc"
              />
              {orderChecked === "asc" ? (
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
                value="popu"
              />
              {orderChecked === "popu" ? (
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
  );
};

export default Filters;
