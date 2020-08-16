const express = require('express');

const DataInfo = require ('../models/dataInfo');

const router = express.Router();

router.post ('/datainfo', async (req, res) =>{
    try {
        const dataInfo = new DataInfo(req.body);
        await dataInfo.save();
        res.status(201).send({message: 'DataInfo cadastrado com sucesso!'});
    } catch (e) {
        res.status(500).send({message: 'Falha ao cadastrar a dataInfo.', e});
    };
})

router.get ('/datainfo', async (req, res) => {
    try {
        const dataInfo = await DataInfo.find()
        return res.json(dataInfo)
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao buscar dataInfos",
            erro: err
        })
    }
})

module.exports = app => app.use('/', router);
