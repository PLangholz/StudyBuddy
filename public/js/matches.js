'use strict';


$(document).ready(function() {
	
	$('.match_info').hide();
	$('.match p').each(function() {
		$(this).click(function() {
			$(this).siblings(".match_info").toggle();
		}); 
	});

})


