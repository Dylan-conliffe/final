var express    = require('express'),
    bodyParser = require('body-parser'),
    routes     = require('./controllers/routes.js'),
    mongoose   = require('mongoose'),
    logger     = require('morgan'),
    ejs        = require('ejs'),
    // sessions   = require('client-sessions')
    fileServer = express.static('public'),
    port = process.env.PORT || 3000;

app = express();

mongoose.connect('mongodb://localhost/Cypher', function(error) {
        if (error) {
            console.error('I can not run fam', error);
        } else {
            console.log('good shit...DB is up'); }});


 app.use(logger('dev'));
// app.use(sessions({
//     cookieName:'cypherCookie',
//     secret: 'BootyDew',
//     requestkey: 'session',
//     duration: 86400,
//     cookie: {
//         ephemeral: false,
//         httpOnly: true,
//         secure: false
//     }
// }))
app.post('*', bodyParser.json());
app.post('*', bodyParser.urlencoded({
    extended: true
}));

app.use(fileServer);

routes(app);

app.listen(port, function() {
    console.log('yoooo!', port)
});