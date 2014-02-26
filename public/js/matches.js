'use strict';
var editState;
var activeEdit = -1;

$(document).ready(function() {
	editState = true;
	$('.match_info').hide();
	$('.match p').each(function() {
		$(this).click(function() {
			$(this).siblings(".match_info").toggle();
		}); 
	});
		// var known = new Array();
		// var unknown = new Array();
		// var form_string = "<form action='/edit-match-request' method='post' class='form-inline' role='form'>";
		// var request_id = $(this).attr('id').substr('edit-'.length);
		// form_string += "<input type='hidden' name='request[id]' class='text' value='" + request_id + "'>";
		// $(this).parent(".match_inf").find(".known li").each(function(){
		// 	form_string += "<div class='form-group'><label>"+ $(this).html() + "</label>" +
		// 		"<input type=\"checkbox\"" + 
		// 		"name='unknowns[" + $(this).html()+"]'" +
		// 		"value=\"" + $(this).html()+"\" "+
		// 		"class=\"question_box\"></div>";
		// });
		// $(this).parent(".match_inf").find(".unknown li").each(function(){
		// 	form_string += "<div class='form-group'><label>"+ $(this).html() + "</label>" +
		// 		"<input type=\"checkbox\"" + 
		// 		"name='unknowns[" + $(this).html()+"]'" +
		// 		"value=\"" + $(this).html()+"\" checked=true" +
		// 		" class=\"question_box\"></div>";
		// });
		// form_string += "<button type='submit' class='btn'>Update Match Request</button></form>"
		// $(this).parent('.match_inf').html(
		// 	"<p> Check the boxes of the problems you need help on </p>" + form_string);


		/*
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
		*/
		// initClick();
	 });


	

$(".editbtn").click(function () {
			var assign_id = parseInt(this.id.match(/\d+/));
			// console.log("THIS IS THE ASSIGNMENT #: "+assign_id);
			// console.log("ACTIVE EDIT # "+activeEdit);
			// console.log("EDIT STATE: "+editState);
			// if (assign_id == activeEdit) console.log("EDITING CURRENT");
			if (activeEdit == -1) {
				activeEdit = assign_id;
				editState = true;
				// console.log("ASSIGNING NEW ACTIVE EDIT");
			}
			else if (activeEdit != assign_id) {
				// console.log("WE HAVE AN NON-ACTIVE EDIT - EXITING");
				return;
			}
			
      if (editState) {
      	activeEdit = assign_id;
      	// console.log("FINNA EDIT");
      	$(this).animate({
      		backgroundColor: '#2a6496',
      		color: "#ffffff"
      	});
      	$(this).html("<i class=\"fa fa-save fa-med\"></i> Save");
        $( "#effect"+assign_id).animate({
          backgroundColor: '#FFFFC0',
          color: "#ffffff"
        }, 1000 );
        var known_problems = $('div#collapse'+assign_id).find('li.known');
        var unknown_problems = $('div#collapse'+assign_id).find('li.unknown');
        editState = false;
        // known_problems.each.animate({
        // 	backgroundColor: '#AED8FE',
        //   color: "#fff"
        // }, 1000);
        // unknown_problems.each.animate({

        // });
        // console.log(known_problems.length+ " KNOWN");
        // console.log(unknown_problems.length+ " UNKNOWN");
      } else {
      	// console.log("DONE EDITING");
      	activeEdit = -1;
      	editState = false;
      	$(this).animate({
      		backgroundColor: 'green',
      		color: "#ffffff"
      	});
      	$(this).html("<i class=\"fa fa-pencil fa-med\"></i> Edit");
        $( "#effect"+assign_id).animate({
          backgroundColor: '#F5F5F5',
          color: "#fff"
        }, 1000 );
      }
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


