// utility shit I'll use every time... probably?
function logMaybe() { if (loggingActivated) console.log.apply(undefined,arguments); }
function finalAnswer(answer) { console.log("****AND THE FINAL ANSWER IS****\n\n" + answer + "\n\n*******************************" ); }


var loggingActivated = false;

var dataDelimiter = "\n";

var inputData = document.querySelector("pre").innerText.trim().split(dataDelimiter);
// var inputData = ["5483143223", "2745854711", "5264556173", "6141336146", "6357385478", "4167524645", "2176841721", "6882881134", "4846848554", "5283751526"];


// TODAY'S CODE:

function Octopus(_id, _startingEnergy, flashCounterHook) {
    var me = this;

    var _id = _id;
    var energy = _startingEnergy;
    var status = "energizing";
    var neighborpussIds = [];
    var flashEventListeners = [flashCounterHook];

    this.getId = function() { return _id; }
    this.getEnergy = function(){ return energy; }; //should be unnecessary?

    this.meet = function(octopus) {
        var newNeighborId = octopus.getId();
        if (neighborpussIds.indexOf(newNeighborId)<0) {
            neighborpussIds.push(newNeighborId);
            octopus.meet(me);
            flashEventListeners.push(octopus.addEnergy);
        }
    }

    function energizeNeighborpusses() { // (andTickCounter)
        // logMaybe("octopus is flashing! id: "+_id);
        for (var i = 0; i < flashEventListeners.length; i++) {
            flashEventListeners[i]();
        }
    }

    this.addEnergy = function() {
        energy++;

        if (energy > 9 && status != "flashing") {
            status = "flashing";
            energizeNeighborpusses();
        }
    };

    this.relaxIfFlashing = function() {
        if (status == "flashing" && energy > 9) {
            status = "energizing";
            energy = 0;
        }
    }

    return this;
}

var octopusFarm = {};
var flashCounter =  0;

for (var i=0; i < inputData.length; i++) {
    var row = inputData[i].split("").map(function(v){return parseInt(v);});

    for (var j = 0; j < row.length; j++) {
        var coordString = "x"+j+"y"+i;
        octopusFarm[coordString] = new Octopus(coordString, row[j], function() { flashCounter++; });

        //if there are any octopusses to the left of, or above (including diags), introduce them
        if (j>0) {
            var leftPussCoordString = "x"+(j-1)+"y"+i;
            octopusFarm[coordString].meet(octopusFarm[leftPussCoordString]);
        }

        if (i>0) {
            if (j>0) {
                var topLeftPussCoordString = "x"+(j-1)+"y"+(i-1);
                octopusFarm[coordString].meet(octopusFarm[topLeftPussCoordString]);
            }

            var topPussCoordString = "x"+j+"y"+(i-1);
            octopusFarm[coordString].meet(octopusFarm[topPussCoordString]);

            if (j < (row.length-1)) {
                var topRightPussCoordString = "x"+(j+1)+"y"+(i-1);
                octopusFarm[coordString].meet(octopusFarm[topRightPussCoordString]);
            }
        }
    }
}

var firstFullFlashStep = null;
var stepCount = 0;
function step() {
    stepCount++;
    var totalEnergy = 0;

    for (octopus in octopusFarm) {
        if (octopusFarm.hasOwnProperty(octopus)) {
            octopusFarm[octopus].addEnergy();
        }
    }

    for (octopus in octopusFarm) {
        if (octopusFarm.hasOwnProperty(octopus)) {
            octopusFarm[octopus].relaxIfFlashing();

            totalEnergy += octopusFarm[octopus].getEnergy();
        }
    }

    if (totalEnergy == 0)
        firstFullFlashStep = stepCount;

    printEnergyReport();
}

function printEnergyReport() {
    var report = "";
    for (var i=0; i < inputData.length; i++) {
        var rowString = "";
        for (var j = 0; j < inputData[i].length; j++) {
            var coordString = "x"+j+"y"+i;
            rowString = rowString + octopusFarm[coordString].getEnergy().toString();
        }

        report = report + rowString + "\n";
    }

    logMaybe(report.trim());
}

// send it!

while(!firstFullFlashStep) {
    step();
}
finalAnswer("Full flash happened on step: "+firstFullFlashStep);
