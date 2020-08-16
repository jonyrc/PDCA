const mongoose = require('mongoose');

const problemSchema =  new mongoose.Schema({
    problem: {
        type: String
    },
    actionPlan: {
        type: String,
    },
    data: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Problem', problemSchema);;
