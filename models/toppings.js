/*
* More details here http://mongoosejs.com/docs/guide.html
*/

var mongoose = require("mongoose");

//connect to database
//var db = mongoose.connect('mongodb://localhost/pizzavote');

//create schema for blog post
var toppingsSchema = new mongoose.Schema({
  name:  String,
  type: String,
  date: { type: Date, default: Date.now },
});

//compile schema to model
module.exports = mongoose.model('toppings', toppingsSchema)
