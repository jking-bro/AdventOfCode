// utility shit I'll use every time... probably?
function logMaybe() { if (loggingActivated) console.log.apply(undefined,arguments); }
function finalAnswer(answer) { console.log("****AND THE FINAL ANSWER IS****\n\n" + answer + "\n\n*******************************" ); }


var loggingActivated = false;

var dataDelimiter = "\n";

var inputData = document.querySelector("pre").innerText.trim().split(dataDelimiter).map(function(v){return parseInt(v);});
// var inputData = [199,200,208,210,200,207,240,269,260,263];


// TODAY'S CODE:

var incCount = 0;

for (var i=1; i < inputData.length; i++) {
    if (inputData[i] > inputData[i-1]) {
        logMaybe("increase at position "+i+" from "+inputData[i-1]+" to "+inputData[i]);
        incCount++;
        logMaybe("increase count now at: "+incCount);
    }
    else
        logMaybe("no increase at position: "+i);
}

// send it!

finalAnswer("total increases: "+incCount);
