
const getByGenre = async (req, res) => {

    let { genres, posts } = req.body;

    let filteredPosts = [];

    try {

        for (const post of posts) {

            for (const item of post.genres) {

                if (genres.includes(item.name)) filteredPosts.push(post);
            };
        };

        return res.json(filteredPosts);

    } catch (error) {

        return res.send(error);
    };
};

module.exports = getByGenre;