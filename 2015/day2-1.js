// utility shit I'll use every time... probably?
function logMaybe() { if (loggingActivated) console.log.apply(undefined,arguments); }
function finalAnswer(answer) { console.log("****AND THE FINAL ANSWER IS****\n\n" + answer + "\n\n*******************************" ); }


var loggingActivated = true;

var dataDelimiter = "\n";// or "," or whatever

var inputData = document.querySelector("pre").innerText.trim().split(dataDelimiter);
// var inputData = [example]


// TODAY'S CODE:

var totalFeetOfWrappingPaperRequired = 0;

for (var i=0; i < inputData.length; i++) {
    // sort the dimensions, so l and w are always smaller than h to cheat the slack req
    var giftDimensions = inputData[i].split("x").sort(function(a,b){return a-b;});
    var l = giftDimensions[0];
    var w = giftDimensions[1];
    var h = giftDimensions[2];

    var feetRequiredToWrapGift = 0;

    feetRequiredToWrapGift += (2*l*w) + (2*w*h) + (2*h*l);
    feetRequiredToWrapGift += l*w; //again, we know that's the smallest side


    totalFeetOfWrappingPaperRequired += feetRequiredToWrapGift;
}

// send it!

finalAnswer("We'll need this many feet of wrapping paper: " + totalFeetOfWrappingPaperRequired);
