const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    // defino el modelo
        sequelize.define('chat', {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            
        }, {
            timestamps: false,
        })
}
