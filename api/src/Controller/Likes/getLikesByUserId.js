const { Likes } = require('../../db.js');

const getLikesByUserId = async (req, res) => {

    const { userId } = req.params;

    try {

        const likes = await Likes.findAll({
            where: { userId }
        });

        return res.json(likes);

    } catch (error) {

        return res.status(500).send(error);
    };
};

module.exports = getLikesByUserId;