const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    // defino el modelo
        sequelize.define('posts', {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            likesCount: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            description: {
                type: DataTypes.TEXT,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            commentsCount: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            postDate: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            }
        }, {
            timestamps: false,
        })
}
