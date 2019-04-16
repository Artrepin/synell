var animationEnd = "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd";
var transitionEnd = "transitionend webkitTransitionEnd oTransitionEnd";

function check_modal_open() {
	if($('.modal__item_active').length)
		return true
	else
		return false
}

function close_modal() {
	var popup = $('.modal__item_loaded').length ? $('.modal__item_loaded') : $('.modal__item_active');


	if(popup.find('.modal__content-default.js-hide').length){

		popup
			.removeClass('modal__item_black')
			.find('.modal__content-default')
			.removeClass('js-hide')

		popup
			.find('.modal__content-polit')
			.addClass('js-hide')	

		$('.js-popup, .js-open-image').removeClass('js-lock')		

		$('.fluid').removeClass('js-disable')	

	}else{
		$('.container').removeClass('container_blurred')

		$('.modal')
			.removeClass('modal_open')

		if(popup.hasClass('modal__item_loaded')){
			$('.js-popup, .js-open-image').removeClass('js-lock')	
			$('.fluid').removeClass('js-disable')		
		}
		
		$('.modal__item_active, .modal__item_loaded')
			.removeClass('modal__item_active modal__item_loaded')
			.on(transitionEnd, function(e) {
				
				if(e.originalEvent.propertyName == "transform"
					|| e.originalEvent.propertyName == "-webkit-transform"
					|| e.originalEvent.propertyName == "visibility"){

					$(this).off(transitionEnd)

					$("#image-modal .modal__image").removeAttr('src')
					$('.fluid').removeClass('js-disable')	

					// if($(window).width() <= 860)
					// $('html, body').removeClass('mobile-lock')

					$('.js-popup, .js-open-image').removeClass('js-lock')
				}
			})		

	}

}

function open_modal(popup, polit = false) {

	// $('.fluid').addClass('js-disable')
	// $('.modal').addClass('modal_open')
	// $('.container').addClass('container_blurred')
	// $('#case-edit').addClass('modal__item_active')
	

	if(check_modal_open()){

		if(polit){

			if(popup.find('.modal__content-polit').is(":empty")){
				var $polit = $('.polit-modal__content').clone();
				$('.modal__content-polit').html($polit);
			}

			popup
				.addClass('modal__item_black')
				.find('.modal__content-default')
				.addClass('js-hide')

			popup
				.find('.modal__content-polit')
				.removeClass('js-hide')	

		}else{
			$('.modal__item_active')
				.removeClass('modal__item_active')
				.on(transitionEnd, function(e) {
					
					if(e.originalEvent.propertyName == "transform"
						|| e.originalEvent.propertyName == "-webkit-transform"){

						popup
							.addClass('modal__item_active')		
							.on(transitionEnd, function(e) {
								if(e.originalEvent.propertyName == "transform"
									|| e.originalEvent.propertyName == "-webkit-transform"){
									$(this).off(transitionEnd)
									$('.js-popup').removeClass('js-lock')
								}
							})

					}
				})			
		}

	}else{
		// if($(window).width() <= 860)
		// $('html, body').addClass('mobile-lock')

		$('.modal').addClass('modal_open')

		$('.container').addClass('container_blurred')	
						
		popup
			.addClass('modal__item_active')		
			.on(transitionEnd, function(e) {
				if(e.originalEvent.propertyName == "transform"
					|| e.originalEvent.propertyName == "-webkit-transform"){
					$(this).off(transitionEnd)
					$('.js-popup').removeClass('js-lock')
				}
			})										
	}			
}

$(document).on('click', '.js-popup', function(e) {
	e.preventDefault()
	
	if(!$(this).hasClass('js-lock')){
		let popup = ($(this).attr("href") 
					&& $(this).attr("href") != "#") 
					? $($(this).attr("href")) 
					: $($(this).data('modal'));

		let polit = 0;

		$('.js-popup').addClass('js-lock')

		if($(this).attr('data-input')){
			popup.find('input[name="form"]').val($(this).data('input'))
		}

		if($(this).attr('data-polit')){
			polit = 1;

			popup = $('.modal__item_active')
		}

		open_modal(popup, polit)	
	}

})

$(document).mouseup(function(e){
    var container = $(".modal");

    if($('.modal').hasClass('modal_open')){
	    if (!container.is(e.target) && container.has(e.target).length === 0){
	        close_modal()
	    }		    	
    }

});		

$(document).on('click', '.modal__close, .js-modal-close', function(e) {
	e.preventDefault()
	close_modal()
})

$(function() {
	$('.js-open-image').click(function(e) {
		e.preventDefault()

		if(!$(this).hasClass('js-lock')){
			$('.js-open-image').addClass('js-lock')
			

			var popup = $("#image-modal")
			var link = $(this).attr('href')

			$('.fluid').addClass('js-disable')	

			popup
				.find('.modal__image')
				.attr('src', link)
				.one("load", function() {


					$('.modal').addClass('modal_open')

					$('.container').addClass('container_blurred')	
									
					popup
						.addClass('modal__item_loaded')		
						.on(transitionEnd, function(e) {
							if(e.originalEvent.propertyName == "visibility"){
								$(this).off(transitionEnd)
								$('.js-open-image').removeClass('js-lock')
							}
						})						
				})					
		}
	})
})