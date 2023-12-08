const NodeRSA = require('node-rsa')
const crypto = require('crypto')

const createRsaKeys = () => {
    const keys = NodeRSA().generateKeyPair(2048)
    const privateKey = keys.exportKey('private')
    const publicKey = keys.exportKey('public')
    return { publicKey, privateKey }
}

const encryptPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('base64')
}

const convertRsaPublicKey = (publicKey) => {
    const newPublicKey = new NodeRSA()
    newPublicKey.importKey(publicKey, 'public')
    return newPublicKey.exportKey('public')
}

const convertRsaPrivateKey = (privateKey) => {
    const newPrivateKey = new NodeRSA(privateKey, 'private')
    return newPrivateKey.exportKey('private')
}

const encryptMessage = (message, publicKey) => {
    const newPublicKey = new NodeRSA(publicKey, 'public')
    return newPublicKey.encrypt(message, 'base64')
}

const decryptMessage = (message, privateKey) => {
    const newPrivateKey = new NodeRSA(privateKey, 'private')
    return newPrivateKey.decrypt(message, 'utf-8')
}

module.exports = { createRsaKeys, encryptPassword, convertRsaPublicKey, convertRsaPrivateKey, encryptMessage, decryptMessage }