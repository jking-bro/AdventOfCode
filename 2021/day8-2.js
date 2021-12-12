// utility shit I'll use every time... probably?
function logMaybe() { if (loggingActivated) console.log.apply(undefined,arguments); }
function finalAnswer(answer) { console.log("****AND THE FINAL ANSWER IS****\n\n" + answer + "\n\n*******************************" ); }


var loggingActivated = false;

var dataDelimiter = "\n";

var inputData = document.querySelector("pre").innerText.trim().split(dataDelimiter);
// var inputData = ["acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf"];
// var inputData = ["be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe","edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc","fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg","fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb","aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea","fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb","dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe","bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef","egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb","gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce"]


// TODAY'S CODE:

// first, process the input data into lines
var lines = [];
for (var i=0; i < inputData.length; i++) {
    var parts = inputData[i].split(" | ");
    var line = {
        inputSignal: parts[0].split(" "),
        outputValueSignals: parts[1].split(" ")
    }

    lines.push(line);
}

// reference stuff
var correctDigitSignals = {
    1: "cf",
    7: "acf",
    4: "bcdf",
    2: "acdeg",
    3: "acdfg",
    5: "abdfg",
    6: "abdefg",
    0: "abcefg",
    9: "abcdfg",
    8: "abcdefg"
}

// the decoding business
function unjumbleSignalString(signalString) {
    var sSArray = signalString.split("");
    sSArray.sort();
    return sSArray.join("");
}

function mapInputSignal(inputSignal) {
    var signalCharMap = {
        'a': null, // X
        'b': null, // X
        'c': null, // X
        'd': null, // X
        'e': null, // X
        'f': null, // X
        'g': null // X
    };

    var signalStringMap = {
        '0': null, // X
        '1': null, // X
        '2': null, // X
        '3': null, // X
        '4': null, // X
        '5': null, // X
        '6': null, // X
        '7': null, // X
        '8': null, // X
        '9': null // X
    }

    var signals5 = [];
    var signals6 = [];

    // loop through our 10 jumpled digit signals and pull out the ones we want
    for (var i=0; i < inputSignal.length; i++) {
        var signalString = unjumbleSignalString(inputSignal[i]);
        if (signalString.length == 2)
            signalStringMap['1'] = signalString;
        else if (signalString.length == 3)
            signalStringMap['7'] = signalString;
        else if (signalString.length == 4)
            signalStringMap['4'] = signalString;
        else if (signalString.length == 5)
            signals5.push(signalString);
        else if (signalString.length == 6)
            signals6.push(signalString);
        else if (signalString.length == 7)
            signalStringMap['8'] = signalString;

    }

    // okay, now we compare the signals for '1' and '7' which will tell us 'a'
    for (var i=0; i < 3; i++) {
        if (signalStringMap['1'].indexOf(signalStringMap['7'][i]) < 0) {
            signalCharMap.a = signalStringMap['7'][i];
            break;
        }
    }

    // now that we know a, we loop through the 5 length things and count
    var signals5InstanceCounter = {
        'a': 0,
        'b': 0,
        'c': 0,
        'd': 0,
        'e': 0,
        'f': 0,
        'g': 0
    };
    for (var i=0; i < signals5.length; i++) {
        for (var j=0; j < 5; j++) {
            signals5InstanceCounter[signals5[i][j]]++;
        }
    }

    // using those counts we can make some deductions...
    // we know how often each segment should show up in the 5 segment digits

    var bePossibilities = [];
    var cfPossibilities = [];
    var dgPossibilities = [];

    for (signal in signals5InstanceCounter) {
        if (signals5InstanceCounter.hasOwnProperty(signal)) {
            if (signals5InstanceCounter[signal] == 1)
                bePossibilities.push(signal);
            else if (signals5InstanceCounter[signal] == 2)
                cfPossibilities.push(signal);
            else if (signals5InstanceCounter[signal] == 3 && signal != signalCharMap.a)
                dgPossibilities.push(signal);
        }
    }

    // '4' uses b but not e, so we can use that to determine which is which of those two
    if (signalStringMap['4'].indexOf(bePossibilities[0]) < 0) {
        signalCharMap.b = bePossibilities[1];
        signalCharMap.e = bePossibilities[0];
    }
    else {
        signalCharMap.b = bePossibilities[0];
        signalCharMap.e = bePossibilities[1];
    }

    // '4' also uses d but not g, so we can use that to determine which is which of those two
    if (signalStringMap['4'].indexOf(dgPossibilities[0]) < 0) {
        signalCharMap.d = dgPossibilities[1];
        signalCharMap.g = dgPossibilities[0];
    }
    else {
        signalCharMap.d = dgPossibilities[0];
        signalCharMap.g = dgPossibilities[1];
    }

    // okee now we looperino through the 6 segment digits and do more deducery
    for (var i=0; i < signals6.length; i++) {
        if (signals6[i].indexOf(signalCharMap.e) < 0) { //only '9' won't contain an 'e'
            signalStringMap['9'] = signals6[i];
        }// only '6' will have a 'd'
        else if (signals6[i].indexOf(signalCharMap.d) >= 0) {
            signalStringMap['6'] = signals6[i];
        }// if it's not a '9' or a '6' then it's '0'
        else {
            signalStringMap['0'] = signals6[i];
        }
    }

    // now that we know that, we can determine c/f ('f' is in '6', but 'c' isn't)
    if (signalStringMap['6'].indexOf(cfPossibilities[0]) < 0) {
        signalCharMap.c = cfPossibilities[0];
        signalCharMap.f = cfPossibilities[1];
    }
    else {
        signalCharMap.c = cfPossibilities[1];
        signalCharMap.f = cfPossibilities[0];
    }

    //okay, now we loop once more through the 5s and plug them in to the string map
    for (var i=0; i < signals5.length; i++) {
        // if it has an 'e' it's '2', otherwise if it has a 'c' it's '3' or a 'b' it's '5'
        if (signals5[i].indexOf(signalCharMap.e) >= 0) {
            signalStringMap['2'] = signals5[i];
        }
        else {
            if (signals5[i].indexOf(signalCharMap.b) >= 0) {
                signalStringMap['5'] = signals5[i];
            }
            else if (signals5[i].indexOf(signalCharMap.c) >= 0) {
                signalStringMap['3'] = signals5[i];
            }
        }
    }

    logMaybe("here be an string map!",signalStringMap);

    return signalStringMap;
}

function decodeOutputValue(signalMap, outputValueSignals) {
    // time to loop through and identify each digit!
    var digits = [];
    for (var i=0; i < outputValueSignals.length; i++) {
        var digit = unjumbleSignalString(outputValueSignals[i]);

        for (signal in signalMap) {
            if (signalMap.hasOwnProperty(signal)) {
                if (signalMap[signal] == digit) {
                    digits.push(signal);
                    break;
                }
            }
        }
    }

    var decodedOutputValue = parseInt(digits.join(""));

    logMaybe("here's an output value: ", decodedOutputValue);

    return decodedOutputValue;
}

// loop through and decode each line (yes I know this could be combined witht the first loop)
var decodedOutputValues = [];
var outputSum = 0;
for (var i=0; i < lines.length; i++) {
    var signalMap = mapInputSignal(lines[i].inputSignal);
    var outputValue = decodeOutputValue(signalMap,lines[i].outputValueSignals);
    decodedOutputValues.push(outputValue);
    outputSum += outputValue;
}

// send it!

finalAnswer("the sum of the decoded output values is: " +outputSum);
