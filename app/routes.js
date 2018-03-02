module.exports = function (app) {
	app.get('/',function(req,res){
		res.sendFile('./public/login.html');
	});

};