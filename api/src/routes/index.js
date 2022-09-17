const { Router } = require("express");
const createUser = require("../Controller/createUser.js");
const getByGenre = require("../Controller/getByGenre.js");
const createPost = require("../Controller/createPost.js");
const deleteUser = require("../Controller/deleteUser.js");
const deletePost = require("../Controller/deletePost.js");
const getUsers = require("../Controller/getUsers.js");
const getPosts = require("../Controller/getPosts.js");
const createComment = require("../Controller/createComment.js");
const createLike = require("../Controller/createLike.js");
const getByTime = require("../Controller/getByTime.js");
const getUserById = require("../Controller/getUserById.js");
const postPayment = require("../Controller/stripe");


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
//se instancia a la clase, y devuelve un objeto de stripe, que tiene metodos para registrar un pago

const router = Router();

router.get("/users", getUsers);
router.get('/users/:userId', getUserById);
router.get("/posts", getPosts);
router.get("/posts/genre/:genre", getByGenre);
router.get("/posts/order/:order", getByTime);

router.post("/users", createUser);
router.post("/posts", createPost);
router.post("/likes", createLike);
router.post("/comments", createComment);

router.delete("/users/:id", deleteUser);
router.delete("/posts/:id", deletePost);

router.post('/create-checkout-session', postPayment);

module.exports = router;
