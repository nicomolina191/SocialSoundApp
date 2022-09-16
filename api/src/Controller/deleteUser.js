const { Users } = require("../db");

const deleteUser = async (req, res) => {

    const { id } = req.params;

    try {
        let user = await Users.findByPk(id);
        user.update({
            isActive: false
        });
        user.save();
        return res.send('User was successfully deleted');

    } catch (err) {

        return res.status(500).send(err);
    };
};

module.exports = deleteUser;
