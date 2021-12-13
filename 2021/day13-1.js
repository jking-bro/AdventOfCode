// utility shit I'll use every time... probably?
function logMaybe() { if (loggingActivated) console.log.apply(undefined,arguments); }
function finalAnswer(answer) { console.log("****AND THE FINAL ANSWER IS****\n\n" + answer + "\n\n*******************************" ); }


var loggingActivated = true;

var dataDelimiter = "\n\n";// or "," or whatever

var inputData = {
    'folds': document.querySelector("pre").innerText.trim().split(dataDelimiter)[1].split("\n"),
    'dots': document.querySelector("pre").innerText.trim().split(dataDelimiter)[0].split("\n")
}

// var inputData = {
//     'folds': ["fold along y=7", "fold along x=5"],
//     'dots': ["6,10", "0,14", "9,10", "0,3", "10,4", "4,11", "6,0", "6,12", "4,1", "0,13", "10,12", "3,4", "3,0", "8,4", "1,10", "2,14", "8,10", "9,0"]
// };


// TODAY'S CODE:

var dotGrid = {};

for (var i=0; i < inputData.dots.length; i++) {
    var dot = {
        x: inputData.dots[i].split(",")[0],
        y: inputData.dots[i].split(",")[1]
    };
    var dotCoordsString = coordsObjToString(dot);

    dotGrid[dotCoordsString] = 1;
}

logMaybe("Okay, we have an initial grid!", dotGrid, Object.keys(dotGrid).length);

function coordsStringToObj(coordsString) {
    return {
        x: parseInt(coordsString.replace("x","").split("y")[0]),
        y: parseInt(coordsString.replace("x","").split("y")[1])
    }
}

function coordsObjToString(coordsObj) {
    return "x" + coordsObj.x + "y" + coordsObj.y;
}

function doFold(cmd) {
    var foldedDotGrid = {};

    for (var coordsString in dotGrid) {
        if (dotGrid.hasOwnProperty(coordsString)) {
            var dotCoordsObj = coordsStringToObj(coordsString);

            if (dotCoordsObj[cmd[0]] > cmd[1]) {
                dotCoordsObj[cmd[0]] = dotCoordsObj[cmd[0]] - ( 2 * (dotCoordsObj[cmd[0]] - cmd[1]) );
            }

            foldedDotGrid[coordsObjToString(dotCoordsObj)] = 1;
        }
    }

    dotGrid = foldedDotGrid;
}

// send it!

for (var i = 0; i < 1; i++) { //inputData.folds.length; i++) {
    var foldInstructions = inputData.folds[i].replace("fold along ","").split("=");
    logMaybe(inputData.folds[i],foldInstructions);
    doFold(foldInstructions);
    finalAnswer("fold complete! number of dots now visible: "+Object.keys(dotGrid).length);
}
