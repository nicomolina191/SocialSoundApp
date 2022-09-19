const { Users, Genres } = require("../db");

const getUserById = async (req, res) => {

    const { userId } = req.params;

    try {

        let user = await Users.findByPk(userId, {
            include: [{
                model: Genres,
                attributes: ['name'],
                through: { attributes: [] }
            }]
        });

        return res.json(user);

    } catch (error) {

        return res.status(500).send(error);
    };
};

module.exports = getUserById;