
let btnParent = document.getElementById("btn-parent");
btnParent.addEventListener("click", main, false);

let board = [
    { 'b0': "" }, { 'b1': "" }, { 'b2': "" },
    { 'b3': "" }, { 'b4': "" }, { 'b5': "" },
    { 'b6': "" }, { 'b7': "" }, { 'b8': "" }
];

let tmpBoard = board.slice(0); //make a copy for ai
let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let delay;

const boardLen = 9;

function main(e) {
    markBoard(e.target.id);
}

const markBoard = (id) => {

    let isWinner = human(id);

    if (isWinner) {
        console.log("Human is Winner");
        delay = setTimeout(restartGame, 2000);
    }
    else {
        isWinner = ai();

        if(isWinner){
            console.log("AI is Winner");
            delay = setTimeout(restartGame, 2000);
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
    let idx = arr[Math.floor(Math.random() * arr.length)];
    let id = 'b'.concat(idx);

    if (arr.length !== 0) {
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
                arr.splice(idx, 1);
            }
        }
    });
}

const restartGame = () => {
    //end the game and restart the game
    //update stats
    board = [
        { 'b0': "" }, { 'b1': "" }, { 'b2': "" },
        { 'b3': "" }, { 'b4': "" }, { 'b5': "" },
        { 'b6': "" }, { 'b7': "" }, { 'b8': "" }
    ];
    tmpBoard = board.slice(0); //make a copy for ai
    arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    for (let i = 0; i < 9; i++) {
        document.getElementById(`b${i}`).innerHTML = "";
        document.getElementById(`b${i}`).style.color = 'rgba(255, 255, 255, 0.5)';
    }

    clearTimeout(delay);
}


const calculate = () => {
    if (board[0]['b0'] === board[1]['b1'] && board[1]['b1'] === board[2]['b2'] && board[1]['b1'] !== "") {     
        setWinnerColor([0, 1, 2]);
        return true;
        //row 1
    }
    if (board[3]['b3'] === board[4]['b4'] && board[4]['b4'] === board[5]['b5'] && board[4]['b4'] !== "") {   
        setWinnerColor([3, 4, 5]);
        return true;
        //row 2
    }
    if (board[6]['b6'] === board[7]['b7'] && board[7]['b7'] === board[8]['b8'] && board[7]['b7'] !== "") {
        setWinnerColor([6, 7, 8]);
        return true;
        // row 3
    }
    if (board[0]['b0'] === board[3]['b3'] && board[3]['b3'] === board[6]['b6'] && board[3]['b3'] !== "") { 
        setWinnerColor([0, 3, 6]);
        return true;
        // column 1
    }
    if (board[1]['b1'] === board[4]['b4'] && board[4]['b4'] === board[7]['b7'] && board[4]['b4'] !== "") {     
        setWinnerColor([1, 4, 7]);
        return true;
        // column 2
    }
    if (board[2]['b2'] === board[5]['b5'] && board[5]['b5'] === board[8]['b8'] && board[5]['b5'] !== "") {    
        setWinnerColor([2, 5, 8]);
        return true;
        // column 3
    }
    if (board[0]['b0'] === board[4]['b4'] && board[4]['b4'] === board[8]['b8'] && board[4]['b4'] !== "") {     
        setWinnerColor([0, 4, 8]);
        return true;
        // diagonal from top left
    }
    if (board[2]['b2'] === board[4]['b4'] && board[4]['b4'] === board[6]['b6'] && board[4]['b4'] !== "") {   
        setWinnerColor([2, 4, 6]);
        return true;
        // diagonal from top right
    }
    return false;
}

const setWinnerColor = (arr) => {
    for (var i = 0; i < arr.length; i++) {
        document.getElementById(`b${arr[i]}`).style.color = '#ff0000';
    }
}