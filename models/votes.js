/*
* More details here http://mongoosejs.com/docs/guide.html
*/

var mongoose = require("mongoose");

//connect to database
//var db = mongoose.connect('mongodb://pizzavote:p1zz6v0t3@ds051848.mongolab.com:51848');

//create schema for blog post
var votesSchema = new mongoose.Schema({
  key:  String,
  date: { type: Date, default: Date.now }
});

//compile schema to model
module.exports = mongoose.model('votes', votesSchema)
