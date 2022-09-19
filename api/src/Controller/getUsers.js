const { Users } = require("../db");

const getUsers = async (req, res) => {
console.log(req.user);

  try {

    const users = await Users.findAll({
      where: {
        isActive: true
      },
    });

    return res.json(users);

  } catch (error) {

    return res.send(error);
  };
};

module.exports = getUsers;
