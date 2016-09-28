var cyphCtrl = require('./users')

module.exports = function routes(app){ 

app.get('/',(req,res)=>{
    res.sendFile('index.html',{root:'./public/html/'});


})



app.post('/users',cyphCtrl.upsert);

};
    