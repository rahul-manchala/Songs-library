(function ($, window, document ){
	var imageLimit = 4;
	var totalImages = $(".thumb").length;
	var totalPages = Math.ceil(totalImages/imageLimit);
    var imageNames = {};

    $(document).ready(function(){
        var i;
        for (i = 0; i < imageLimit; i++) {
            var ele = $(".thumb")[i];
            $(ele).fadeIn(1000);
        }

        /*---configure pagination---*/
		var html = '';
		for(i = 0 ; i< totalPages; i++)
		{
			html += '<li class="pagination-lists"><a href="javascript:void(0)" class="pagination-links">'+
				(i+1)
			+'</a></li>';
		}
		
		$("#pagination-ul").html(html);		
        $("#pagination-row").fadeIn(500);

        i = 0;
        var paginationLinks = $(".pagination-links");
        paginationLinks.each(function()
        {
            $(this).data('id', i);
            i += imageLimit;
        });
		
		var firstLi = paginationLinks[0];
		$(firstLi).parent().addClass("active");

        paginationLinks.click(function()
        {
            $(".pagination-lists").removeClass('active');
            $(this).parent().addClass('active');
            var id = $(this).data('id');
            nextPage(id);
        });

        /*---end of pagination---*/

        /*--- thumbnail events ---*/
		
		$(".thumbnail").click(function(e){
			e.preventDefault();
			var source = {
				imageSrc : $(this).find('img').attr('src')
			};
			
			var url  = $(this).attr('href') + "?" +$.param(source);
			window.location.replace(url);
		});

        /*--- search Image----*/

        $(".img-responsive").each(function()
        {
            var srcArr = $(this).attr('src').split('/')[1];
            var name = srcArr.split('.')[0];

            imageNames[name] = $(this).attr('id');
        });

        $("#searchImage").click(function()
        {
            var name = $("#imageName").val();
            name = $.trim(name);
            $(".image-alerts").hide();
            if(typeof name != "undefined" && name.length > 0)
            {
                var searchFlag = false;
                $(".thumb, #pagination-row").hide();
                for(var key in imageNames)
                {
                    if(key.indexOf(name) !== -1)
                    {
                        $("#" + imageNames[key]).closest('.thumb').fadeIn(500);
                        searchFlag = true;
                    }
                }

                if(!searchFlag)
                {
                    $("#image-search-alert").fadeIn(500);
                }
            }else{
                $("#image-search-alert-2").fadeIn(500);
            }
        });

        $("#restSearch").click(function (){
            location.reload();
        });
		 

    });

    function nextPage(id)
    {
        if(typeof id != "undefined" )
        {
            $(".thumb").hide();
            for (var i = id; i < id+imageLimit; i++) {
                var ele = $(".thumb")[i];
                $(ele).fadeIn(1000);
            }

        }
    }

})(jQuery, window, document);

