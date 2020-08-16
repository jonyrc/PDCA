const Express = require('express');
const body_parser = require('body-parser');

const App = new Express()

App.use(body_parser.json())
App.use(body_parser.urlencoded({ extended: false }));

App.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const mongoose = require('mongoose');
const linkBanco = "mongodb://localhost/pdca"
const PORT = 3000

mongoose.Promise =global.Promise;

mongoose.connect(linkBanco, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB conectado -> "+linkBanco)
}).catch((err)=> {
    console.log("Erro ao se conectar ao mongoDB: "+err)
})

module.exports = mongoose;

require('./src/controller/problemController')(App);
require('./src/controller/solutionController')(App);
require('./src/controller/dataInfoController')(App);
App.listen(PORT, () => console.log(`Funcionando em localhost:${PORT}`));