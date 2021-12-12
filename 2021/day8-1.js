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
        outputValue: parts[1].split(" ")
    }

    lines.push(line);
}

// yes I know this logic could also be done in that initial loop
// but, I'm doing it like this for READABILITY, okay?!
var instancesOfDigitsWeLike = 0;
for (var i=0; i < lines.length; i++) {
    var oV = lines[i].outputValue;

    for (var j=0; j < oV.length; j++) {
        if (oV[j].length == '2' ||
                oV[j].length == '3' ||
                oV[j].length == '4' ||
                oV[j].length == '7') {
            instancesOfDigitsWeLike++;
        }
    }
}

// send it!

finalAnswer("We see a 1,4,7, or 8 this many times, g: " + instancesOfDigitsWeLike);
