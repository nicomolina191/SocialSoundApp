const { Comments } = require('../../db.js');

const getByPostId = async (req, res) => {

    const { postId } = req.params;

    try {

        const comments = await Comments.findAll({
            where: {
                postId
            }
        });

        return res.json(comments);

    } catch (error) {

        return res.status(500).send(error);
    };
};

module.exports = getByPostId;