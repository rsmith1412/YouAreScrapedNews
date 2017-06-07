//Need mongoose to run app
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Creating Article Schema
var ArticleSchema = new Schema({
  // Need a title: a text string
  title: {
      type: String,
      required: true
  },
  // Link to actual article
  link: {
      type: String, 
      trim: true, 
      lowercase: true,
      required: true
    },
  // Comments for the article, referenced to the "Comments" model
   comments: [{
      // Storing unique Id's for each comment
      type: Schema.Types.ObjectId,
      // Referencing the Comments model
      ref: "Comments"    
   }] 
//   date: String,
//   saved: Boolean, default: false,
});

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;