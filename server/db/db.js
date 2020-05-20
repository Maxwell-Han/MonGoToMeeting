const mongoose = require('mongoose')
mongoose.set('debug', true)

// Database Name
const dbName = 'boilermaker-mongo';

// Connection URL local
const url = `mongodb://localhost/${dbName}`

const db = mongoose.connect(url)

mongoose.Promise = Promise

module.exports = db



