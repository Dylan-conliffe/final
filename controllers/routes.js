var Auth = require('./users'),
    secretShit = require('../secretShit.js'),
    s3 = require('s3'),
    s3Client = s3.createClient({
        s3Options: {
            accessKeyId: secretShit.accessKeyId,
            secretAccessKey: secretShit.secretAcessKey
        }
    })
    console.log(secretShit)
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

    app.get('/me', (req, res) => {
        res.send(req.session.user)
            //res.send('HELLO')
    })

    app.post('/updateProfile', multiparty, Auth.update)


    app.get('/logout', (req, res) => {
        res.sendFile('index.html'), {
            root: './public/html/'
        }
    })
    app.post('/profile/edit', multiparty, (req, res) => {
        console.log(req.files,'files?'); 

        var body = req.body.data;
        var file = req.files.files;
        var filePath = 'profileSHIT/' + (new Date()).getTime() + file.name

        var uploader = s3Client.uploadFile({
            localFile: file.path,
            s3Params: {
                Bucket: 'cypher-user-stuff',
                Key: filePath,
                ACL: 'public-read',
            }

        });

            uploader.on('progress', function(){
                console.log("progress", uploader.progressAmount, uploader.progressTotal, ((uploader.progressAmount / uploader.progressTotal) * 100) + '%')
            });

        uploader.on('end', function () {
            var url = s3.getPublicUrlHttp('cypher-user-stuff', filePath)
            console.log('URL', url)
            body.pic = url;
            var newuser = new user(body);

            newuser.save(function (err, doc) {
                res.send(doc)
            })



        })
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



}