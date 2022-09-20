const { Posts, Genres } = require('../../db.js');

const getByGenre = async (req, res) => {

    const { genres } = req.body;
    console.log(req.body);

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

                if (genres.includes(item.name)) filterPosts.push(post);
                // if (item.name === genre) filterPosts.push(post);
            };
        };

        return res.json(filterPosts);

    } catch (error) {

        return res.send(error);
    };
};

module.exports = getByGenre;