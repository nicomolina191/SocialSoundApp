const { Posts, Genres, Likes } = require('../../db.js');

const getPopular = async (req, res) => {

    let { posts } = req.body;

    try {
        let allPosts = await Posts.findAll({include: [{
            model: Genres,
            as: "genres",
            through: { attributes: [] }
        }]})
        const likes = await Likes.findAll();

        for (let post of posts) {

            post.count = 0;

            for (const like of likes) {

                if(like.dataValues.isActive){

                    if (like.dataValues.postId === post.id) post.count++;
                }
            };
        };

        for (let post of allPosts) {

            post.dataValues.count = 0;

            for (const like of likes) {

                if(like.dataValues.isActive){

                    if (like.dataValues.postId === post.dataValues.id) post.dataValues.count++;
                }
            };
        };

        posts.sort((a, b) => a.count - b.count).reverse();
        allPosts.sort((a, b) => a.dataValues.count - b.dataValues.count).reverse();

        return res.json({posts: posts, allPosts: allPosts});

    } catch (error) {

        return res.status(500).send(error);
    }
};

module.exports = getPopular;