const { Users, Op } = require("../../db.js");

const getCountUserGraphs = async (req, res) => {
  try {
    const { count: bannedCount } = await Users.findAndCountAll({
      where: { isBanned: true },
    });

    const { count: premiumCount } = await Users.findAndCountAll({
      where: { isBanned: false, plan: "Premium" },
    });

    const { count: regularCount } = await Users.findAndCountAll({
      where: { isBanned: false, plan: "Regular" },
    });

    return res.json({ bannedCount, premiumCount, regularCount });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = getCountUserGraphs;
