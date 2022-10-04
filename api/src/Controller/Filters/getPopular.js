const { Posts, Genres, Likes } = require('../../db.js');

const getPopular = async (req, res) => {

    let { posts } = req.body;

    try {
        const likes = await Likes.findAll();

        for (let post of posts) {

            post.count = 0;

            for (const like of likes) {

                if(like.dataValues.isActive){

                    if (like.dataValues.postId === post.id) post.count++;
                }
            };
        };

        posts.sort((a, b) => a.count - b.count).reverse();

        return res.json(posts);

    } catch (error) {

        return res.status(500).send(error);
    }
};

module.exports = getPopular;