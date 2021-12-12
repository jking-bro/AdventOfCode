// utility shit I'll use every time... probably?
function logMaybe() { if (loggingActivated) console.log.apply(undefined,arguments); }
function finalAnswer(answer) { console.log("****AND THE FINAL ANSWER IS****\n\n" + answer + "\n\n*******************************" ); }


var loggingActivated = false;

var dataDelimiter = "\n\n";

// way more custom sanitization of input data to do here...
var _inputData = document.querySelector("pre").innerText.trim().split(dataDelimiter);
var inputData = {
    numbersToDraw: _inputData[0].split(","),
    boards: []
};

for (var i=1; i < _inputData.length; i++) {
    var board = {
        cells: []
    };

    var rows = _inputData[i].trim().split("\n");
    for (var j=0; j < rows.length; j++) {
        rows[j] = rows[j].trim().replaceAll("  "," ");
        var cells = rows[j].split(" ");
        for (var k=0; k < cells.length; k++) {
            var cell = {
                val: parseInt(cells[k]),
                row: j,
                column: "ABCDE"[k],
                numberCalled: false
            }
            board.cells.push(cell);
        }
    }

    inputData.boards.push(board);
}


// TODAY'S CODE:

function checkBoardForVictory(board) {
    var victory = false;

    //first, check rows:
    for (var i=0; i < 5; i++) {
        var allCalled = true;
        //cell by cell, are they all called?
        for (var j=0; j < 5; j++) {
            if (!board.cells[(i*5)+j].numberCalled)
                allCalled = false;
        }

        if (allCalled == true)
            return true;
    }

    //failing that, check columns:

    for (var i=0; i < 5; i++) {
        var allCalled = true;
        //cell by cell, are they all called?
        for (var j=0; j < 5; j++) {
            if (!board.cells[i+(j*5)].numberCalled)
                allCalled = false;
        }

        if (allCalled == true)
            return true;
    }

    return false;
}

function getBoardScore(boardIndex) {
    var boardScore = 0;

    for (var i=0; i < inputData.boards[boardIndex].cells.length; i++) {
        if (!inputData.boards[boardIndex].cells[i].numberCalled) {
            boardScore += inputData.boards[boardIndex].cells[i].val;
        }
    }

    return boardScore;
}

//okay, I think we're set up... now time to call those numbers!

var winnerWinner = false;
var winningNumber, boardScore;
for (var i=0; i < inputData.numbersToDraw.length; i++) {
    var currentlyDrawnNumber = parseInt(inputData.numbersToDraw[i]);

    logMaybe("***************************************************");
    logMaybe("NEW NUMER DRAWN! number: "+currentlyDrawnNumber);
    logMaybe("***************************************************");

    for (var j=0; j < inputData.boards.length; j++) {
        // logMaybe("--checking board "+j+" for matches!",inputData.boards[j]);
        for (var k=0; k < 25; k++) {
            // logMaybe("----checking cell "+k+" for matches!",inputData.boards[j].cells[k]);
            if (inputData.boards[j].cells[k].val == currentlyDrawnNumber) {
                inputData.boards[j].cells[k].numberCalled = true;
                logMaybe("NUMBER MATCH! board: "+j+", cell: ",inputData.boards[j].cells[k]);

                if (i>=5) {
                    //CHECK BOARD FOR VICTORY!
                    winnerWinner = checkBoardForVictory(inputData.boards[j]);
                    if (winnerWinner) {
                        logMaybe("WE HAVE A CHICKEN DINNER, YO!!!!");
                        winningNumber = inputData.numbersToDraw[i];
                        boardScore = getBoardScore(j);
                        break;
                    }
                }
            }
        }
        if (winnerWinner) { break; }
    }
    if (winnerWinner) { break; }
}

// send it!

finalAnswer("the final score is: "+(winningNumber*boardScore));
