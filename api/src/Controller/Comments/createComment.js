const { Users, Posts, Comments } = require("../../db.js");
const badWords = require("./BadWords.js");

const createComment = async (req, res) => {
  const { content, idPost, idUser } = req.body;
  try {
    let censoredWords = badWords;

    const sensitiveWords = censoredWords.find((ele) => content.includes(ele));
    if (sensitiveWords) {
      res.send("Your comment is not appropriate, please do it again");
    } else {
      const addComent = await Comments.create({
        content,
      });
      const user = await Users.findByPk(idUser);
      await addComent.setUser(user);
      const post = await Posts.findByPk(idPost);
      await addComent.setPost(post);
      res.json(addComent);
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = createComment;
