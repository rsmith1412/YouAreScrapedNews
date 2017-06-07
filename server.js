// Dependencies
var express = require("express");
var mongojs = require("mongojs");
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");

var bodyParser = require("body-parser");
var handlebars = require("express-handlebars");


// Initialize Express
var app = express();

//Set up Hnadlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));


var Article = require('./models/article.js');
var Comment = require('./models/comments.js');

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/youAreScrapedNews");
var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Database Error:", error);
});

db.on("open", function(){
  console.log("Connected to mongodb");
});

// Main route for index.handlebars
app.get("/", function(req, res) {
  res.render("index");
});

//Route for saved articles page
app.get("/saved", function(req, res) {
  res.render("saved");
});

// Retrieve data from the db
app.get("/all", function(req, res) {
  // Find all results from the scrapedData collection in the db
  Article.find({}, function(error, found) {
    // Throw any errors to the console
    if (error) {
      console.log(error);
    }
    // If there are no errors, send the data to the browser as a json
    else {
      res.json(found);
    }
  });
});

// Scrape data from one site and place it into the mongodb db
app.get("/scrape", function(req, res) {
  // Make a request for the news section of NPR
  request("https://www.npr.org/sections/news/", function(error, response, html) {
    // Load the html body from request into cheerio
    var $ = cheerio.load(html);
    // For each element with a "title" class
    $(".title").each(function(i, element) {
      // Save the text of each link enclosed in the current element
      var title = $(this).children("a").text();
      // Save the href value of each link enclosed in the current element
      var link = $(this).children("a").attr("href");

      // If this title element had both a title and a link
      if (title && link) {
        // Article.save(function(err, data){

        // });
        
        // Save the data in the scrapedData db
        Article.save({
          title: title,
          link: link,
        },
        function(error, saved) {
          // If there's an error during this query
          if (error) {
            // Log the error
            console.log(error);
          }
          // Otherwise,
          else {
            // Log the saved data
            console.log(saved);
          }
        });
      }
    });
  });

  // This will send a "Scrape Complete" message to the browser
  res.send("Scrape Complete");
});

var articleRoutes = require('./controllers/articles_controller')
app.use('/articles', articleRoutes)
//Connecting to mongoose (works with Heroku)
// mongoose.connect('mongodb://heroku_1hq0pj0v:vl5jg9d1ci9f7ttdi4bqugsums@ds153400.mlab.com:53400/heroku_1hq0pj0v');
// var db = mongoose.connection;

// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
