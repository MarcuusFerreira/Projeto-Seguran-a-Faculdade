const db = require('../database/db')
const { Op } = require('sequelize')
const user = require('../models/user')
const security = require('../utils/cryptography')
// const { getNewMessages } = require('./messageService')

const userAlredyExists = async (name, password) => {
    const findUser = await user.findOne({
        where: {
            [Op.and]: [{name: name}, {password: password}]
        }
    })
    return findUser === null ? false : true
}

const insertUser = async (req, res, next) => {  
        const name = req.body.name
        const password = req.body.password
        console.log(name)
        console.log(password)
        if (!name, !password) {
            return res.status(400).json({status: 'error', error: "Todos os campos são obrigatórios"})
        }
        hashedPassword = security.encryptPassword(password)
        const { publicKey, privateKey } = security.createRsaKeys()
        await db.sync()
        if (userAlredyExists(name, hashedPassword)) {
            try {   
                const newUser = await user.create({
                    name: name,
                    password: hashedPassword,
                    privateKey: privateKey,
                    publicKey: publicKey
                })
                res.status(201).json({
                    status: 'created',
                    message: 'Usuário cadastrado com sucesso', 
                    id: newUser.id, 
                    password: hashedPassword, 
                    privateKey: privateKey, 
                    publicKey: publicKey
                })
            } catch (error) {
                console.log(`Ocorreu um erro do lado do servidor ${error}`)
                res.status(500).json({status: 'error', error: 'Erro ao cadastrar os usuários'})
            }
        } else {
            res.status(400).json({status: 'error', error: "Usuário ja cadastrado"})
        }
        next()
    }

const login = async (req, res, next) => {
    const { name, password } = req.body
    if(!name, !password) {
        res.status(400).json({error: "Todos os campos são obrigatórios"})
    }
    hashedPassword = security.encryptPassword(password)
    const findUser = await user.findOne({
        where: {
            [Op.and]: [{name: name}, {password: hashedPassword}]
        }
    })
    if (findUser === null) {
        res.status(400).json({status: 'error', error: "Falha ao realizar login"})
    } else {
    res.status(200).json({status: 'ok', message: "Login realizado com sucesso!", user: findUser})
    }
    next()
}

module.exports = { insertUser, login }