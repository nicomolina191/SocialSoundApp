const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "likes",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
    },
    {
      timestamps: false
    }
  );
};
