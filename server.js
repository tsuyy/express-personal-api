// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

var db = require('./models');

var profile = {
  name: 'Yvonne Tsu',
  githubLink: 'https://github.com/tsuyy',
  facebook: 'https://www.facebook.com/yvonnnetsu',
  instagram: 'https://www.instagram.com/yvonnetsu/',
  currentCity: 'San Francisco, CA',
  pets: [ {name: 'Tiger',
           type: 'Doge',
           breed: 'Siberian and Malamute Husky Mix',
           age: '7 yeards old',
           imageUrl: '/public/images/tiger1.jpg'},
          {name: 'Koda',
           type: 'Doge',
           breed: 'German Shepherd',
           age: '2 months old',
           imageUrl: '/public/images/koda1.jpg'} ],
  image: 'http://localhost:3000/images/me.jpg'
}


/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  res.json({
    documentationUrl: "https://github.com/tsuyy/express-personal-api",
    baseUrl: "https://intense-headland-63736.herokuapp.com/",
    endpoints: [
      {method: "GET", path: "/api", description: "describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "about me"},
      {method: "GET", path: "/api/destinations", description: "places I'm planning to go"},
      {method: "GET", path: "/api/destinations/:id", description: "one of the destinations that I want to go"},
      {method: "POST", path: "/api/destinations", description: "add more destinations"},
      {method: "PUT", path: "/api/destinations/:id", description: "update on one of the destinations"},
      {method: "DELETE", path: "/api/destinations/:id", description: "delete one of the destinations"}
    ]
  })
});


// get profile
app.get('/api/profile', function (req, res) {
  res.json(profile);
});

// get all destinations
app.get('/api/destinations', function (req, res) {
  db.Destination.find({}, function(err, destinations) {
    if (err) { return console.log("index error: " + err); }
    res.json(destinations);
  });
});

// get one place
app.get('/api/destinations/:id', function (req, res) {
  // find one place by its id
  var destinationId = req.params._id;
  db.Destination.findOne(desitinationId, function(err, destination) {
    if(err){ console.log(err); }
    res.send(destination);
  });
});

// create new destinations
app.post('/api/destinations', function (req, res) {
  // create new destination with form data (`req.body`)
  var newDestination = req.body;
  db.Destination.create(newDestination, function(err, destination) {
    if(err){ console.log(err); }
    res.send(newDestination);
  });
});

// update destination
app.put('/api/destinations/:id', function(req,res){
  var destinationId = req.params.id;
  var destinationData = req.body;

  db.Destination.findOneAndUpdate(destinationId, destinationData, {new: true},
    function(err, newDestination) {
      res.send(newDestination);
  });
});

// delete destination by id
app.delete('/api/destinations/:id', function (req, res) {
  var destinationId = req.params.id;
  db.Destination.findOneAndRemove(destinationId, function(err, destination) {
    res.sendStatus(204);
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
