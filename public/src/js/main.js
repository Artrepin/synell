var animationEnd = "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd";
var transitionEnd = "transitionend webkitTransitionEnd oTransitionEnd";
var map;
var windowLoad = false;
var preloaderEnd = false;

$.fn.animationStart = function() {

	let delay = $(this).attr('data-delay') ? $(this).data('delay') : 0;

	if($(this).hasClass('animate_line')){

		$(this)
		.addClass('animate_visible')
		.css('animation-delay', delay)		

		if(delay != 0)
			$(this)
				.find('> *')
				.css('transition-delay', (parseFloat(delay) + 0.5) + "s")

	}else{
		$(this)
		.addClass('animate_visible')
		.css('animation-delay', delay)
	}

	return this;
}

function wrapText($elem) {
	let lines = $elem.html().split("<br>");
	$elem.html('<p class="str"><span>' + lines.join('</span></p><p class="str"><span>') + '</span></p>');
}

function hidePreloader() {
	$('html, body').removeClass('js-lock')
	$('.logo.logo_favorite')
		.addClass('logo_passive')
		.on(transitionEnd, function(e) {
			if (e.originalEvent.propertyName == "top"){
				$(this)
					.off(transitionEnd)
					.find('.logo__text')
					.addClass('logo__text_visible')
			}
		})


	$('.preloader').hide().addClass('preloader_hidden')

	inView('.main')
		.on('enter', function(){
			if(!$('.main').hasClass('js-view')){
				$('.main').addClass('js-view')
					$('.main .animate').each(function() {
						$(this).animationStart()
					})
			}				
			
		})		

	inView('.guarantees__row')
		.on('enter', function(){
			if(!$('.guarantees__row').hasClass('js-view')){
				$('.guarantees__row').addClass('js-view')
					$('.guarantees .animate').each(function() {
						$(this).animationStart()
					})
			}				
			
		})
	inView('.support')
		.on('enter', function(){
			if(!$('.support').hasClass('js-view')){
				$('.support').addClass('js-view')
					$('.support .animate').each(function() {
						$(this).animationStart()
					})
			}				
			
		})

	inView('.price')
		.on('enter', function(){
			if(!$('.price').hasClass('js-view')){
				$('.price').addClass('js-view')
					$('.price .animate').each(function() {
						$(this).animationStart()
					})
			}				
			
		})

	inView('.work')
		.on('enter', function(){
			if(!$('.work').hasClass('js-view')){
				$('.work').addClass('js-view')
					$('.work .animate').each(function() {
						$(this).animationStart()
					})
			}				
			
		})

	inView('.vantages__run')
		.on('enter', function(){
			if(!$('.vantages').hasClass('js-view')){
				$('.vantages').addClass('js-view')
					$('.vantages .animate').each(function() {
						$(this).animationStart()
					})
			}				
			
		})			
} 

function resize_window() {

	$('.js-set-width').each(function() {
		var width;

		if($(this).hasClass('js-set-width-right')){
			width = $("body").prop("clientWidth") - ($(this).parent().offset().left + parseFloat($(this).parent().css('padding-left')));
		}else{
			width = $(this).parent().offset().left + $(this).parent().outerWidth();
		}
		
		$(this).width(width)
	})	

	let current = $('.case-slider .dots__slider-item_current').find('.case__cell_nav'),
		parent = current.parent(),
		nav 	= $('.case__nav-parent');

	nav.css({
		'height': current.height(),
		'top': parseInt(parent.position().top) + parseInt(current.position().top) + parseInt(parent.css('margin-top')) + "px"
	})


	$('.container__logo-column:not(.container__logo-column_static)').each(function() {
		var from = 0, to, elemHeight = 0, logoOffset = parseInt($(this).find('.logo').css('top')), styles = {};

		if($(this).attr('data-from')){
			let elementFrom = $($(this).data('from'));

			from = elementFrom.offset().top;

			styles['top'] = from + "px"
		} 

		if($(this).attr('data-to')){
			let elementTo = $($(this).data('to'));

			elemHeight = $(this).attr('data-disableheight') ?
						 0 : elementTo.outerHeight()			

			to = (elementTo.offset().top + elemHeight - logoOffset) - from;

			styles['height'] = to + "px"
		}

		$(this).css(styles)
	})
}



$(document).ready(function() {

	if($(window).scrollTop() > ($('.vantages__container').offset().top + $('.vantages__container').height())){
		$('.vantages__list-row').css("transform", "translate(-100%, 0)")
		$('.vantages__track-scroll').css("transform", "scale(1, 1)")		
	}

	$('.js-need-wrap').each(function() {
		wrapText($(this))
	})






	$('.js-products-skip').click(function(e) {
		e.preventDefault()

	    let anchor = $(this), productsOffset = $('#products').offset().top;		

	    $('#products').addClass('js-block')
	    window.scrollTo(0, productsOffset);

	    $('.container__logo-column_fourth').hide()

	    $('html, body').stop().animate({
	        scrollTop: ($(anchor.attr('href')).offset().top)
	    }, 777, function() {
	    	let newOffset = $(anchor.attr('href')).offset().top;
	    	$('#products').removeClass('js-block')
	    	window.scrollTo(0, newOffset);

	    	if(anchor.hasClass('products__skip_top')){
		    	$('.products__bg-item, .products__name')
		    		.removeClass('js-current')
		    		.removeAttr('style')
		    		.first()
		    		.addClass('js-current')
		    	$('.products__list-inner').css({
		    		'transform': 'translate(0, 0)'
		    	})
		    	$('.products__done').css({
		    		'transform': 'scale(1, 0)'
		    	})	
	    	}else{
		    	$('.products__bg-item, .products__name')
		    		.removeClass('js-current')
		    		.removeAttr('style')
		    		.last()
		    		.addClass('js-current')
		    	$('.products__list-inner').css({
		    		'transform': 'translate(0, -100%)'
		    	})
		    	$('.products__done').css({
		    		'transform': 'scale(1, 1)'
		    	})		    		
	    	}

 
	    	$('.container__logo-column_fourth').show()
	    	// $('.container__logo-column_fourth .css-sticky').css('visibility', 'visible')   	
	    });		    
	})


	$('.js-scroll').click(function(e) {
		e.preventDefault()

	    let anchor = $(this);

	    $('html, body').stop().animate({
	        scrollTop: ($(anchor.attr('href')).offset().top)
	    }, 777);			
	})

	$('.menu__link').click(function(e) {
		e.preventDefault()

	    let anchor = $(this);
	    $('#products').addClass('js-block')
	     $('.container__logo-column_fourth').hide()


	    $('html, body').stop().animate({
	        scrollTop: ($(anchor.attr('href')).offset().top)
	    }, 777, function() {
		   
	    	let newOffset = $(anchor.attr('href')).offset().top;
	    	$('#products').removeClass('js-block')
	    	window.scrollTo(0, newOffset);

	    	$('.js-close-menu').trigger('click')

	    	if(newOffset > $('#products').offset().top){
		    	$('.products__bg-item, .products__name')
		    		.removeClass('js-current')
		    		.removeAttr('style')
		    		.last()
		    		.addClass('js-current')

		    	$('.products__list-inner').css({
		    		'transform': 'translate(0, -100%)'
		    	})

		    	$('.products__done').css({
		    		'transform': 'scale(1, 1)'
		    	})	 	    		
	    	}else{
		    	$('.products__bg-item, .products__name')
		    		.removeClass('js-current')
		    		.removeAttr('style')
		    		.first()
		    		.addClass('js-current')

		    	$('.products__list-inner').css({
		    		'transform': 'translate(0, 0px)'
		    	})

		    	$('.products__done').css({
		    		'transform': 'scale(1, 0)'
		    	})	    		
	    	}

	    	$('.container__logo-column_fourth').show()
	    	// $('.container__logo-column_fourth .css-sticky').css('visibility', 'visible')  	    	
	    });			
	})


	$('.js-social').on('click', function () {
		if($('.fluid__button-icon_open').hasClass('js-current')){
			$('.fluid__button-icon_open').removeClass('js-current')
			$('.fluid__button-icon_close').addClass('js-current')
		}else{
			$('.fluid__button-icon_open').addClass('js-current')
			$('.fluid__button-icon_close').removeClass('js-current')			
		}

		$('.fluid__button-list').toggleClass('js-visible')

	})

	$('.js-open-menu').on('click', function () {
		
		// $('html, body').addClass('js-lock')
		$('.container').addClass('container_blurred')			
		$('.menu').addClass('js-visible')
		$('.fluid').addClass('js-disable')

	})

	$('.js-close-menu').on('click', function () {
		$('.container').removeClass('container_blurred')			
		$('.menu').removeClass('js-visible')
		$('.fluid').removeClass('js-disable')
	})

	$(document).mouseup(function(e){


	    let menu = $(".menu"), social = $('.fluid__button-list');

	    if(menu.hasClass('js-visible')){
		    if (!menu.is(e.target) && menu.has(e.target).length === 0){
				$('.container').removeClass('container_blurred')			
				$('.menu').removeClass('js-visible')
				$('.fluid').removeClass('js-disable')
		    }		    	
	    }

	    if(social.hasClass('js-visible')){
		    if (!$('.fluid__parent').is(e.target) && $('.fluid__parent').has(e.target).length === 0){		

				$('.fluid__button-icon_open').addClass('js-current')
				$('.fluid__button-icon_close').removeClass('js-current')			
					    	
				social.removeClass('js-visible')

		    }	
	    }

	});	

	$('input[name="scope"]').on('change', function() {
		let ind = $(this).parent().index()
		$('.help-modal__back')
			.removeClass('js-visible')
			.eq(ind)
			.addClass('js-visible')

	})
	$('input[name="country"]').on('change', function() {

		let country = $(this).val();
		let formname = $(this).attr('data-formname')
		// alert(formname)
		let addr = $(this).data('addr');
		let phone = $(this).data('phone');
		let homephone = $(this).data('homephone');
		let homephonestr = $(this).data('homephonestr');

		$('.js-contacts-phone').text(phone).attr('href', "tel:"+ homephonestr)
		$('.js-contacts-homephone').text(homephone).attr('href', "tel:"+ homephonestr)
		$('.js-addr').text(addr)
		// $('.contacts__form input[name="form"]').val("Контакты (" + country + ")")
		$('.contacts__form input[name="form"]').val(formname)
	
	})
	$(function () {
		// body...

	    $('body').on("mousemove", function (e) {
	        if ($(window).width() > 1023) {
	            var w = $(window).width(),
	                h = $(window).height(),
	                x = e.clientX,
	                y = e.clientY,
	                indX = Math.ceil(x / (w / 5)),
	                indY = Math.ceil(y / (h / 5));
	            if (!indX || !indY) {
	                return false;
	            }
	            var ind = ((indY - 1) ) + indX;

	            $('.author__bg-image').removeClass('author__bg-image_current').eq(ind).addClass('author__bg-image_current')
	            // $('.author__bg-box').attr('class', 'author__bg-box author__bg-box_state-' + ind);
	        }
	    });		
	})

	$(function() {
		  // Create an array of styles.
			var mapStyles = [
			    {
			        "featureType": "all",
			        "elementType": "labels.text.fill",
			        "stylers": [
			            {
			                "saturation": 36
			            },
			            {
			                "color": "#000000"
			            },
			            {
			                "lightness": 40
			            }
			        ]
			    },
			    {
			        "featureType": "all",
			        "elementType": "labels.text.stroke",
			        "stylers": [
			            {
			                "visibility": "on"
			            },
			            {
			                "color": "#000000"
			            },
			            {
			                "lightness": 16
			            }
			        ]
			    },
			    {
			        "featureType": "all",
			        "elementType": "labels.icon",
			        "stylers": [
			            {
			                "visibility": "off"
			            }
			        ]
			    },
			    {
			        "featureType": "administrative",
			        "elementType": "geometry.fill",
			        "stylers": [
			            {
			                "color": "#000000"
			            },
			            {
			                "lightness": 20
			            }
			        ]
			    },
			    {
			        "featureType": "administrative",
			        "elementType": "geometry.stroke",
			        "stylers": [
			            {
			                "color": "#000000"
			            },
			            {
			                "lightness": 17
			            },
			            {
			                "weight": 1.2
			            }
			        ]
			    },
			    {
			        "featureType": "landscape",
			        "elementType": "geometry",
			        "stylers": [
			            {
			                "color": "#000000"
			            },
			            {
			                "lightness": 20
			            }
			        ]
			    },
			    {
			        "featureType": "poi",
			        "elementType": "geometry",
			        "stylers": [
			            {
			                "color": "#000000"
			            },
			            {
			                "lightness": 21
			            }
			        ]
			    },
			    {
			        "featureType": "road.highway",
			        "elementType": "geometry.fill",
			        "stylers": [
			            {
			                "color": "#000000"
			            },
			            {
			                "lightness": 17
			            }
			        ]
			    },
			    {
			        "featureType": "road.highway",
			        "elementType": "geometry.stroke",
			        "stylers": [
			            {
			                "color": "#000000"
			            },
			            {
			                "lightness": 29
			            },
			            {
			                "weight": 0.2
			            }
			        ]
			    },
			    {
			        "featureType": "road.arterial",
			        "elementType": "geometry",
			        "stylers": [
			            {
			                "color": "#000000"
			            },
			            {
			                "lightness": 18
			            }
			        ]
			    },
			    {
			        "featureType": "road.local",
			        "elementType": "geometry",
			        "stylers": [
			            {
			                "color": "#000000"
			            },
			            {
			                "lightness": 16
			            }
			        ]
			    },
			    {
			        "featureType": "transit",
			        "elementType": "geometry",
			        "stylers": [
			            {
			                "color": "#000000"
			            },
			            {
			                "lightness": 19
			            }
			        ]
			    },
			    {
			        "featureType": "water",
			        "elementType": "geometry",
			        "stylers": [
			            {
			                "color": "#000000"
			            },
			            {
			                "lightness": 17
			            }
			        ]
			    }
			]

			var currentRegion = $("input[name='country']:checked")
			var cur_lat = parseFloat(currentRegion.data('lat'));
			var cur_lng = parseFloat(currentRegion.data('lng'));

			var mapOptions = {
				center: new google.maps.LatLng(cur_lat, cur_lng),
				zoom: 14,
				minZoom: 3,
				disableDefaultUI: true,
				// scrollwheel: false,
				styles: mapStyles
			};
		  
		  	map = new google.maps.Map(document.getElementById('map'), mapOptions);
			
			var image = {
				url: '/img/google-mark.png',
				size: new google.maps.Size(26, 58),
				anchor: new google.maps.Point(13, 58)
			};

			var list = []
			 
			function addMarker(location) {
				var marker = new google.maps.Marker({
					position: location,
					icon: image,
					map: map
				});
				list.push(marker);
			}

			function setMapOnAll(map) {
				for (var i = 0; i < list.length; i++) {
					list[i].setMap(map);
				}
			}

			function clearMarkers() {
				setMapOnAll(null);
			}

			function deleteMarkers() {
				clearMarkers();
				list = [];
			}	

			

			addMarker(new google.maps.LatLng(cur_lat, cur_lng))


			$('input[name="country"]').on('change', function() {
				let lat = parseFloat($(this).data('lat'));
				let lng = parseFloat($(this).data('lng'));

				deleteMarkers()

				addMarker(new google.maps.LatLng(lat, lng))
		
		        map.setZoom(13);
				map.setCenter(new google.maps.LatLng(lat, lng));
				
			})			  	
	})

	// $(function() {
	// 	$('.main__video').click(function() {
	// 		$(this).addClass('main__video_hide')

	// 		$('html, body').addClass('js-lock')			
	// 	})
	// })






	$('.steps .tabs__nav-item').click(function() {
		var offset = parseInt($('.steps .css-sticky').css('top')) - (1920 / 100 * 0.52)
		var pos = $('.slider__item_current .steps__big').offset().top - offset
		$('html, body').animate({scrollTop: pos}, 500);
	})

	$(function() {
		function fade_slider(slider, slide_current) {
			if(slider.find('.dots__slider-box').length){
				slider
					.find('.dots__slider-inner')
					.addClass('js-hide')
					.one(animationEnd, function() {

						slider
							.find('.dots__slider-item')
							.removeClass('dots__slider-item_current')
							.eq(slide_current)
							.addClass('dots__slider-item_current')	

						slider
							.find('.dots__slider-list')
							.css('transform', 'translate(-'+(slide_current*100)+'%, 0) translateZ(0)')

						$(this)
							.removeClass('js-hide')		
							.addClass('js-show')
							.one(animationEnd, function() {
								$(this).removeClass('js-show')							
							})	
						
					})					
			}
		}
		$('.slider__dots > *').click(function() {
			if(!$(this).hasClass('js-lock')){
				var ind = $(this).index(), 
				next,
				slider = $(this).closest('.slider'),
				dots = $(this).parent().find('>*'), 
				nav = slider.find('.slider__nav >*');

				dots.removeClass('js-checked')
				$(this).addClass('js-checked')

				dots.addClass('js-lock')
				nav.addClass('js-lock')

				next = slider.find('.slider__item').eq(ind);

				if(slider.find('.slider__line').length){
					slider
						.find('.slider__line')
						.addClass('slider__line_visible')
						.one(animationEnd, function() {

							slider.find('.slider__item_current').removeClass('slider__item_current')
							next.addClass('slider__item_current')

							slider.find('.slider__list')
								.css('transform', 'translate(-'+(ind*100)+'%, 0)')

							$(this)
								.removeClass('slider__line_visible')
								.addClass('slider__line_hide')
								.one(animationEnd, function() {

									$(this)
										.removeClass('slider__line_hide')
									
									nav.removeClass('js-lock')
									dots.removeClass('js-lock')

								})

							

						})									
				}else{
					if(slider.find('.slider__box').hasClass('slider__box_withfade')){
						var height = slider.find('.slider__list').outerHeight()

						slider
							.find('.slider__list')
							.height(height)
							.addClass('slider__list_hide-with-fade')
							.one(animationEnd, function() {

								slider.find('.slider__item_current')
									.removeClass('slider__item_current')

								next.addClass('slider__item_current')	

								$(this)
									.removeAttr('style')
									.removeClass('slider__list_hide-with-fade')		
									.addClass('slider__list_show-with-fade')
									.one(animationEnd, function() {
										$(this).removeClass('slider__list_show-with-fade')

										nav.removeClass('js-lock')
										dots.removeClass('js-lock')										
									})		


							})


					}
				}

				fade_slider(slider, ind)

			}
		})

		$('.slider__nav > *').click(function() {
			if(!$(this).hasClass('js-lock')){

				var next, 
				slider = $(this).closest('.slider'), 
				index, 
				nav = $(this).parent().find('>*'),
				dots = slider.find('.slider__dots >*');

				dots.addClass('js-lock')
				nav.addClass('js-lock')

				if($(this).hasClass('js-prev')){
					if((slider.find('.slider__item_current').index() + 1) > 1){
						next = slider.find('.slider__item_current').prev()
					}else{
						next = slider.find('.slider__item:last-child')
					}		
				}else{
					if((slider.find('.slider__item_current').index() +1) < slider.find('.slider__item').length){
						next = slider.find('.slider__item_current').next()
					}else{
						next = slider.find('.slider__item:first-child')
					}	
				}

				index = next.index()


				dots
					.removeClass('js-checked')
					.eq(index)
					.addClass('js-checked')	

				if(slider.find('.slider__line').length){

					slider
						.find('.slider__line')
						.addClass('slider__line_visible')
						.one(animationEnd, function() {
							next.addClass('slider__item_current')

							slider
								.find('.slider__item')
								.removeClass('slider__item_current')
								.eq(index)
								.addClass('slider__item_current')
							

							slider
								.find('.slider__list')
								.css('transform', 'translate(-'+(index*100)+'%, 0)')

							$(this)
								.removeClass('slider__line_visible')
								.addClass('slider__line_hide')
								.one(animationEnd, function() {

									$(this)
										.removeClass('slider__line_hide')

									
									nav.removeClass('js-lock')
									dots.removeClass('js-lock')

								})

							

						})					
				}

				fade_slider(slider, index)


			}
		})
	})
	

	// (function($) {



	$(function() {
		$.fn.partChange = function(callback = false) {
			var slider = $(this)
			var slide_current = 0;
			var slide_count = slider.find('.dots__table:first .dots__table-cell').length;

			
			slider.find('.dots__table-cell').each(function() {
				$(this).attr('data-offset', $(this).position().left)
			})

			$(window).on('load resize', function () {
				let outWidth = slider.find('.dots__table').outerWidth(),
					innertWidth = slider.find('.dots__table-list')[0].scrollWidth;
					
				if(innertWidth > outWidth){
					slider
						.find('.dots')
						.addClass('js-rebuild')
				}else{
					slider
						.find('.dots')					
						.removeClass('js-rebuild')
				}

				slider.find('.dots__table-cell').each(function() {
					$(this).attr('data-offset', $(this).position().left)
				})
			})

			function change_slide(navScorll = true){
				var width;

				if(slider.find('.dots__slider-box').length){
					slider
						.find('.dots__slider-inner')
						.addClass('js-hide')
						.one(animationEnd, function() {


							let next = slider.find('.dots__slider-item').eq(slide_current);

							slider.find('.dots__slider-item_current')
								.removeClass('dots__slider-item_current')

							next.addClass('dots__slider-item_current')	


							slider
								.find('.dots__slider-list')
								.css('transform', 'translate(-'+(slide_current*100)+'%, 0) translateZ(0)')
	
							$(this)
								.removeClass('js-hide')		
								.addClass('js-show')
								.one(animationEnd, function() {

									$(this).removeClass('js-show')
									slider.find('.js-change-part, .dots__table-cell, .dev__segment-dot').removeClass('js-lock')
								
								})	
								
							if(callback){
								callback(slide_current)
							}
							

						})					
				}else{
					slider.find('.js-change-part, .dots__table-cell').removeClass('js-lock')
				}

				slider.find('.dots__segment-label')
					.removeClass('dots__segment-label_current')			

				slider.find('.dots__segment-dot')
					.removeClass('dots__segment-dot_active')
					.slice(0, slide_current+1)
					.addClass('dots__segment-dot_active')

				slider.find('.dots__segment-dot')
					.eq(slide_current)	
					.find('.dots__segment-label')
					.addClass('dots__segment-label_current')

				if(slider.find('.dots__segment-path').length){
					width = slider.find('.dots__segment-dot').eq(slide_current).offset().left - slider.find('.dots__segment-dot').eq(slide_current).parent().offset().left;
					slider.find('.dots__segment-done').width(width)							
				}

		
				slider.find('.dots__table:visible .dots__table-cell')
					.removeClass('dots__table-cell_current')
					.eq(slide_current)
					.addClass('dots__table-cell_current')



				if(navScorll){
					// if($(window).width() <= 860){
					// 				
					let outWidth = slider.find('.dots__table').outerWidth(),
						innertWidth = slider.find('.dots__table-list')[0].scrollWidth;
						
					if(slider.find('.dots').hasClass('js-rebuild')){
						var item = slider.find('.dots__table:visible .dots__table-cell_current')
						var pos = parseInt(item.attr('data-offset')) + item.outerWidth() / 4 - outWidth/2

						slider.find('.dots__table-list').animate({scrollLeft: pos}, 600);
					}else{
						slider.find('.dots__table-list').scrollLeft(0);
					}					
				}
				
			}

			slider.find('.dots__table-cell').on('click', function() {
				if(!$(this).hasClass('js-lock')){
					slider.find('.js-change-part, .dots__table-cell, .dev__segment-dot').addClass('js-lock')

					slide_current = $(this).index();

					change_slide()
				}
			})

			slider.find('.dev__segment-dot').on('click', function() {
				if(!$(this).hasClass('js-lock')){
					slider.find('.js-change-part, .dots__table-cell, .dev__segment-dot').addClass('js-lock')

					slide_current = $(this).index();

					change_slide()
				}
			})
			// slider.find('.dots__slider-list').on('swiperight', function() {
			// 
			// })

			slider.find('.js-change-part').on('click', function() {

				if(!$(this).hasClass('js-lock')){
					slider.find('.js-change-part, .dots__table-cell, .dev__segment-dot').addClass('js-lock')

					if($(this).hasClass('js-change-part-next')){
						if (slide_current < (slide_count-1))
							slide_current++;
						else
							slide_current = 0
					}else{
						if (slide_current > 0)
							slide_current--;
						else
							slide_current = slide_count-1				
					}

					change_slide()

				}

			})


			return this;
		}; 

		$('.part-slider').each(function() {
			$(this).partChange()
		})

		$('.dev-slider').partChange(function(item) {
			let offset = parseInt($('.dev .css-sticky').css('top')) - (1920 / 100 * 0.52)
			let pos = $('.dev__bottom').offset().top - offset

			$('html, body').animate({scrollTop: pos}, 500);

			if(item > 2){
				$('.dev__circle').addClass('dev__circle_start')
			}else{
				$('.dev__circle').removeClass('dev__circle_start')
			}
		})

		$('.case-slider').partChange(function(item) {
			let current = $('.case-slider .dots__slider-item').eq(item).find('.case__cell_nav'),
				parent = current.parent(),
				nav 	= $('.case__nav-parent');

			nav.css({
				'height': current.height(),
				'top': parseInt(parent.position().top) + parseInt(current.position().top) + parseInt(parent.css('margin-top')) + "px"
			})


		})

	})

	$('.team__slider').each(function() {
		$(this).owlCarousel({
		    loop: true,
		    items: 4,
		    margin: 0,
		    center: false,
		    smartSpeed: 500,
		    dots: false,	
		    nav: true,	
		    navText: ['<svg viewBox="0 0 192 320"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-left"></use></svg>', '<svg viewBox="0 0 192 320"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-left"></use></svg>'],
		    responsive:{
		        0:{
		            items:1
		        },
		        420:{
		            items:2
		        },
		        860:{
		            items:3
		        },
		        1024:{
		            items:4
		        }
		    }			
		})
	})

})

$(function() {
	// preloader
	
	if($(window).width() > 860){
		$('.logo.logo_favorite')
			.addClass('logo_start')
			.find('.logo__image svg')
			.one(animationEnd, function() {
				preloaderEnd = true
				if(windowLoad){
					hidePreloader()
				}
			})	

		$('.safari-logo')	
			// .find('.safari-logo__image svg')
			.on(animationEnd, function(e) {
				
				if(e.originalEvent.animationName == "logo_show_safari"){
					
					$(this)
						.find('.safari-logo__image')
						.addClass('js-done')
						.one(transitionEnd, function() {
							$('.logo_favorite').addClass('logo_safaridone')
							preloaderEnd = true
							if(windowLoad){
								hidePreloader()
							}							
						})

				}

			})			 
	}else{
		preloaderEnd = true
		if(windowLoad){
			hidePreloader()
		}		
	}
})



$(window).on('load', function(){
	inView.threshold(0.3);

	windowLoad = true

	if(preloaderEnd){
		hidePreloader()
	}

})

function parallaxScroll() {
    var wrapper = $('.js-wrapper'),
	    scrolled = $(window).scrollTop() - wrapper.offset().top
    wrapper.css("backgroundPosition", "50% " + (50 + scrolled * .05) + '%');
}


$(window).on('load scroll', function () {
	parallaxScroll();

	var windowTop = $(window).scrollTop() 

	if(windowTop > $('.vantages__container').offset().top){
		$('.fluid_default-hide').removeClass('js-hide')
		$('.mobile-nav').addClass('js-show')


	}else{
		$('.fluid_default-hide').addClass('js-hide')
		$('.mobile-nav').removeClass('js-show')

		$('.vantages__list-row').css("transform", "translate(0, 0) translateZ(-1px)")
		$('.vantages__track-scroll').css("transform", "scale(0, 1)")				
	}


	if($(window).width() > 860){
		var st = $(this).scrollTop() + $(this).height(); 
		var objectOffset = $('.vantages__container').offset().top
		var objectHeight = $('.vantages__container').outerHeight();

		if((windowTop > objectOffset) && 
			(st < (objectOffset + objectHeight))){

			// let elementWidth = document.getElementById('vantages-list').scrollWidth;

			let containerHeight = (objectOffset + objectHeight) - $(this).height() * 2
			let currentScroll = 100 / (containerHeight / (windowTop - objectOffset))
			let currentScrollInPX = $('#vantages-list').width() * 1.3 / 100 * currentScroll

			$('.vantages__list-row').css("transform", "translate(-"+currentScrollInPX+"px, 0) ")
			// $('.vantages__list-row').css("transform", "translate(-"+currentScroll+"%, 0) ")
			$('.vantages__track-scroll').css("transform", "scale("+(currentScroll / 100)+", 1)")
		}		
	}

	

})

$(function() {
	var lastScrollLeft = 0;
	$('.vantages__list-row').on('scroll', function () {
		if($(window).width() <= 860){
			var documentScrollLeft = $(this).scrollLeft();

		    if (lastScrollLeft != documentScrollLeft) {

		    	let width = $('.vantages__list-row')[0].scrollWidth - $(this).width()

		    	let currentScroll = 100 / (width / lastScrollLeft)

		        $('.vantages__track-scroll').css("transform", "scale("+(currentScroll / 100)+", 1)")

		        lastScrollLeft = documentScrollLeft;
		    }			
		}
	})	
})

$(window).on('load resize', function () {
	resize_window()

	// $(function() {
	// 	var padding = parseInt($('.vantages .wrap').css('margin-left')) + parseInt($('.vantages .wrap').css('padding-left'))

	// 	$('.vantages__list').css('padding-left', padding + "px")
	// })	
});