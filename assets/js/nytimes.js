$(document).ready(function(){

var authKey="fb1351dc47cc4e2b9335f0c5ac186dee";
var queryURL;
var searchType;

//build the ajax call
$("#times-form").on("submit", function(event) {
      event.preventDefault();
          	searchType="search";
          	console.log(searchType);
		search(searchType);
	});


$("#topStories").on("click", function(event){
	 event.preventDefault();
	searchType="topStories";
	console.log(searchType);
		search(searchType);
});

$("#mostPopular").on("click", function(event){
	 event.preventDefault();
	searchType="mostPopular";
	console.log(searchType);
		search(searchType);
});

$("#clear").on("click", function(event){
	 event.preventDefault();
	$("#selectionPanel").empty();
});

//Build the AJAX Call URL to the API with input, and execute it.
//Convert the response to bootstrap wells, and append them to the DOM at selectionPanel
function search(searchType){
	//execute the search function
if (searchType === "search"){

queryURL="https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  authKey + "&q=" + topic;
    startYear=startYear.replace(/-/g,'');
    endYear=endYear.replace(/-/g,'');
  // This line grabs the input from the textbox
        var topic = $("#times-input").val().trim();
        var selectionNumber = $("#articles-selection").val().trim();
        var startYear = $("#start-year-input").val();
        var endYear = $("#end-year-input").val();
    console.log(topic);
    console.log(selectionNumber);
    console.log(startYear);
    console.log(endYear);

  $.ajax({
  url: url,
  method: 'GET',
}).done(function(result) {
		});

}
		//execute the topStories
else if (searchType === "topStories"){ 
queryURL="https://api.nytimes.com/svc/topstories/v2/home.json?api-key="+authKey;
$.ajax({
  url: url,
  method: 'GET',
}).done(function(result) {
		});
}
	//execute most popular	
else if (searchType==="mostPopular"){
 queryURL="https://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/1.json?api-key="+authKey;
 $.ajax({
  url: url,
  method: 'GET',
}).done(function(result) {

	});
}

		//oops

else{
	console.log("ERROR AND STUFF");
}

}

function writeToDom(){

}
});