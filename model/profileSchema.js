 var mongoose = require('mongoose');

 userSchema = new mongoose.Schema({
   
   tracks: String,
  
 });

 module.exports = mongoose.model('profile', userSchema);