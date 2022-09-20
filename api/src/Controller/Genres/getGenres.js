const axios = require('axios');

const getGenres = async (req, res) => {

  try {

    const genres = await axios.get('https://api.deezer.com/genre');

    return res.json(genres.data.data);

  } catch (error) {

    return res.status(500).send(error);
  }
};

module.exports = getGenres;