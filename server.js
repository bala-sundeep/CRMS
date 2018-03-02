var express    = require('express');
var app		   = express();
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var dbHost = 'mongodb://localhost:27017/crms';
mongoose.connect(dbHost,function(err){
	if(err) console.log('error');
	else console.log('connected');
});

//middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({}));

app.use(express.static(__dirname+'/public'));
app.get(['/','/login'],function(req,res){
	res.sendFile(__dirname+'/public/login.html');
});
var company = require('./app/company-crud');
var student = require('./app/student-crud');
app.use('/company',company);
app.use('/student',student);
app.get('/index',function(req,res){
	res.sendFile(__dirname+'/public/views/index.html');
});
app.get('/logout',function(req,res){
	res.clearCookie("mytok");
	res.sendStatus(200);
});

// custom config


// route middleware to authenticate and check token

/*app.use(function(req, res, next) {
	//console.log(req.cookies);
	// check header or url parameters or post parameters for token
	var tok=req.cookies.mytok;
	if(tok){
		console.log(jwt.decode(tok,{complete: true}).payload);
	User.findOne({mytok:tok},function(err,user){
		if(err) throw err;
		else next();
	});}else{
		res.send("gone");
	}
	
});
*/
//main

var PORT = process.env.PORT || 3000;
app.listen(PORT,function(){
	console.log('server is running on '+PORT);
});