// utility shit I'll use every time... probably?
function logMaybe() { if (loggingActivated) console.log.apply(undefined,arguments); }
function finalAnswer(answer) { console.log("****AND THE FINAL ANSWER IS****\n\n" + answer + "\n\n*******************************" ); }


var loggingActivated = true;

var dataDelimiter = "";// or "," or whatever

var inputData = document.querySelector("pre").innerText.trim().split(dataDelimiter);
// var inputData = [example]


// TODAY'S CODE:

var floorSantaIsOn = 0;

for (var i=0; i < inputData.length; i++) {
    if (inputData[i] == "(")
        floorSantaIsOn++;
    else if (inputData[i] == ")")
        floorSantaIsOn--;
}


// send it!

finalAnswer("Santa be on floor: " + floorSantaIsOn);
