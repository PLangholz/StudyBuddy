
/***************************************************************/
/* Are these functions still necessary? */

/*
var match_request = require("../match_request.json");
var courses = require("./courses.json");*/
var assignments = require("./assignments.json");/*
var matches = require("../matches.json");


function getUserFromId(id) {
	var user = user_data.get_user_by_id(id);
    return user;
};


function getClassFromId(id) {
	var class_list = courses['courses'];
	for (var i = 0; i < class_list.length; i ++ ) {
		if (class_list[i].id == id)
			return class_list[i];
	}

};

function getMatchRequestFromId(id) {
	var match_list = match_request['match_requests'];
	for (var i = 0; i < match_list.length; i ++ ) {
		if (match_list[i].id == id)
			return match_list[i];
	}
};
*/
function getAssignmentFromId(id) {
	var assignment_list = assignments['assignments'];
	for (var i = 0; i < assignment_list.length; i ++ ) {
		if (assignment_list[i].id == id)
			return assignment_list[i];
	}
};
/*
function hasBeenMatched(request_id) {
	var match_list = matches['matches'];
	for (var i = 0; i < match_list.length; i++) {
		if (match_list[i].first_user_request_id == request_id ||
				match_list[i].second_user_request_id == request_id)
			return true;
	}
	return false;
};
*/
/***************************************************************/

var match_request_data = require("../match_request_data.js");
var match_data = require("../match_data.js");
var user_data = require("../user_data.js");

/* Main page for matches */
exports.view = function(req, res){
  if (req.session.curr_user_id == undefined) {
  	res.redirect("/login");
  	return;
  }
  var user_id = req.session.curr_user_id;
  var curr_user = user_data.get_user_by_id(user_id);
  var requests = match_request_data.get_match_requests_by_user_id(user_id);
  /* add info about class name, assignment name */
  requests = match_request_data.annotate_with_course_info(requests);
  var matches = match_data.get_matches_by_user(user_id);
  matches = match_data.annotate_with_other_user_data(matches, user_id);
  matches = match_data.annotate_with_course_info(matches);
    
  console.log("requests");
  console.log(requests);
  console.log("matches");
  console.log(matches);

  // grab status message if there is one and flush
  var status_messages = req.session.status_messages;
  req.session.status_messages = [];

  res.render('matches', 
  {
  	'title' : 'Matches',
  	'all_user_unmatched' : requests,
  	'all_user_matches' : matches,
    'username': req.session.username,
    'status_messages': status_messages,
  });
  
};

// function get_new_match_request_id() {
// 	var new_match_id = match_request_data.
// 	return new_match_id;
// };

exports.create_match_request = function(req, res) {
	var assign_id = req.body['assignment_id'];
	var assign_obj = getAssignmentFromId(assign_id);
	var known = new Array();
	var unknown = new Array();
	var numProblems = assign_obj.problems.length;
	for (var i = 1; i <= numProblems; i++) {
		if(req.body['checkbox-'+i]) known.push(i);
		else unknown.push(i);
	}
	var user_id = req.session.curr_user_id;	
	//var new_match_request_id = get_new_match_request_id();
	match_request_data.submit_match_request(
		user_id, assign_id, assign_obj.course_id, known, unknown);
	// var new_match = 
	// {
		
	// 	'user_id' : user_id,
	// 	'assignment_id' : assign_id,
	// 	'course_id' : assign_obj.course_id,
	// 	'problems_known' : known,
	// 	'problems_unknown' : unknown
	// }

//	match_request['match_requests'].push(new_match);
	res.redirect("/");
	return
};

exports.update_request = function(req, res) {
	var match_request = getMatchRequestFromId(req.body.assign_id);
	match_request['problems_known'] = req.body.known;
	match_request['problems_unknown'] = req.body.unknown;
	res.json(match_request);

};


exports.delete_match_request = function(req, res) {
    var request = req.body.request;
    var id = parseInt(request.id);
    match_request_data.delete_match_request(id);

    // Add a status message about what happened
    var status_messages = [{"text": "Pending match request deleted.", "class": "success-message", "glyphicon": "glyphicon-ok"}];
    req.session.status_messages = status_messages;

    // redirect to matches page
    res.redirect("/matches");
    return; 
}

exports.delete_match = function(req, res) {
    var match = req.body.match;
    var match_id = parseInt(match.id);
    match_data.delete_match(match_id, req.session.curr_user_id);

    // Add a status message about what happened
    var status_messages = [{"text": "Pending match request deleted.", "class": "success-message", "glyphicon": "glyphicon-ok"}];
    req.session.status_messages = status_messages;

    // redirect to matches page
    res.redirect("/matches");
    return; 
}






