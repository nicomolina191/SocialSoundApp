const { Users, Posts, Likes } = require('../../db.js');

const createLike = async (req, res) => {
  const { idPost, idUser } = req.body;

  try {
    const newLike = await Likes.create({});

    const user = await Users.findByPk(idUser);
    await newLike.setUser(user);

    const post = await Posts.findByPk(idPost);
    await newLike.setPost(post);

    res.json(newLike);

  } catch (error) {

    res.json(error);
  }
};

module.exports = createLike;
