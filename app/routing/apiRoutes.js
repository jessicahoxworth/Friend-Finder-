// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================
// var tableData = require("../data/tableData");
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
        console.log("Hit route /api/friends")
        res.json(friends);
    });
    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------
    app.post("/api/friends", function (req, res) {
        var bestMatch = {
            name: "",
            photo: "",
            scores: 10000
        }
        var userData = req.body
        var userScores = userData.scores;

        var totalDifference = 0;

        for (var i = 0; i < friends.length; i++) {
            var thisFriend = friends[i];
            totalDifference = 0;
            for (var j = 0; j < thisFriend.scores.length; j++) {
                totalDifference += Math.abs(thisFriend.scores[j] - userScores[j]);
            }

            if (totalDifference <= bestMatch.scores) {
                bestMatch.name = thisFriends.name;
                bestMatch.photo = thisFriend.photo;
                bestMatch.scores = totalDifference;
            }
        }
        friends.push(userData);
        res.json(bestMatch);
    });


};