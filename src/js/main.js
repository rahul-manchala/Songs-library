(function ($, window, document ){

    function initArtistSearch()
    {
        $("#select2-artist").select2({
            placeholder: "Search for artist",
            minimumInputLength: 2,
            theme: "bootstrap",
            ajax: {
                url: "http://ws.audioscrobbler.com/2.0/",
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        method : 'artist.search',
                        artist: params,
                        api_key : "0b5bcb802bfb0ac0d1a081b4a7fb0c0f",
                        format :'json'
                    };
                },
                results: function (data, page) {
                    var formattedResult = extractArtistName(data);
                    return {results: formattedResult};
                },
                cache: true
            }
        }).change(function (){
            $("#album-details-section").hide();
            var data = $('#select2-artist').select2('data');
            suggestAlbums(data);
            //console.log(data);
        });
    }

    function suggestAlbums(data)
    {
        if(data.id)
        {
            var url = "http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" + data.id +
                "&api_key=0b5bcb802bfb0ac0d1a081b4a7fb0c0f&format=json&limit=6";
            $.ajax({
                type: 'GET',
                url : url,
                dataType: 'json',
                cache: false
            }).success(function(r){

                if(typeof r.topalbums.album != "undefined")
                {
                    var albums = r.topalbums.album;
                    var html = '';

                    $.each(albums, function(key, value){
                        html += '<li>Album: '+ value.name +
                            ' &nbsp;<button class="album-details btn btn-xs btn-primary" data-album-name="'+ value.name +
                            '" data-artist-name="'+ value.artist.name+'">' +
                            '<i class="fa fa-eye"></i></button>' +  '</li>'
                    });

                    $("#suggested-albums").html(html);
                    $("#suggested-albums-section").show();

                    $(".album-details").click(function(){
                        var self = this;
                        getAlbumDetails({
                            album : $(self).data('album-name'),
                            artist : $(self).data('artist-name')
                        });
                    });
                }

            });
        }
    }

    function getAlbumDetails(data)
    {
        if(data)
        {
            var url = "http://ws.audioscrobbler.com/2.0/?method=album.getinfo&artist=" + data.artist +
                "&album=" + data.album + "&api_key=0b5bcb802bfb0ac0d1a081b4a7fb0c0f&format=json";
            $.ajax({
                type: 'GET',
                url : url,
                dataType: 'json',
                cache: false
            }).success(function(r){

                if(typeof r.album != "undefined")
                {
                    var html = '';

                    var coverSrc = r.album.image[1]['#text'];

                    html += '<img src="' + coverSrc +
                        '" alt="Smiley face" height="150" width="150"><br>' +
                        '<p><strong>Album:</strong>'+ data.album+'</p>'+
                        '<p><strong>Artist:</strong>'+ data.artist+'</p>' +
                        '<p><strong>List of Songs:</strong></p><ul>';

                    var tracks = r.album.tracks.track;

                    $.each(tracks, function(key, value){
                        if(typeof value.name != "undefined")
                        {
                            html += '<li>Song: '+ value.name + '. Duration: '+ value.duration+'.</li>';
                        }

                    });
                    html +='</ul>';

                    $("#details").html(html);
                    $("#album-details-section").show();
                    console.log(tracks);
                }

            });
        }
    }

    function extractArtistName(data)
    {
        if(typeof data.results.artistmatches.artist != "undefined")
        {
            var artistNames = data.results.artistmatches.artist;
            var result = [];

            $.each(artistNames, function(key, value){
                var d = {
                    id : value.name,
                    text : value.name
                };
                result.push(d);

            });
            return result
        }
        return [{
            id : '',
            text : 'no result found'
         }];

    }

    $(document).ready(function(){
       initArtistSearch();
    });



})(jQuery, window, document);
