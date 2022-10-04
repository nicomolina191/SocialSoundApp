
const getByTime = async (req, res) => {

    let { order, posts } = req.body;

    try {

        switch (order) {

            case 'asc':

                let sortedAsc = posts.sort((date1, date2) => new Date(date1.postDate) - new Date(date2.postDate));

                return res.json(sortedAsc);

            case 'desc':

                let sortedDesc = posts.sort((date1, date2) => new Date(date2.postDate) - new Date(date1.postDate));

                return res.json(sortedDesc);

            default:

                return res.status(400).send('Order not valid');
        };

    } catch (error) {

        return res.send(error);
    };
};

module.exports = getByTime;