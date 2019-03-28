$(document).ready(function() {
	function case_check(){
		if($('.admin-case__item').length){
			$('.base__empty').removeClass('js-show')
		}else{
			$('.base__empty').addClass('js-show')
		}
	}

	case_check()

	$('.js-file-link').on('click', function(e){
		e.preventDefault()

		var input = $(this).parent().find('input[type="file"]')

		input.trigger('click')


	})

	$('input[name="language"]').on('change', function() {
		let prefix = ".js-" + $(this).val()

		$('.js-language-input').removeClass('js-current')
		$(prefix).addClass('js-current')
	})

   $(".js-preview-image-select").on('change', function(){
        if (this.files && this.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.admin-modal__preview img').attr('src', e.target.result);
            } 

            reader.readAsDataURL(this.files[0]);
        }
    });

   // $('.admin-modal__form').on('submit', function(e) {
   $('.admin-modal__form .button').on('click', function(e) {

		alert(1)

	   	e.preventDefault()

		var $form = $('.admin-modal__form'), // $(this)
			formData = new FormData($form[0]),
			image = $form.find('.admin-modal__preview img').attr('src'),
			name = $form.find('.js-case-name').val(),
			author = $.trim($('.sidebar .user__name').text()),
			case_type = $form.find('input[name="admin-type"]').val(),
			template;



			// $.ajax({
			// 	type: 'POST',
			// 	url: '/',
			//	data: formData,
			//	contentType: false,
			//	processData: false,				
			// 	success: function(result) {

					// $form[0].reset()

					if(case_type == "create"){
						let id = 0;

						template = '<div class="admin-case__item"><div class="admin-case__edit js-popup js-case-edit" data-modal="#case-edit" data-type="edit" data-id="'+id+'"></div><div class="admin-case__preview"><img src="'+image+'" class="object-fit" alt=""></div><div class="admin-case__name">'+name+'</div><div class="admin-case__info">Создал: <span class="admin-case__border">'+author+'</span></div></div>';

						$('.admin-case__inner').append(template)	

					}else{
						let id = $form.find('input[name="case-id"]').val()
						let $item = $('.admin-case__item[data-id="'+id+'"]');

						$item.find('.admin-case__preview img').attr('src', image)
						$item.find('.admin-case__name').text(name)
					}

					case_check()

					$('.modal__close').trigger('click')				

			// 	}
			// });			
   		

	
   })

//    $(document).on('click', '.js-case-edit', function () {
//    		$('.admin-modal__form input[name="admin-type"]').val($(this).data('type'))

//    		$('.admin-modal__form input[name="case-id"]').val($(this).data('id'))

//    		$('.admin-modal__form button')
//    			.attr('data-text', "Изменить кейс")
//    			.find('span')
//    			.text('Изменить кейс')   		
//    })

//    $(document).on('click', '.js-create-case', function () {
//    		$('.admin-modal__form input[name="admin-type"]').val("create")
//    		$('.admin-modal__form input[name="case-id"]').val('')

//    		$('.admin-modal__form button')
//    			.attr('data-text', "создать кейс")
//    			.find('span')
//    			.text('создать кейс')   		
//    })   
})