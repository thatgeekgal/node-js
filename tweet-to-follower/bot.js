console.log("The follow bot is starting");

var Twit = require('twit');

var config = require('../config');
var T = new Twit(config);

// whenever someone follows me, tweet a sweet question :)

var stream = T.stream('user')

stream.on('follow', followed);

function followed(event) {
    console.log('Follow event!');
    var name = event.source.name;
    var screenName = event.source.screen_name;
    tweetIt('@' + screenName +  'do you like ice cream?');
}

function tweeIt(txt) {
    var tweet = {
        status: txt
    }

    T.post('statuses/update', tweet, tweeted);

    function tweeted(err, data, response) {
        if (err) {
            console.log("Something went wrong!");
        } else {
            console.log("It worked!");
            console.log(data);
        } 
    }
}
