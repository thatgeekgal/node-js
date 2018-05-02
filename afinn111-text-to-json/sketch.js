var table;
var afinn = {};

function preload() {
    table = loadTable('AFINN-111.txt', 'tsv');
}

function setup() {
    noCanvas(); 

    console.log(table);

    for (var i=0; i<table.getRowCount(); i++) {
        var row = table.getRow(i);
        var word = row.get(0);
        var score = row.get(1);

        afinn[word] = score;
    }

    save(afinn, 'afinn111.json');
}
