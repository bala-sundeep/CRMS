var express = require('express');
var router  = express.Router();
bodyParser  = require('body-parser');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt    = require('jsonwebtoken');
var config = require('./config');
var cp=require('cookie-parser');
router.use(cp());
// creating company schema
var Student   = require(__dirname+'/student');
var saltRounds=10;
var trainingsSchema=mongoose.Schema({
	companyName:String,
	trainee        : String,
	startDate        : String,
	endDate        : String,
	timings        : String,

});
var t=mongoose.model('trainings',trainingsSchema);

router.get('/all',function(req,res){
	Student.find({},function(err,docs){
		res.json(docs);
	});
});
router.get('/alltraining',function(req,res)
{
	t.find({},function(err,docs1){
		res.json(docs1);

});
});
router.get('/myProfile',function(req,res){
	var d=jwt.decode(req.cookies.mytok,config.secret);
	console.log(d);
	//var p=res.attachment('C:\\Users\\Bhargavi\\Desktop\\students14\\14241a05c3.jpg');
	Student.findOne({regNumber:d.admin},function(err,docs){
		res.json(docs);
	});
});
router.get('/getStatus',function(req,res){
	var d=jwt.decode(req.cookies.mytok,config.secret);
	console.log(d);
	Student.findOne({regNumber:d.admin},function(err,docs){
		res.json(docs);
	});
});
router.post('/update',function(req,res){
	console.log(req.body+"reqbody");
	Student.update({_id:req.body._id}, {"$set":{
		studentName: req.body.studentName,
		regNumber  : req.body.regNumber,
		branch     : req.body.branch,
		cource     : req.body.cource,
		year       : req.body.year,
		ssc        : req.body.ssc,
		inter      : req.body.inter,
		current    : req.body.current,
		project    : req.body.project, 
		nBclog     : req.body.nBclog,
		placed     : req.body.placed,
		package    : req.body.package,
		mobileNo    : req.body.mobileNo,
		email    : req.body.email,
		address    : req.body.address,
		company    : req.body.company,
		fName      :req.body.fName,
		section     :req.body.section
	
	}}, function(err,data){
		console.log(data.regNumber+"update success");
		res.json(data);
	});
	});
	


router.put('/update/:id',function(req,res){
	console.log(req.body);
	Student.update({_id:req.params.id}, {"$set":{
		studentName: req.body.name,
		regNumber  : req.body.rno,
		branch     : req.body.branch,
		cource     : req.body.cource,
		year       : req.body.year,
		ssc        : req.body.ssc,
		inter      : req.body.inter,
		current    : req.body.current,
		project    : req.body.project, 
		nBclog     : req.body.nBclog,
	    placed     : req.body.placed,
	    package    : req.body.package,
	    company    : req.body.company

	}}, function(err,data){
		console.log(data);
		res.json(data);
	});
});

router.delete('/delete/:id',function(req,res){
	Student.remove({_id:req.params.id},function(err, docs){
		res.json(docs);
	});
});




module.exports = router;