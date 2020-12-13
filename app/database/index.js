
const Mongoose = require('mongoose')

const dbURI = process.env.dbURI
Mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })

Mongoose.connection.on('error', (err) => {
    if (err) throw err;
})

Mongoose.Promise = global.Promise;

module.exports = {
    Mongoose,
    models: {
        room: require('./schemas/room'),
        chat: require('./schemas/chat')
    }
};
