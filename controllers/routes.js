var Auth = require('./users')

module.exports = function routes(app) {

    app.get('/', (req, res) => {
        res.sendFile('index.html', {
            root: './public/html/'
        });
    });
    
    app.get('/profile', (req,res) =>{
        res.sendFile('profile.html', {root: './public/html/'});
    })
    app.get('/login', Auth.render); 
    app.get('/logout', Auth.logout); 

    app.post('/login', Auth.login);
    app.post('/register', Auth.register); 



};