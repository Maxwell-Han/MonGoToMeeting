const mongoose = require('mongoose')
mongoose.set('debug', true)

// Database Name
const dbName = 'boilermaker-mongo';

// Connection URL local
const url = `mongodb://localhost/${dbName}`

//Connection URL Mongo Atlas
// const url = "mongodb+srv://maxwell:reactapp@mongotomeeting-f3ssf.mongodb.net/test?retryWrites=true&w=majority";

const db = mongoose.connect(url)
console.log('#@########db connected at ', url)
mongoose.Promise = Promise

module.exports = db



