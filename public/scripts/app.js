var $destinationList;
var allDestinations = [];
var profileData;


$(document).ready(function(){

  $destinationList = $('#destinationTarget');

  // $.ajax({
  //   method: 'GET',
  //   url: '/api',
  //   success: handleSuccess,
  //   error: handleError
  // });

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
  //
  // $.ajax({
  //   method: 'GET',
  //   url: '/api/destination/:id',
  //   success: handleSuccess,
  //   error: handleError
  // });


  // $('#newDestinationForm').on('submit', function(e) {
  //   e.preventDefault();
  //   $.ajax({
  //     method: 'POST',
  //     url: '/api/destinations',
  //     data: $(this).serialize(),
  //     success: newDestinationSuccess,
  //     error: newDestinationError
  //   });
  // });


});

//
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

function handleDestinationSuccess(json) {
  allDestinations = json;

  console.log(allDestinations);
  // render();
  allDestinations.forEach(function(destinations, i) {
    $('ul#destinationTarget').append(`<li><h4>${destinations.name} in ${destinations.location}</h4></li>`)

  });
}

function handleSuccess(json) {
  profileData = json;
  console.log(profileData);
  $('span#name').text(profileData.name);
  $('span#city').append(profileData.currentCity);
}

function handleError(xhr, status, errorThrown) {
  console.log('uh oh');
}
//
// function newDestinationSuccess(json) {
//   $('#newDestinationForm input').val('');
//   allDestinations.push(json);
//   render();
// }
//
// function newDestinationError() {
//   console.log("new destination error!");
// }
