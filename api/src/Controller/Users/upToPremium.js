const { Users } = require('../../db.js');

const upToPremium = async (req, res) => {

    const { id } = req.params;

    try {
        const user = await Users.findByPk(id);

        user.update({
            plan: 'Premium'
        });

        await user.save();
        return res.send(user);

    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = upToPremium;