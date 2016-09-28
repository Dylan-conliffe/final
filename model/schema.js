var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
    username: {type: String},
    password: {type: String},
    email:    {type: String}
});


module.exports = mongoose.model('user',userSchema,'users');