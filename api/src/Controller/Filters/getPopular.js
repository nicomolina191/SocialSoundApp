const { Posts, Genres, Likes } = require('../../db.js');

const getPopular = async (req, res) => {

    try {
        let posts = await Posts.findAll({
            include: [{
                model: Genres,
                attributes: ["name"],
                through: { attributes: [] }
            }]
        });

        const likes = await Likes.findAll();

        for (let post of posts) {

            post.dataValues.count = 0;

            for (const like of likes) {

                if (like.dataValues.postId === post.dataValues.id) post.dataValues.count++;
            };
        };

        posts.sort((a, b) => a.dataValues.count - b.dataValues.count).reverse();

        return res.json(posts);

    } catch (error) {

        return res.status(500).send(error);
    }
};

module.exports = getPopular;