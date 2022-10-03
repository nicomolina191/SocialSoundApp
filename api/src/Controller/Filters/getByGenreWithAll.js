const { Posts, Genres } = require('../../db.js');

const getByGenreWithAll = async (req, res) => {

    let { genres, posts } = req.body;

    let filteredPosts = [];
    let nonFilteredPosts = [];

    try {

        for (const post of posts) {

            for (const item of post.genres) {

                if (genres.includes(item.name)) filteredPosts.push(post);
                if (!genres.includes(item.name)) nonFilteredPosts.push(post);
            };
        };

        const allJoined = [...filteredPosts, ...nonFilteredPosts];

        return res.json(allJoined);

    } catch (error) {

        return res.send(error);
    };
};

module.exports = getByGenreWithAll;