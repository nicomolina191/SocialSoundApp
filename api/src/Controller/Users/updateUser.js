const { Users } = require('../../db.js');

const updateUser = async (req, res) => {

  const { id } = req.params;
  const { name, username, avatar, banner } = req.body;

  try {
    let user = await Users.findOne({ where: { id } });

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
