const { Posts, Genres, Users } = require('../../db.js');

const getPosts = async (req, res) => {
  try {
    const findPost = await Posts.findAll({
      include: [{
        model: Genres,
        attributes: ["name"],
        through: { attributes: [] }
      },
      {
        model: Users
      }]
    });
    return res.json(findPost);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

module.exports = getPosts;
