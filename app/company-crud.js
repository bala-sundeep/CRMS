var express = require('express');
var router  = express.Router();
bodyParser  = require('body-parser');
var mongoose = require('mongoose');
var jwt    = require('jsonwebtoken');
var config = require('./config');
var cp=require('cookie-parser');
router.use(cp());
var Student   = require(__dirname+'/student');
// creating company schema
var companySchema = mongoose.Schema({
	companyName: String,
	companyLoc : String,
	CTC        : Number,
	bondPeriod : String,
	domain     : String,
	examPattern: String,
	DOI        : String,
	DOJ        : String,
	aboutCmpny : String, 
	year       : String,
	eligible	:Boolean      
});

var Company = mongoose.model('Company',companySchema,'newCompany');

// operations on company schema

router.post('/add',function(req,res) {
	var newCompany = new Company({
		companyName: req.body.name,
		companyLoc : req.body.location,
		CTC        : req.body.ctc,
		bondPeriod : req.body.bperiod,
		domain     : req.body.domain,
		examPattern: req.body.pattern,
		DOI        : req.body.doi,
		DOJ        : req.body.doj,
		aboutCmpny : req.body.about, 
		year       : req.body.year
	});
	console.log(newCompany);
	newCompany.save(function(err, docs){
		if(err) throw err;
		console.log('Saved');
		res.json(docs);
	});
});

router.get('/all',function(req,res){
	
	Company.find({},function(err,docs){
		var d=jwt.decode(req.cookies.mytok,config.secret);
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
		});
		

	});
});

router.put('/updateCompany/:id',function(req,res){
	console.log(req.body);
	Company.update({_id:req.params.id}, {"$set":{
		companyName: req.body.namecc,
		companyLoc : req.body.location,
		CTC        : req.body.ctc,
		bondPeriod : req.body.bperiod,
		domain     : req.body.domain,
		examPattern: req.body.pattern,
		DOI        : req.body.doi,
		DOJ        : req.body.doj,
		aboutCmpny : req.body.about, 
		year       : req.body.year

	}}, function(err,data){
		console.log(data);
		res.json(data);
	});
});

router.delete('/delete/:id',function(req,res){
	Company.remove({_id:req.params.id},function(err, docs){
		res.json(docs);
	});
});
module.exports = router;