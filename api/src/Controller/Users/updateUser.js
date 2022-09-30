const { Users } = require('../../db.js');

const updateUser = async (req, res) => {

  const { id } = req.params;
  const { name, username, avatar, banner } = req.body;

  try {

    const user = await Users.findByPk(id);

    user.update({
      name,
      username,
      avatar,
      banner
    });

    await user.save();
    return res.send(user);

  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = updateUser;
