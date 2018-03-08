var express = require('express');
var router  = express.Router();
var bodyParser  = require('body-parser');
var mongoose = require('mongoose');
var jwt    = require('jsonwebtoken');
var config = require('./config');

var applicationSchema = mongoose.Schema({
	companyId  : String,
	studentId  : String, 
});

var applicaton = mongoose.model('Applicaton',applicationSchema,'newApplication');

router.post('/new',function(req,res) {
	console.log('hi');
	var newApplication = new Applicaton({
		companyId : 10,
		studentId : 10,
	});
	console.log(newCompany);
	newApplication.save(function(err, docs){
		if(err) throw err;
		console.log('Saved');
		res.json(docs);
	});
});
module.exports = router;