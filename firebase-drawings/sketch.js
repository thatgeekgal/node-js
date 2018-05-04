var database;

var drawing = [];
var currentPath = [];
var isDrawing = false;

function setup() {
    canvas = createCanvas(1000, 1000); 

    canvas.mousePressed(startPath); 
    canvas.mouseReleased(endPath);
    canvas.parent('canvascontainer');

    var saveButton = select('#saveButton');
    saveButton.mousePressed(saveDrawing);

    var clearButton = select('#clearButton');
    clearButton.mousePressed(clearDrawing);

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBxOYKDYLNmBDaU43oi-VH1sKtnIlt1wEw",
        authDomain: "fir-1-81811.firebaseapp.com",
        databaseURL: "https://fir-1-81811.firebaseio.com",
        projectId: "fir-1-81811",
        storageBucket: "fir-1-81811.appspot.com",
        messagingSenderId: "659280578298"
    };
    firebase.initializeApp(config);
    database = firebase.database(); 


    var params = getURLParams();
    if (params.id) {
        showDrawing(params.id);
    }

    var ref = database.ref('drawings');
    ref.on('value', gotData, errData);
} 

function startPath() {
    isDrawing = true;
    currentPath = [];
    drawing.push(currentPath);
} 

function endPath() { 
    isDrawing = false;
} 

function draw() {
    background(0);

    if (isDrawing) {
        var point = {
            x: mouseX,
            y: mouseY
        };

        currentPath.push(point);
    }

    stroke(255);
    strokeWeight(4);
    noFill();
    for (var i=0; i<drawing.length; i++) {
        var path = drawing[i];
        beginShape();
        for (var j=0; j<path.length; j++) {
            vertex(path[j].x, path[j].y);
        } 
        endShape();
    }
}

function saveDrawing() {
    var ref = database.ref('drawings');
    var data = {
        name: "Cindy",
        drawing: drawing
    }
    var result = ref.push(data, dataSent);
    console.log(result.key);

    function dataSent(err, status) {
        console.log(status);
    }
}

function gotData(data) {
    // cleare the listing
    var elts = selectAll('.listing');
    for (var i=0; i<elts.length; i++) {
        elts[i].remove();
    }


    var drawings = data.val();
    var keys = Object.keys(drawings);
    for (var i=0; i<keys.length; i++) {
        var key = keys[i];
        //console.log(key);

        var li = createElement('li', '');
        li.class('listing');
        var ahref = createA('#', key);
        ahref.mousePressed(showDrawing);
        ahref.parent(li);

        var perma = createA('?id=' + key, 'permalink');
        perma.parent(li);
        perma.style('padding', '4px');

        li.parent('drawinglist');  
    }
}

function errData(err) {
    //console.log(err);
}

function showDrawing(key) {
    console.log(arguments);
    if (key instanceof MouseEvent) {
        key = this.html();
    } 

    var ref = database.ref('drawings/' + key);
    ref.once('value', oneDrawing, errData);

    function oneDrawing(data) {
        var dbdrawing = data.val();
        drawing = dbdrawing.drawing;
    }
}

function clearDrawing() {
    drawing = [];
}