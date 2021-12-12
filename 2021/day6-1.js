// utility shit I'll use every time... probably?
function logMaybe() { if (loggingActivated) console.log.apply(undefined,arguments); }
function finalAnswer(answer) { console.log("****AND THE FINAL ANSWER IS****\n\n" + answer + "\n\n*******************************" ); }


var loggingActivated = false;

var dataDelimiter = ",";

var inputData = document.querySelector("pre").innerText.trim().split(dataDelimiter);
// var inputData = [3,4,3,1,2]


// TODAY'S CODE:

function Fish(initialSpawnTimer) {
    var that = this;

    var daysUntilSpawn = initialSpawnTimer || 8;

    this.ageOneDay = function() {
        var willSpawnToday = (daysUntilSpawn==0);

        if (willSpawnToday)
            daysUntilSpawn = 6;
        else
            daysUntilSpawn--;

        return willSpawnToday;
    }

    return this;
}

var schoolOfFishies = [];
for (var i=0; i < inputData.length; i++) {
    schoolOfFishies.push(new Fish(parseInt(inputData[i])));
}

// count spawns for 80 days
for (var i=0; i < 80; i++) {
    var fishiesToSpawnToday = 0;

    for (var j=0; j < schoolOfFishies.length; j++) {
        if (schoolOfFishies[j].ageOneDay()) //will always age each fish, but only return true on spawn days
            fishiesToSpawnToday++;
    }

    for (var k=0; k < fishiesToSpawnToday; k++) {
        schoolOfFishies.push(new Fish());
    }
}

// send it!

finalAnswer("after 80 days you have this many fishies: " + schoolOfFishies.length);
