var db = require('./models');

var togo_list = [
  {
    name: 'Glacier Point',
    location: 'Yosemite Valley, CA',
    coordinates: 'lat: 37.73, lng: -119.57',
    image: 'https://lh3.googleusercontent.com/-ZxeeRH4qJFo/WJgnX0Hx55I/AAAAAAABFbM/IPkUpHFtnBguLCErKrJefoEnERuoO_o0ACJoC/w530-h663-p-rw/milky%2Bway.%2Bglacier%2Bpoint.%2Byosemite.%2Bcalifornia.%2Bby%2BTanner%2BWendell%2BStewart%2Bwww.tannerwendell.com.jpg'
  },
  {
    name: 'Fallen Leaf Lake',
    location: 'Lake Forest, CA',
    coordinates: 'lat: 38.90, lng: -120.06',
    image: ''
  },
  {
    name: 'Point Reyes National Seashore',
    location: 'Inverness, CA',
    coordinates: 'lat: 38.07, lng: -122.88',
    image: ''
  },
  {
    name: 'Bonsai Rock',
    location: 'New Washoe City, NV',
    coordinates: 'lat: 39.19, lng: -119.92',
    image: ''
  },
  {
    name: 'Kirby Cove',
    location: 'Sausalito, CA',
    coordinates: 'lat: 36.50, lng: -117.07',
    image: ''
  },
  {
    name: 'Big Sur',
    location: 'Central Coast of California',
    coordinates: 'lat: 36.36, lng: -121.85',
    image: ''
  },
  {
    name: 'Antelope Canyon',
    location: 'Navajo, AZ',
    coordinates: 'lat: 36.86, lng: -111.37',
    image: ''
  },
  {
    name: 'Death Valley',
    location: 'Eastern California',
    coordinates: 'lat: 36.50, lng: -117.07',
    image: ''
  },
  {
    name: 'Horseshoe Bend',
    location: 'Page, AZ',
    coordinates: 'lat: 36.87, lng: -111.51',
    image: ''
  },
  {
    name: 'Joshua Tree',
    location: 'Southern California',
    coordinates: 'lat: 33.87, lng: -115.90',
    image: ''
  },
  {
    name: 'Baker Beach',
    location: 'San Francisco, CA',
    coordinates: 'lat: 37.79, lng: -122.48',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Baker_beach_1.jpg'
  }
]

//remove all records that match {} -- which means remove ALL records
db.Destination.remove({}, function(err, destinations){
  if(err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log('removed all destinations');

    // create new records based on the array togo_list
    db.Destination.create(togo_list, function(err, destinations){
      if (err) { return console.log('err', err); }
      console.log("created", destinations.length, "destinations");
      console.log(destinations);
      process.exit();
    });
  }
});
