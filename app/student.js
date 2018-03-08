var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('students', new Schema({
	studentName: String,
	regNumber  : String,
	branch     : String,
	cource     : String,
	year       : Number,
	ssc        : String,
	inter      : String,
	current    : String,
	project    : String, 
	nBclog     : String,
    placed     : Boolean,
    package    : Number,
	company    : String,
	password   : String,
	mobileNo   :Number,
	email      :String,
	fName      :String,
	section     :String,
	address     :String
})
);