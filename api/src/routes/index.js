const { Router } = require("express");
const createUser = require("../Controller/createUser.js");
const getByGenre = require("../Controller/getByGenre.js");
const createPost = require("../Controller/createPost.js");
const deleteUser = require("../Controller/deleteUser.js");
const deletePost = require("../Controller/deletePost.js");
const getUsers = require("../Controller/getUsers.js");
const getPosts = require("../Controller/getPosts.js");
const getByTime = require("../Controller/getByTime.js");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get("/users", getUsers);
router.get("/posts", getPosts);
router.get("/posts/genre/:genre", getByGenre);
router.get("/posts/order/:order", getByTime);

router.post("/users", createUser);
router.post("/posts", createPost);



router.delete("/users/:id", deleteUser);
router.delete("/posts/:id", deletePost);

module.exports = router;