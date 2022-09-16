const { Users } = require("../db");

const getUserById = async (req, res) => {

    const { userId } = req.params;

    try {

        let user = await Users.findByPk(userId);

        return res.json(user);

    } catch (error) {

        return res.status(500).send(error);
    };
};

module.exports = getUserById;