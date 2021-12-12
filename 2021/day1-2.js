// utility shit I'll use every time... probably?
function logMaybe() { if (loggingActivated) console.log.apply(undefined,arguments); }
function finalAnswer(answer) { console.log("****AND THE FINAL ANSWER IS****\n\n" + answer + "\n\n*******************************" ); }


var loggingActivated = false;

var dataDelimiter = "\n";

var inputData = document.querySelector("pre").innerText.trim().split(dataDelimiter).map(function(v){return parseInt(v);});
// var inputData = [199,200,208,210,200,207,240,269,260,263];


// TODAY'S CODE:

var slidingWindows = [];

for (var i=0; i < inputData.length-2; i++) {
    var slidingWindowVal = inputData[i] + inputData[i+1] + inputData[i+2];
    logMaybe("the sum of the vals at "+i+", "+(i+1)+", "+(i+2)+" is: " +slidingWindowVal);
    slidingWindows.push(slidingWindowVal);
}

var incCount = 0;

for (var i=1; i < slidingWindows.length; i++) {
    if (slidingWindows[i] > slidingWindows[i-1]) {
        logMaybe("increase at position "+i+" from "+slidingWindows[i-1]+" to "+slidingWindows[i]);
        incCount++;
        logMaybe("increase count now at: "+incCount);
    }
    else
        logMaybe("no increase at position: "+i);
}

// send it!

finalAnswer("total increases: "+incCount);
