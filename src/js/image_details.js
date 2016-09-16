(function ($, window, document ){

    $(document).ready(function(){
         var queryStr = getUrlVars();
		 
		 if(typeof queryStr['imageSrc'] != "undefined")
		 {
			var html  = '<img class="img-responsive"  src="' + queryStr['imageSrc']+' " alt="">';
			
			$("#image-detail-body").html(html);
			$("img").load(function() {
				var h = document.querySelector('img').naturalHeight;
			    var w = document.querySelector('img').naturalWidth;
				var title = queryStr['imageSrc'].split("/");
				var info = "<hr><p>Size: " +w+'x'+h+'</p><p>Title:' + title[1]+'</p><p>Description: Description of ' +
				title[1] + '</p>'; 
			    $("#img-info").html(info).fadeIn(1000);
			});
			
			
		 }
    });
	
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars[hash[0]] = decodeURIComponent(hash[1]);
    }
    return vars;
}

})(jQuery, window, document);

