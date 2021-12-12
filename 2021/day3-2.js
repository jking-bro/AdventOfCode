// utility shit I'll use every time... probably?
function logMaybe() { if (loggingActivated) console.log.apply(undefined,arguments); }
function finalAnswer(answer) { console.log("****AND THE FINAL ANSWER IS****\n\n" + answer + "\n\n*******************************" ); }


var loggingActivated = false;

var dataDelimiter = "\n";

var inputData = document.querySelector("pre").innerText.trim().split(dataDelimiter);
// var inputData = [example]


// TODAY'S CODE:

function getMostAbundantBitAtIndex(binariesArray, index) {
    var zeroCount = 0;
    var oneCount = 0;
    for (var i=0; i < binariesArray.length; i++) {
        if (binariesArray[i][index] == "0")
            zeroCount++;
        else
            oneCount++;
    }

    // we're returning one if they are the same, so it's "biased" toward 1 by default
    return (zeroCount>oneCount)?"0":"1";
}


function filterBinaries(binariesArray, index, val) {
    var results = {
        matched: [],
        unmatched: []
    }

    for (var i=0; i < binariesArray.length; i++) {
        if (binariesArray[i][index] == val)
            results.matched.push(binariesArray[i]);
        else
            results.unmatched.push(binariesArray[i]);
    }

    return results;
}

var mostAbundantFirstBit = getMostAbundantBitAtIndex(inputData, 0);

var filterResults = filterBinaries(inputData, 0, mostAbundantFirstBit);

var oxygenPosibilities = filterResults.matched;
var carbonPosibilities = filterResults.unmatched;

var currentIndex = 0;
while (oxygenPosibilities.length > 1) {
    currentIndex++;
    var mostAbundantBitAtCurrentIndex = getMostAbundantBitAtIndex(oxygenPosibilities, currentIndex);
    oxygenPosibilities = filterBinaries(oxygenPosibilities, currentIndex, mostAbundantBitAtCurrentIndex).matched;
}
currentIndex = 0;
while (carbonPosibilities.length > 1) {
    currentIndex++;
    var mostAbundantBitAtCurrentIndex = getMostAbundantBitAtIndex(carbonPosibilities, currentIndex);
    carbonPosibilities = filterBinaries(carbonPosibilities, currentIndex, mostAbundantBitAtCurrentIndex).unmatched;
}

var oxygenGeneratorRating = parseInt(oxygenPosibilities[0], 2);
var c02ScrubberRating = parseInt(carbonPosibilities[0], 2);

var lifeSupportRating = (oxygenGeneratorRating*c02ScrubberRating);

// send it!

finalAnswer("power consumption = "+lifeSupportRating);
