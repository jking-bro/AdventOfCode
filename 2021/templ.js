// utility shit I'll use every time... probably?
function logMaybe() { if (loggingActivated) console.log.apply(undefined,arguments); }
function finalAnswer(answer) { console.log("****AND THE FINAL ANSWER IS****\n\n" + answer + "\n\n*******************************" ); }


var loggingActivated = true;

var dataDelimiter = "\n";// or "," or whatever

var inputData = document.querySelector("pre").innerText.trim().split(dataDelimiter);
// var inputData = [example]


// TODAY'S CODE:

for (var i=0; i < inputData.length; i++) {
    //idk, do stuff with the input data?
}

logMaybe(inputData);

// send it!

finalAnswer("I DON'T KNOW YET!");
