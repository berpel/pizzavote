/*
 * Module dependencies
 */
var express = require('express')
  , mongoose = require('mongoose')
  , stylus = require('stylus')
  , nib = require('nib')
  , randomstring = require("randomstring");

var db = mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/pizzavote");

mongoose.connection.db.dropDatabase();

var app = express();
var port = process.env.PORT || 3000;

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
));
app.use(express.static(__dirname + '/public'));


var Toppings = require("./models/toppings");
var Votes = require("./models/votes");

// don't know how to migrate shit
Toppings.remove(function(err, p){
    if(err){ 
        throw err;
    } else{
        console.log('No Of Documents deleted:' + p);
    }
});


// insert some data
new Toppings({
    name: 'Pepperoni',
    type: 'meat'
  }).save();

new Toppings({
    name: 'Sausage',
    type: 'meat'
  }).save();

new Toppings({
    name: 'Ham',
    type: 'meat'
  }).save();

// routes
app.get('/', function(req, res) {
  Toppings.find(function(err, toppings) {
    console.log(toppings);
    res.render('index',
    { title : 'Home',
      toppings : toppings }
    );
  });
});

app.post('/', function(req, res) {
  console.log('post');
});

app.get('/generate', function(req, res) {
  var key = randomstring.generate(7);
  new Votes({
    key: key
  });
  console.log(key);
  res.send(key);
});

app.get('/:key', function(req, res) {
  var query = Votes.findOne({'key': req.params.id});
  console.log(query);
  Toppings.find(function(err, toppings) {
    res.render('vote',
    { title : 'Create',
      toppings : toppings }
    );
  });
});

app.listen(port, function() {
	console.log("Listening on " + port);
});