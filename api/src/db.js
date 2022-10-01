require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
      database: DB_NAME,
      dialect: "postgres",
      host: DB_HOST,
      port: 5432,
      username: DB_USER,
      password: DB_PASSWORD,
      pool: {
        max: 3,
        min: 1,
        idle: 10000,
      },
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
        keepAlive: true,
      },
      ssl: true,
    })
    : new Sequelize(
      `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
      { logging: false, native: false }
    );
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const {
  Users,
  Posts,
  Likes,
  Genres,
  Comments,
  Message,
  Chat,
  Notifications,
  Report,
} = sequelize.models;

// Relaciones

//USERS - USERS

Users.belongsToMany(Users, {
  through: "Following",
  as: "FollowerUsers",
  foreignKey: "following_id",
});
Users.belongsToMany(Users, {
  through: "Following",
  as: "FollowingUsers",
  foreignKey: "follower_id",
});

// USERS - POSTS

Users.belongsToMany(Posts, { through: "users_posts", timestamps: false });
Posts.belongsTo(Users, { through: "users_posts", timestamps: false });

// USERS - LIKES

Users.belongsToMany(Likes, { through: "users_likes", timestamps: false });
Likes.belongsTo(Users, { through: "users_likes", timestamps: false });

// USERS - GENRES

Users.belongsToMany(Genres, { through: "users_genres", timestamps: false });
Genres.belongsToMany(Users, { through: "users_genres", timestamps: false });

//USERS - REPORTS

Users.belongsToMany(Report, { through: "users_report", timestamps: false });
Report.belongsTo(Users, { through: "users_report", timestamps: false });

//POST - REPORTS

Posts.belongsToMany(Report, { through: "posts_report", timestamps: false });
Report.belongsTo(Posts, { through: "posts_report", timestamps: false });

//POSTS - LIKES

Posts.belongsToMany(Likes, { through: "posts_likes", timestamps: false });
Likes.belongsTo(Posts, { through: "posts_likes", timestamps: false });

// POSTS - GENRES

Posts.belongsToMany(Genres, { through: "posts_genres", timestamps: false });
Genres.belongsToMany(Posts, { through: "posts_genres", timestamps: false });

// POSTS - COMMENTS

Posts.belongsToMany(Comments, { through: "posts_comments", timestamps: false });
Comments.belongsTo(Posts, { through: "posts_comments", timestamps: false });

//USERS - COMMENTS

Users.belongsToMany(Comments, { through: "users_comments", timestamps: false });
Comments.belongsTo(Users, { through: "users_comments", timestamps: false });

// CHAT - MESSAGE

Chat.belongsToMany(Message, { through: "chat_messages", timestamps: false });
Message.belongsTo(Chat, { through: "chat_messages", timestamps: false });

// USERS - NOTIFICATIONS

Users.belongsToMany(Notifications, {
  through: "users_notifications",
  timestamps: false,
});
Notifications.belongsTo(Users, {
  through: "users_notifications",
  timestamps: false,
});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
  Op,
};
