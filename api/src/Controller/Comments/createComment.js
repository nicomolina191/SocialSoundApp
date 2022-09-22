const { Users, Posts, Comments } = require("../../db.js");

const createComment = async (req, res) => {
  const { content, idPost, idUser } = req.body;
  try {
    const badWords = [
      "cantante de mierda",
      "infeliz",
      "negrata",
      "malparido",
      "hijo de puta",
      "eres un fracasado",
      "canción tan estúpida",
      "eres un burro",
      "asco de canción",
      "gil de mierda",
    ];

    const sensitiveWords = badWords.find((ele) => content.includes(ele));
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
