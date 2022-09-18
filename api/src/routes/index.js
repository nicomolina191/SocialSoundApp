const { Router } = require("express");
const createUser = require("../Controller/createUser.js");
const getByGenre = require("../Controller/getByGenre.js");
const createPost = require("../Controller/createPost.js");
const deleteUser = require("../Controller/deleteUser.js");
const deletePost = require("../Controller/deletePost.js");
const deleteComment = require("../Controller/deleteComment.js");
const getUsers = require("../Controller/getUsers.js");
const getPosts = require("../Controller/getPosts.js");
const createComment = require("../Controller/createComment.js");
const createLike = require("../Controller/createLike.js");
const getByTime = require("../Controller/getByTime.js");
const getUserById = require("../Controller/getUserById.js");
const getGenres = require("../Controller/getGenres.js");
const updateUser = require("../Controller/updateUser.js");
const updatePost = require("../Controller/updatePost.js");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get("/users", getUsers);
router.get('/users/:userId', getUserById);
router.get("/posts", getPosts);
router.get("/posts/genre/:genre", getByGenre);
router.get("/posts/order/:order", getByTime);
router.get("/genres", getGenres);

router.post("/users", createUser);
router.post("/posts", createPost);
router.post("/likes", createLike);
router.post("/comments", createComment);

router.delete("/users/:id", deleteUser);
router.delete("/posts/:id", deletePost);
router.delete("/comments/:id", deleteComment);

router.put("/users/:nickname", updateUser);
router.put("/posts/:id", updatePost);

module.exports = router;
