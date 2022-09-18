const { Comments } = require('../db');

const deleteComment = async (req, res) => {

    const { id } = req.params;

    try {
        await Comments.destroy({ where: { id: id } });
        return res.send('Comment was successfully deleted');
    } catch (error) {
        return res.status(500).send(error);
    }
};

module.exports = deleteComment;
