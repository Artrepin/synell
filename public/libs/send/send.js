$( "input" ).focus(function() {
  $(this).attr('style','')
});

$(document).on('submit', "form", function(e) {
  e.preventDefault()

  var $form = $(this),
      msg = $form.serialize(),
      stop = false;

      open_modal($('#thank-modal'))

    $.ajax({
      type: 'POST',
      url: '/mail/',
      data: msg,
      success: function(data) {

        

      }
    });  
})
