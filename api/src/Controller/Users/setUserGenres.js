const { Users, Genres } = require('../../db.js');

const setUserGenres = async (req, res) => {

    const { id, genres } = req.body;

    try {

        const user = await Users.findByPk(id);

        console.log('user' + user);
        console.log('genres' + genres);

        for (const genre of genres) {

            const [genreDB, created] = await Genres.findOrCreate({
                where: { name: genre },
            });

            await user.addGenre(genreDB);
        };

        return res.json(user);

    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

module.exports = setUserGenres;
