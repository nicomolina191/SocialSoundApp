const { Posts, Genres } = require('../../db.js');

const getByGenreWithAll = async (req, res) => {

    let { genres, posts } = req.body;

    let filteredPosts = [];
    let nonFilteredPosts = [];
    let allFilteredPosts = [];
    let nonAllFilteredPosts = [];

    try {
        let allPosts = await Posts.findAll({include: [{
            model: Genres,
            as: "genres",
            through: { attributes: [] }
        }]})

        for (const post of posts) {

            for (const item of post.genres) {

                if (genres.includes(item.name)) filteredPosts.push(post);
                if (!genres.includes(item.name)) nonFilteredPosts.push(post);
            };
        };

        for (const post of allPosts) {

            for (const item of post.dataValues.genres) {
                if (genres.includes(item)) allFilteredPosts.push(post);
                if (!genres.includes(item)) nonAllFilteredPosts.push(post);
            };
        };

        const allJoined = [...filteredPosts, ...nonFilteredPosts];
        const allPostsOrder = [...allFilteredPosts, ...nonAllFilteredPosts];

        return res.json({posts: allJoined, allPosts: allPostsOrder});

    } catch (error) {

        return res.send(error);
    };
};

module.exports = getByGenreWithAll;