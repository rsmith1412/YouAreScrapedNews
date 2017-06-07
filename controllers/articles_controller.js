var express = require("express");
var request = require("request");
var cheerio = require("cheerio");
var router = express.Router();
// var Article = require("../models/Article.js");
// var Comment = require("../models/Comment.js");

//Importing the model to use its database
var articles = require("../models/article.js");
var comments = require("../models/comments.js");

//Creating the routes
router.get("/", function(req, res) {
    //db.all(function(data) {
        var hbsObject = {
            //articles: data
            name: "foo"
        };

        
        //console.log(hbsObject);
        // Render onto Index HBS the object hbsObject
        res.render("index", hbsObject);
    //});
});

router.post("/", function(req, res) {
    db.create([
        "_id", "title", "link"
    ], [
      req.body._id, req.body.title, req.body.link 
    ], function() {
        res.redirect("/");
    });
});

//
router.put("/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    Comment.update({
        devoured: req.body.devoured
    }, condition, function() {
        res.redirect("/");
    });
});

module.exports = router;