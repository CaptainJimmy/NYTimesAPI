$(document).ready(function(){


//build the ajax call
$("#times-form").on("submit", function(event) {
      event.preventDefault();
        // This line grabs the input from the textbox
        var topic = $("#times-input").val().trim();
        var selectionNumber = $("#articles-selection").val();
        var startYear = $("start-year-input").val();
        var endYear = $("end-year-input").val();
    
		ajaxCall();
	});

//Build the AJAX Call URL to the API with input, and execute it.
//Convert the response to bootstrap wells, and append them to the DOM at selectionPanel
function ajaxCall(){



}

function writeToDom(){

}
});