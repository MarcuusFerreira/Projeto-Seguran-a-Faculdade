const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('seguranca', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql',
    define : {
        freezeTableName: true
    }
})

// const conectar = async () => {
//     try{
//         await sequelize.authenticate()
//         console.log('Conexão ao banco realizada com sucesso!')
//     }catch(error) {
//         console.log(`Ocorreu algum problema na conexão ${error}`)
//     } finally {
//         sequelize.close()
//         console.log('Fechada a conexao')
//     }
// }

// conectar()

module.exports = sequelize