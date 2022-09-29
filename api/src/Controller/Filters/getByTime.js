const { Posts } = require('../../db.js');

const getByTime = async (req, res) => {

    let { order, posts } = req.body;

    try {

        switch (order) {

            case 'asc':

                filterPosts = await Posts.findAll({
                    order: [
                        ['postDate', 'ASC']
                    ]
                });

                return res.json(filterPosts);

            case 'desc':

                filterPosts = await Posts.findAll({
                    order: [
                        ['postDate', 'DESC']
                    ]
                });

                return res.json(filterPosts);

            default:

                return res.status(400).send('Order not valid');
        };

    } catch (error) {

        return res.send(error);
    };
};

module.exports = getByTime;