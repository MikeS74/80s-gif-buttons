$(document).ready(function() {
    var myGifs = ["John Cusack", "Winona Ryder", "Chevy Chase", "Molly Ringwald"];

    function gifResultDisp() {
        
        var userGifs = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userGifs + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(queryURL);
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            
            var results = response.data;
            
            for (var i = 0; i < results.length; i++) {
                
                var gifDiv = $("<li><div class='gifs-gen'>");
                var rating = response.data[i].rating;
                var pOne = $("<p>").text("Rating: " + rating);
                
                gifDiv.append(pOne);
                
                var imageUrl = response.data[i].images.fixed_height_small_still.url;
                var imageUrlAnimate = response.data[i].images.fixed_height_small.url;
                console.log(imageUrl);
                console.log(imageUrlAnimate);
                
                var image = $("<img>").attr({
                    "src": imageUrl,
                    "data-still": imageUrl,
                    "data-animate": imageUrlAnimate,
                    "data-state": "still",
                    "class": "pause-gif",
                    "alt": "80's Movie Stars"
                });
                
                gifDiv.append(image);
                $("#gifs-view").prepend(gifDiv);
            }
        });
    }

    function renderButtons() {
        $("#buttons-view").empty();
        
        for (var i = 0; i < myGifs.length; i++) {
            
            var a = $("<button>");
            
            a.addClass("gif-disp");
            a.attr("data-name", myGifs[i]);
            a.text(myGifs[i]);
            $("#buttons-view").append(a);
        }
    }
    $("#add-gif").on("click", function(event) {
        
        event.preventDefault();
        
        var userGifs = $("#gif-input").val().trim();
        myGifs.push(userGifs);
        renderButtons();
    });
    
    $(document).on("click", ".gif-disp", gifResultDisp);
    renderButtons();
    
    $('body').on('click', '.pause-gif', function() {
        
        var state = $(this).attr("data-state");
        
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
            console.log(state);
        }
    });
});