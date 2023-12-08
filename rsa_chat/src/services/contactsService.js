const User = require('../models/user')
const { Op } = require('sequelize')
const db = require('../database/db')

const getContacts = async (req, res, next) => {
    let originId = req.body.originId

    try {
        const listContacts = await User.findAll({
            attributes: ['id', 'name', 'publicKey'],
            where: {
                id: {
                    [Op.not] : originId
                }
            }
        })
        res.status(200).json({
            status: 'ok',
            listUsers: listContacts
        })
    } catch(error) {
        console.log('Houve um erro ao coletar os contatos')
        res.status(400).json({status: 'error', error: 'Não foi possivel buscar os contatos'})
    }
    next()
}

module.exports = { getContacts }