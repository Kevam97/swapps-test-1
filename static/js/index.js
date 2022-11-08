$(function(){
    'use strict';
    $("#search").submit(function(event){
        event.preventDefault();
        var query = $("#searchBar").val();
        var type = $("input[type='radio']:checked").val();
        var url = ''
        if (type == "books")
            url = "https://openlibrary.org/search.json?q=" +query+"&mode=everything" 
        else
            url = "https://openlibrary.org/search.json?author=" +query+"&mode=everything" 
        
        $('#bookmatch').empty();
        $.ajax({
            type: "GET",
            url: url,
            dataType:"json"           
        }).done(function(data){
            var results = data.docs
            var html= ''           
            if (results.length) {
                html= render(results)                
            }else{
                html='<div class="justify-center">'+
                    '<div class="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3" role="alert">'+
                        'No found results'+
                    '</div>'+
                '</div>'
            }
            addDiv(html)
        }).fail(function() {
            alert( "error" );
          })
    });
});

function render(results) {
    var html=''
    for (let index = 0; index < 10; index++) {
        var match = results[index];
        console.log(match);
        html+='<a href="https://openlibrary.org' + match.key + '">' +
                '<div class="justify-center">'+
                    '<div class="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">'+                    
                        '<img class="rounded-t-lg object-center	" src="https://covers.openlibrary.org/b/olid/' +match.cover_edition_key+ '-M.jpg">' +                    
                        '<div class="p-6 flex flex-col justify-start">'+
                            '<h5 class="text-gray-900 text-xl font-medium mb-2">'+match.title+'</h5>'+                            
                        '</div>'+
                    '</div>'+
                '</div>'+
              '</a>'+
              '<br>'
    }
    return html
}

function addDiv(match){        
        $('#bookmatch').append(            
            match
        );	
}