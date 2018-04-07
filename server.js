var express    = require('express');
var app		   = express();
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var dbHost = 'mongodb://localhost:27017/crms';
var cp=require('cookie-parser');
app.use(cp());
var bcrypt = require('bcrypt');
var jwt    = require('jsonwebtoken');
var Student   = require(__dirname+'/app/student');
var config = require(__dirname+'/app/config');
mongoose.connect(dbHost,function(err){
	if(err) console.log('error');
	else console.log('connected');
});

//middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({}));
app.locals.dir=__dirname;
app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/public/students14'));
app.get(['/','/login'],function(req,res){
	res.sendFile(__dirname+'/public/login.html');
});
var basicAuth = require('./app/student-auth-reg');
app.use('/basic',basicAuth);

app.use(function(req, res, next) {
	//console.log(req.cookies);
	// check header or url parameters or post parameters for token
	var mytoken=req.cookies.mytok;
	if(mytoken){
		mytoken=jwt.verify(mytoken,config.secret);
	Student.findOne({'regNumber':mytoken.admin},'regNumber',function(err,user){
		if(err) throw err;
		else next();
	});
	}
	else
	res.redirect("http://localhost:3000/");
});
app.get('/isAdmin',(req,res)=>{
	let mytoken=req.cookies.mytok;
		mytoken=jwt.verify(mytoken,config.secret);
	Student.findOne({'regNumber':mytoken.admin},'isAdmin',function(err,user){
		if(err) throw err;
		else res.send(user);
	});
})

var company = require('./app/company-crud');
var training=require('./app/trainings');
var student = require('./app/student-crud');
var application = require('./app/application');
var feedback= require('./app/feedback');
app.use('/company',company);
app.use('/student',student);
app.use('/apply',application);
app.use('/training',training);
app.use('/feedback',feedback);
app.get('/index',function(req,res){
	res.sendFile(__dirname+'/public/views/index.html');
});
app.get('/logout',function(req,res){
	res.clearCookie("mytok");
	res.sendStatus(200);
});
app.use('/*',function(req,res){
	res.sendFile(__dirname+'/public/views/index.html');
})



var PORT = process.env.PORT || 3000;
app.listen(PORT,function(){
	console.log('server is running on '+PORT);
});