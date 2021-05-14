

const allBtn = document.querySelectorAll('.box')
const startBtn = document.querySelector('#start_button');
const restartBtn = document.querySelector('#restart_button')
const moveTurn = document.querySelector('#move_turn');
const gameWinner = document.querySelector('#game_winner');
const computerScoreP = document.querySelector('#computer_score');
const humanScoreP = document.querySelector('#human_score');
const box1 = document.querySelector('#box1');
const box2 = document.querySelector('#box2');
const box3 = document.querySelector('#box3');
const box4 = document.querySelector('#box4');
const box5 = document.querySelector('#box5');
const box6 = document.querySelector('#box6');
const box7 = document.querySelector('#box7');
const box8 = document.querySelector('#box8');
const box9 = document.querySelector('#box9');
const winCombo = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
];

let playing = false;
let playerMove = '';
let gameCounter = 0;
let computerPiece = '';
let humanPiece = '';
let winningPiece = '';
let computerScore = 0;
let humanScore = 0;

startBtn.style.display = "none";
moveTurn.style.display = "none";

function checkBoardForWinner() {
    let result = false;
    //row check
    if(box1.textContent.trim() != '' ||
        box2.textContent.trim() != '' ||
        box3.textContent.trim() != '') {
        if((box1.textContent == box2.textContent) && (box2.textContent == box3.textContent)) {
            result = true;
            winningPiece = box1.textContent;
        }
    }
    if(box4.textContent.trim() != '' ||
        box5.textContent.trim() != '' ||
        box6.textContent.trim() != '') {
        if((box4.textContent == box5.textContent) && (box5.textContent == box6.textContent)) {
            result = true;
            winningPiece = box4.textContent;
        }
    }
    if(box7.textContent.trim() != '' ||
        box8.textContent.trim() != '' ||
        box9.textContent.trim() != '') {
        if((box7.textContent == box8.textContent) && (box8.textContent == box9.textContent)) {
            result = true;
            winningPiece = box7.textContent;
        }
    }
    //column check
    if(box1.textContent.trim() != '' ||
        box4.textContent.trim() != '' ||
        box7.textContent.trim() != '') {
        if((box1.textContent == box4.textContent) && (box4.textContent == box7.textContent)) {
            result = true;
            winningPiece = box1.textContent;
        }
    }
    if(box2.textContent.trim() != '' ||
        box5.textContent.trim() != '' ||
        box8.textContent.trim() != '') {
        if((box2.textContent == box5.textContent) && (box5.textContent == box8.textContent)) {
            result = true;
            winningPiece = box2.textContent;
        }
    }
    if(box3.textContent.trim() != '' ||
        box6.textContent.trim() != '' ||
        box9.textContent.trim() != '') {
        if((box3.textContent == box6.textContent) && (box6.textContent == box9.textContent)) {
            result = true;
            winningPiece = box3.textContent;
        }
    }
    //diagonal check
    if(box1.textContent.trim() != '' ||
        box5.textContent.trim() != '' ||
        box9.textContent.trim() != '') {
        if((box1.textContent == box5.textContent) && (box5.textContent == box9.textContent)) {
            result = true;
            winningPiece = box1.textContent;
        }
    }
    if(box3.textContent.trim() != '' ||
        box5.textContent.trim() != '' ||
        box7.textContent.trim() != '') {
        if((box3.textContent == box5.textContent) && (box5.textContent == box7.textContent)) {
            result = true;
            winningPiece = box3.textContent;
        }
    }
    return result;
}

function checkBoardSpace() {
    let result = true;
    allBtn.forEach(function(btn) {
        if(btn.textContent.trim() == '') {
            result = false;
        }
    });
    return result;
}

function resetButtons() {
    allBtn.forEach(function(btn) {
        //clear button text
        btn.textContent = '';
    });
    playing = false;
    playerMove = '';
    computerPiece = '';
    humanPiece = '';
    winningPiece = '';
    gameCounter++;
}

function checkBoardStatus() {
    //check if there is a winner
    if(checkBoardForWinner()) {
        if(winningPiece == computerPiece) {

            gameWinner.textContent = 'Computer Wins!';
            computerScore++
            computerScoreP.textContent = 'Computer: '+computerScore;
        }
        else {
            gameWinner.textContent = 'Human Wins!';
            humanScore++
            humanScoreP.textContent = 'Human: ' + humanScore;
        }
        playing = false;
    }
    else {
        //check if all boxes are occupied
        if(checkBoardSpace()) {
            // alert('Its a Draw!');
            gameWinner.textContent = "It's a Draw!";
            playing = false;
        }
        else {
            if(moveTurn.value == 'Computer') {
                moveTurn.value = 'Human';
            }
            else {
                moveTurn.value = 'Computer';
                moveTurn.dispatchEvent(new Event('change'));
            }
        }
    }
}

//assign event to buttons
allBtn.forEach(function(btn) {
    btn.addEventListener('click', function() {
        if(playing) {
            if(btn.textContent.trim() == '') {
                if(moveTurn.value == 'Computer') {
                    btn.textContent = computerPiece;
                }
                else if(moveTurn.value == 'Human') {
                    btn.textContent = humanPiece;
                }

                checkBoardStatus();
            }
        }
    });
});

//initialize scores
computerScoreP.textContent = 'Computer: '+computerScore;
humanScoreP.textContent = 'Human: '+humanScore;

resetButtons();

restartBtn.addEventListener('click', function() {
    gameCounter++
    startGame();
});

startBtn.addEventListener('click', function() {
    resetButtons();
    playing = true;
    gameWinner.textContent = '';
    if(gameCounter % 2 == 0) {
        moveTurn.value = 'Computer';
        computerPiece = 'X';
        humanPiece = 'O';
        moveTurn.dispatchEvent(new Event('change'));
    }
    else {
        moveTurn.value = 'Human';
        humanPiece = 'X';
        computerPiece = 'O';
    }
})

function startGame() {
    startBtn.dispatchEvent(new Event('click'));
}

startGame();

moveTurn.addEventListener('change', function(e) {
    if(playing) {
        if(this.value == 'Computer') {
            //determine computer's best move
            let computerMove = 0;

            //check if there is a possible win
            let arrayofComputerMoves = [];
            btnCount = 1;
            allBtn.forEach(function(btn) {
                if(btn.textContent.trim() == computerPiece) {
                    arrayofComputerMoves.push(btnCount);
                }
                btnCount++;
            });
            //compute best move
            for(let i=0; i<winCombo.length; i++) {
                let points = 0;
                for(let j=0; j<arrayofComputerMoves.length; j++) {
                    if(winCombo[i].includes(arrayofComputerMoves[j])) {
                        points++;
                    }
                }
                if(points>1) {
                    if(computerMove == 0) {
                        for(let k=0; k<winCombo[i].length; k++) {
                            if(!arrayofComputerMoves.includes(winCombo[i][k])) {
                                if(
                                    (winCombo[i][k] == 1 && box1.textContent.trim() == '') ||
                                    (winCombo[i][k] == 2 && box2.textContent.trim() == '') ||
                                    (winCombo[i][k] == 3 && box3.textContent.trim() == '') ||
                                    (winCombo[i][k] == 4 && box4.textContent.trim() == '') ||
                                    (winCombo[i][k] == 5 && box5.textContent.trim() == '') ||
                                    (winCombo[i][k] == 6 && box6.textContent.trim() == '') ||
                                    (winCombo[i][k] == 7 && box7.textContent.trim() == '') ||
                                    (winCombo[i][k] == 8 && box8.textContent.trim() == '') ||
                                    (winCombo[i][k] == 9 && box9.textContent.trim() == '')
                                ){
                                    computerMove = winCombo[i][k];
                                }
                            }
                        }
                    }
                }
            }
            //defense
            if(computerMove == 0) {
                let arrayofHumanMoves = [];
                let btnCount = 1;
                allBtn.forEach(function(btn) {
                    if(btn.textContent.trim() == humanPiece) {
                        arrayofHumanMoves.push(btnCount);
                    }
                    btnCount++;
                });
                //check human moves from winning combo
                for(let i=0; i<winCombo.length; i++) {
                    let points = 0;
                    for(let j=0; j<arrayofHumanMoves.length; j++) {
                        if(winCombo[i].includes(arrayofHumanMoves[j])) {
                            points++;
                        }
                    }
                    //if 2 slots occupied, possible win by human
                    if(points>1) {
                        if(computerMove == 0) {
                            for(let k=0; k<winCombo[i].length; k++) {
                                //check which slot is NOT in human moves, that will be the computer move
                                if(!arrayofHumanMoves.includes(winCombo[i][k])) {
                                    if(
                                        (winCombo[i][k] == 1 && box1.textContent.trim() == '') ||
                                        (winCombo[i][k] == 2 && box2.textContent.trim() == '') ||
                                        (winCombo[i][k] == 3 && box3.textContent.trim() == '') ||
                                        (winCombo[i][k] == 4 && box4.textContent.trim() == '') ||
                                        (winCombo[i][k] == 5 && box5.textContent.trim() == '') ||
                                        (winCombo[i][k] == 6 && box6.textContent.trim() == '') ||
                                        (winCombo[i][k] == 7 && box7.textContent.trim() == '') ||
                                        (winCombo[i][k] == 8 && box8.textContent.trim() == '') ||
                                        (winCombo[i][k] == 9 && box9.textContent.trim() == '')
                                    ){
                                        computerMove = winCombo[i][k];
                                    }
                                }
                            }
                        }
                    }
                }
            }
            //if no need to defense, then its offense
            if(computerMove == 0) {
                let arrayofComputerMoves = [];
                btnCount = 1;
                allBtn.forEach(function(btn) {
                    if(btn.textContent.trim() == computerPiece) {
                        arrayofComputerMoves.push(btnCount);
                    }
                    btnCount++;
                });
                if(arrayofComputerMoves.length == 0) {
                    if(box5.textContent.trim() == '') {
                        computerMove = 5;
                    }
                }
                else {
                    //remove wincombo that already occupies 2 slots
                    let availableWinCombo = [];
                    for(let i=0; i<winCombo.length; i++) {
                        let points = 0;
                        for(let j=0; j<winCombo[i].length; j++) {
                            if(
                                (winCombo[i][j] == 1 && box1.textContent.trim() == '') ||
                                (winCombo[i][j] == 2 && box2.textContent.trim() == '') ||
                                (winCombo[i][j] == 3 && box3.textContent.trim() == '') ||
                                (winCombo[i][j] == 4 && box4.textContent.trim() == '') ||
                                (winCombo[i][j] == 5 && box5.textContent.trim() == '') ||
                                (winCombo[i][j] == 6 && box6.textContent.trim() == '') ||
                                (winCombo[i][j] == 7 && box7.textContent.trim() == '') ||
                                (winCombo[i][j] == 8 && box8.textContent.trim() == '') ||
                                (winCombo[i][j] == 9 && box9.textContent.trim() == '')
                            ) {
                                points++
                            }
                        }
                        if(points > 1) {
                            availableWinCombo.push(winCombo[i]);
                        }
                    }
                    //compute best move
                    for(let i=0; i<availableWinCombo.length; i++) {
                        let points = 0;
                        for(let j=0; j<arrayofComputerMoves.length; j++) {
                            if(availableWinCombo[i].includes(arrayofComputerMoves[j])) {
                                points++;
                            }
                        }
                        if(points>=1) {
                            if(computerMove == 0) {
                                for(let k=0; k<availableWinCombo[i].length; k++) {
                                    if(!arrayofComputerMoves.includes(availableWinCombo[i][k])) {
                                        if(
                                            (availableWinCombo[i][k] == 1 && box1.textContent.trim() == '') ||
                                            (availableWinCombo[i][k] == 2 && box2.textContent.trim() == '') ||
                                            (availableWinCombo[i][k] == 3 && box3.textContent.trim() == '') ||
                                            (availableWinCombo[i][k] == 4 && box4.textContent.trim() == '') ||
                                            (availableWinCombo[i][k] == 5 && box5.textContent.trim() == '') ||
                                            (availableWinCombo[i][k] == 6 && box6.textContent.trim() == '') ||
                                            (availableWinCombo[i][k] == 7 && box7.textContent.trim() == '') ||
                                            (availableWinCombo[i][k] == 8 && box8.textContent.trim() == '') ||
                                            (availableWinCombo[i][k] == 9 && box9.textContent.trim() == '')
                                        ){
                                            computerMove = availableWinCombo[i][k];
                                        }
                                    }
                                }
                            }
                        }
                    }

                }
            }
            if(computerMove == 0) {
                //get available board spaces
                let arrayofBlankSpaces = []
                let btnCount = 1;
                allBtn.forEach(function(btn) {
                    if(btn.textContent.trim() == '') {
                        arrayofBlankSpaces.push(btnCount);
                    }
                    btnCount++;
                });
                let random_number = -1;
                random_number = Math.floor(Math.random() * arrayofBlankSpaces.length);
                computerMove = arrayofBlankSpaces[random_number];
            }

            if(computerMove > 0) {
                if(computerMove == 1) {box1.textContent = computerPiece }
                else if (computerMove == 2) {box2.textContent = computerPiece }
                else if (computerMove == 3) {box3.textContent = computerPiece }
                else if (computerMove == 4) {box4.textContent = computerPiece }
                else if (computerMove == 5) {box5.textContent = computerPiece }
                else if (computerMove == 6) {box6.textContent = computerPiece }
                else if (computerMove == 7) {box7.textContent = computerPiece }
                else if (computerMove == 8) {box8.textContent = computerPiece }
                else if (computerMove == 9) {box9.textContent = computerPiece }

                checkBoardStatus();
            }

        }
    }
});
