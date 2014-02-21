
/*
 * GET home page.
 */


/* Includes user data wrapper functions */
var user_data = require('../user_data');
var match_data = require('../match_data.js');

exports.view = function(req, res, curr_user){
  if (req.session.curr_user_id == undefined) {
  	res.redirect("/login");
  	return;
  }

  var curr_user = user_data.get_user_by_id(req.session.curr_user_id)

  // grab status message if there is one and flush
  var status_messages = [];
  if (req.session.status_messages != undefined) {
    var status_messages = req.session.status_messages;
  } 
  req.session.status_messages = [];

  // look for unseen matches & add to status message
  var user_id = req.session.curr_user_id;
  var unseen_matches = match_data.get_unseen_matches_by_user(user_id);
  if (unseen_matches.length > 0) {
    var message = "You have " + unseen_matches.length + " new match. <a href='/matches'>See my matches</a>";
    if (unseen_matches.length > 1) {
        message += "es"
    }
    /* set as seen */
    for (var i=0; i<unseen_matches.length; i++) {
        match_data.set_match_as_seen(unseen_matches[i].id, user_id);
    }
    status_messages[status_messages.length] = {
        "text": message, 
        "class": "success-message", 
        "glyphicon": "glyphicon-ok"
    };
  }

  res.render('index', 
  	{
  		'title': 'StuddyBuddy',
  		'curr_user': curr_user,
      'status_messages': status_messages,
      'username': curr_user.first_name
  	});

};