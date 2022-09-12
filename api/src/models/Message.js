const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('message', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        dmDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        idSender: {
            type: DataTypes.UUID,
        },
        idReceiver: {
            type: DataTypes.UUID,
        },
    }, {
        timestamps: false,
    })
}
