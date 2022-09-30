const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('posts', {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        description: {
            type: DataTypes.TEXT
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cover: {
            type: DataTypes.STRING
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM("video", "audio"),
            allowNull: false
        },
        duration: {
            type: DataTypes.STRING
        },
        postDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        idShared: {
            type: DataTypes.STRING,
        }
    }, {
        timestamps: false
    });
};
