/*
 * Module dependencies
 */
var express = require('express')
  , mongoose = require('mongoose')
  , stylus = require('stylus')
  , nib = require('nib')
  , randomstring = require("randomstring")

var db = mongoose.connect('mongodb://localhost/pizzavote')

mongoose.connection.db.dropDatabase();

var app = express()

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(express.static(__dirname + '/public'))

var Toppings = require("./models/toppings")

Toppings.remove(function(err, p){
    if(err){ 
        throw err;
    } else{
        console.log('No Of Documents deleted:' + p);
    }
});

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

app.get('/', function(req, res) {
  Toppings.find(function(err, toppings) {
    console.log(toppings);
    res.render('index',
    { title : 'Home',
      toppings : toppings }
    )
  });
})

app.post('/', function(req, res) {
  console.log('post');
})

app.get('/generate', function(req, res) {
  res.send(randomstring.generate(7));
});

app.listen(3000)