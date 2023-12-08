const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/db')
const message = require('./message')

class User extends Model {}
User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    privateKey: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    publicKey: {
        type: DataTypes.TEXT,
        allowNull: false
    }
},{
    tableName: 'user',
    sequelize,
    timestamps: false
})

User.hasMany(message, {
    foreignKey: 'destinyId',
    as: 'message'
})

module.exports = User