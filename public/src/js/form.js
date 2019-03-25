$(document).ready(function() {
	$(function() {
		$("input[type='text'], input[type='password'], input[type='tel'], input[type='email']")
		.bind("change keyup input click", function() {
			if($(this).next().hasClass("form__placeholder")){

				$(this).parent().addClass('js-focus')

				if($(this).val()){
					$(this).parent().addClass('js-not-empty')
				}else{
					$(this).parent().removeClass('js-not-empty')
				}
			}	
		})
		.focusout(function() {
			if($(this).next().hasClass("form__placeholder")){
				$(this).parent().removeClass('js-focus')
			}
			
		})



		$('.form__password').click(function() {
			let input = $(this).parent().find('input')

			if(input.attr('type') == "password"){
				input.attr('type', 'text')
				$(this).addClass('js-active')
			}else{
				input.attr('type', 'password')
				$(this).removeClass('js-active')
			}
		})
	})

})