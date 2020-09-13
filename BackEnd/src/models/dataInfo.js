const mongoose = require('mongoose');

const dataInfoSchema = new mongoose.Schema({
    entrada: {
        type: Number,
    },
    saida: {
        type: Number,
    },
    ph: {
        type: Number
    },
    temperatura: {
        type: Number
    },
    oxigenio: {
        type: Number
    },
    eficiencia: {
        type: Number
    },
    data: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('DataInfo', dataInfoSchema);;