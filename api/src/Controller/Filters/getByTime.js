
const getByTime = async (req, res) => {

    let { order, posts } = req.body;

    try {

        switch (order) {

            case 'asc':

                posts.sort((a, b) => a.postDate - b.postDate);

                return res.json(posts);

            case 'desc':

                posts.sort((a, b) => a.postDate - b.postDate);

                posts.reverse();

                return res.json(posts);

            default:

                return res.status(400).send('Order not valid');
        };

    } catch (error) {

        return res.send(error);
    };
};

module.exports = getByTime;