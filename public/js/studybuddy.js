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



