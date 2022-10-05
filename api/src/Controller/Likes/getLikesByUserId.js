const { Likes, Posts, Users } = require('../../db.js');

const getLikesByUserId = async (req, res) => {

    const { userId } = req.params;

    try {

        const likes = await Likes.findAll({
            where: { userId },
            include: [{
                model: Posts,
                include: [{
                    model: Users
                }]
            }]
        });

        return res.json(likes);

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    };
};

module.exports = getLikesByUserId;