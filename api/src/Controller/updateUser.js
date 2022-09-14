const { Users, Posts } = require("../db");

const updateUser = async (req, res) => {
  const { nickname } = req.params;
  const { name, username, avatar } = req.body;
  try {
    let user = await Users.findOne({ where: { username: nickname } });
    user.update({
      name,
      username,
      avatar,
    });
    await user.save();
    res.send(user);
    return user;
  } catch (err) {
    res.status(404).send(err);
  }
};

module.exports = updateUser;
