 var mongoose = require('mongoose');

 userSchema = new mongoose.Schema({
   about: { type: mongo.Schema.objectID, ref: 'User' },
   Artist: { type: mongo.Schema.objectID, ref: 'User' },
   Role: { type: mongo.Schema.objectID, ref: 'User' }
   Tracks: { type: mongo.Schema.objectID, ref: 'User' },
   Pic: { type: mongo.Schema.objectID, ref: 'User' },
   User: { type: mongo.Schema.objectID, ref: 'User' }
 });

 module.exports = mongoose.model('Profileinfo',userSchema);