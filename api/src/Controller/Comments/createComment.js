const { Users, Posts, Comments } = require('../../db.js');

const createComment = async (req, res) => {
  const { content, idPost, idUser } = req.body;
  try {
    const addComent = await Comments.create({
      content,
    });

    const user = await Users.findByPk(idUser);
    await addComent.setUser(user);
    const post = await Posts.findByPk(idPost);
    await addComent.setPost(post);
    res.json(addComent);
  } catch (error) {
    res.json(error);
  }
};

module.exports = createComment;
