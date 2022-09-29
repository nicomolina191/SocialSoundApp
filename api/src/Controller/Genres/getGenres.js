const getGenres = async (req, res) => {

  try {

    const genres = [
      {
        name: "Pop"
      },
      {
        name: "Rap/Hip Hop"
      },
      {
        name: "Reggaeton"
      },
      {
        name: "Rock"
      },
      {
        name: "Dance"
      },
      {
        name: "R&B"
      },
      {
        name: "Alternative"
      },
      {
        name: "Electro"
      },
      {
        name: "Folk"
      },
      {
        name: "Reggae"
      },
      {
        name: "Jazz"
      },
      {
        name: "Clasic"
      },
      {
        name: "Metal"
      },
      {
        name: "Movies/Games"
      },
      {
        name: "Soul & Funk"
      },
      {
        name: "Blues"
      },
      {
        name: "Latin"
      },
      {
        name: "Brasilian music"
      },
      {
        name: "African music"
      },
      {
        name: "Asiatic music"
      },
      {
        name: "Indian music"
      },
      {
        name: "Children's music"
      }
    ];

    return res.json(genres);

  } catch (error) {

    return res.status(500).send(error);
  }
};

module.exports = getGenres;
