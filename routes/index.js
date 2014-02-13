
/*
 * GET home page.
 */


/* Includes user data wrapper functions */
var user_data = require('../user_data');


exports.view = function(req, res, curr_user){
  if (req.session.curr_user_id == undefined) {
  	res.redirect("/login");
  	return;
  }

  var curr_user = user_data.get_user_by_id(req.session.curr_user_id)

  // grab status message if there is one and flush
  var status_messages = req.session.status_messages;
  req.session.status_messages = [];

  res.render('index', 
  	{
  		'title': 'StuddyBuddy',
  		'curr_user': curr_user,
      'status_messages': status_messages,
      'username': curr_user.first_name
  	});

};