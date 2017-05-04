var mongoose = require('mongoose');
var Schema = mongoose.Schema;



module.exports = mongoose.model('Auth', new Schema({
    name: String,
    password: String,
    admin: Boolean
}));
