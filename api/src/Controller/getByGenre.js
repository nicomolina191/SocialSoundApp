const { Posts, Genres } = require("../db");

const getByGenre = async (req, res) => {

    const { genre } = req.params;
    let filterPosts = [];

    try {

        const posts = await Posts.findAll({
            include: {
                model: Genres,
                attributes: ['name'],
                through: { attributes: [] }
            }
        });

        for (const post of posts) {

            for (const item of post.genres) {

                if (item.name === genre) filterPosts.push(post);
            };
        };

        return res.json(filterPosts);

    } catch (error) {

        return res.send(error);
    };
};

module.exports = getByGenre;