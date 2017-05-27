//Need mongoose to run app
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:3000/scrape');
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});

var NewsSchema = new mongoose.Schema({
  category: {type: String, uppercase: true},
  title: String,
  website: {type: String, default: '', lowercase: true},
  date: String,
  url: String
});

module.exports = mongoose.model('Articles', NewsSchema);