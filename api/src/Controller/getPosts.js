const { Posts, Genres } = require("../db");

const getPosts = async (req, res) => {
  try {
    const findPost = await Posts.findAll({
      include: {
        model: Genres,
        attributes: ["name"],
        through: { attributes: [] }
      },
    });
    return res.json(findPost);
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = getPosts;
