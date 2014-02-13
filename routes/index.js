
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

  res.render('index', 
  	{
  		'title' : 'StuddyBuddy',
  		'curr_user' : curr_user
  	});

};