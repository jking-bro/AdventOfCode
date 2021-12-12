// utility shit I'll use every time... probably?
function logMaybe() { if (loggingActivated) console.log.apply(undefined,arguments); }
function finalAnswer(answer) { console.log("****AND THE FINAL ANSWER IS****\n\n" + answer + "\n\n*******************************" ); }


var loggingActivated = false;

var dataDelimiter = ",";

var inputData = document.querySelector("pre").innerText.trim().split(dataDelimiter);
// var inputData = [3,4,3,1,2]


// TODAY'S CODE:

function FishSchool() {
    var that = this;

    // make an array where each value is the number of fish that have the index many days until spawn :P
    var fishCounts = [0,0,0,0,0,0,0,0,0];

    this.addFish = function(daysUntilSpawn) {
        fishCounts[daysUntilSpawn]++;
    }

    // Happy Progress Day!
    this.progressDay = function() {
        var newFishCounts = fishCounts.slice(1);
        newFishCounts.push(fishCounts[0]);
        newFishCounts[6] += fishCounts[0];

        fishCounts = newFishCounts;
    }

    this.getTotalFishCount = function() {
        var fishCount = 0;

        for (var i=0; i < fishCounts.length; i++)
            fishCount += fishCounts[i];

        return fishCount;
    }

    return this;
}

var fishSchool = new FishSchool();

for (var i=0; i < inputData.length; i++) {
    fishSchool.addFish(parseInt(inputData[i]));
}

// count spawns for 256 days
for (var i=0; i < 256; i++) {
    fishSchool.progressDay();
}

// send it!

finalAnswer("after 256 days you have this many fishies: " + fishSchool.getTotalFishCount());
