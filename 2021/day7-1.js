// utility shit I'll use every time... probably?
function logMaybe() { if (loggingActivated) console.log.apply(undefined,arguments); }
function finalAnswer(answer) { console.log("****AND THE FINAL ANSWER IS****\n\n" + answer + "\n\n*******************************" ); }


var loggingActivated = false;

var dataDelimiter = ",";

var inputData = document.querySelector("pre").innerText.trim().split(dataDelimiter).map(function(v){return parseInt(v)});
// var inputData = [16,1,2,0,4,2,7,1,2,14];


// TODAY'S CODE:

var lowerBound = Math.min.apply(undefined,inputData);
var upperBound = Math.max.apply(undefined,inputData);

var potentialFuelCosts = [];

for (var i = lowerBound; i <= upperBound; i++) {
    var potentialFuelCost = 0;
    for (var j=0; j < inputData.length; j++) {
        potentialFuelCost += Math.abs(inputData[j] - i);
    }
    potentialFuelCosts.push(potentialFuelCost);
}

// send it!

finalAnswer("cheapest potential fuel cost: "+Math.min.apply(undefined,potentialFuelCosts));
