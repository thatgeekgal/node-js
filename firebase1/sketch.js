
var canvas;
var score;
var button;
var initialInput;
var submitButton;
var database;

function setup() {
    canvas = createCanvas(100, 100);
    canvas.parent('game');

    score = 0;
    createP('Click the button to get points').parent('game');
    button = createButton('click').parent('game');
    button.mousePressed(increaseScore);

    initialInput = createInput('initials').parent('game');
    submitButton = createButton('submit').parent('game');
    submitButton.mousePressed(submitScore);

    // Initialize Firebase
    var config = {
        apiKey: "YOUR API KEY GOES HERE",
        authDomain: "YOUR AUTH DOMAIN GOES HERE",
        databaseURL: "YOUR DATABASE URL GOES HERE",
        projectId: "YOUR INFO GOES HERE",
        storageBucket: "",
        messagingSenderId: "YOUR INFO GOES HERE"
    };
    firebase.initializeApp(config);
    database = firebase.database();

    var ref = database.ref('scores');
    ref.on('value', gotData, errData);
}

function gotData(data) {
    //console.log(data.val());
    var scorelistings = selectAll('.scorelisting');

    for (var i=0; i < scorelistings.length; i++) {
        scorelistings[i].remove();
    }

    var scores = data.val();
    var keys = Object.keys(scores);
    console.log(scores);

    for (var i=0; i<keys.length; i++) {
        var k = keys[i];
        var initials = scores[k].initials;
        var score = scores[k].score;

        var li = createElement('li', initials + ": " + score);
        li.class('scorelisting');
        li.parent('scorelist');
    }
}

function errData(err) {
    console.log("Error!");
    console.log(err);
}
function submitScore() { 
    var ref = database.ref('scores');

    var data = {
        initials: initialInput.value(),
        score: score
    }

    ref.push(data);
}

function increaseScore() {
    score++;
}

function draw() {
    background(0);
    textAlign(CENTER);
    textSize(23);
    fill(255);
    text(score, width/2, height/2);
}