const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    // defino el modelo
        sequelize.define('likes', {
            postId: {
                type: DataTypes.UUID,
            },
            userId: {
                type: DataTypes.UUID,
            },
        })
}
