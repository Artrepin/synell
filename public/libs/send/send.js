$( "input" ).focus(function() {
  $(this).attr('style','')
});

$(document).on('submit', "form", function(e) {
  e.preventDefault()

  console.log(this)

  var $form = $(this),
      msg = $form.serialize(),
      stop = false;

    $.ajax({
      type: 'POST',
      url: '/mail/',
      data: msg,
      success: function(data) {

        open_modal($('#thank-modal'))

      }
    });  
})
