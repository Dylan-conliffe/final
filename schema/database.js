var mongoose = required('mongoose')

var userSchema = mongoose.Schema({
    username: {type: string},
    password: {type: string},
    email:    {type: string}
});

module.exports = mongoose.model('user',userSchema,'users');