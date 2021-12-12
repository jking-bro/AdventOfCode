// utility shit I'll use every time... probably?
function logMaybe() { if (loggingActivated) console.log.apply(undefined,arguments); }
function finalAnswer(answer) { console.log("****AND THE FINAL ANSWER IS****\n\n" + answer + "\n\n*******************************" ); }


var loggingActivated = false;

var dataDelimiter = "\n";

var inputData = document.querySelector("pre").innerText.trim().split(dataDelimiter);
// var inputData = ["2199943210","3987894921","9856789892","8767896789","9899965678"];


// TODAY'S CODE:

var rows = [];
var mapPointChecklist = {};

for (var i=0; i < inputData.length; i++) {
    rows.push(inputData[i].split("").map(function(v){return parseInt(v);}));
}

for (var i = 0; i < rows.length; i++) {
    for (var j = 0; j < rows[i].length; j++) {
        var pointHeight = rows[i][j];
        var coordString = "x"+j+"y"+i;

        mapPointChecklist[coordString] = {
            'pointHeight': pointHeight,
            'coords': {
                'x': j,
                'y': i
            },
            'checked':(pointHeight==9)?true:false // no point checking 9s
        }
    }
}

var pointCheckQueue = [];
var basinSize = 0;
function checkPoint(point) {
    //scan points adjacent to this one and add them to queue if unchecked or not already in queue
    var coords = mapPointChecklist[point].coords;

    //check point to left
    if (coords.x > 0) {
        var leftPoint = "x"+(coords.x-1)+"y"+coords.y;
        if (!mapPointChecklist[leftPoint].checked && pointCheckQueue.indexOf(leftPoint) < 0)
            pointCheckQueue.push(leftPoint);
    }

    //check point to right
    if (coords.x < (rows[0].length-1)) {
        var rightPoint = "x"+(coords.x+1)+"y"+coords.y;
        if (!mapPointChecklist[rightPoint].checked && pointCheckQueue.indexOf(rightPoint) < 0)
            pointCheckQueue.push(rightPoint);
    }

    //check point above
    if (coords.y > 0) {
        var abovePoint = "x"+coords.x+"y"+(coords.y-1);
        if (!mapPointChecklist[abovePoint].checked && pointCheckQueue.indexOf(abovePoint) < 0)
            pointCheckQueue.push(abovePoint);
    }

    //check point below
    if (coords.y < (rows.length-1)) {
        var rightPoint = "x"+coords.x+"y"+(coords.y+1);
        if (!mapPointChecklist[rightPoint].checked && pointCheckQueue.indexOf(rightPoint) < 0)
            pointCheckQueue.push(rightPoint);
    }

    mapPointChecklist[point].checked = true;
    pointCheckQueue.shift();
    basinSize++;
}
function measureBasinFromPoint(point) {
    logMaybe("start measuring basin from coords: ",point);

    basinSize = 0;
    pointCheckQueue.push(point);

    while(pointCheckQueue.length > 0) {
        checkPoint(pointCheckQueue[0]);
    }

    logMaybe("basin complete! size: "+basinSize);

    return basinSize;
}

function findUnmeasuredBasinStartPoint(){
    for (point in mapPointChecklist) {
        if (mapPointChecklist.hasOwnProperty(point)) {
            if (!mapPointChecklist[point].checked) {
                return point;
            }
        }
    }

    return null;
}

// send it!

var doneExploring = false;
var basinSizes = [];
while(!doneExploring) {
    var newBasinStartPoint = findUnmeasuredBasinStartPoint();

    if (newBasinStartPoint == null) {
        doneExploring = true;
        basinSizes.sort(function(a,b){return b-a;}); // sort desc numerically
        finalAnswer("oh boy! the magic number is: "+(basinSizes[0]*basinSizes[1]*basinSizes[2]));
    }
    else {
        basinSizes.push(measureBasinFromPoint(newBasinStartPoint));
    }
}
