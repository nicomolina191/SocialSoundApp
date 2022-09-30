const { Report, Posts, Users } = require("../../db.js");

const createReport = async (req, res) => {
  let { content, title, userId, postId } = req.body;

  try {
    let newReport = await Report.create({
      content,
      title,
    });

    let users = await Users.findByPk(userId);
    await newReport.setUser(users);

    let posts = await Posts.findByPk(postId);
    await newReport.setPost(posts);

    res.json("Report created successfully");
  } catch (error) {
    res.send(error);
  }
};

module.exports = createReport;
