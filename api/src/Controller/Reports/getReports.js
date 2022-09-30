const { Report, Users, Posts } = require("../../db.js");

const getReports = async (req, res) => {
  try {
    let findReport = await Report.findAll({
      include: [
        {
          model: Users,
          attributes: ["name", "email", "avatar"]
        }
      ],
    });
    findReport.length === 0
      ? res.json("There are currently no reports")
      : res.json(findReport);
  } catch (error) {
    res.send(error);
  }
};

module.exports = getReports;
