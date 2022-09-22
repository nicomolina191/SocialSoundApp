const { Users, Genres } = require("../../db.js");

const getActiveUser = async (req, res) => {
  try {
    const users = await Users.findAll({
      include: {
        model: Genres,
        attributes: ["name"],
        through: { attributes: [] },
      },
      paranoid: true,
    });

    return res.json(users);
  } catch (error) {
    return res.send(error);
  }
};

module.exports = getActiveUser;
