const { Report, Users, Posts } = require("../../db.js");

const getReports = async (req, res) => {
  try {
    let findReport = await Report.findAll({
      include: [
        {
          model: Users,
          as: "Reporting_User",
          attributes: ["name", "email", "role"],
        },
        {
          model: Posts,
          as: "Reported_User",
          attributes: ["userId", "title", "description", "type"],
        },
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
