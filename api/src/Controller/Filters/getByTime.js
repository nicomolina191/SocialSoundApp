const { Posts, Genres } = require('../../db.js');

const getByTime = async (req, res) => {

    let { order, posts } = req.body;
    try {
        let allPosts = await Posts.findAll({include: [{
            model: Genres,
            as: "genres",
            through: { attributes: [] }
        }]})
        switch (order) {

            case 'asc':

                let sortedAsc = posts.sort((date1, date2) => new Date(date1.postDate) - new Date(date2.postDate));
                let allSortedAsc = allPosts.sort((date1, date2) => new Date(date1.postDate) - new Date(date2.postDate));
                return res.json({posts: sortedAsc, allPosts: allSortedAsc});

            case 'desc':

                let sortedDesc = posts.sort((date1, date2) => new Date(date2.postDate) - new Date(date1.postDate));
                let allSortedDesc = allPosts.sort((date1, date2) => new Date(date2.postDate) - new Date(date1.postDate));

                return res.json({posts: sortedDesc, allPosts: allSortedDesc});

            default:

                return res.status(400).send('Order not valid');
        };

    } catch (error) {

        return res.send(error);
    };
};

module.exports = getByTime;