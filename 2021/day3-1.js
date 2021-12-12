// utility shit I'll use every time... probably?
function logMaybe() { if (loggingActivated) console.log.apply(undefined,arguments); }
function finalAnswer(answer) { console.log("****AND THE FINAL ANSWER IS****\n\n" + answer + "\n\n*******************************" ); }


var loggingActivated = false;

var dataDelimiter = "\n";

var inputData = document.querySelector("pre").innerText.trim().split(dataDelimiter);
// var inputData = [example]


// TODAY'S CODE:

var gammaRateBinary = [];
var epsilonRateBinary = [];

// okay, 12 digit binary number is what we're after, so we'll loop once for each digit...
for (var i=0; i < 12; i++) {
    //now inside this loop, we loop again for all of our data values to find the gamma/epsilon digits
    var zeroCount = 0;
    var oneCount = 0;

    for (var j=0; j < inputData.length; j++) {
        if (inputData[j][i] == "0")
            zeroCount++;
        else
            oneCount++;
    }

    logMaybe("at digit \""+i+"\" we found:");
    logMaybe("** zeroes: "+zeroCount+", ones: "+oneCount);

    if (zeroCount > oneCount) {
        gammaRateBinary.push("0");
        epsilonRateBinary.push("1");
    }
    else {
        gammaRateBinary.push("1");
        epsilonRateBinary.push("0");
    }
}
gammaRateBinary = gammaRateBinary.join("");
epsilonRateBinary = epsilonRateBinary.join("");

logMaybe("gamma rate (binary): "+gammaRateBinary+", epsilon rate (binary): "+epsilonRateBinary);

var gammaRate = parseInt(gammaRateBinary,2);
var epsilonRate = parseInt(epsilonRateBinary,2);

logMaybe("gamma rate: "+gammaRate+", epsilon rate: "+epsilonRate);

// send it!

finalAnswer("power consumption = "+(gammaRate*epsilonRate));
