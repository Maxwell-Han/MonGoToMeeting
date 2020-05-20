const mongoose = require("mongoose");
mongoose.set("debug", true);

// Database Name
const dbName =
  process.env.NODE_ENV !== "development"
    ? "boilermaker-mongo"
    : "mongotomeeting";

// Connection URL local
const url =
  process.env.NODE_ENV === "development"
    ? `mongodb://localhost/${dbName}`
    : process.env.MONGODB_URL;
console.log('CHECKING URI AND ENV VARs ', process.env.NODE_ENV, url)
const db = mongoose.connect(url);

mongoose.Promise = Promise;

module.exports = db;
