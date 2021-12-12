// utility shit I'll use every time... probably?
function logMaybe() { if (loggingActivated) console.log.apply(undefined,arguments); }
function finalAnswer(answer) { console.log("****AND THE FINAL ANSWER IS****\n\n" + answer + "\n\n*******************************" ); }


var loggingActivated = false;

var dataDelimiter = "\n";

var inputData = document.querySelector("pre").innerText.trim().split(dataDelimiter);
// var inputData = ["forward 5","down 5","forward 8","up 3","down 8","forward 2"];


// TODAY'S CODE:

var hPos = 0;
var depth = 0;

for (var i=0; i < inputData.length; i++) {
    var command = inputData[i].split(" ")[0];
    var cmdVal = parseInt(inputData[i].split(" ")[1]);

    logMaybe("comand #"+i+" is to \""+command+"\" by "+cmdVal+" units.");

    switch(command) {
        case 'forward':
            hPos+= cmdVal;
            break;
        case 'down':
            depth+= cmdVal;
            break;
        case 'up':
            depth-= cmdVal;
            break;
        default:
            throw new Error("yo wtf this ain't no command I ever heard of...");
            break;
    }
}

logMaybe("current horizontal position: "+hPos);
logMaybe("current depth: "+depth);

// send it!

finalAnswer("horizontal position * depth = "+(hPos*depth));
