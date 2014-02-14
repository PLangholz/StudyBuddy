
var match_request = require("./match_requests.json");
var courses = require("./courses.json");
var assignments = require("./assignments.json");

var matches = require("../matches.json");

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

function getMatchRequestFromId(id) {
	var match_list = match_request['match_requests'];
	for (var i = 0; i < match_list.length; i ++ ) {
		if (match_list[i].id == id)
			return match_list[i];
	}
}

function getAssignmentFromId(id) {
	var assignment_list = assignments['assignments'];
	for (var i = 0; i < assignment_list.length; i ++ ) {
		if (assignment_list[i].id == id)
			return assignment_list[i];
	}
}

function hasBeenMatched(request_id) {
	var match_list = matches['matches'];
	for (var i = 0; i < match_list.length; i++) {
		if (match_list[i].first_user_request_id == request_id ||
				match_list[i].second_user_request_id == request_id)
			return true;
	}
	return false;
}

exports.view = function(req, res){
  if (req.session.curr_user_id == undefined) {
  	res.redirect("/login");
  	return;
  }

  var all_requests = match_request['match_requests'];
  var all_matches = matches['matches'];
  var all_user_matches = new Array();
  var all_user_unmatched = new Array();
  for (var j = 0; j < all_requests.length; j++){
  	if (hasBeenMatched(all_requests[j].id))
  		continue;
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
	  	var match_request_obj = getMatchRequestFromId(match.first_user_request_id);
	  	match['class'] = getClassFromId(match_request_obj.course_id);
	  	match['assignment'] = getAssignmentFromId(match_request_obj.assignment_id);
	  	all_user_matches.push(match);
	}
  }

  

  res.render('matches', 
  {
  	'title' : 'Matches',
  	'all_user_unmatched' : all_user_unmatched,
  	'all_user_matches' : all_user_matches,
    'username': req.session.username
  });
  
};

function get_new_match_request_id() {
	var new_match_id = match_request.match_requests.length;
	return new_match_id;
}

exports.create_match_request = function(req, res) {
	var known = req.body.known;
	var unknown = req.body.unknown;
	var user_id = req.session.curr_user_id;
	var assign_id = req.body.assign_id;
	var assign_obj = getAssignmentFromId(assign_id);
	var new_match_request_id = get_new_match_request_id();

	var new_match = 
	{
		'id' : new_match_request_id,
		'user_id' : user_id,
		'assignment_id' : assign_id,
		'course_id' : assign_obj.course_id,
		'problems_known' : known,
		'problems_unknown' : unknown
	}

	match_request['match_requests'].push(new_match);
	res.send(200);
}

exports.update_request = function(req, res) {
	var match_request = getMatchRequestFromId(req.body.assign_id);
	match_request['problems_known'] = req.body.known;
	match_request['problems_unknown'] = req.body.unknown;
	res.json(match_request);

}

