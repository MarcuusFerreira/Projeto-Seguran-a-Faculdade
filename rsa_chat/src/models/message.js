const { Model, DataTypes } = require('sequelize')
const sequelize = require('../database/db')

class Message extends Model{}

Message.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    visualized: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    originId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    }
    ,{
        sequelize,
        tableName: 'message',
        timestamps: false
    })

module.exports = Message