const { Reviews } = require('../../db.js');

const createReview = async (req, res) => {

    const { userId, name, avatar, rating, description } = req.body;

    try {
        let review = await Reviews.create({
            userId,
            name,
            avatar,
            rating,
            description
        })
        return res.json(review);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = createReview;
