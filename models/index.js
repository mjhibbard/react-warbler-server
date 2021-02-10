const mongoose = require('mongoose');
const mongoURL = "mongodb+srv://mhibbard:<password>@cluster0.aka5v.mongodb.net/<dbname>?retryWrites=true&w=majority"
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/warbler", {
  keepAlive: true,
  // reconnectTries: Number.MAX_VALUE,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports.User = require('./user');
module.exports.Message = require('./message');