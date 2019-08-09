$(document).ready(function(){
    var gifArray = ["Lebron James", "Kobe Bryant", "Michael Jordan",];
    var subject = $(this).attr("data-subject");
    var rating;
    //display gifs
    function gifGen(){

        
        var userURL = "https://api.giphy.com/v1/gifs/search?api_key=cAgeJUhnEhBAnO6upSCVxw1B15UYPEvY&q="+subject+"&limit=25&offset=0&rating=G&lang=en"
        console.log("gif", subject);
        //use ajax to pull gifs
        $.ajax({
                url: userURL,
                method: "GET"
        }).then(function(response) {
                console.log(response);
        $("#displayGif").text(" ");
        //loop to generate multiple gifs
        
        for(var i = 0; i<10; i++){
            var rating= response.data[i].rating;
            console.log(rating);
            var gifDiv = $('<div>').addClass('gifDiv');
            var gifImg = $("<img>").addClass("card");
            var pOne = $("<p>").text("Rating: " + rating);
            gifImg.attr("src", response.data[i].images.fixed_height_still.url);
            gifImg.attr("data-still", response.data[i].images.fixed_height_still.url);
            gifImg.attr("data-animate", response.data[i].images.fixed_height.url);
            gifImg.attr("data-state", "still");
            gifImg.attr("id", "gif");
            $(gifDiv).append(gifImg);
            $(gifDiv).append(pOne);
            $("#displayGif").append(gifDiv);
            
        }
        });

    }

    
    function newButtons(){
        $(".myGifs").text(" ")
        for(var j = 0; j<gifArray.length; j++){
            var gifButtons = $("<button>").addClass("btn-default").attr("data-subject", gifArray[j]);
            gifButtons.text(gifArray[j]);
            $(".myGifs").append(gifButtons);
        }
    }
    //set query URL for starting gifs
    var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=cAgeJUhnEhBAnO6upSCVxw1B15UYPEvY&limit=10&rating=G";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        $("#displayGif").text(" ");
        
        for(var i = 0; i<10; i++){
            var gifImg = $("<img>").addClass("card card-text-overlay");
            gifImg.attr("src", response.data[i].images.fixed_height.url);
            $("#displayGif").append(gifImg);
        }
    });

    $("#search").on("click", function(e){
        e.preventDefault();
        subject = $("#textField").val().trim();
        gifArray.push(subject);
        newButtons();
        gifGen();
        console.log(gifArray);
    });
    $(document).on("click", "#gif", function(){
      var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
    
    $(document).on("click", ".btn-default", function(){
        subject = $(this).attr("data-subject");
        console.log("new gif "+ subject);
        gifGen();
        console.log("click");
    });

    newButtons();
});