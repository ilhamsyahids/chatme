require('dotenv').config()

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const flash = require('connect-flash');

const session = require('./app/session');
const passport = require('./app/auth');
const ioServer = require('./app/socket')(app);
const routes = require('./app/routes');

app.set('views', path.join(__dirname, 'app/views'))
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(morgan('common'))

app.use('/', routes)

const port = process.env.PORT || 3001;
ioServer.listen(port, () => console.log(`Listening on Port ${port}...`));