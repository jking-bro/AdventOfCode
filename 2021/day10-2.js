// utility shit I'll use every time... probably?
function logMaybe() { if (loggingActivated) console.log.apply(undefined,arguments); }
function finalAnswer(answer) { console.log("****AND THE FINAL ANSWER IS****\n\n" + answer + "\n\n*******************************" ); }


var loggingActivated = false;

var dataDelimiter = "\n";

var inputData = document.querySelector("pre").innerText.trim().split(dataDelimiter);
// var inputData = ["[({(<(())[]>[[{[]{<()<>>", "[(()[<>])]({[<{<<[]>>(", "{([(<{}[<>[]}>{[]{[(<()>", "(((({<>}<{<{<>}{[]{[]{}", "[[<[([]))<([[{}[[()]]]", "[{[{({}]{}}([{[{{{}}([]", "{<[[]]>}<{[{[{[]{()[[[]", "[<(<(<(<{}))><([]([]()","<{([([[(<>()){}]>(<<{{", "<{([{{}}[<[[[<>{}]]]>[]]"];


// TODAY'S CODE:

var errorScoring = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
}

var autocompleteScoring = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
}

var correspondingClosers = {
    '(':')',
    '[':']',
    '{':'}',
    '<':'>'
}

var incompleteLines = [];
var corruptedLines = [];

function processLine(line) {
    var expectedCharQueue = [];
    for (var i=0; i < line.length; i++ ) {
        // if it's an "opener" let's add the corresponding closer to the front of the expected char queue
        if (correspondingClosers.hasOwnProperty(line[i])) {
            expectedCharQueue.unshift(correspondingClosers[line[i]]);
        }
        else {
            //check to see if it's the expected closer, and if so remove it. if not PANIC!
            if (line[i] == expectedCharQueue[0])
                expectedCharQueue.shift();
            else {
                logMaybe("illegal char found! expected: "+expectedCharQueue[0]+" found: "+line[i] + " at: " +i);
                var lineData = {
                    'lineContents': line,
                    'status': 'corrupted',
                    'errorScore': errorScoring[line[i]]
                };

                return lineData;
            }
        }
    }

    logMaybe("no corruption, assuming incomplete... and autocompleting!");

    var autocompleteString = expectedCharQueue.join("");
    var autocompleteScore = 0;

    for (var i = 0; i < autocompleteString.length; i++) {
        autocompleteScore *= 5;
        autocompleteScore += autocompleteScoring[autocompleteString[i]];
    }

    var lineData = {
        'lineContents': line,
        'autocompleteString': autocompleteString,
        'autocompleteScore':autocompleteScore,
        'status': 'incomplete'
    };

    return lineData;
}

for (var i=0; i < inputData.length; i++) {
    logMaybe("processing line: "+i+"...");
    var line = processLine(inputData[i]);

    if (line.status == "corrupted")
        corruptedLines.push(line);
    else if (line.status == "incomplete")
        incompleteLines.push(line);
}

var autocompleteScores = [];

for (var i = 0; i < incompleteLines.length; i++) {
    autocompleteScores.push(incompleteLines[i].autocompleteScore);
}

autocompleteScores.sort(function(a,b){return a-b;});

// send it!

finalAnswer("Total autocomplete score: "+autocompleteScores[Math.floor(autocompleteScores.length/2)]);
