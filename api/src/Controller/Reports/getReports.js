const { Report } = require("../../db.js");

const getReports = async (req, res) => {
  try {
    let findReport = await Report.findAll();

    findReport.length === 0
      ? res.json("There are currently no reports")
      : res.json(findReport);
  } catch (error) {
    res.send(error);
  }
};

module.exports = getReports;
