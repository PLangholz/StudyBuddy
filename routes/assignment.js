var assignmentsData = require("../routes/assignments.json");
/*
 * GET home page.
 */

exports.view = function(req, res){
	var assignment_id = req.query.id;
	var assignment = [];
	var assignmentName;
	if (assignment_id) {
		assignment = assignmentsData.assignments.filter(function(pset) {
			if (pset.id == assignment_id) {
				assignmentName = pset.name;
				return true;
			}
		});
		console.log(assignmentName);
		console.log(assignment);

	}
  res.render('assignment', 
  	{
  		'title' : assignmentName,
  		'assignment' : assignment
  	});

};