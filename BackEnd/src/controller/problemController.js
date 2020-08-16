const express = require('express');

const Problem = require ('../models/problem');

const router = express.Router();

router.post ('/problem', async (req, res) =>{
    try {
        const problem = new Problem(req.body);
        await problem.save();
        console.log("entrou aqui");
        res.status(201).send({message: 'Problema cadastrado com sucesso!'});
    } catch (e) {
        res.status(500).send({message: 'Falha ao cadastrar a problem.', e});
    };
})

router.get ('/problem', async (req, res) => {
    try {
        const problem = await Problem.find()
        return res.json(problem)
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao buscar problemas",
            erro: err
        })
    }
})

module.exports = app => app.use('/', router);
