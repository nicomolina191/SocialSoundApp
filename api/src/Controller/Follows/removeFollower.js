const { Users } = require('../../db.js');

const removeFollower = async (req, res) => {
    const { idUser, followTo } = req.body;

    try {

        const user = await Users.findByPk(idUser);
        let userToFollow = await Users.findByPk(followTo, {
            include: [
            {
              model: Users,
              as: 'FollowerUsers',
              through: { attributes: [] }
            }]
        });

        await user.removeFollowingUser(userToFollow);

        userToFollow = await Users.findByPk(followTo, {
            include: [
            {
              model: Users,
              as: 'FollowerUsers',
              through: { attributes: [] }
            }]
        });

        return res.json(userToFollow);

    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err.message);
    }
};

module.exports = removeFollower;
