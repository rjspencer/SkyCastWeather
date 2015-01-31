$(document).ready( function() {
//    setTimeout( function() { 
//        $(".logo").fadeOut(500, function() {
//            $(".logo").removeClass("splash").fadeIn(500);
//            
//        });
//    }, 500);
    
    $(".menu").on("click", ".tab", function() {
      $(".menu").toggleClass("hide-left");  
    });
    
    //callback handler for form submit
    $("form").submit( function(event)
    {
        event.preventDefault();
        
        var postData = $(this).serializeArray();
        var formURL = $(this).attr("action");
        $.ajax(
        {
            url : formURL,
            type: "POST",
            data: postData,
            done: function(data) 
            {
                console.log(data);
            },
            error: function(jqXHR, textStatus, errorThrown) 
            {
                console.log(errorThrown);
            }
        });
        
    });

    $("#ajaxform").submit();
});
