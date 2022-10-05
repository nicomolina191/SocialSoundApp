const { Users, Genres } = require('../../db.js');

const getUserByIdGoogle = async (req, res) => {

    const { idgoogle } = req.params;

    try {

        const user = await Users.findOne({
            where: { idgoogle },
            include: [{
                model: Genres,
                attributes: ['name'],
                through: { attributes: [] }
            },
            {
                model: Users,
                as: 'FollowingUsers',
                attributes: ['id', 'username', 'avatar'],
                through: { attributes: [] }
            },
            {
              model: Users,
              as: 'FollowerUsers',
              through: { attributes: [] }
            }]
        });

        return res.json(user);

    } catch (error) {

        return res.status(500).send(error);
    };
};

module.exports = getUserByIdGoogle;