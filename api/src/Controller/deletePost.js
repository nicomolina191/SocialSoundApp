const { Posts } = require("../db");

const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        let post = await Posts.destroy({ where: { id: id } });
        res.send('Post was successfully deleted');
    } catch (err) {
        res.status(404).send(err);
    }
};

module.exports = deletePost;
