const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      idgoogle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("User", "Admin"),
        defaultValue: "User",
      },
      plan: {
        type: DataTypes.ENUM("Regular", "Premium"),
        defaultValue: "Regular",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isBanned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      avatar: {
        type: DataTypes.TEXT,
        defaultValue:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      },
      paymentDate: {
        type: DataTypes.DATEONLY,
      },
      expirationDate: {
        type: DataTypes.DATEONLY,
      },
      registerDate: {
        type: DataTypes.DATEONLY,
      },
      followersCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      followingCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      // isActive: {
      //   //Se usa el ID para eliminar y restaurar
      //   type: DataTypes.BOOLEAN,
      //   defaultValue: true,
      // },
    },
    {
      timestamps: true,
      paranoid: true,
      deletedAt: "destroyTime",
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSaltSync(10, "a");
            user.password = bcrypt.hashSync(user.password, salt);
          }
        },
        beforeUpdate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSaltSync(10, "a");
            user.password = bcrypt.hashSync(user.password, salt);
          }
        },
      },
    }
  );
};
