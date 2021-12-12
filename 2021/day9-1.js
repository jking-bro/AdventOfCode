// utility shit I'll use every time... probably?
function logMaybe() { if (loggingActivated) console.log.apply(undefined,arguments); }
function finalAnswer(answer) { console.log("****AND THE FINAL ANSWER IS****\n\n" + answer + "\n\n*******************************" ); }


var loggingActivated = false;

var dataDelimiter = "\n";

var inputData = document.querySelector("pre").innerText.trim().split(dataDelimiter);
// var inputData = ["2199943210","3987894921","9856789892","8767896789","9899965678"];


// TODAY'S CODE:

var rows = [];
var lowPointRiskLevelSum = 0;

for (var i=0; i < inputData.length; i++) {
    rows.push(inputData[i].split("").map(function(val){return parseInt(val);}));
}

for (var i = 0; i < rows.length; i++) {
    for (var j = 0; j < rows[i].length; j++) {
        var pointHeight = rows[i][j];
        var lowerThanAdjacents = true;

        //for every row after the first row, check the point above
        if ( (i>0) && (pointHeight >= rows[i-1][j]) )
            lowerThanAdjacents = false;

        //for every point after the first in the row, check the point before
        if ( (j>0) && (pointHeight >= rows[i][j-1]) )
            lowerThanAdjacents = false;

        //for every point before the last in the row, check the point after
        if ( (j<(rows[i].length-1)) && (pointHeight >= rows[i][j+1]) )
            lowerThanAdjacents = false;

        //for every row before the last row, check the point below
        if ( (i<(rows.length-1)) && (pointHeight >= rows[i+1][j]) )
            lowerThanAdjacents = false;


        // if it's a low point, quickly asses risk level and add it to the sum!
        if (lowerThanAdjacents) {
            logMaybe("found low point!",i,j,pointHeight);
            lowPointRiskLevelSum += (pointHeight + 1);
        }
    }
}

// send it!

finalAnswer("total sum of risk levels of all low points is: " + lowPointRiskLevelSum);
