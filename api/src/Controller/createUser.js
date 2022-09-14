const { Users, Posts } = require("../db");

const createUser = async (req, res) => {
  const { name, role, plan, email, password, username, avatar } = req.body;
    let user = await Users.create({
      name,
      role,
      plan,
      email,
      password,
      username,
      avatar,
    });
    res.json(user);
    return user;
};

module.exports = createUser;
