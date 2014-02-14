var courseData = require("../routes/courses.json");
var user_data = require("../user_data.js");

/*
 * GET match search page.
 */

exports.view = function(req, res){
    if (req.session.curr_user_id == undefined) {
        res.redirect("/login");
        return;
    }
    var curr_user = user_data.get_user_by_id(req.session.curr_user_id);

	console.log(req.query.query);
	var query = req.query.query;
	var matches = courseData;
	if (query) {
		matches = courseData.courses.filter(function(course){
			var contString = course.name.split(' ').join('');
			return contString.toLowerCase().indexOf(query.toLowerCase()) >= 0;
		});
		console.log(matches);
	}
	
  res.render('search', 
  	{
  		'title' : 'Search',
  		'matches' : matches,
        'username': req.session.username
  	});
};