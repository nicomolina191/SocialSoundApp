const { Users, Genres } = require('../../db.js');

const getUsers = async (req, res) => {

  try {

    const users = await Users.findAll({
      where: {
        isActive: true
      },
      include: {
        model: Genres,
        attributes: ['name'],
        through: { attributes: [] }
      }
    });

    return res.json(users);

  } catch (error) {

    return res.send(error);
  };
};

module.exports = getUsers;
