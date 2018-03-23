var mongoose = require('mongoose');
var config = require('./config');
var express = require('express');
var router  = express.Router();
bodyParser  = require('body-parser');
var Schema = mongoose.Schema;
var feedbackSchema=mongoose.Schema({

	trainee        : String,
	rating         : Number,
	feedback       :String
	
});
var t=mongoose.model('feedback',feedbackSchema);
module.exports=router;
/*router.get('/alltraining',function(req,res)
{
	
	t.find({},function(err,docs1){
		res.json(docs1);

});
});
*/
router.post('/add',function(req,res){
var newFeedback=new t({
    'trainee'  :req.body.trainee,
    'rating'   :req.body.rating,
    'feedback'  :req.body.feedback
} ) ; 
newFeedback.save(function(err, docs){
    if(err) {
    	throw err;
}
    console.log('Saved');
    res.json(docs); 
});
});
