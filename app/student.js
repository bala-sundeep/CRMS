var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('students', new Schema({
	studentName: String,
	regNumber  : String,
	branch     : String,
	cource     : String,
	year       : Number,
	ssc        : Number,
	inter      : Number,
	current    : Number,
	project    : String, 
	nBclog     : Number,
    placed     : Boolean,
    package    : Number,
	company    : String,
	password   : String,
	mobileNo   :Number,
	email      :String,
	fName      :String,
	section     :String,
	address     :String,
	isAdmin		: {type:Boolean, default:false}
})
);