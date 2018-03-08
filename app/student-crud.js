var express = require('express');
var lower   =require('lower-case');
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
/*var trainingsSchema=mongoose.Schema({
	//companyName:String,
	trainee        : String,
	duration       :String,
	startDate      : String,
	endDate        : String,
	timings        : String,
	topics         : String,
	feedback       : String

});
var t=mongoose.model('trainings',trainingsSchema);*/
// operations on student schema
/*router.post('/authenticate',function(req,res){
	Student.findOne({regNumber: req.body.roll},function(err,user){
		if(err) throw err;
		else if(!user){
			console.log("Invalid Username");
		}
		else{
			if (!bcrypt.compareSync(req.body.password, user.password)) {
				console.log("Incorrect password");
			}
			else{
				var payload = {
					admin: user.regNumber	
				}
				var token = jwt.sign(payload, config.secret);
				var t=res.cookie('mytok',token,{maxAge:900000});
				//res.send("hi");
				//next();
			   // res.redirect("http://localhost:3000/index");
			   res.sendStatus(200);
			}
		}
	});
});
router.post('/add',function(req, res) {
	var salt = bcrypt.genSaltSync(saltRounds);
var hash = bcrypt.hashSync(req.body.password, salt);
	var newStudent = new Student({
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
		company    : req.body.company,
		password   : hash
	});

	//console.log(newStudent);
	newStudent.save(function(err, docs){
		if(err) throw err;
		console.log('Saved');
		res.json(docs);
	});
});*/
router.get('/all',function(req,res){
	Student.find({},function(err,docs){
		res.json(docs);
	});
});
/*router.get('/alltraining',function(req,res)
{
	t.find({},function(err,docs1){
		res.json(docs1);

});
});*/
router.get('/myProfile',function(req,res){
	var d=jwt.decode(req.cookies.mytok,config.secret);
	console.log(d);
	//var p=res.attachment('C:\\Users\\Bhargavi\\Desktop\\edited\\CRMS-master\\students14\\14241a05c3.jpg');
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
router.get('/myImage',function(req,res){
	var d=jwt.decode(req.cookies.mytok,config.secret);
	var path="C:\\Users\\Bhargavi\\Desktop\\edited\\CRMS-master\\students14\\"+lower(d.admin)+".jpg";
res.sendFile(path);
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