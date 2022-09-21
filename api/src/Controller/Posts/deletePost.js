const { Posts } = require('../../db.js');

const deletePost = async (req, res) => {

    const { id } = req.params;

    try {
        await Posts.destroy({ where: { id: id } });
        return res.send('Post was successfully deleted');

    } catch (err) {
        return res.status(500).send(err);
    };
};

module.exports = deletePost;
