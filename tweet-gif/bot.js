console.log("The follow bot is starting");

var Twit = require('twit');

var config = require('../config');
var T = new Twit(config);
 
var fs = require('fs');

tweetIt();

function tweetIt() {
    var filename = 'img/TGIF.gif';
    var params = {
        encoding: 'base64'
    }
    var b64 = fs.readFileSync(filename, params);

    // upload a media first and get the id and tweet it after
    T.post('media/upload', { media_data: b64 }, uploaded);

    function uploaded(err, data, response) { 
        var id = data.media_id_string;
        var tweet = {
            status: 'weekend, are you coming? #thatgeekgal bot',
            media_ids: [id]
        } 

        T.post('statuses/update', tweet, tweeted);
    }
    
    function tweeted(err, data, response) {
        if (err) {
            console.log("Something went wrong!");
        } else {
            console.log("It worked!");
        } 
    } 
}
