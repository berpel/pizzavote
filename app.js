/*
 * Module dependencies
 */
var express = require('express')
  , mongoose = require('mongoose')
  , stylus = require('stylus')
  , nib = require('nib')
  , randomstring = require("randomstring")
  , votes = require("./models/votes");

var db = mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/pizzavote");
mongoose.connection.db.dropDatabase();

var app = express();
var port = process.env.PORT || 3000;

var toppings = {};
toppings.meats = [{"n":"Ham","c":"ham"},{"n":"Beef","c":"beef"},{"n":"Pepperoni","c":"pepperoni"},{"n":"Sausage","c":"sausage"},{"n":"Bacon","c":"bacon"},{"n":"Chicken","c":"chicken"}];
toppings.vegetables = [{"n":"Onions","c":"onions"},{"n":"Green Peppers","c":"greenpeppers"},{"n":"Black Olives","c":"blackolives"},{"n":"Mushrooms","c":"mushrooms"},{"n":"Tomatoes","c":"tomatoes"}];
toppings.specialty = [{"n":"Meat Lovers","c":"meatlovers","toppings":['ham','beef','pepperoni','sausage']},{"n":"Veggie","c":"veggie","toppings":['blackolives','onions','greenpeppers','mushrooms','tomatoes']},{"n":"Supreme","c":"supreme","toppings":['blackolives','onions','greenpeppers','mushrooms','tomatoes','ham','beef','pepperoni','sausage']}];

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(stylus.middleware({ 
	src: __dirname + '/public', 
	compile: compile
  })
);
app.use(express.static(__dirname + '/public'));

// routes
app.get('/', function(req, res) {
    console.log(toppings);
    res.render('index',
    { title : 'Home',
      toppings : toppings }
    );
});

app.post('/', function(req, res) {
  console.log('post');
  console.log(req.params);
});

app.get('/generate', function(req, res) {
  var key = randomstring.generate(7);
  new votes({
    key: key
  });
  console.log(key);
  res.send(key);
});

app.get('/:key', function(req, res) {
  var query = votes.findOne({'key': req.params.id});
  console.log(query);
    res.render('vote',
    { title : 'Create',
      toppings : toppings }
    );
});

app.listen(port, function() {
	console.log("Listening on " + port);
});