const { Notifications, Users } = require('../../db.js');

const createNoti = async (req, res) => {

    const { title, content, userId, fromUser } = req.body;

    try {
        const notification = await Notifications.create({
            title,
            content,
            fromUser
        });

        const user = await Users.findByPk(userId);
        await notification.setUser(user);

        return res.json(notification);

    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err);
    }
};

module.exports = createNoti;