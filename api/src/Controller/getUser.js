const { Users, Posts } = require("../db");

const getUser = async (req, res) => {
  try {
    const findUser = await Users.findAll();
    res.json(findUser);
    return findUser;
  } catch (error) {
    res.send(error);
  }
};

module.exports = getUser;
