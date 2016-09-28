
var User = require('../model/schema');

module.exports = {
upsert: (req,res) =>{
        console.log('=====', req.query);
        var newUser = new User(req.body);
        newUser.save(function(err,data){
            if(err){
                res.json(err);
            } else{
                res.json(data);
            }
        })
    }
}
