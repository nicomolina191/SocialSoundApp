const { Likes } = require('../../db.js');
const { Op } = require("sequelize");

const getLikesByPostandUserId = async (req, res) => {

    const { postId, userId } = req.params;

    try {

        const likes = await Likes.findAll({
            where: {
                [Op.and]: [
                    { postId },
                    { userId }
                ]
            }
        });

        return res.json(likes);

    } catch (error) {

        return res.status(500).send(error);
    };
};

module.exports = getLikesByPostandUserId;