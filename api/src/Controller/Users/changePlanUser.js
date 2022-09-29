const { Users } = require('../../db.js');

const changePlanUser = async (req, res) => {

    const { id, plan } = req.body;

    try {
        const user = await Users.findByPk(id);

        user.update({
            plan
        });

        await user.save();
        return res.send(user);

    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = changePlanUser;