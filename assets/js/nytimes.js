$(document).ready(function() {

    var authKey = "fb1351dc47cc4e2b9335f0c5ac186dee";
    var queryURL;
    var searchType;
    var topic;
    var selectionNumber;
    var startYear;
    var endYear;
    var isPopular;
    //event listeners

    $("#times-form").on("submit", function(event) {
        event.preventDefault();
        searchType = "search";
        search(searchType);
    });


    $("#topStories").on("click", function(event) {
        event.preventDefault();
        searchType = "topStories";
        search(searchType);
    });

    $("#mostPopular").on("click", function(event) {
        event.preventDefault();
        searchType = "mostPopular";
        search(searchType);
    });

    $("#clear").on("click", function(event) {
        event.preventDefault();
        $("#selectionPanel").empty();
    });

    //Build the AJAX Call URL to the API with input, and execute it.

    function search(searchType) {
        //execute the search function
        switch (searchType) {

            case "search":
                var isSearch = true;
                isPopular = false;
                // grabs the input from the textbox
                topic = $("#times-input").val().trim();
                selectionNumber = $("#articles-selection").val().trim();
                startYear = $("#start-year-input").val();
                endYear = $("#end-year-input").val();
                queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
                    authKey + "&q=" + topic;
                // this removes the unnecessary "-"'s for proper url syntax
                startYear = startYear.replace(/-/g, '');
                endYear = endYear.replace(/-/g, '');
                // formats the URL for the search function
                if (parseInt(startYear) && parseInt(endYear)) {
                    queryURL += "&begin_date=" + startYear + "&end_date=" + endYear;

                } else if (parseInt(startYear)) {
                    queryURL += "&begin_date=" + startYear;
                } else if (parseInt(endYear)) {
                    queryURL += "&end_date=" + endYear;
                }

                break;
                // formats the URL for the Top Stories Button, also sets the selectors to make sure the correct post AJAX jquery is used 
            case "topStories":
                queryURL = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=" + authKey;
                isSearch = false;
                isPopular = false;

                break;
                // formats the URL for the Most Popular Button
            case "mostPopular":
                queryURL = "https://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/1.json?api-key=" + authKey;
                isSearch = false;
                isPopular = true;
        }

        //All buttons use the same AJAX call, but with different URLS and different post processing, as each JSON data set returned is different

        $.ajax({
            url: queryURL,
            method: 'GET',
        }).done(function(result) {
            // Search Button has been selected
            if (isSearch) {
                var nytimes = result.response.docs;

                for (var i = 0; i < selectionNumber; i++) {
                    var headline = nytimes[i].headline.main;
                    var snippet = nytimes[i].snippet;
                    var pubDate = nytimes[i].pub_date;
                    var webURL = nytimes[i].web_url;

                    $('#selectionPanel').prepend(
                        $('<div>').addClass("well well-lg").append(
                            ($('<a>').attr("href", webURL)
                                .html($('<h2>').text(headline))))
                        .append($('<p>').text(snippet + " " + pubDate)));
                }
            }
            //topStories or a mostPopular has been selected. THis grabs top stories
            else if (!isSearch && !isPopular) {
                var nytimes = result.results;
                for (var i = 0; i < 10; i++) {
                    var headline = nytimes[i].title;
                    var abstract = nytimes[i].abstract;
                    var pubDate = nytimes[i].published_date;
                    var webURL = nytimes[i].url;
                    var media = nytimes[i].multimedia;

                    //some articles returned have pictures, some do not.  if media.length is not zero, then there is a picture in an array inside the JSON

                    if (media.length > 0) {
                        //Convert the response to bootstrap wells, and append them to the DOM at selectionPanel

                        var image = media[0].url;
                        var newDiv = $('<div>');
                        newDiv.addClass("well well-lg");
                        var a = $('<a>').attr("href", webURL);
                        var newImg = $("<img>").attr({
                            "src": image,
                            "alt": headline,
                            "class": "img-responsive pull-left thumbnail"
                        });
                        a.html(newImg).append($('<h2>').text(headline));
                        newDiv.html(a).append(abstract + " " + pubDate);

                        $('#selectionPanel').prepend(newDiv);

                        // $('#selectionPanel').prepend(
                        // 	($('<div>').addClass("well well-lg").append(
                        // ($('<a>').attr("href",webURL)
                        // 	.html($("<img>").attr({
                        // 	"src": image,
                        // 	"alt": headline})
                        //   .append($('<h2>').text(headline)))
                        // .append($('<p/>').text(abstract+" "+pubDate))			
                        // ))))
                    } else {
                        // this processes Top Stories entries with no pictures
                        var newDiv = $('<div>');
                        newDiv.addClass("well well-lg");
                        var a = $('<a>').attr("href", webURL);
                        a.html($('<h2>').text(headline));
                        newDiv.html(a).append(abstract + " " + pubDate);
                        $('#selectionPanel').prepend(newDiv);
                    }
                }
            }
            // processes Most Popular entries
            else if (!isSearch && isPopular) {
                var nytimes = result.results;
                for (var j = 0; j < 10; j++) {
                    var headline = nytimes[j].title;
                    var abstract = nytimes[j].abstract;
                    var pubDate = nytimes[j].published_date;
                    var webURL = nytimes[j].url;

                    //Convert the response to bootstrap wells, and append them to the DOM at selectionPanel

                    var newDiv = $('<div>');
                    newDiv.addClass("well well-lg");
                    var a = $('<a>').attr("href", webURL);
                    a.html($('<h2>').text(headline));
                    newDiv.html(a).append(abstract + " " + pubDate);
                    $('#selectionPanel').prepend(newDiv);
                }
            } else {
                console.log("ERRORROEROEOROEROROROROORORORRRRR");
            }
        });
    }
});


// }).fail(function(err) {
//   throw err;