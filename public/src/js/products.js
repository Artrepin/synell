
// продукты

var box_height = $(window).height()
var item_count = $('.products__item').length
var margin = box_height;
var last_current_item = -1;
var current_item = -1;
var container_height = (box_height + margin) * item_count + margin //+ box_height

$('.products__container').css("height", container_height + "px")

// for (var i = 0; i <= item_count; i++) {
// 	let current_top = ((box_height + margin) * i) + margin
// 	let current_box = current_top + box_height;
// 	console.log("начинается с " + current_top + " и заканчивается в  " + current_box )
// }

var lastScrollTop = 0;

$(window).on("scroll", function () {

	if(!$('#products').hasClass('js-block')){
		var st = $(this).scrollTop();
		var windowTop = $(window).scrollTop() 
		var window_pos = $(this).scrollTop() + $(this).height(); 
		var objectOffset = $('.products__container').offset().top
		var objectHeight = $('.products__container').outerHeight();

		// if(){
		if((windowTop > objectOffset) && 
			(window_pos < (objectOffset + objectHeight))){
			let inside_pos = windowTop - objectOffset;// + $(window).height() / 2;

			var fullScroll = 100 / ((container_height - margin - box_height) / (inside_pos));
			var scrollSize = 100 / ((container_height - box_height) / (inside_pos));
			let currentScrollInPX = $('.products__list-inner').height() / 100 * fullScroll
			// console.log("val: " + fullScroll + "% | " +"container_height: " + container_height + " | inside_pos: " +(inside_pos + box_height))

			$('.products__list-inner')
				.css({
					'transform': 'translate(0,-'+currentScrollInPX+'px) translateZ(-1px)'
				})

			$('.products__done')
				.css({
					'transform': 'scale(1,'+(scrollSize / 100)+')'
				})				

			for (var i = 0; i <= item_count; i++) {
				let current_top = ((box_height + margin) * i) + margin;
				let current_box = current_top + box_height// - margin;

					// && (inside_pos + $(window).height()) < (current_box)
				if(inside_pos > (current_top - margin)  && inside_pos < current_box){
					// с отступом

					last_current_item = i;

					// console.log("сейчас находимся на " + last_current_item + " | текущий скролл: " + inside_pos + " | начало с отступом: " + (current_top - margin) + " | начало без оступа: " + (current_top) + " | конец: " +  current_box)

					if(last_current_item != current_box){
						$('.products__name')
							.removeClass('js-current')
							.eq(last_current_item)
							.addClass('js-current')	

						$('.products__item')
							.removeClass('js-current')
							.eq(last_current_item)
							.addClass('js-current')																
					}
				}

				if(inside_pos > current_top  && inside_pos < current_box){

					last_current_item = i;

					let insideScroll = inside_pos - (current_top)
					let scrollVal = 100 / ((current_box - current_top) / insideScroll);
					let objectOpacity = 1 - scrollVal / 100;
					let objectScale = 1 + scrollVal / 100
					let objectBlur = 10 - (objectOpacity * 10)


					// console.log("current elem: " + last_current_item + " | current_box: " + (current_box - current_top) + " | insideScroll: " + insideScroll)

					$('.products__bg-item')
						.not(':eq('+last_current_item+')')
						.removeClass('js-current')
						.removeAttr('style')	

					$('.products__bg-item')										
						.eq(last_current_item)
						.addClass('js-current')
						.css({
							'opacity': objectOpacity,
							// 'transform': 'scale('+objectScale+') translateZ(0)',
							// 'filter': 'blur('+objectBlur+'px)'
						})


					// console.log('last_current_item: ' + last_current_item + " | current_item: " + current_item)
					
					
					// if(inside_pos > (current_top + box_height /2)){
					// 	// показываем текущий
					// }else{
					// 	// начинаем показывать следующий блок
					// }				

					// console.log("внутри блока №" + i )

				}

				

				
			}

			current_item = last_current_item

		}else{
			if(windowTop < objectOffset){
				$('.products__bg-item')
					.removeAttr('style')

		    	$('.products__list-inner').css({
		    		'transform': 'translate(0, 0px)'
		    	})

		    	$('.products__done').css({
		    		'transform': 'scale(1, 0)'
		    	})	
			}

			// if(windowTop > objectOffset + objectHeight){
			// 	$('.products__bg-item')
			// 		.removeAttr('style')
			// 		.removeClass('js-current')	
			// 		.last()
			// 		.removeAttr('style')

		 //    	$('.products__list-inner').css({
		 //    		'transform': 'translate(0, -100%)'
		 //    	})

		 //    	$('.products__done').css({
		 //    		'transform': 'scale(1, 1)'
		 //    	})					
			// }

	

		}				
	}


	// lastScrollTop = st;
})
