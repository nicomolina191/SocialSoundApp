const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
        sequelize.define('users', {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.ENUM('Regular', 'Admin', 'Premium'),
                allowNull: false,
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
                defaultValue: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
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
            },
            followingCount: {
                type: DataTypes.INTEGER,
            },
    },{
        timestamps: false,
    })
}
