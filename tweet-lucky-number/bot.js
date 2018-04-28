console.log("The follow bot is starting");

var Twit = require('twit');

var config = require('../config');
var T = new Twit(config);

//  tweet a random lukcy number every hour
tweetIt();
setInterval(tweetIt, 1000*60*60);

function tweetIt() {
    var r = Math.floor(Math.random()*100);

    var tweet = { 
        status: 'Your lucky number is '+ r +' #thatgeekgal from node.js' 
    };
    
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
