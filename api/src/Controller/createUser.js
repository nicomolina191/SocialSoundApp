const { Users, Posts } = require("../db");

const createUser = async (req, res) => {
  const { name, role, email, password, username, avatar } = req.body;
  try {
    let user = await Users.create({
      name,
      role,
      email,
      password,
      username,
      avatar,
    });
    res.send(user);
    return user;
  } catch (error) {
    error;
  }
};

module.exports = createUser;
