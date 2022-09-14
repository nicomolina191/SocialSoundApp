const { Users, Posts } = require("../db");

const createPost = async (req, res) => {
  const { description, title, content, email } = req.body;
  try {
    let post = await Posts.create({
      description,
      title,
      content,
    });
    let user = await Users.findOne({ where: { email } });
    await post.setUser(user);
    res.send(post);
    return post;
  } catch (err) {
    res.status(404).send(err);
  }
};

module.exports = createPost;
