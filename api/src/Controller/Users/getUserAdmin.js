const { Users, Genres } = require("../../db.js");

const getUsersAdmin = async (req, res) => {

  try {

    const users = await Users.findAll({
      include: [{
        model: Genres,
        attributes: ['name'],
        through: { attributes: [] }
      },
      {
        model: Users,
        as: 'FollowingUsers',
        attributes: ['id', 'username', 'avatar'],
        through: { attributes: [] }
      },
      {
        model: Users,
        as: 'FollowerUsers',
        through: { attributes: [] }
      }],
      paranoid: false,
    });

    return res.json(users);

  } catch (error) {
    return res.send(error);
  }
};

module.exports = getUsersAdmin;
