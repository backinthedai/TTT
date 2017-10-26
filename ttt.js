
let humanScored = document.getElementById("human");
let aiScored = document.getElementById("ai");
let drawScored = document.getElementById("draw");

let btnParent = document.getElementById("btn-parent");
btnParent.addEventListener("click", main, false);

let board = [
    { 'b0': "" }, { 'b1': "" }, { 'b2': "" },
    { 'b3': "" }, { 'b4': "" }, { 'b5': "" },
    { 'b6': "" }, { 'b7': "" }, { 'b8': "" }
];

let tmpBoard = board.slice(0); //make a copy for ai
let availSports = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let delay;  
let waitTime = 2000;

const boardLen = 9;

function main(e) {
    markBoard(e.target.id);
}

const markBoard = (id) => {

    if (human(id)) {
        console.log("Human is Winner");
        delay = setTimeout(restartGame, waitTime);
        let h = +humanScored.innerHTML;
        humanScored.innerHTML = `${h+1}`;
    }
    else if (ai()) {
        console.log("AI is Winner");
        delay = setTimeout(restartGame, waitTime);
        let a = +aiScored.innerHTML;
        aiScored.innerHTML = `${a+1}`;
    }
    else{
        if (availSports.length === 0) {
            console.log("Draw");
            delay = setTimeout(restartGame, waitTime);
            let d = +drawScored.innerHTML;
            drawScored.innerHTML = `${d+1}`;
        }
    }   
}

const human = (id) => {
    if (document.getElementById(id).innerHTML === "") {
        document.getElementById(id).innerHTML = "x";
        updateBoard(id);
        return calculate();
    }
    return false;
}

const ai = () => {
    let idx = availSports[Math.floor(Math.random() * availSports.length)];
    let id = 'b'.concat(idx);

    if (availSports.length !== 0) {
        if (document.getElementById(id).innerHTML === "") {
            document.getElementById(id).innerHTML = "O";
            updateBoard(id);
            return calculate();
        }
    }  
}

const updateBoard = (id) => {
    board.forEach(function (eachObj) {
        for (key in eachObj) {
            if (eachObj.hasOwnProperty(id)) {
                eachObj[key] = document.getElementById(id).innerHTML;
                let idx = tmpBoard.indexOf(eachObj);
                tmpBoard.splice(idx, 1);
                availSports.splice(idx, 1);
            }
        }
    });
}

const restartGame = () => {
    //end the game and restart the game
    board = [
        { 'b0': "" }, { 'b1': "" }, { 'b2': "" },
        { 'b3': "" }, { 'b4': "" }, { 'b5': "" },
        { 'b6': "" }, { 'b7': "" }, { 'b8': "" }
    ];
    tmpBoard = board.slice(0); //make a copy for ai
    availSports = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    for (let i = 0; i < 9; i++) {
        document.getElementById(`b${i}`).innerHTML = "";
        document.getElementById(`b${i}`).style.color = '#f5deb3';
    }

    clearTimeout(delay);
}

const calculate = () => {
    if (board[0]['b0'] === board[1]['b1'] && board[1]['b1'] === board[2]['b2'] && board[1]['b1'] !== "") {
        setWinnerColor([0, 1, 2]);
        return true;
    }
    if (board[3]['b3'] === board[4]['b4'] && board[4]['b4'] === board[5]['b5'] && board[4]['b4'] !== "") {
        setWinnerColor([3, 4, 5]);
        return true;
    }
    if (board[6]['b6'] === board[7]['b7'] && board[7]['b7'] === board[8]['b8'] && board[7]['b7'] !== "") {
        setWinnerColor([6, 7, 8]);
        return true;
    }
    if (board[0]['b0'] === board[3]['b3'] && board[3]['b3'] === board[6]['b6'] && board[3]['b3'] !== "") {
        setWinnerColor([0, 3, 6]);
        return true;
    }
    if (board[1]['b1'] === board[4]['b4'] && board[4]['b4'] === board[7]['b7'] && board[4]['b4'] !== "") {
        setWinnerColor([1, 4, 7]);
        return true;
    }
    if (board[2]['b2'] === board[5]['b5'] && board[5]['b5'] === board[8]['b8'] && board[5]['b5'] !== "") {
        setWinnerColor([2, 5, 8]);
        return true;
    }
    if (board[0]['b0'] === board[4]['b4'] && board[4]['b4'] === board[8]['b8'] && board[4]['b4'] !== "") {
        setWinnerColor([0, 4, 8]);
        return true;
    }
    if (board[2]['b2'] === board[4]['b4'] && board[4]['b4'] === board[6]['b6'] && board[4]['b4'] !== "") {
        setWinnerColor([2, 4, 6]);
        return true;
    }
}

const setWinnerColor = (availSports) => {
    for (var i = 0; i < availSports.length; i++) {
        document.getElementById(`b${availSports[i]}`).style.color = '#ca0707';
    }
}

