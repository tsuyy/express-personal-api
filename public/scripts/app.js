
$(document).ready(function(){

  $.ajax({
     method: 'GET',
     url: 'http://localhost:3000/api/destinations',
     success: handleSuccess,
     error: handleError
  });

  function handleSuccess(json) {
   console.log(json);
  }

  function handleError(xhr, status, errorThrown) {
   console.log('uh oh');
  }


});
