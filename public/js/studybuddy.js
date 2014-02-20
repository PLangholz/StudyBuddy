'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {

    // Get rid of status messages after a few seconds
    setTimeout(function(){
        $('.status-message').slideUp();
    }, 1000);

}

$('#search-input').keypress(function() {
            
      var searchQuery = $(this).val();
      var results = $.get('/get_classes_query', {'query': searchQuery}, populateAutoComplete);

              
        });

        function populateAutoComplete(result) {
          var classMatches = [];
          for (var i = 0; i < result.length; i++) {
          	console.log(result[i].name);
          	console.log(classMatches);
          	classMatches.push(result[i].name);
          }
          console.log(classMatches);
        	$("#search-input").autocomplete({
                      source: classMatches
                    });
            console.log("POPULATING AUTO COMPLETE WITH: "+JSON.stringify(result));
        }

          




