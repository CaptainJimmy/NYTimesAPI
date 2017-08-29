//document ready
$(document).ready(function(){

//the one necessary global variable

var buttonArray=["helicopter","dog","parrot","kitten","skeletons","PCU","the rock","snakes","jeremy pivens"];


$("body").on("click",".button-panel",function(){
	var buttonClicked=this.id
	giphyPull(buttonClicked);

});

$("#giphy-form").on("submit", function(event) {
      event.preventDefault();
        // This line grabs the input from the textbox
        var topic = $("#giphy-input").val().trim();
        console.log(topic);
			// create a new button from the field into the array, call the displayButtons
		buttonArray.push(topic);
		displayButtons();
	});

//changes the state of the image from still to animated and vice versa
$("body").on("click",".gif", function(){
		var state = $(this).attr("data-state");
		if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
});



function giphyPull(buttonClicked){
//ajax call
var tag=buttonClicked;
var offset=Math.floor(Math.random()*15);
var apiURL="https://api.giphy.com/v1/gifs/search?api_key=2eab242fa3254211aabafc419aa08207&q=" +tag + "&limit=9&offset=" +offset+ "&rating=R&lang=en";
var rating;
var alt;

$.ajax({
          url: apiURL,
          method: "GET"
        }).done(function(response) {
     
        	var giphyObject=response.data;
        	// display the images
      
			var newRow=$("<div class='row'>");
for (var i=0;i<giphyObject.length;i++){
	var stillImg=giphyObject[i].images.fixed_height_still.url;
    var animateImg=giphyObject[i].images.fixed_height.url;
    var rating=giphyObject[i].rating;
    var alt=giphyObject[i].slug
	var newImage=$("<img class='gif img-responsive'>");
	newImage.attr("src", stillImg);
	newImage.attr("alt",alt);
	newImage.attr("data-state", "still");
	newImage.attr("data-still", stillImg);
	newImage.attr("data-animate",animateImg);
	var newCol=$("<div class='col-xs-4'>");
	var newP=$("<p>");
	newP.text("Rating: " + rating);
	newCol.prepend(newP);
	newCol.prepend(newImage);
	newRow.append(newCol);
	}

$("#imagePanel").prepend(newRow);

        });
	


};

function displayButtons(){
// create buttons
	$("#buttonPanel").empty();
for (var i=0;i<buttonArray.length;i++){
	var newButton=$("<button type='button' class='btn btn-primary button-panel'>");
	newButton.attr("data-name",buttonArray[i]);
	newButton.attr("id",buttonArray[i]);
	newButton.text(buttonArray[i]);
	$("#buttonPanel").append(newButton);
	}
}
//start the .js
displayButtons();
});
