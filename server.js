var express = require('express');
app = express();
bodyParser = require('body-parser');
port = process.env.PORT || 3000;
routes = require('./routes.js')
var fileServer = express.static('public')
var mongoose = require('mongoose');

 mongoose.connect('mongodb://localhost/final',function(error){
     if(error){
         console.error('I can not', error);
     }
    else{
        console.log('good shit');
    
    
     }
 })


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileServer);



app.listen(port,function(){
    console.log('yoooo!',port)
});