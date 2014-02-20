'use strict';


$(document).ready(function() {
	
	$('.match_info').hide();
	$('.match p').each(function() {
		$(this).click(function() {
			$(this).siblings(".match_info").toggle();
		}); 
	});

	$(".editbtn").click(function () {


	});


	//initClick();
});

function initClick() {
	$(".edit").each(function () {
		$(this).click(function() {
			var known = new Array();
			var unknown = new Array();
			var form_string = "<form>";
			$(this).parent(".match_inf").find(".known li").each(function(){
				form_string += "<input type=\"checkbox\"" + 
					"name=\"" + $(this).html()+"\"" +
					"value=\"" + $(this).html()+"\" checked=true"+
					" class=\"question_box\">" +
					"<p>"+ $(this).html() + "</p></br>";
			});
			$(this).parent(".match_inf").find(".unknown li").each(function(){
				form_string += "<input type=\"checkbox\"" + 
					"name=\"" + $(this).html()+"\"" +
					"value=\"" + $(this).html()+"\"" +
					" class=\"question_box\">" +
					"<p>" +$(this).html() + "</p></br>";
			});
			$(this).parent('.match_inf').html(
				"<p> Check the boxes of the" + 
				"problems you know</p>" + form_string + "</form>" +
				"<div class=\"clickable submit\">" +
				"<p>SUBMIT</p></div>");
			$(".submit").each(function() {
				$(this).click(function() {
					var assign_id = $(this).parent(".match_inf").attr('id');
					var known = new Array();
					$(this).parent(".match_inf").find(".question_box:checked").each(function() {
						known.push($(this).val());
					});
					var unknown = new Array();
					$(this).parent(".match_inf").find(".question_box:not(:checked)").each(function() {
						unknown.push($(this).val());
					});
					$.post("/post-update-match-request", {
						'assign_id' : assign_id,
						'known' : known,
						'unknown' : unknown
					}, updateRequest);

					
				});
			});
		});
	});



};

function updateRequest(data) {
	var html_string = "<p> You know:</p>" +
						"<ul class=\"known\">";
	for (var i = 0; i < data['problems_known'].length; i++) {					
		html_string += "<li>"+data['problems_known'][i]+"</li>";
	}

	html_string += "</ul>" +
		"<p> You need help on:</p>" +
		"<ul class=\"unknown\">";

	for (var j = 0; j < data['problems_unknown'].length; j++) {
		html_string += "<li>"+ data['problems_unknown'][j]+"</li>";
	}
	html_string +=" <div class=\"clickable edit\">" +
		"<p>EDIT</p></div>" +
		"<div class=\"clickable delete\">" +
		"<p>DELETE</p></div>";
	var curr_id = data['id'];
	$(".match_inf#"+curr_id+"").html(html_string);
	initClick();
}


