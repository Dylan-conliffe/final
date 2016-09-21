module.exports = function routes(app){ 

app.get('/index.html',function(res,req){
    res.sendfile('index.html');

app.get('/register.html',function(res,req){
    res.sendfile('/public/register.html')

app.get('/profile',(res,req) =>{
    res.sendfile('/public/profile.html')
})

})
})};
    