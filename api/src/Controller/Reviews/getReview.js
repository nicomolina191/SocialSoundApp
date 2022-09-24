const { Reviews } = require('../../db.js');

const getReview = async (req, res) => {
    try {
        let allReviews = await Reviews.findAll();
        res.json(allReviews);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = getReview;
