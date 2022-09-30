const { Notifications } = require('../../db.js');

const setNotiDisabled = async(req, res)=> {

    const { id } = req.params;

    try {
        const notification = await Notifications.findByPk(id);
        
        notification.update({
            disabled: true
        });

        await notification.save();
        return res.send(notification);

    } catch (error) {
        res.status(500).send(err);
    }
};

module.exports = setNotiDisabled;