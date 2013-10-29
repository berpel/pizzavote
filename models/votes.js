/*
* More details here http://mongoosejs.com/docs/guide.html
*/

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var votesSchema = new Schema({
  urlId:  {type: String, index: true},
  createDate: { type: Date, default: Date.now },
  results: {
	  totalSlices: Number,
	  totalPies: Number
  },
  votes: [
	{
		slices: Number, 
		toppingsYes: [String], 
		toppingsNo: [String]
	}
  ]
});

//compile schema to model
module.exports = mongoose.model('votes', votesSchema);