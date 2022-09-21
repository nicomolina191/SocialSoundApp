const { Users, Posts, Comments, Likes } = require('../../db.js');

const createLike = async (req, res) => {
  const { statusLike, idPost, idUser, idComment } = req.body;

  try {
    const newLike = await Likes.create({
      statusLike,
    });
    const user = await Users.findByPk(idUser);
    await newLike.setUser(user);
    const post = await Posts.findByPk(idPost);
    await newLike.setPost(post);
    const comment = await Comments.findByPk(idComment);
    await newLike.setComment(comment);
    res.json(newLike);
  } catch (error) {
    res.json(error);
  }
};

module.exports = createLike;
