const { Users } = require('../../db.js');

const updateRoleUser = async (req, res) => {

    const { id, role } = req.body;

    try {

        let user = await Users.findByPk(id);

        user.update({
            role
        });

        await user.save();
        return res.json(user);

    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = updateRoleUser;