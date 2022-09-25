import React, { useState } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Slide,
  SvgIcon,
  Typography,
} from "@mui/material";
import ReactPlayer from "react-player";
import style from "./post.module.css";
import { useEffect } from "react";
import axios from "axios";
import CommentsContainer from "../commentsContainer/CommentsContainer";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Post({ post, comments, margin }) {
  console.log(post);
  const shareURL = `www.socialsound.art/home/post/${post.id}`;
  const [user, setUser] = useState();
  const [like, setLike] = useState();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [date, setDate] = useState();
  const currentUser = useSelector((state) => state.users.currentUser);
  const [likes, setLikes] = useState();
  const [click, setClick] = useState();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function getLikes() {
    const res = await axios.get(`/likes/${post.id}`);
    setLikes(res.data);
    // setLikes(likesHardcorde.filter(like => like.postId === post.id))
  }

  const handleLike = () => {
    setLike(!like);
    setClick(!click);
  };

  useEffect(() => {
    async function getUser() {
      const res = await axios.get(`/users/${post.userId}`);
      setUser(res.data);
    }
    getUser();
    getLikes();
  }, []);

  useEffect(() => {
    if (like === undefined && likes !== undefined) {
      async function getLikeOfThisUser() {
        const res = await axios.get(`/likes/${post.id}/${currentUser.id}`);
        setLike(res.data[0]?.isActive);
        // setLike(!!likes?.find(like => like.postId === post.id && like.userId === currentUser.id)?.statusLike)
      }
      getLikeOfThisUser();
    }
  }, [likes]);

  useEffect(() => {
    async function updateLikes() {
      if (click !== undefined) {
        await getLikes();
        const res = await axios.get(`/likes/${post.id}/${currentUser.id}`);
        const currentLike = (res.data && res.data[0]) || {};
        console.log(currentLike);
        async function updateLike() {
          await axios.put(`/likes`, {
            postId: post.id,
            userId: currentUser.id,
            isActive: like,
          });
          // currentLike.statusLike = like
        }
        async function createLike() {
          await axios.post(`/likes`, {
            idPost: post.id,
            idUser: currentUser.id,
          });

          // likesHardcorde.push({ statusLike: like, postId: post.id, userId: currentUser.id })
        }
        Object.keys(currentLike).length === 0
          ? await createLike()
          : await updateLike();
        await getLikes();
      }
    }
    updateLikes();
  }, [click]);
  // useEffect(()=>{
  //     getLikes()
  // },[likes])

  console.log(like);
  console.log(likes);
  console.log(likes?.filter((likes) => likes.isActive).length);

  useEffect(() => {
    setDate(new Date(Date.parse(post.postDate)).toLocaleString("sv"));
  }, [post]);

  return (
    <Grid
      container
      direction="column"
      className={style.post}
      p={`1%`}
      m={margin}
    >
      <Grid item container spacing={1}>
        <Grid item>
          <Link to={`/home/explore/${post.userId}`}>
            <Avatar
              src={user && user.avatar}
              sx={{
                "&:hover": {
                  filter: "brightness(70%)",
                },
              }}
            />
          </Link>
        </Grid>
        <Grid item container xs={4} direction="column">
          <Link to={`/home/explore/${post.userId}`}>
            <Typography
              sx={{
                "&:hover": {
                  color: "white",
                  cursor: "pointer",
                },
              }}
              variant="body1"
            >
              {user && user.name}
            </Typography>
          </Link>
          <Link to={`/home/explore/${post.userId}`}>
            <Typography
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  textDecoration: "underline"
                },
              }}
              variant="body2"
            >
              {user && `@${user.username}`}
            </Typography>
          </Link>
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="h6">{post.title}</Typography>
        <Typography variant="body1">{post.description}</Typography>
      </Grid>
      <Grid item className={style.playerWrapper}>
        <ReactPlayer
          url={post.content}
          controls
          className={style.reactPlayer}
          width="100%"
          height="100%"
        />
      </Grid>
      <Grid item container justifyContent="space-between">
        <Grid item>
          <Typography variant="body2">
            {date &&
              `${date.split(" ")[1].split(":")[0]}:${
                date.split(" ")[1].split(":")[1]
              } · ${
                monthNames[parseInt(date.split(" ")[0].split("-")[1]) - 1]
              } ${date.split(" ")[0].split("-")[2]}, ${
                date.split(" ")[0].split("-")[0]
              }`}
          </Typography>
        </Grid>
        <Grid item container xs={4} justifyContent="flex-end" spacing={2}>
          <Grid item>
            <Typography>
              {likes?.filter((likes) => likes.isActive).length === 0
                ? ""
                : likes?.filter((likes) => likes.isActive).length}
            </Typography>
          </Grid>
          <Grid item>
            <button onClick={handleLike}>
              <SvgIcon
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 612 512"
                className={style.icon}
              >
                {like ? (
                  <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                ) : (
                  <path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z" />
                )}
              </SvgIcon>
            </button>
          </Grid>
          <Grid item>
            <button onClick={handleClickOpen}>
              <SvgIcon
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 612 512"
                className={style.icon}
              >
                <path d="M568.5 142.6l-144-135.1c-9.625-9.156-24.81-8.656-33.91 .9687c-9.125 9.625-8.688 24.81 .9687 33.91l100.1 94.56h-163.4C287.5 134.2 249.7 151 221 179.4C192 208.2 176 246.7 176 288v87.1c0 13.25 10.75 23.1 24 23.1S224 389.3 224 376V288c0-28.37 10.94-54.84 30.78-74.5C274.3 194.2 298.9 183 328 184h163.6l-100.1 94.56c-9.656 9.094-10.09 24.28-.9687 33.91c4.719 4.1 11.06 7.531 17.44 7.531c5.906 0 11.84-2.156 16.47-6.562l144-135.1C573.3 172.9 576 166.6 576 160S573.3 147.1 568.5 142.6zM360 384c-13.25 0-24 10.75-24 23.1v47.1c0 4.406-3.594 7.1-8 7.1h-272c-4.406 0-8-3.594-8-7.1V184c0-4.406 3.594-7.1 8-7.1H112c13.25 0 24-10.75 24-23.1s-10.75-23.1-24-23.1H56c-30.88 0-56 25.12-56 55.1v271.1C0 486.9 25.13 512 56 512h272c30.88 0 56-25.12 56-55.1v-47.1C384 394.8 373.3 384 360 384z" />
              </SvgIcon>
            </button>
            <Grid item className={style.dialogContainer}>
              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                className={style.dialog}
                PaperProps={{
                  style: {
                    backgroundColor: "#000A1F",
                    color: "#1976FA",
                    padding: "1%",
                  },
                }}
              >
                <h2>Share!</h2>

                <DialogContent className={style.dialogContent}>
                  <FacebookShareButton url={shareURL} style={{ margin: `2%` }}>
                    <FacebookIcon size={32} round={true} />
                  </FacebookShareButton>
                  <TwitterShareButton url={shareURL} style={{ margin: `2%` }}>
                    <TwitterIcon size={32} round={true} />
                  </TwitterShareButton>
                  <TelegramShareButton url={shareURL} style={{ margin: `2%` }}>
                    <TelegramIcon size={32} round={true} />
                  </TelegramShareButton>
                  <WhatsappShareButton url={shareURL} style={{ margin: `2%` }}>
                    <WhatsappIcon size={32} round={true} />
                  </WhatsappShareButton>
                  <LinkedinShareButton url={shareURL} style={{ margin: `2%` }}>
                    <LinkedinIcon size={32} round={true} />
                  </LinkedinShareButton>
                  <EmailShareButton url={shareURL} style={{ margin: `2%` }}>
                    <EmailIcon size={32} round={true} />
                  </EmailShareButton>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} className={style.button}>
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
          <Grid item>
            {comments ? (
              ""
            ) : (
              <Link to={`/home/post/${post.id}`}>
                <button>
                  <SvgIcon
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 612 512"
                    className={style.icon}
                  >
                    <path d="M256 32C114.6 32 .0272 125.1 .0272 240c0 47.63 19.91 91.25 52.91 126.2c-14.88 39.5-45.87 72.88-46.37 73.25c-6.625 7-8.375 17.25-4.625 26C5.818 474.2 14.38 480 24 480c61.5 0 109.1-25.75 139.1-46.25C191.1 442.8 223.3 448 256 448c141.4 0 255.1-93.13 255.1-208S397.4 32 256 32zM256.1 400c-26.75 0-53.12-4.125-78.38-12.12l-22.75-7.125l-19.5 13.75c-14.25 10.12-33.88 21.38-57.5 29c7.375-12.12 14.37-25.75 19.88-40.25l10.62-28l-20.62-21.87C69.82 314.1 48.07 282.2 48.07 240c0-88.25 93.25-160 208-160s208 71.75 208 160S370.8 400 256.1 400z" />
                  </SvgIcon>
                </button>
              </Link>
            )}
          </Grid>
        </Grid>
      </Grid>
      {comments ? <CommentsContainer idPost={post.id} /> : ""}
    </Grid>
  );
}
