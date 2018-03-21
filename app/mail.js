//Include the mail module and pass to, subject and body as parameters to send mail from exec() call
var express = require('express');
var router  = express.Router();
var jwt    = require('jsonwebtoken');
var config = require('./config');
var nodemailer = require('nodemailer');
var cp=require('cookie-parser');
router.use(cp());
module.exports=function(to,subject,body)
{//function

	//mail start
	var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'Gmail' ,
    port: 465	,
    secure: false,
    requireTLS: true,
	  auth: {
	    user: 'arunbandari0@gmail.com',
	    pass: 'arun12345'
	  }//auth
	});// createTransport
	

 var maillist;
		maillist=to;


  var mailOptions = {
	  from: 'GRIET PLACEMENTS DUMMY',
	  	  subject: subject,
	  	  to: maillist ,
	  text: body
	};//mailOptions

	 transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email sent: ' + info.response);
	  }//else
	});//sendMail
//mail end
} //service end