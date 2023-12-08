const db = require('../database/db')
const security = require('../utils/cryptography')
const Message = require('../models/message')
const { Op } = require('sequelize')
const User = require('../models/user')

const createMessage = async (req, res, next) => {
    const { message, userOriginId, userDestinyId, userDestinyPublicKey } = req.body

    if (!message) {
        res.status(400).json({status: 'error', error: "Não é possivel enviar mensagens vazias"})
    }
    if(!userDestinyId, !userOriginId, !userDestinyPublicKey) {
        res.status(500).json({status: 'error', error: "Ocorreu um erro no lado do servidor"})
    }

    const publicKey = security.convertRsaPublicKey(userDestinyPublicKey)
    console.log('converti a chave publica')
    const messageEncrypt = security.encryptMessage(message, publicKey)

    await db.sync()
    try{
        const newMessage = await Message.create({
            message: messageEncrypt,
            visualized: false,
            destinyId: userDestinyId,
            originId: userOriginId
        })
        res.status(201).json({
            status: 'created',
            message: "Mensagem cadastrada com sucesso"
        })
    }catch(error) {
        console.log(`Ocorreu um erro ao cadastrar a mensagem ${error}`)
        res.status(500).json({status: 'error', error: 'Erro ao enviar a mensagem'})
    }
    next()
}

const getNewMessages = async (req, res, next) => {
    const userId = req.body.userId
    let privateKey = req.body.privateKey
    try {
        const findMessages = await Message.findAll({
            where: {
                [Op.and]: [
                    {destinyId: userId},
                    {visualized: 0}
                ]
            }
        })
        findMessages.forEach(message => {
            privateKey = security.convertRsaPrivateKey(privateKey)
            message.message = security.decryptMessage(message.message, privateKey)
        })
        const originIds = findMessages.map(({ dataValues: { originId } }) => originId);
        const users = []
        for(var idUser in originIds) {
            const userFounded = await User.findAll({
                where: {
                    id: originIds[idUser]
                },
                attributes: ['id', 'name'],
                raw: true
            })
            console.log(userFounded)
            const {id, name } = userFounded[0]
            users.push([id, name])
        }
        findMessages.forEach((item, index) => {
            const names = users[index]
            if(names && names.length > 1) {
                item.dataValues.name = names[1]
            }
        })
        console.log(findMessages)
        res.status(200).json({status: 'ok', messages: findMessages})
    } catch(error) {
        console.log(error)
        res.status(500).json({status: 'error', error: 'Ocorreu um erro por parte do servidor'})
    }
    // updateMessages(userId)
    next()
}

const updateMessages = async (userId) => {
    try {
        const result = await Message.update({
            visualized: true
        },{
            where:{
                destinyId: userId
            }
        })
    } catch (error) {
        console.log('ocorreu um erro ao atualizado os dados')
        console.log(error)
    }
}

module.exports = { createMessage, getNewMessages }