console.log("The follow bot is starting");

var Twit = require('twit');

var config = require('../config');
var T = new Twit(config);

// Require child_preccess for triggering the command
var exec = require('child_process').exec;
var fs = require('fs');

tweetIt();
setInterval(tweetIt, 1000*60*60);

function tweetIt() {
    var cmd = 'processing-java --sketch=`pwd/rainbow` --run';
    exec(cmd, processing);

    function processing() {
        console.log('finished');

        var filename = 'img/output.png';
        var params = {
            encoding: 'base64'
        }
        var b64 = fs.readFileSync(filename, params);

        // upload a media first and get the id and tweet it after
        T.post('media/upload', { media_data: b64 }, uploaded);

        function uploaded(err, data, response) {
            var id = data.media_id_string;
            var tweet = {
                status: '#thatgeekgal live from node.js',
                media_ids: [id]
            } 

            T.post('statuses/update', tweet, tweeted);
        }
    
        function tweeted(err, data, response) {
            if (err) {
                console.log("Something went wrong!");
            } else {
                console.log("It worked!");
                console.log(data);
            } 
        }
    }
}
