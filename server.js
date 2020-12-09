
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const routes = require('./app/routes');

app.set('views', path.join(__dirname, 'app/views'))
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(morgan('common'))

app.use('/', routes)

const port = process.env.PORT || 1337;
app.listen(port, () => console.log(`Listening on Port ${port}...`));