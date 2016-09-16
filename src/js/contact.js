(function ($, window, document ){

    $(document).ready(function(){
        $(":input").inputmask();
		
		$.validator.setDefaults({
            ignore: [],
            focusCleanup: true,
            highlight: function (el)
            {
                $(el).closest('.form-group').addClass('has-error');
            },
            unhighlight: function (el)
            {
                $(el).closest('.form-group').removeClass('has-error');
            },
            errorElement: 'span',
            errorClass: 'help-block',
            errorPlacement: function (error, el) {
                error.insertAfter(el);
            },
            debugRE: false
        });
		
		$("#contact-form").validate({
            rules:{
                name:{
                    required: true
                },
                emailAddress:{
                    required: true,
					email: true
                },
                description:{
                    required: true,
					maxlength: 255
                 }
              
            },
            messages:{
                name: "Please provide name",
                emailAddress: "Please provide valid email",
                description: "Please provide description"
            }
        });
		
		$("#description").change(function(){
				var len = $(this).val().length;
				$("#countdown").text(255-len);
		});
		
		$("#description").keyup(function(){
				var len = $(this).val().length;
				$("#countdown").text(255-len);
		});		
		
		$("#submit").click(function()
		{
			$("#contact-form").valid();
		});
		
    });
	

})(jQuery, window, document);

