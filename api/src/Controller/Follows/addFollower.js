const { Users } = require('../../db.js');

const addFollower = async (req, res) => {
    const { idUser, followTo } = req.body;

    try {

        const user = await Users.findByPk(idUser);
        const userToFollow = await Users.findByPk(followTo);

        await user.addFollowingUser(userToFollow);

        return res.send('Follower added');

    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

module.exports = addFollower;