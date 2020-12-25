
const Mongoose = require('mongoose')

const dbURI = process.env.dbURI
const options = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }

Mongoose.connect(dbURI, options)

Mongoose.connection.on('error', (err) => {
    if (err) throw err;
})

Mongoose.Promise = global.Promise;

module.exports = {
    Mongoose,
    models: {
        room: require('./schemas/room')
    }
};
