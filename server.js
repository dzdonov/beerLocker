//'use strict';
var express   = require('express');
var mongoose  = require('mongoose');
var bodyParser = require('body-parser');
//var beerRoutes = require('./routes/beerRoutes');
var Beer = require('./models/beer');

var app = express();
app.use(bodyParser());
var port = process.env.PORT || 3000;
var router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: 'You are running low on beer!'});
});

var beersRoute = router.route('/beers');

beersRoute.post(function(req, res) {
  console.dir(req.body);
  var beer = new Beer();
  beer.name = req.body.name;
  beer.type = req.body.type;
  beer.qty = req.body.qty;

  beer.save(function(err) {
    if (err)
      res.send(err);
    res.json({ message: 'Beer added to locker', data: beer});
  });
});

beersRoute.get(function(req, res) {
  Beer.find(function(err, beers) {
    if (err)
      res.send(err);
    res.json(beers);
  });
});

var beerRoute = router.route('/beers/:beer_id');

beerRoute.get(function(req, res) {
  Beer.findById(req.params.beer_id, function(err, beer) {
    if (err)
      res.send(err);
    res.json(beer);
  });
});

beerRoute.put(function(req, res) {
  Beer.findById(req.params.beer_id, function(err, beer) {
    if (err)
      res.send(err);
    beer.qty = req.body.qty;

    beer.save(function(err) {
      if (err)
        res.send(err);
      res.json(beer);
    });
  });
});

beerRoute.delete(function(req, res) {
  Beer.findByIdAndRemove(req.params.beer_id, function(err) {
    if (err)
      res.send(err);
    res.json({ message: 'Beer removed from the locker!'});
  });
});

app.use('/api/v1/', router);

mongoose.connect('mongodb://localhost:27017/beerlocker-dev');

app.listen(port);
console.log('Insert beer on port ' + port);
