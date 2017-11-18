var express = require('express');
var router = express.Router();
var redis = require('redis');
var client = redis.createClient(process.env.REDIS_URL);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Spartans Hackethon' });
});

router.post('/save', function (req,res) {
var bigurl = req.body.bigurl;

        client.lpush('trending', bigurl, function (err, reply) {
            console.log(reply);
        });

        res.send('Successfully saved to Redis');

});

router.get('/items', function (req,res) {

    //client.lrange('urls', 0, 10);
    client.lrange('trending', 0, 4, function (err, result) {
        if(err){
            throw err;
        } else {
            obj = {index: result};
            console.log(JSON.stringify(obj));
            res.render('index', obj);
        }
        });



});

module.exports = router;
