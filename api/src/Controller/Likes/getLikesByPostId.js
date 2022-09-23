const { Likes } = require('../../db.js');

const getLikesByPostId = async (req, res) => {

    const { postId } = req.params;

    try {

        const likes = await Likes.findAll({
            where: { postId }
        });

        return res.json(likes);

    } catch (error) {

        return res.status(500).send(error);
    };
};

module.exports = getLikesByPostId;