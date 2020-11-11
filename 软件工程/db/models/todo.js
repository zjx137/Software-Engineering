const mongoose = require('../conn');

let todoSchema = require('../schemas/todoSchema');

module.exports = mongoose.model('achivement',todoSchema);