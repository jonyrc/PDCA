const mongoose = require('mongoose');

const solutionSchema =  new mongoose.Schema({
    solution: {
        type: String
    }
})

module.exports = mongoose.model('Solution', solutionSchema);;

