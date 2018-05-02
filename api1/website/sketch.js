function setup() {
    createCanvas(300, 300);
    //drawData();

    var button = select('#submit');
    button.mousePressed(submitWord);

    var buttonA = select('#analyze');
    buttonA.mousePressed(analyzeThis);
}

function analyzeThis() {
    var txt = select('#textinput').value();

    // POST request
    var data = {
        text: txt
    };

    httpPost('analyze', data, 'json', dataPosted, postErr);
}

function dataPosted(result) {
    console.log(result);
}

function postErr(err) {
    console.log(err);
}

function drawData() {
    loadJSON('all', gotData);
}

function submitWord() {
    var word = select('#word').value();
    var score = select('#score').value();

    // GET Request
    loadJSON('add/' + word + '/' + score, finished);
    function finished(data) { 
        //drawData();
        var msg = select('#msg');
        msg.html(data.msg); 
    }
}

function gotData(data){
    background(51);
    var keys = Object.keys(data);

    for (var i=0; i<keys.length; i++) {
        var word = keys[i];
        var score = data[word];
        var x = random(width);
        var y = random(height);
        
        fill(255);
        textSize(12);
        text(word, x, y);
    }
}