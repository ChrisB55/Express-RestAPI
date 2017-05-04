var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var gymModel = new Schema({
    name: {
        type: String
    },
    address: {type: String},
    phoneNumber: {type: String},
    sports: {type: String}
});

module.exports= mongoose.model('gym', gymModel);