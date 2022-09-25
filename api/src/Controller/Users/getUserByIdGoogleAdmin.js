const { Users, Genres } = require("../../db.js");

const getUserByIdGoogleAdmin = async (req, res) => {
  const { idgoogle } = req.params;

  try {
    const user = await Users.findOne({
      where: { idgoogle },
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

module.exports = getUserByIdGoogleAdmin;
