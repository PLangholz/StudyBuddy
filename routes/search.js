var courseData = require("../routes/courses.json");
/*
 * GET match search page.
 */

exports.view = function(req, res){
	console.log(req.query.query);
	var query = req.query.query;
	var matches = courseData;
	if (query) {
		matches = courseData.courses.filter(function(course){
			console.log(course.name);
			return course.name.indexOf(query) >=0;
		});
		console.log(matches);
	}
	
  res.render('search', 
  	{
  		'title' : 'Search',
  		'matches' : matches
  	});
};