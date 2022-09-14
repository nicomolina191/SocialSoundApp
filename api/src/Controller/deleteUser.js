const { Users } = require("../db");

const deleteUser = async (req, res) => {
    const { nickname } = req.params;
    try {
        let user = await Users.findOne({ where: { username: nickname } });
        user.update({
            isActive: false,
        })
        user.save();
        res.send('User was successfully deleted');
    } catch (err) {
        res.status(404).send(err);
    }
};

module.exports = deleteUser;
