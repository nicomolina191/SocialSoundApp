const { Users, Genres } = require('../../db.js');
const getUserById = async (req, res) => {

    const { userId } = req.params;

    try {

        const user = await Users.findByPk(userId, {
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

module.exports = getUserById;