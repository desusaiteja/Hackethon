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
    client.connect(process.env.REDIS_URL, function(err, client, done) {
        client.set('URL', bigurl, function (err, reply) {
            console.log(reply);
        });
    });
});

router.post('/geturl', function (req,res) {

    client.get('URL', function(err, reply) {
        console.log(reply);
        res.send(reply);
    });
})

module.exports = router;
