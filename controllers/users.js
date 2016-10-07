var User = require('../model/schema'),
bcrypt = require('bcryptjs'),
secretShit = require('../secretShit.js'),
 s3 = require('s3'),
 s3Client = s3.createClient({
    s3Options: {
        accessKeyId: 'secretShit.accessKeyId',
        secretAccessKey: 'secretShit.secretAcessKey'
    }
})

errors = {
    general: {
        status: 500,
        message: 'Backend Error'
    },
    login: {
        status: 403,
        message: 'Invalid username or password.'
    }
};



module.exports = {

    //   getUser: ('/me',(req,res) =>{
    //         res.send(req.sessions.user)
    //     }),

    get: (req, res) => {
        if (req.params.id) {
            Profileinfo.findOne({
                _id: req.params.id
            }).populate('Profileinfo').exec((err, user) => {
                res.json(user);
            })
        } else {
            Profileinfo.find({}).exec((err, Profileinfo) => {
                res.json(Profileinfo);
            });
        }
    },



    render: (req, res) => {
        res.render('index.html', req.session);
    },
    logout: (req, res) => {
        req.session.reset();
        res.end();
        res.redirect('/index.html')
        
    },
    login: (req, res) => { // form post submission
        User.findOne({
            email: req.body.email
        }, (err, user) => {
            if (err) {
                console.error('MongoDB error:'.red, err);
                res.status(500).json(errors.general);
            }
            if (!user) {
                // forbidden
                console.warn('No user found!'.yellow);
                res.status(403).json(errors.login);
            } else {
                console.info('auth.login.user', user);
                // at this point, user.password is hashed!
                bcrypt.compare(req.body.password, user.password, (bcryptErr, matched) => {
                    // matched will be === true || false
                    if (bcryptErr) {
                        console.error('MongoDB error:'.red, err);
                        res.status(500).json(errors.general);
                    } else if (!matched) {
                        // forbidden, bad password
                        console.warn('Password did not match!'.yellow);
                        res.status(403).json(errors.login);
                    } else {
                         req.session.user = user; // this is what keeps our user session on the backend!
                        console.log(req.session.user)
                        res.send({
                            message: 'Login success'
                        });
                    }
                });
            }
        });
    },
    register: (req, res) => {
        console.log('Register payload:', req.body);

        var newUser = new User(req.body);

        newUser.save(  (err, user) => {
            if (err) {
                console.log('#ERROR#'.red, 'Could not save new user ', err);
                res.status(500).send(errors.general);
            } else {
                console.log('New user created in MongoDB:', user);
                req.session.user = user;
                res.send(user);
                console.log(req.session.user)
            }
        });

        },

        update: (req,res) =>{
            console.log('updating user ', req.session.user._id);
           
            console.log("USER: ", User);
           
            User.findOneAndUpdate({ _id: req.session.user._id }, req.body,{new: true}, function(err, doc){
                if(err){
                  console.log("Something wrong when updating data!"); 
                }
                console.log(doc);
                req.session.user = doc;
                res.send(doc);
            }); 
        },


        

    

     },

    middlewares : {
        session: (req, res, next) => {
            if (req.session.user) {
                console.info('User is logged in, proceeding to dashboard...'.green);
                next();
            } else {
                console.warn('User is not logged in!'.yellow)
                res.redirect('/login');
            }
        }
    };

var body = req.body.data
var file = req.files.files
var filePath = '/profileSHIT' + (new Date()).getTime() + file.name



        var uploader = s3Client.uploadFile({
                localFile: file.path,
                s3Params: {
                    Bucket: 'cyper-user-stuff',
                    Key: filePath,
                    ACL: 'public-read',
                }

            })
        uploader.on('end', function(){
            var url = s3.getPublicUrlHttp('cypher-user-stuff',filePath)
            console.log('URL',url)
            
            body.pic = url;
            var User = new User(body);
            User.save(function(err,doc){
                res.send(doc)
            })


    // Auth middleware functions, grouped

});