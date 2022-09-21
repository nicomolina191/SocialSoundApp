const { Users, Genres } = require("../../db.js");

const getUsers = async (req, res) => {
<<<<<<< HEAD


=======
>>>>>>> development
  try {
    const users = await Users.findAll({
      include: {
        model: Genres,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });

    return res.json(users);
  } catch (error) {
    return res.send(error);
  }
};

module.exports = getUsers;
