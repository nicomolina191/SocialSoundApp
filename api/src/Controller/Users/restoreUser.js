const { Users } = require("../../db");

const restoreUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.restore({
      where: { id: id },
    });

    return res.send("Welcome back!");
  } catch (error) {
    res.json(error);
  }
};

module.exports = restoreUser;
