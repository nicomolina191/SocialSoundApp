const { Users } = require('../../db.js');

const addFollower = async (req, res) => {
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

        await user.addFollowingUser(userToFollow);

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
        console.log(err);
        return res.status(500).send(err);
    }
};

module.exports = addFollower;