const { Users } = require('../../db.js');

const updateUserAdmin = async (req, res) => {

  const { idgoogle } = req.params;
  const { isActive, isBanned, role } = req.body;

  try {
    let user = await Users.update({isActive, isBanned, role},{ where: { idgoogle } });
    return res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = updateUserAdmin;