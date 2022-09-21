const { Users } = require('../../db.js');

const downToRegular = async (req, res) => {

    const { id } = req.params;

    try {
        const user = await Users.findByPk(id);

        user.update({
            plan: 'Regular'
        });

        await user.save();
        return res.send(user);

    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = downToRegular;