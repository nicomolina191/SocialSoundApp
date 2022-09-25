const { Users } = require('../../db.js');

const updateUser = async (req, res) => {

  const { idgoogle } = req.params;
  const { isActive, isBanned, role } = req.body;


  try {
    let user = await Users.findOne({ where: { idgoogle } });
    return  res.send(user, "creado");
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = updateUser;