const { Users } = require('../../db.js');

const removeFollower = async (req, res) => {
    const { idUser, followTo } = req.body;

    try {

        const user = await Users.findByPk(idUser);
        const userToFollow = await Users.findByPk(followTo);

        await user.removeFollowingUser(userToFollow);

        return res.send('Follower removed');

    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err.message);
    }
};

module.exports = removeFollower;
