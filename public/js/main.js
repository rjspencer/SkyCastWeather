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
        
        var postData = $(this).serializeArray(),
          formURL = $(this).attr("action");
      
        $.ajax({
            url : formURL,
            type: "POST",
            data: postData,
            success: function(data) {
              if(data.success) {
                if(data.forecast.alerts) {
                  $(".alert").removeClass("hidden");
                  $(".alert > .title").text(data.forecast.alerts[0].title);
                  $(".alert > .description").text(data.forecast.alerts[0].description);
                } else {
                  $(".alert").addClass("hidden");
                  $(".alert > .title").text("");
                  $(".alert > .description").text("");
                }
                
              } else {
                console.log(data);
              }
            }
        });
        
    });

});
