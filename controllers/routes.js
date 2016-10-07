var Auth = require('./users')

var multiparty = require('connect-multiparty')();

module.exports = function routes(app) {

    //
    // ─── USERS ROUTES ───────────────────────────────────────────────────────────────
    //


    app.get('/', (req, res) => {
        res.sendFile('index.html', {
            root: './public/html/'
        });
    });

    app.get('/profile', (req, res) => {
        res.sendFile('profile.html', {
            root: './public/html/'
        });

    })
        app.get('/tracks', (req, res) => {
                res.sendFile('tracklist.html', {
                    root: './public/html/'
                })
            })

        app.get('/me',(req,res) =>{
            res.send(req.sessions.user)
        })
        
        app.get('/logout',(req,res) =>{
            res.sendFile('index.html') , {
                root: './public/html/'
            }
        })
  
            //
            // ─── AUTH ROUTES ───────────────────────────────────────────────────────────────────────
            //


    app.get('/register', (req, res) => {
        res.sendFile('register.html'), {
            root: './public/html'
        }
    }),
    app.get('/login', Auth.render);
    app.get('/logout', Auth.logout);

    app.post('/login', Auth.login);
    app.post('/register', Auth.register);

    };
