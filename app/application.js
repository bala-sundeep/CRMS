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

var application = mongoose.model('Application',applicationSchema,'newApplication');

router.get('/all',function(req,res){
	
	application.find({'companyId': req.query.cid},function(err,docs){
		/*var d=jwt.decode(req.cookies.mytok,config.secret);
		Student.findOne({regNumber:d.admin},function(err,user){
		if(err) throw err;
		for(var i=0;i<docs.length;i++){
			if((docs[i]['CTC']-user['package']>4))
			docs[i].eligible="true";
			else
			docs[i].eligible="false";
		}
		//console.log(docs[1].eligible);
		res.json(docs);
		});*/
		res.json(docs);

	});
});

router.post('/new',function(req,res) {
	console.log(req.body.cid);
	var newApplication = new application({
		companyId : req.body.cid,
		studentId : req.rollno,
	});
	//console.log(newCompany);
	newApplication.save(function(err, docs){
		if(err) throw err;
		console.log('Saved');
		res.json(docs);
	});
});
module.exports = router;