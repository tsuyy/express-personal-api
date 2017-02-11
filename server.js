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
  image: 'abc'
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
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"},
      {method: "GET", path: "/api/sites", description: "Places that I want to go"},
      {method: "GET", path: "/api/sites/:id", description: "One of the places that I want to go"},
      {method: "POST", path: "/api/sites", description: "Newly discovered place that I want to go"},
      {method: "PUT", path: "/api/sites/:id", description: "Update info on one of the sites"},
      {method: "DELETE", path: "/api/sites/:id", description: "Delete one of the sites"}
    ]
  })
});


// get profile
app.get('/api/profile', function (req, res) {
  res.json(profile);
});

// get all sites
app.get('/api/sites', function (req, res) {
  db.Site.find({}, function(err, sites) {
    if (err) { return console.log("index error: " + err); }
    res.json(sites);
  });
});

// get one place
app.get('/api/sites/:id', function (req, res) {
  // find one place by its id
  var siteId = req.params._id;
  db.Site.findOne(siteId, function(err, site) {
    if(err){ console.log(err); }
    res.send(site);
  });
});

// create new place
app.post('/api/sites', function (req, res) {
  // create new site with form data (`req.body`)
  var newSite = req.body;
  db.Site.create(newSite, function(err, book) {
    if(err){ console.log(err); }
    res.send(newSite);
  });
});

// update site
app.put('/api/sites/:id', function(req,res){
  var siteId = req.params.id;
  var siteData = req.body;

  db.Site.findOneAndUpdate(siteId, siteData, {new: true},
    function(err, newSite) {
      res.send(newSite);
  });
});

// delete site by id
app.delete('/api/sites/:id', function (req, res) {
  var siteId = req.params.id;
  db.Site.findOneAndRemove(siteId, function(err, site) {
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
