const mongoose = require("mongoose");
mongoose.set("debug", true);

// Database Name
const dbName = "mongotomeeting"

// Connection URL local
const url =
  process.env.NODE_ENV === "development"
    ? `mongodb://localhost/${dbName}`
    : process.env.MONGODB_URL;

const db = mongoose.connect(url, { useNewUrlParser: true });

mongoose.Promise = Promise;

module.exports = db;
