const server = require("./src/app.js");
const { conn } = require("./src/db.js");

// Syncing all the models at once.
// {force: true}
conn.sync({ force: true }).then(() => {
  server.listen(
    process.env.PORT,
    () => {
      console.log("%s listening at 3001"); // eslint-disable-line no-console
    },
    console.log(`Server listening on port ${process.env.PORT}.`)
  );
});
