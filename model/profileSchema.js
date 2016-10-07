 var mongoose = require('mongoose');

 userSchema = new mongoose.Schema({
   
   tracks: String,
   userID: {type: String, required: true, unique: true}
 });

 module.exports = mongoose.model('profileInfo', userSchema);