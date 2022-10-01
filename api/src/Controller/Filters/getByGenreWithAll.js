const { Posts, Genres } = require('../../db.js');

const getByGenreWithAll = async (req, res) => {

    let { genres, posts } = req.body;

    let filteredPosts = [];

    try {

        for (const post of posts) {

            for (const item of post.genres) {

                if (genres.includes(item.name)) filteredPosts.push(post);
            };
        };

        const allPosts = await Posts.findAll({
            include: {
                model: Genres,
                attributes: ["name"],
                through: { attributes: [] }
            },
        });

        const allJoined = [...filteredPosts, ...allPosts];

        return res.json(allJoined);

    } catch (error) {

        return res.send(error);
    };
};

module.exports = getByGenreWithAll;