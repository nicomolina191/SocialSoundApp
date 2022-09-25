const { Likes } = require('../../db.js');
const { Op } = require("sequelize");

const changeStatusLike = async (req, res) => {

    const { postId, userId, isActive } = req.body;

    try {

        let like = await Likes.findOne({
            where: {
                [Op.and]: [
                    { postId },
                    { userId }
                ]
            }
        });

        like.update({ isActive });

        await like.save();
        return res.send(like);

    } catch (err) {

        res.status(500).send(err);
    }
};

module.exports = changeStatusLike;