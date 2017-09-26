$(document).ready(function() {
// Holds the pre-selected movie star array in a variable
    var myGifs = ["John Cusack", "Winona Ryder", "Chevy Chase", "Molly Ringwald", "Matthew Broderick", "Sigourney Weaver", "Anthony Michael Hall", "Jami Gertz"];

// Combines the button data-name's with the giphy api key to return 10 results
    function gifResultDisp() {
        
        var userGifs = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userGifs + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(queryURL);

// Ajax GET request with the API query URL        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {

// Holds the ajax response in a variable            
            var results = response.data;

// Loops through the 10 different ajax/API results            
            for (var i = 0; i < results.length; i++) {

// Creates div elements wrapped in ul/li tags for all new gif results (that will easily flow left to right using CSS)               
                var gifDiv = $("<li><div class='gifs-gen'>");

// Finds the gif rating and displays it
                var rating = response.data[i].rating;
                var ratingDisp = $("<p>").text("Rating: " + rating);
                gifDiv.append(ratingDisp);

// Holds 2 different ajax request objects for original state and animated                
                var imageUrl = response.data[i].images.fixed_height_small_still.url;
                var imageUrlAnimate = response.data[i].images.fixed_height_small.url;
                console.log(imageUrl);
                console.log(imageUrlAnimate);

// Creates the <img> elements and all the needed attributes & inserts the stored image URL variables                
                var image = $("<img>").attr({
                    "src": imageUrl,
                    "data-still": imageUrl,
                    "data-animate": imageUrlAnimate,
                    "data-state": "still",
                    "class": "pause-gif",
                    "alt": "80's Movie Stars"
                });

// Adds the new <img> elements to the gifs-view div                
                gifDiv.append(image);
                $("#gifs-view").prepend(gifDiv);
            }
        });
    }

// Creates buttons based on the for loop of the pre-selected movie stars array
    function createButtons() {
        $("#buttons-view").empty();
        for (var i = 0; i < myGifs.length; i++) {
            var a = $("<button>");
            a.addClass("gif-disp");
            a.attr("data-name", myGifs[i]);
            a.text(myGifs[i]);
            $("#buttons-view").append(a);
        }
    }

// Takes the user's form input and pushes it to the myGifs button creation method in the function above 
    $("#add-gif").on("click", function(event) {
        event.preventDefault();
        var userGifs = $("#gif-input").val().trim();
        myGifs.push(userGifs);
        createButtons();
    });

// Every button with the class gif-disp will run the gifResultDisp function (based on the data-name of that particular button) 
    $(document).on("click", ".gif-disp", gifResultDisp);
    createButtons();

// Toggles the image data-state between between 2 different URLs creating a play/pause effect  
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