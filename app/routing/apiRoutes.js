var friends = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function (req, res) {
        // Note the code here. Our "server" will respond to a user"s survey result
        // Then compare those results against every user in the database.
        // It will then calculate the difference between each of the numbers and the user"s numbers.
        // It will then choose the user with the least differences as the "best friend match."
        // In the case of multiple users with the same result it will choose the first match.
        // After the test, it will push the user to the database.

        // We will use this object to hold the "best match". We will constantly update it as we
        // loop through all of the options
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: Infinity
        };

        // Here we take the result of the user"s survey POST and parse it.
        var userData = req.body;
        var userScores = userData.scores;

        var totalDifference;

        for (var i = 0; i < friends.length; i++) {
            var currentFriend = friends[i];
            totalDifference = 0;

            console.log(currentFriend.name);

            for (var j = 0; j < currentFriend.scores.length; j++) {
                var currentFriendScore = currentFriend.scores[j];
                var currentUserScore = userScores[j];

                totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
            }

            if (totalDifference <= bestMatch.friendDifference) {
                bestMatch.name = currentFriend.name;
                bestMatch.photo = currentFriend.photo;
                bestMatch.friendDifference = totalDifference;
            }
        }

        friends.push(userData);
        res.json(bestMatch);
    });
};
