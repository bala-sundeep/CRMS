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
// operations on student schema
router.post('/authenticate',function(req,res){
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
	Student.findOne({regNumber: req.body.roll},function(err,user){
		if(err) throw err;
		else if(user){
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
		}
		else{
			res.json({m:'exists'});
			}
	});
});

module.exports = router;