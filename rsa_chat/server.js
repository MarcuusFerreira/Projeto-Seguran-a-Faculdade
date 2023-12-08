const app = require('express')()
const consign = require('consign')
const porta = 4001

consign()
    .then('./src/config/middlewares.js')
    .then('./src/services')
    .then('./src/config/routes.js')
    .into(app)

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`)
})