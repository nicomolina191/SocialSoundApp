const { Notifications } = require('../../db.js');

const getNotiByUser = async (req, res) => {

    const { userId } = req.params;

    try {
        const notifications = await Notifications.findAll({

            where: {
                userId
            }
        });


        return res.json(notifications);

    } catch (error) {

        return res.status(500).send(error);
    };
};

module.exports = getNotiByUser;