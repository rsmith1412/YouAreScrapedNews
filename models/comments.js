//Need mongoose to run app
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  //category: {type: String, uppercase: true},
  body: {
      type: String,
      unique: true
  }
});

var Comment = mongoose.model('Comments', CommentSchema);

module.exports = Comment;