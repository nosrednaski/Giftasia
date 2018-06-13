// my api 3kZI47lDDRNZ3AfEspEWilmv76nBCpOk
// Required Params

//     "q" - string - search query term or phrase

// Optional Params

//     "limit" - integer - number of results to return, maximum 100. Default 25.
//     "offset" - integer - results offset, defaults to 0.
//     "rating" - string - limit results to those rated (y,g, pg, pg-13 or r).
//     "lang" - string - specify default country for regional content; format is 2-letter ISO 639-1 country code. See list of supported languages here
//     "fmt" - string - return results in html or json format (useful for viewing responses as GIFs to debug/test)
//     "sort" - string - the sort order of the results returned (recent | relevant)

$(document).ready(function() {
    
    //array of gifs
    var topics = ["fantasia", "centaurs", "mickey mouse", "orchestra", "wizard", "broom"]
    
    //search the DOM for buttons
    var main = $("body");
    var buttons = main.find("#buttons");
    
    //Loop for producing buttons out of the array.
    function makeButtons() {
        for (var i = 0; i < topics.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("gif-button");
            gifButton.text(topics[i]);
            gifButton.val(topics[i]);
            buttons.append(gifButton);
        }
    }

    //Display intial buttons     
    makeButtons();

    //Add button from user's input
    $("#find-gif").on("click",function(event) {
        event.preventDefault();
        var userInput = $("#gifInput").val();
        topics.push(userInput);
        $("#gifInput").val("")                     
        $("#buttons").empty();   
        makeButtons();                                                                             
    });
    
    
    //Binding on-clicks to the buttons and displaying the gifs in the div.
    
    $("#buttons").on("click", ".gif-button", function() { 
      // Putting the value of the button in a variable
      var tasia = $(this).attr("value");
        console.log(tasia);
      // Constructing a queryURL using the value from the button
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=fantasia " + tasia + "&api_key=3kZI47lDDRNZ3AfEspEWilmv76nBCpOk&limit=10"
      
      // Performing an AJAX request with the queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        // After data comes back from the request
        .then(function(response) {
          console.log(queryURL);

          console.log(response);
          // storing the data from the AJAX request in the results variable
          var results = response.data;

          // Looping through each result item
          for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var tasiaDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var tasiaImage = $("<img>");

            // Setting the src attribute of the image to a property pulled off the result item 
            // Storing still and animate attributes and classes so we can pause it.
            tasiaImage.attr("src", results[i].images.fixed_height_still.url);
            tasiaImage.attr("data-state", "still");
            tasiaImage.attr("data-still", results[i].images.fixed_height_still.url);
            tasiaImage.attr("data-animate", results[i].images.fixed_height.url);
            tasiaImage.attr("class", "gif");

            // Appending the paragraph and image tag to the div
            tasiaDiv.append(p);
            tasiaDiv.append(tasiaImage);

            // Prependng the tasiaDiv to the HTML page in the "#gifDisplay" div
            $("#gifDisplay").prepend(tasiaDiv);
          }
        });
    }); 

    //Pausing and starting gif
    $("#gifDisplay").on("click", ".gif", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image"s state is still, update its src attribute to what its data-animate value is.
        // Then, set the image"s data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
        
});
