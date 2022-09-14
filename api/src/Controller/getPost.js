const { Users, Posts } = require("../db");

const getPost = async (req, res) => {
  try {
    const findPost = await Posts.findAll();
    res.json(findPost);
    return findPost;
  } catch (error) {
    res.send(error);
  }
};

module.exports = getPost;
