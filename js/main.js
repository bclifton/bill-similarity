var c109th = 6436;
var c110th = 7340;
var c111th = 6570;
var c112th = 6729;
var c113th = 5893;
var c114th = 1342;

var rows0;
var rows1;
var rows2;
var rows3;
var rows4;

// var dataFile0 = "data/109-110_similar_bills1.csv";
// var dataFile1 = "data/110-111_similar_bills___2.csv";
// var dataFile2 = "data/111-112_similar_bills1.csv";
// var dataFile3 = "data/112-113_similar_bills__1.csv";
// var dataFile4 = "data/113-114_similar_bills1.csv";

var dataFile0 = "data/new/109-110_similarity_and_votes.csv";
var dataFile1 = "data/new/110-111_similarity_and_votes.csv";
var dataFile2 = "data/new/111-112_similarity_and_votes.csv";
var dataFile3 = "data/new/112-113_similarity_and_votes.csv";
var dataFile4 = "data/new/113-114_similarity_and_votes.csv";

function preload() {
	rows0 = loadStrings(dataFile0);
	rows1 = loadStrings(dataFile1);
	rows2 = loadStrings(dataFile2);
	rows3 = loadStrings(dataFile3);
	rows4 = loadStrings(dataFile4);
}

function setup() {
	var canvasWidth = $('#graphic').width();
	var myCanvas = createCanvas(canvasWidth, 1000);
	myCanvas.parent('myContainer');
	loadData();
}

function draw() {}

function loadData() {

	var percentMin = 0.86;
	var percentMax = 0.93;

	var ypos = 50;
	var y = height/5;

	background(232, 232, 232);
	textFont('Roboto');
	textSize(14);
	noStroke();

	// drawGraphic(rows0, percentMin, percentMax, 7500, 7500, 25, y*1, false);
	// drawGraphic(rows1, percentMin, percentMax, 7500, 7500, y*1, y*2, false);
	// drawGraphic(rows2, percentMin, percentMax, 7500, 7500, y*2, y*3, false);
	// drawGraphic(rows3, percentMin, percentMax, 7500, 7500, y*3, y*4, false);
	// drawGraphic(rows4, percentMin, percentMax, 7500, 7500, y*4, height - 10, false);

	drawGraphic2(rows0, percentMin, percentMax, 7500, 7500, 25, y*1, false, '109th Congress (2005 - 2007)');
	drawGraphic2(rows1, percentMin, percentMax, 7500, 7500, y*1, y*2, false, '110th Congress (2007 - 2009)');
	drawGraphic2(rows2, percentMin, percentMax, 7500, 7500, y*2, y*3, false, '111th Congress (2009 - 2011)');
	drawGraphic2(rows3, percentMin, percentMax, 7500, 7500, y*3, y*4, false, '112th Congress (2011 - 2013)');
	drawGraphic2(rows4, percentMin, percentMax, 7500, 7500, y*4, height - 10, false, '113th Congress (2013 - 2015)');

	fill(255, 150);
	rect(0, height -34, 200, 20);	
	fill(66, 68, 67);
	text('114th Congress (2015 - 2017)', 5, height - 20);	
	
}


function drawGraphic(rowsArray, percentMin, percentMax, billsMax1, billsMax2, yPosition1, yPosition2, even){
	var billCount = 0;

	for (var i = 1; i < rowsArray.length; i++) {
		var cols = split(rowsArray[i], ",");

		// console.log(cols);
		if (+cols[2] > percentMin && +cols[2] < percentMax) {
			billCount++;

			// var x1pos;
			// var x2pos;
			// if (even === true) {
			// 	x1pos = width - map(cols[1], 1, billsMax1, 0, width);
			// 	x2pos = map(cols[0], billsMax2, 1, width, 0);
			// } else {
				
				
			// }
			var x1pos = map(+cols[1], 1, billsMax1, 0, width);
			var x2pos = map(+cols[0], 1, billsMax2, 0, width);

			var boxHeight = 4;
			var y1pos = yPosition1;
			var y2pos = yPosition2;
			var c = map(float(cols[2]), 0.5, 1, 0, 50);

			stroke(154, 62, 37, c);
			line(x1pos, y1pos, x2pos, y2pos); 

			fill(66, 68, 67);
			noStroke();
			rect(x1pos, y1pos, 0.5, boxHeight);
			rect(x2pos, y2pos, 0.5, boxHeight);
			
		}
	} 
}


function drawGraphic2(rowsArray, percentMin, percentMax, billsMax1, billsMax2, y_top, y_bottom, even, label){
	var billCount = 0;

	for (var i = 1; i < rowsArray.length; i++) {
		var cols = split(rowsArray[i], ",");

		var top = cols[1].replace('h', '');
		var bottom = cols[5].replace('h', '');
		
		// console.log(cols[1], cols[5]);
		// console.log(older, newer);

		if (cols[3] > percentMin && cols[3] < percentMax) {
			billCount++;

			// var x1pos;
			// var x2pos;
			// if (even === true) {
			// 	x1pos = width - map(newer, 1, billsMax1, 0, width);
			// 	x2pos = map(older, billsMax2, 1, width, 0);
			// } else {
			// 	x1pos = map(newer, 1, billsMax1, 0, width);
			// 	x2pos = map(older, billsMax2, 1, width, 0);
			// }

			

			var c = map(+cols[3], 0.5, 1, 0, 50);

			if (cols[2] === 'Passed' && cols[6] === 'Passed') {

				console.log(label, 'passed', cols[1], cols[5], cols[3]);
				stroke(92, 129, 0, 100);

			} else if (cols[2] === 'Agreed to' &&  cols[6] === 'Agreed to'){
				
				console.log(label, 'agreed to', cols[1], cols[5], cols[3]);
				stroke(149, 101, 126, 100);

			} else if (cols[2] === 'Failed' && cols[6] === 'Failed') {
				
				console.log(label, 'failed', cols[1], cols[5], cols[3]);
				stroke(189, 45, 40, 100);

			// } else if (cols[2] === 'Passed' && cols[6] !== 'Passed') {
			// 	stroke(107, 187, 161, 50);
			// } else if (cols[2] !== 'Passed' && cols[6] === 'Passed') {
			// 	stroke(107, 187, 161, 50);
			// } else if (cols[2] === 'Agreed to' &&  cols[6] !== 'Agreed to') {
			// 	stroke(107, 187, 161, 50);
			// } else if (cols[2] !== 'Agreed to' &&  cols[6] === 'Agreed to') {
			// 	stroke(107, 187, 161, 50);
			// } else if (cols[2] === 'Failed' && cols[6] !== 'Failed'){
			// 	stroke(107, 187, 161, 50);
			// } else if (cols[2] !== 'Failed' && cols[6] === 'Failed') {
			// 	stroke(107, 187, 161, 50);
			} 

			else {
				stroke(193, 186, 169, c);
			}

			// if (cols[2] === 'Passed' || cols[2] === 'Agreed to' || cols[6] === 'Passed' || cols[6] === 'Agreed to' ) {
			// 	stroke(92, 129, 0, c);
			// 	// console.log('r1', cols[2]);	
			// } else if (cols[2] === 'Failed' || cols[6] === 'Failed') {
			// 	stroke(189, 45, 40, c);
			// 	// console.log('r2', cols[6]);
			// } else {
			// 	// console.log(cols[6]);
			// 	stroke(193, 186, 169, c);
			// }

			var boxHeight = 4;
			var x_top = map(top, 1, billsMax1, 0, width);
			var x_bottom = map(bottom, 1, billsMax2, 0, width);
			// stroke(154, 62, 37, c);
			line(x_top, y_top, x_bottom, y_bottom); 

			fill(66, 68, 67);
			noStroke();
			
			// // Bill label debug:
			// textSize(10);
			// var freq = 100;
			// if (top % freq === 0) {
			// 	text(cols[1], x_top, y_top);
			// 	text(top, x_top, y_top- 10);
			// }

			// if (bottom % freq === 0) {
			// 	text(cols[5], x_bottom, y_bottom);
			// 	text(bottom, x_bottom, y_bottom - 10);	
			// }
 			
			
			rect(x_top, y_top, 0.5, boxHeight);
			rect(x_bottom, y_bottom, 0.5, boxHeight);
					
		}
	} 

	fill(255, 150);
	rect(0, y_top - 24, 200, 20);
	fill(66, 68, 67);
	text(label, 5, y_top - 10);
}