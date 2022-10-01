const { Users, Posts, Genres } = require("../../db.js");

const createPost = async (req, res) => {
  const { description, title, content, idUser, genres, type, cover, idShared } =
    req.body;

  try {
    const post = await Posts.create({
      description,
      title,
      content,
      type,
      cover,
      idShared,
    });

    const user = await Users.findByPk(idUser);
    await post.setUser(user);

    for (const genre of genres) {
      const [genreDB, created] = await Genres.findOrCreate({
        where: { name: genre },
      });
      await post.addGenre(genreDB);
    }

    return res.json(post);
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = createPost;
