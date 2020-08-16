const express = require('express');

const Solutions = require ('../models/solution');

const router = express.Router();

router.post ('/solution', async (req, res) =>{
    try {
        const solution = new Solutions(req.body);
        await solution.save();
        res.status(201).send({message: 'Solution cadastrado com sucesso!'});
    } catch (e) {
        res.status(500).send({message: 'Falha ao cadastrar a solution.', e});
    };
})

router.get ('/solution', async (req, res) => {
    try {
        const solution = await Solutions.find()
        return res.json(solution)
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao buscar solutions",
            erro: err
        })
    }
})

module.exports = app => app.use('/', router);
