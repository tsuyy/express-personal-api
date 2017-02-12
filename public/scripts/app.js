var $destinationList;
var allDestinations = [];
var profileData;


$(document).ready(function(){

  $destinationList = $('#destinationTarget');

  $('#newDestinationForm').on('submit', function(e) {
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
      url: '/api/destinations/'+$(this).attr('data-id'),
      success: deleteDestinationSuccess,
      error: handleError
    });
  });

});

// function getDestinationHtml(destination) {
//   return $('ul#destinationTarget').append(`
//     <li><h4>${destinations.name} in ${destinations.location}</h4></li>
//     `);
// }
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
    $('ul#destinationTarget').append(`<li><h4>${destinations.name} in ${destinations.location}</h4></li>`);
    // $('ul#destinationTarget').append(`<img src='${destinations.image}'>`);

  });
}

function handleSuccess(json) {
  profileData = json;
  console.log(profileData);
  $('span#name').text(profileData.name);
  $('span#city').append(profileData.currentCity);
}

function handleError(xhr, status, errorThrown) {
  console.log(errorThrown);
}

function newDestinationSuccess(json) {
  $('#newDestinationForm input').val('');
  allDestinations.push(json);
  // render();
}

function deleteDestinationSuccess(json) {
  var destination = json;
  var destinationId = destination._id;

  // find the book with the correct ID and remove it from our allBooks array
  for(var index = 0; index < allDestinations.length; index++) {
    if(allDestinations[index]._id === destinationId) {
      allDestinations.splice(index, 1);
      break;  // we found our book - no reason to keep searching (this is why we didn't use forEach)
    }
  }
  // render();
}
