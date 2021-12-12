// utility shit I'll use every time... probably?
function logMaybe() { if (loggingActivated) console.log.apply(undefined,arguments); }
function finalAnswer(answer) { console.log("****AND THE FINAL ANSWER IS****\n\n" + answer + "\n\n*******************************" ); }


var loggingActivated = false;

var dataDelimiter = "\n";

var inputData = document.querySelector("pre").innerText.trim().split(dataDelimiter);
// var inputData = ["0,9 -> 5,9","8,0 -> 0,8","9,4 -> 3,4","2,2 -> 2,1","7,0 -> 7,4","6,4 -> 2,0","0,9 -> 2,9","3,4 -> 1,4","0,0 -> 8,8","5,5 -> 8,2"]


// TODAY'S CODE:

var lines = [];
var horizontalLines = [];
var verticalLines = [];
var diagonalUpLines = [];
var diagonalDownLines = [];

for (var i=0; i < inputData.length; i++) {
    var coords = inputData[i].split(" -> ");
    var line = {
        x0: coords[0].split(",")[0],
        y0: coords[0].split(",")[1],
        x1: coords[1].split(",")[0],
        y1: coords[1].split(",")[1],
    };

    lines.push(line);

    var dX = (line.x0 - line.x1);
    var dY = (line.y0 - line.y1);

    if (line.x0 == line.x1)
        verticalLines.push(line);
    else if (line.y0 == line.y1)
        horizontalLines.push(line);
    else if (dX/dY == 1)
        diagonalUpLines.push(line);
    else if (dX/dY == -1)
        diagonalDownLines.push(line);
}

//okay, now let's just make an object to track how many times points are within our lines
var crossedPoints = {};

//then we'll trace each line and increment the counter at each point along it!
for (var i=0; i < verticalLines.length; i++) {
    var xPos = verticalLines[i].x0;
    var yPosStart = Math.min(verticalLines[i].y0,verticalLines[i].y1);
    var yPosEnd = Math.max(verticalLines[i].y0,verticalLines[i].y1);

    for (var yPos = yPosStart; yPos <= yPosEnd; yPos++) {
        var coordString = "x" + xPos + "y" + yPos;

        if (crossedPoints.hasOwnProperty(coordString))
            crossedPoints[coordString]++;
        else
            crossedPoints[coordString] = 1;
    }
}
for (var i=0; i < horizontalLines.length; i++) {
    var yPos = horizontalLines[i].y0;
    var xPosStart = Math.min(horizontalLines[i].x0,horizontalLines[i].x1);
    var xPosEnd = Math.max(horizontalLines[i].x0,horizontalLines[i].x1);

    for (var xPos = xPosStart; xPos <= xPosEnd; xPos++) {
        var coordString = "x" + xPos + "y" + yPos;

        if (crossedPoints.hasOwnProperty(coordString))
            crossedPoints[coordString]++;
        else
            crossedPoints[coordString] = 1;
    }
}
for (var i=0; i < diagonalUpLines.length; i++) {
    var delta = Math.abs(diagonalUpLines[i].x0 - diagonalUpLines[i].x1)
    var yPosStart = Math.min(diagonalUpLines[i].y0,diagonalUpLines[i].y1);
    var xPosStart = Math.min(diagonalUpLines[i].x0,diagonalUpLines[i].x1);

    for (var j=0; j <= delta; j++) {
        var coordString = "x" + (xPosStart+j) + "y" + (yPosStart+j);

        if (crossedPoints.hasOwnProperty(coordString))
            crossedPoints[coordString]++;
        else
            crossedPoints[coordString] = 1;
    }
}
for (var i=0; i < diagonalDownLines.length; i++) {
    var delta = Math.abs(diagonalDownLines[i].x0 - diagonalDownLines[i].x1)
    var yPosEnd = Math.max(diagonalDownLines[i].y0,diagonalDownLines[i].y1);
    var xPosStart = Math.min(diagonalDownLines[i].x0,diagonalDownLines[i].x1);

    for (var j=0; j <= delta; j++) {
        var coordString = "x" + (xPosStart+j) + "y" + (yPosEnd-j);

        if (crossedPoints.hasOwnProperty(coordString))
            crossedPoints[coordString]++;
        else
            crossedPoints[coordString] = 1;
    }
}

var pointsCrossedMoreThanOnceCount = 0;

for (point in crossedPoints) {
    if (crossedPoints.hasOwnProperty(point))
        if (crossedPoints[point] > 1)
            pointsCrossedMoreThanOnceCount++;
}

// send it!

finalAnswer("points crossed more than once: " + pointsCrossedMoreThanOnceCount);
