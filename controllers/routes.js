var Auth = require('./users'),
    User = require('../model/schema.js')
    // secretShit = require('../secretShit.js'),
s3 = require('s3'),
    s3Client = s3.createClient({
        s3Options: {
            accessKeyId: 'AKIAJV6EATRHBT77LWZQ',
            secretAccessKey: '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'

        }
    })
    // console.log(secretShit)
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
    app.all('/profile*', Auth.middlewares.session)
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
       // console.log(req.session.user._id ,"will you show the fuck up ID? ".underline.yellow);
    })

    app.post('/updateProfile', multiparty, Auth.update)


    app.get('/logout', Auth.logout)
          
    
    app.post('/profile/edit', multiparty, (req, res) => {
        console.log('where'.yellow)
        var body = req.body.data;
        var file = req.files.files;
        console.log(file,'is this it?' .red);

        var filePath = 'profileSHIT/' + (new Date()).getTime()

        var uploader = s3Client.uploadFile({
            localFile: file.path,
            s3Params: {
                Bucket: 'cypher-user-stuff',
                Key: filePath,
                ACL: 'public-read',
            }

        });

        uploader.on('progress', function () {
            console.log("progress", uploader.progressAmount, uploader.progressTotal, ((uploader.progressAmount / uploader.progressTotal) * 100) + '%' .green)
        });

        uploader.on('end', function () {
            var url = s3.getPublicUrlHttp('cypher-user-stuff', filePath)
            console.log('URL', url , req.session.user._id  ,'yo'.underline.red)
            console.log(req.session.user._id ,'req session id?'.rainbow);
            req.body.pic = url;
            //console.log(req.body.pic);
            User.findOneAndUpdate({
                _id: req.session.user._id
            }, req.body, {
                new: true
            }, function (err, doc) {
                if (err) {
                    console.log("Something wrong when updating data!".yellow, err);

                    console.log('userId'.rainbow ,req.session.user._id);
                    res.send(err);
                } else {
                    var newUser = new User(body);
                    newUser.save(function(err,doc){
                        res.send(doc);
                        console.log(doc)
                   })
                }
               
            });


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