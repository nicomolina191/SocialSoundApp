const { Users, Posts } = require("../db");

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { description, title, content } = req.body;
  try {
    let post = await Posts.findOne({ where: { id } });
    post.update({
      description,
      title,
      content,
    });
    await post.save();
    res.send(post);
  } catch (err) {
    res.status(404).send(err);
  }
};

module.exports = updatePost;
