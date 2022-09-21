const { Notifications } = require('../../db.js');

const setNotiWatched = async (req, res) => {

    const { id } = req.params;

    try {
        const notification = await Notifications.findByPk(id);

        notification.update({
            watched: true
        });

        await notification.save();
        return res.send(notification);

    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = setNotiWatched;