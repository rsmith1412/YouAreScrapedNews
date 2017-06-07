$(document).ready(function() {

	//On submission of form, execute following function
	$("#search-btn").on('click', function(event) {

		//Prevents page from reloading so we dont lose data
		event.preventDefault();

		$("#results-div").empty();

		//Grabs value on input fields on form submission
		var qID = $("#searchTerm").val();
		var records = $("#numberOfRecordsToRetrieve").val();
		var bDate = $("#startYear").val();
		var eDate = $("#endYear").val();

		//Base URL for NYT API
		var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&sort=newest";

		// -- old
		// url += '&' + $.param({
		//   'q': qID,
		//   'page': records,
		//   'begin_date': bDate,
		//   'end_date': eDate,
		// });

		//So, numOfRecords is a variable that will contain some sort of number. 
		//I decided to initialize numOfRecords to equal the length of results. 
		//Then in the following if statement I'm checking to see if the user entered a value for 
		//$('#numberOfRecordsToRetrieve'). If that is empty, nothing happens and numOfRecords still 
		//equals results.length. But if someone did enter a value for $('#numberOfRecordsToRetrieve'), 
		//then numOfRecords now equals that value that was entered

		// If statements that will add respective, requested info to the URL
		if( qID ) url += ('&q='+qID);
		if( records ) url += ('&page='+records);
		if( bDate && bDate.length === 8 ) url += ('&begin_date='+bDate);
		if( eDate && eDate.length === 8 ) url += ('&end_date='+eDate);

		//AJAX to retrieve NYT API data
		$.ajax({
		  url: url,
		  type: 'GET'
		  
		}).done(function(response) {
		  //Log the response to get object data
		  console.log(response);

		  //Type less, easier to read
		  var results = response.response.docs;
		  console.log('results: ', results);

		  var numOfRecords = results.length;

		  if(records) {
		  	numOfRecords = records;
		  }

		  $('#results-div').html('');

		  var numRec = $("#numRecord").val(); 

			if(records === 0 || records === undefined){
				records = 5;
			}
			else {
				results.length = records;
			}

		  //For loop for the array
		  for(var i = 0; i < results.length; i++) {
		  	//Start count at 0
		  	var count = 0;
		  	//Var to dynamically insert span tags for the numbers
		  	var newSpan = $('<span>').addClass('numForList');
		  	//Var to dynamically create a div with a class to hold the results
		  	var newDiv = $('<div>').addClass('resultsDiv');
		  	//Var to dynamically create a p tag for title
		  	var titleP = $('<p>');
		  	////Var to dynamically create a p tag for the article's abstract
		  	var abstractP = $('<p>').addClass('fontSub');
		  	//Var to dynamically create ordered list
		  	var newOl = $('<ol>');
		  	//Var to dynamically create a list
		  	var newList = $('<li>');
		  	//Var to retrieve the URL from the API
		  	var webURL = results[i].webURL;
		  	//Setting the source of the link the URL
		  	var titleA = $('<a>').attr('href', webURL);
		  	//Retrieving the article title from API
		  	var articleTitle = results[i].headline.main;
		  	//Retrieving the article abstract from API
		  	var articleAbstract = results[i].abstract;
		  	//Retrieving the published date from API
		  	var pubDate = results[i].pub_date;

		  	//If abstract is null, add the snippet to the html
		  	if (articleAbstract === null) {
		  		var articleAbstract = results[i].snippet;
		  	}

		  	//Time to append everything
		  	$('#results-div').append(newDiv);

		  	titleA.append(titleP);
		  	newDiv.append(titleA).append(abstractP);

		  	titleP.append(articleTitle);
		  	abstractP.append(articleAbstract);

		  	newDiv.append("Publication date: " + pubDate).addClass('fontForSub'); 

		  	console.log(newDiv);

		  }



		  //Show error if function fails
		}).fail(function(err) {
		  throw err;
		});

//


	});

})
 