var db = require('./models');

var togo_list = [
  {
    name: 'Glacier Point',
    location: 'Yosemite Valley, CA',
    coordinates: '37.7304° N, 119.5736° W',
    image: 'https://lh3.googleusercontent.com/-ZxeeRH4qJFo/WJgnX0Hx55I/AAAAAAABFbM/IPkUpHFtnBguLCErKrJefoEnERuoO_o0ACJoC/w530-h663-p-rw/milky%2Bway.%2Bglacier%2Bpoint.%2Byosemite.%2Bcalifornia.%2Bby%2BTanner%2BWendell%2BStewart%2Bwww.tannerwendell.com.jpg'
  },
  {
    name: 'Fallen Leaf Lake',
    location: 'Lake Forest, CA',
    coordinates: '38.8986° N, 120.0636° W',
    image: 'http://images.fineartamerica.com/images/artworkimages/mediumlarge/1/evening-at-fallen-leaf-lake-jacek-joniec.jpg'
  },
  {
    name: 'Point Reyes National Seashore',
    location: 'Inverness, CA',
    coordinates: '38.0723° N, 122.8817° W',
    image: 'http://natureplaytrips.com/wp-content/uploads/2016/02/point-reyes.png'
  },
  {
    name: 'Bonsai Rock',
    location: 'New Washoe City, NV',
    coordinates: '39.1852° N, 119.9280° W',
    image: 'https://static1.squarespace.com/static/55a33b86e4b0858890886370/55a6c8ace4b0393512e40cbf/55aa98e2e4b0a996cf316da5/1437274609284/Bonsai+Sunset-1.jpg?format=1000w'
  },
  {
    name: 'Baker Beach',
    location: 'San Francisco, CA',
    coordinates: '37.7936° N, 122.4836° W',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Baker_beach_1.jpg'
  }
  // {
  //   name: 'Kirby Cove',
  //   location: 'Sausalito, CA',
  //   coordinates: '37.8286° N, 122.4905° W',
  //   image: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Baker_beach_1.jpg'
  // },
  // {
  //   name: 'Baker Beach',
  //   location: 'San Francisco, CA',
  //   coordinates: '37.7936° N, 122.4836° W',
  //   image: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Baker_beach_1.jpg'
  // },
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
      console.log("created", destinations.length, "places");
      console.log(destinations);
      process.exit();
    });
  }
});
