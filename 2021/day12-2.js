// utility shit I'll use every time... probably?
function logMaybe() { if (loggingActivated) console.log.apply(undefined,arguments); }
function finalAnswer(answer) { console.log("****AND THE FINAL ANSWER IS****\n\n" + answer + "\n\n*******************************" ); }


var loggingActivated = false;

var dataDelimiter = "\n";

var inputData = document.querySelector("pre").innerText.trim().split(dataDelimiter);
// var inputData = ["start-A","start-b","A-c","A-b","b-d","A-end","b-end"];
// var inputData = ["dc-end","HN-start","start-kj","dc-start","dc-HN","LN-dc","HN-end","kj-sa","kj-HN","kj-dc"];
// var inputData = ["fs-end","he-DX","fs-he","start-DX","pj-DX","end-zg","zg-sl","zg-pj","pj-he","RW-he","fs-DX","pj-RW","zg-RW","start-pj","he-WI","zg-he","pj-fs","start-RW"];

// TODAY'S CODE:

function Cave(_id) {
    var that = this;

    var id = _id;
    this.getId = function() { return id; };
    var caveSize = (_id[0] == _id[0].toUpperCase())?"big":"small";
    this.getSize = function() { return caveSize; }
    var timesVisited = 0;
    var adjacentCaveIds = [];

    logMaybe("creating cave \""+_id+"\" ("+caveSize+")");

    this.addAdjacentCaveId = function(adjacentCaveId) {
        if (adjacentCaveIds.indexOf(adjacentCaveId)<0)
        adjacentCaveIds.push(adjacentCaveId);
    }

    this.getAdjacentCaveIds = function() {
        return adjacentCaveIds;
    }

    this.visit = function() {
        timesVisited++;
    }

    this.resetVisitCounter = function() {
        timesVisited = 0;
    }

    this.canBeVisited = function() {
        if (caveSize == "big") {
            return true;
        }
        else if (caveSize == "small" && timesVisited == 0) {
            return true;
        }
        else {
            return false;
        }
    }

    return this;
}

var caveSystem = new (function CaveSystem(){
    var that = this;

    var caves = {};

    // inputData processing populates our one and only caveSystem with beautiful caves!
    for (var i=0; i < inputData.length; i++) {
        var connectedCaves = inputData[i].split("-");

        if (!caves.hasOwnProperty(connectedCaves[0])) {
            caves[connectedCaves[0]] = new Cave(connectedCaves[0]);
        }

        if (!caves.hasOwnProperty(connectedCaves[1])) {
            caves[connectedCaves[1]] = new Cave(connectedCaves[1]);
        }

        caves[connectedCaves[0]].addAdjacentCaveId(connectedCaves[1]);
        caves[connectedCaves[1]].addAdjacentCaveId(connectedCaves[0]);
    }

    this.listOfCaves = function() {
        var caveIds = [];
        for (caveId in caves) {
            if (caves.hasOwnProperty(caveId)) {
                caveIds.push(caveId+"("+caves[caveId].getSize()+")");
            }
        }

        return caveIds;
    }

    var freebieSmallCaveRevisitAvailable = true;

    this.resetVisitCounters = function() {
        freebieSmallCaveRevisitAvailable = true;
        for (caveId in caves) {
            if (caves.hasOwnProperty(caveId)) {
                caves[caveId].resetVisitCounter();
            }
        }
    }

    this.goToCave = function(caveId) {
        if (caves[caveId].canBeVisited())
            caves[caveId].visit();
        else if (freebieSmallCaveRevisitAvailable) {
            freebieSmallCaveRevisitAvailable = false;
        }
    }


    this.whereDoWeGoFromHere = function(hereId) {
        var potentialDestinations = caves[hereId].getAdjacentCaveIds();
        var validDestinations = [];

        for (var i = 0; i < potentialDestinations.length; i++) {
            if (caves[potentialDestinations[i]].canBeVisited()) {
                validDestinations.push(potentialDestinations[i]);
            }
            else if (freebieSmallCaveRevisitAvailable &&
                        ["start","end"].indexOf(potentialDestinations[i]) < 0) {
                validDestinations.push(potentialDestinations[i]);
            }
        }

        return validDestinations;
    }

    return this;
})();

// of course, we need to explore in our vessel!
var submarine = new (function Submarine(){
    var that = this;

    var pathsToExplore = [["start"]]; //first "path" is just to have started at start lulz
    var validatedPaths = [];
    this.getValidatedPathsCount = function() { return validatedPaths.length; };

    this.exploreAllPaths = function() {
        while (pathsToExplore.length > 0) {
            var currentPath = pathsToExplore[0];

            caveSystem.resetVisitCounters();
            for (var i = 0; i < currentPath.length; i++) {
                caveSystem.goToCave(currentPath[i]);
            }

            var potentialDestinations = caveSystem.whereDoWeGoFromHere(currentPath[currentPath.length-1]);

            for (var i = 0; i < potentialDestinations.length; i++) {
                var potentialNewPath = currentPath.concat([potentialDestinations[i]]);
                if (potentialDestinations[i] == "end") {
                    logMaybe("found valid path: " + potentialNewPath.join());
                    validatedPaths.push(potentialNewPath);
                }
                else {
                    pathsToExplore.push(potentialNewPath);
                }
            }

            pathsToExplore.shift();
        }
    }

    return this;
})();

// send it!

console.log("warning, this one might take a minute or two...");
submarine.exploreAllPaths();
finalAnswer("Final count of valid paths: " + submarine.getValidatedPathsCount());
