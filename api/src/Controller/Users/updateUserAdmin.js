const { Users } = require('../../db.js');

const updateUserAdmin = async (req, res) => {

  const { idgoogle } = req.params;
  const { isBanned, role } = req.body;

  try {
    let user = await Users.update({isBanned, role},{ where: { idgoogle } });
    return res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = updateUserAdmin;