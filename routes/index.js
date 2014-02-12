
/*
 * GET home page.
 */


var data = require("../data.json");

exports.post = function(req, res) {
	var email = req.body.email;
	var users = data['users'];
	var curr_user = undefined;
	for (var i = 0; i < users.length; i++) {
		curr_user = users[i];
		if (curr_user.email == email) {
			req.session.curr_user_id = curr_user.id;
			break;
		}
	}
	exports.view(req, res, curr_user);
	
}

exports.view = function(req, res, curr_user){
  if (req.session.curr_user_id == undefined) {
  	res.redirect("/login");
  	return;
  }	

  var users = data['users'];
  var curr_user = undefined;
  for (var i = 0; i < users.length; i++) {
  	if (users[i].id == req.session.curr_user_id) {
  		curr_user = users[i];
  		break;
  	}
  }
  res.render('index', 
  	{
  		'title' : 'StuddyBuddy',
  		'curr_user' : curr_user
  	});

};