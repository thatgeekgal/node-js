console.log("The follow bot is starting");

var Twit = require('twit');

var config = require('../config');
var T = new Twit(config);

console.log("The replier bot is starting");

var stream = T.stream('user');

// Anytime someone tweets to me
stream.on('tweet', tweetEvent);

function tweetEvent(eventMsg){    
    // var fs = require('fs');
    // var json = JSON.stringify(eventMsg,null,2);
    // fs.writeFile("tweet.json", json);

    var replyto = eventMsg.in_reply_to_screen_name;
    var text = eventMsg.text;
    var from = eventMsg.user.screen_name;

    if (replyto === 'thatgeekgal') {
        var newtweet = '@' + from + ' thank you for tweeting me!';
        tweetIt(newtweet);
    }
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