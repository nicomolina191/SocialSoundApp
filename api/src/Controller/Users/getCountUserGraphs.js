const { Users, Op } = require("../../db.js");

const getCountUserGraphs = async (req, res) => {
  try {
    const { count: bannedCount } = await Users.findAndCountAll({
      where: { isBanned: true },
    });
    console.log(bannedCount);

    const { count: premiumCount } = await Users.findAndCountAll({
      where: { isBanned: false, plan: "Premium" },
    });
    console.log(premiumCount);

    const { count: regularCount } = await Users.findAndCountAll({
      where: { isBanned: false, plan: "Regular" },
    });
    console.log(regularCount);

    return res.json({ bannedCount, premiumCount, regularCount });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = getCountUserGraphs;
