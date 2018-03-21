//import { setTimeout } from 'timers';

var express = require('express');
var router  = express.Router();
var bodyParser  = require('body-parser');
var mongoose = require('mongoose');
var jwt    = require('jsonwebtoken');
var config = require('./config');
var promise=require('bluebird');
var Student   = require(__dirname+'/models/studentSchema');
var applicationSchema = mongoose.Schema({
	companyId  : String,
	// studentId  : String, 
	studentId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'students' }]
});

var application = mongoose.model('Application',applicationSchema,'newApplication');
var promises=[];
var records=[];
var mn=0;
function pfunction(input){
	return new promise(function(resolve,reject){

	Student.find({'regNumber': input},function(err,user){
		records[mn++]=user;
		resolve(user);
     });
});
}
router.get('/all',function(req,res){
	var records=new Array();
	application.find({'companyId': req.query.cid}).populate('studentId').exec(function(err,user){

		console.log(err, JSON.stringify(user));
	})
});

/*router.get('/all',function(req,res){
	var records=new Array();
	application.find({'companyId': req.query.cid},function(err,docs){
		var x=docs.map(x => pfunction(x[i].studentId));
//		for(var i=0;i<docs.length;i++){
//			promises.push(pfunction(docs[i].studentId,i));
			//Student.findSync({'regNumber': docs[i].studentId},function(err,user){
			//	records[i]=user;
		
			
		
/*		var p=promise.all(promises).then(function fun(){
			console.log(p);
			console.log(records);
			res.send(records);
		});*/

		/*setTimeout(function(){
			console.log(records);
		},2000);
		
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
		});
		res.json(docs);

	});
});*/

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