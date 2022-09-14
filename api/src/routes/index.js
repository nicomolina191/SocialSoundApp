const { Users, Posts } = require("../db");
const { Router } = require("express");
const createUser = require("../Controller/createUser");
const updateUser = require("../Controller/updateUser");
const createPost = require("../Controller/createPost");
const updatePost = require("../Controller/updatePost");
const getUser = require("../Controller/getUser");
const getPost = require("../Controller/getPost");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// router.use()

router.get("/user", getUser);
router.get("/post", getPost);
// router.post("/users", async (req, res) => {
//   const { name, role, email, password, username, avatar } = req.body;
//   try {
//     let user = await Users.create({
//       name,
//       role,
//       email,
//       password,
//       username,
//       avatar,
//     });
//     res.json(user);
//   } catch (err) {
//     res.status(404).send(err);
//   }
// });

router.post("/users", createUser);

// router.put("/users/:nickname", async (req, res) => {
//   const { nickname } = req.params;
//   const { name, username, avatar } = req.body;
//   try {
//     let user = await Users.findOne({ where: { username: nickname } });
//     user.update({
//       name,
//       username,
//       avatar,
//     });
//     await user.save();
//     res.json(user);
//   } catch (err) {
//     res.status(404).send(err);
//   }
// });

router.put("/users/:nickname", updateUser);

// router.post("/posts", async (req, res) => {
//   const { description, title, content, email } = req.body;
//   try {
//     let post = await Posts.create({
//       description,
//       title,
//       content,
//     });
//     let user = await Users.findOne({ where: { email } });
//     post.setUser(user);
//     res.json(post);
//   } catch (err) {
//     res.status(404).send(err);
//   }
// });

router.post("/posts", createPost);

// router.put("/posts/:id", async (req, res) => {
//   const { id } = req.params;
//   const { description, title, content } = req.body;
//   try {
//     let post = await Posts.findOne({ where: { id } });
//     post.update({
//       description,
//       title,
//       content,
//     });
//     await post.save();
//     res.json(post);
//   } catch (err) {
//     res.status(404).send(err);
//   }
// });

router.put("/posts/:id", updatePost);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
