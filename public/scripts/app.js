var allDestinations = [];
var $destinationList;
var profileData;
var destinationInput;


$(document).ready(function(){

  $destinationList = $('ul#destinationTarget');

  $('.createBtn').on('click', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/destinations',
      data: $(this).serialize(),
      success: newDestinationSuccess,
      error: handleError
    });
  });

  $.ajax({
    method: 'GET',
    url: '/api/destinations',
    success: handleDestinationSuccess,
    error: handleError
  });

  $.ajax({
    method: 'GET',
    url: '/api/profile',
    success: handleSuccess,
    error: handleError
  });

  $destinationList.on('click', '.deleteBtn', function() {
    $.ajax({
      method: 'DELETE',
      url: '/api/destinations/' + $(this).attr('data-id'),
      success: deleteDestinationSuccess,
      error: handleError
    });
  });


});



//
// function getAllDestinationsHtml(destinations) {
//   return destinations.map(getDestinationHtml).join("");
// }
//
// function render() {
//   $destinationList.empty();
//   var destinationsHtml = getAllDestinationsHtml(allDestinations);
//   $destinationList.append(destinationsHtml);
// }

function handleSuccess(json) {
  profileData = json;
  console.log(profileData);
  $('img#profile-image').attr('src', profileData.image);
  $('span#name').text(profileData.name);
  $('span#city').append(profileData.currentCity);
  $('a#fbAnchor').attr('href', profileData.facebook);
  $('a#igAnchor').attr('href', profileData.instagram);
  $('a#githubAnchor').attr('href', profileData.githubLink);

  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 37.78, lng: -122.44},
    zoom: 6
  });
  var marker = new google.maps.Marker({
    position: { lat: 37.73, lng: -119.57},
    map: map
  });
  var marker = new google.maps.Marker({
    position: { lat: 38.90, lng: -120.06},
    map: map
  });
  var marker = new google.maps.Marker({
    position: { lat: 38.07, lng: -122.88},
    map: map
  });
  var marker = new google.maps.Marker({
    position: { lat: 39.19, lng: -119.92},
    map: map
  });
  var marker = new google.maps.Marker({
    position: { lat: 37.79, lng: -122.48},
    map: map
  });
  var marker = new google.maps.Marker({
    position: { lat: 36.50, lng: -117.07},
    map: map
  });
  var marker = new google.maps.Marker({
    position: { lat: 36.86, lng: -111.47},
    map: map
  });
  var marker = new google.maps.Marker({
    position: { lat: 36.36, lng: -121.85},
    map: map
  });
  var marker = new google.maps.Marker({
    position: { lat: 36.87, lng: -111.51},
    map: map
  });
  var marker = new google.maps.Marker({
    position: { lat: 33.87, lng: -115.90},
    map: map
  });
}

function handleDestinationSuccess(json) {
  allDestinations = json;

  allDestinations.forEach(function(destinations) {
    // $('img.photo-grid').attr('src', `${destinations.image}`);
    // $('span.caption').text(`${destinations.name}`);

    $destinationList.append(`<li>
      <input type="checkbox">
        <label>${destinations.name} in ${destinations.location}</label>
        </li>
      <br>`);
  });
}

function newDestinationSuccess(json) {
  destinationInput = $('#destinationForm input').val('');
  $destinationList.append(`<li>
    <input type="checkbox">
      <label>${destinationInput}</label>
      </li>
    <br>`)
}

// function deleteDestinationSuccess(json) {
//   var destination = json;
//   var destinationId = destination._id;
//
//   for(var index = 0; index < allDestinations.length; index++) {
//     if(allDestinations[index]._id === destinationId) {
//       allDestinations.splice(index, 1);
//       break;
//     }
//   }
// }

function handleError(xhr, status, errorThrown) {
  console.log(errorThrown);
}
