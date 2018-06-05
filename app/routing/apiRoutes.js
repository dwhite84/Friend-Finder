var friends = require("../data/friends");

module.exports = function(app){
	app.get("/api/friends", function(req, res){
		res.json(friends);
	})

// Create New Characters - takes in JSON input
app.post("/api/friends", function(req, res) {
	console.log(friends)
    var newFriend = req.body;
    
    var newScore = 0;
    
    var total = 0;
    
	var match = {
		name: "",
		photo: "",
		difference: 10000
	}

	// Calculating totals 
	
	for (var i = 0; i < friends.length; i++) {
		total = 0;

		for (var j = 0; j < friends[i].scores.length; j++) {
			total += Math.abs(parseInt(friends[i].scores[j]) - parseInt(newFriend.scores[j]));

			if (total <= match.difference) {
				match.name = friends[i].name,
				match.photo = friends[i].photo,
				match.difference = total
			}
    	}
    }
    friends.push(newFriend);
    res.json(match);
    console.log(match);
});
}