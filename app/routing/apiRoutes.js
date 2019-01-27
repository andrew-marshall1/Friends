var friends = require("../data/friends.js");
var bodyParser = require("body-parser");
var path = require("path");

module.exports = function (app) {
    // ------------ GET ----------------- //
    app.get('/api/friends', function(req, res) {
        return res.json(friends);
    });

    // ------------ POST ---------------- //
    app.post('/api/friends', function(req, res) {
        var newFriend = req.body;

        var bestMatch = {
			name: "",
			image: "",
			diff: 41
        };

        var totalDiff = 0;
		for(var i = 0; i < friends.length; i++){
            totalDiff = 0;
            for (var k = 0; k < newFriend.scores.length; k++) {
                totalDiff += Math.abs( parseInt(newFriend.scores[k]) - parseInt(friends[i].scores[k]) );
            }
            if (totalDiff <= bestMatch.diff){
                bestMatch.name = friends[i].name;
                bestMatch.photo = friends[i].photo;
                bestMatch.diff = totalDiff;
            }
		}

		res.json(bestMatch);
    });
}
