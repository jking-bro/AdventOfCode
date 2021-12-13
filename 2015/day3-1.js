// utility shit I'll use every time... probably?
function logMaybe() { if (loggingActivated) console.log.apply(undefined,arguments); }
function finalAnswer(answer) { console.log("****AND THE FINAL ANSWER IS****\n\n" + answer + "\n\n*******************************" ); }


var loggingActivated = true;

var dataDelimiter = "";

var inputData = document.querySelector("pre").innerText.trim().split(dataDelimiter);
// var inputData = [example]


// TODAY'S CODE:

var housesGrid = {};

var santaPositionX = 0;
var santaPositionY = 0;
var robitPositionX = 0;
var robitPositionY = 0;

for (var i=0; i < inputData.length; i++) {
    //first, deliver present to the house Santa is at
    var houseAddress = "x"+santaPositionX+"y"+santaPositionY;
    if (!housesGrid.hasOwnProperty(houseAddress))
        housesGrid[houseAddress] = 1;
    else
        housesGrid[houseAddress]++;
    //and the house Robit is at
    houseAddress = "x"+robitPositionX+"y"+robitPositionY;
    if (!housesGrid.hasOwnProperty(houseAddress))
        housesGrid[houseAddress] = 1;
    else
        housesGrid[houseAddress]++;


    //then get movin'!
    if (i%2) {
        if (inputData[i] == "<")
            santaPositionX--;
        else if (inputData[i] == ">")
            santaPositionX++;
        else if (inputData[i] == "^")
            santaPositionY++;
        else if (inputData[i] == "v")
            santaPositionY--;
    }
    else {
        if (inputData[i] == "<")
            robitPositionX--;
        else if (inputData[i] == ">")
            robitPositionX++;
        else if (inputData[i] == "^")
            robitPositionY++;
        else if (inputData[i] == "v")
            robitPositionY--;
    }
}

var housesThatGotPresents = Object.keys(housesGrid).length;

// send it!

finalAnswer("This many houses got presents: "+housesThatGotPresents);
