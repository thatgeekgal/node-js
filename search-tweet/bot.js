console.log("The follow bot is starting");

var Twit = require('twit');

var config = require('../config');
var T = new Twit(config);

// Search twitter for all tweets containing the keyword
var params = { 
    q: 'thatgeekgal', 
    count: 2 
};

T.get('search/tweets', params, gotData);

function gotData(err, data, response) {
    var  tweets = data.statuses;
    for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].text);
    }
};
