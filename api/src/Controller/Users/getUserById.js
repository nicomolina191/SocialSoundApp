const { Users, Genres } = require("../../db.js");
const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await Users.findByPk(userId, {
      include: [
        {
          model: Genres,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
      paranoid: false,
    });

    return res.json(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = getUserById;
