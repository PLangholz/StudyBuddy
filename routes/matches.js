var users = require("./users.json");
var matches = require("./matches.json");
var match_request = require("./match_requests.json");
var courses = require("./courses.json");
var assignments = require("./assignments.json");



function getUserFromId(id) {
	var user_list = users['users'];
	for (var i = 0; i < user_list.length; i ++ ) {
		if (user_list[i].id == id)
			return user_list[i];
	}
}


function getClassFromId(id) {
	var class_list = courses['courses'];
	for (var i = 0; i < class_list.length; i ++ ) {
		if (class_list[i].id == id)
			return class_list[i];
	}

}

function getAssignmentFromId(id) {
	var assignment_list = assignments['assignments'];
	for (var i = 0; i < assignment_list.length; i ++ ) {
		if (assignment_list[i].id == id)
			return assignment_list[i];
	}
}

exports.view = function(req, res){
  if (req.session.curr_user_id == undefined) {
  	res.redirect("/login");
  	return;
  }	
  var user_list = users['users'];
  var curr_user = undefined;
  for (var i = 0; i < user_list.length; i++) {
  	if (user_list[i].id == req.session.curr_user_id) {
  		curr_user = user_list[i];
  		break;
  	}
  }
  var all_requests = match_request['match_requests'];
  var all_matches = matches['matches'];
  var all_user_matches = new Array();
  var all_user_unmatched = new Array();
  for (var j = 0; j < all_requests.length; j++){
  	if (all_requests[j]['user_id'] == curr_user.id){
  		var unmatched_request = all_requests[j];
  		unmatched_request['class'] = 
  			getClassFromId(unmatched_request.course_id);
  		unmatched_request['assignment'] = 
  			getAssignmentFromId(unmatched_request.assignment_id);

  		all_user_unmatched.push(all_requests[j]);
  	}
  }
  for (var k = 0; k < all_matches.length; k++) {
  	var other_user_id = undefined;
  	var match = undefined;
  	if (all_matches[k].first_user_id == curr_user.id) {
  		match = all_matches[k];
  		other_user_id = all_matches[k].second_user_id;

  	} else if (all_matches[k].second_user_id == curr_user.id) {
  		match = all_matches[k];
  		other_user_id = all_matches[k].first_user_id;
  	}
  	if (other_user_id) {
	  	var other_user = getUserFromId(match.second_user_id);
	  	match['other_user'] = other_user;
	  	all_user_matches.push(all_matches[k]);
	}
  }

  var un_matched_matches = undefined

  res.render('matches', 
  {
  	'title' : 'Matches',
  	'all_user_unmatched' : all_user_unmatched,
  	
  });
  
};