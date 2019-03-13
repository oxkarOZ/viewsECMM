var statusTracking = 0;

$(function() {
  removeClassTracking();
});


function searchOrderTracking(){
  var orderTrackingId = $('#idOrderTrack').val();
  var statusTracking = 3;
  
  $('#orderTrackingId').html(orderTrackingId);
  $('#statusId').html('');
  $('#detailTrackingId').css('display', 'block');
  $('#searcherId').css('display','none');
  $('#shippedViaId').html('FedDex');
  $('#statusId').html('Processing Order');

  removeClassTracking();  

switch(statusTracking) {
  case 1:
    $('#enteredOrderId').addClass("active");    
    break;
  case 2:
    $('#enteredOrderId').addClass("active");
    $('#paymentConfirmedId').addClass("active");
    break;
     case 3:
    $('#enteredOrderId').addClass("active");
    $('#paymentConfirmedId').addClass("active");
    $('#processingOrderId').addClass("active");
    break;
     case 4:
    $('#enteredOrderId').addClass("active");
    $('#paymentConfirmedId').addClass("active");
    $('#processingOrderId').addClass("active");
    $('#orderSentId').addClass("active");
    break;
     case 5:
     $('#enteredOrderId').addClass("active");
    $('#paymentConfirmedId').addClass("active");
    $('#processingOrderId').addClass("active");
    $('#orderSentId').addClass("active");
    $('#productDeliveredId').addClass("active");
    break;
}

}

function removeClassTracking(){
   $('#enteredOrderId').removeClass("active");
    $('#paymentConfirmedId').removeClass("active");
    $('#processingOrderId').removeClass("active");
    $('#orderSentId').removeClass("active");
    $('#productDeliveredId').removeClass("active");
}
