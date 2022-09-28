const { Users } = require('../../db.js');

const updateBanUser = async (req, res) => {

  const { id, isBanned } = req.body;
  
  try {

    let user = await Users.findByPk(id);

    user.update({
      isBanned
    });

    await user.save();
    return res.json(user);

  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = updateBanUser;