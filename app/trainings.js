var mongoose = require('mongoose');
var config = require('./config');
var express = require('express');
var router  = express.Router();
bodyParser  = require('body-parser');
var Schema = mongoose.Schema;
var trainingsSchema=mongoose.Schema({
	//companyName:String,
	trainee        : String,
	duration       :String,
	startDate      : String,
	endDate        : String,
	timings        : String,
	topics         : String

});
var t=mongoose.model('trainings',trainingsSchema);
module.exports=router;
router.get('/alltraining',function(req,res)
{
	
	t.find({},function(err,docs1){
		res.json(docs1);

});
});
router.post('/add',function(req,res){
var newTraining=new t({
    'trainee'  :req.body.trainee,
    'duration'  :req.body.duration,
    'startDate'  :req.body.startDate,
    'endDate'  :req.body.endDate,
    'topics'   :req.body.topics,
    'timings'  :req.body.timings
} ) ; 
newTraining.save(function(err, docs){
    if(err) {
    	throw err;
}
    console.log('Saved');
    res.json(docs); 
});
});
