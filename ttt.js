
let btnParent = document.getElementById("btn-parent");
btnParent.addEventListener("click", main, false);

let board = [
    { 'b0': "" }, { 'b1': "" }, { 'b2': "" },
    { 'b3': "" }, { 'b4': "" }, { 'b5': "" },
    { 'b6': "" }, { 'b7': "" }, { 'b8': "" }
];

let tmpBoard = board.slice(0); //make a copy for ai
let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let winner = "";

const boardLen = 9;

function main(e) {
    markBoard(e.target.id);   
}

const markBoard = (id) => {
    human(id);
    //ai();

}

const human = (id) => {
    if (document.getElementById(id).innerHTML === "") {
        document.getElementById(id).innerHTML = "x";
        updateBoard(id);
        calculate();
    }
}

const ai = () => {
    let idx = arr[Math.floor(Math.random() * arr.length)];
    let id = 'b'.concat(idx);

    if (arr.length !== 0) {
        if (document.getElementById(id).innerHTML === "") {
            document.getElementById(id).innerHTML = "O";
            updateBoard(id);
        }
    }
    else{
        endGame();
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

const endGame=()=>{
    //end the game and restart the game
    //update stats
}

const calculate = () =>{
    if(board[0]['b0'] === board[1]['b1'] && board[1]['b1'] === board[2]['b2'] && board[1]['b1'] !== ""){
        setWinner(board[0]['b0']);       
        setWinnerColor([0, 1, 2]);
        //row 1
    }
    if(board[3]['b3'] === board[4]['b4'] && board[4]['b4'] === board[5]['b5'] && board[4]['b4'] !== ""){
        setWinner(board[3]['b3']);       
        setWinnerColor([3, 4, 5]);
        //row 2
    }
    if(board[6]['b6'] === board[7]['b7'] && board[7]['b7'] === board[8]['b8'] && board[7]['b7'] !== ""){
        setWinner(board[6]['b6']);       
        setWinnerColor([6, 7, 8]);
        // row 3
    }
    if(board[0]['b0'] === board[3]['b3'] && board[3]['b3'] === board[6]['b6'] && board[3]['b3'] !== ""){
        setWinner(board[0]['b0']);       
        setWinnerColor([0, 3, 6]);
        // column 1
    }
    if(board[1]['b1'] === board[4]['b4'] && board[4]['b4'] === board[7]['b7'] && board[4]['b4'] !== ""){
        setWinner(board[1]['b1']);       
        setWinnerColor([1, 4, 7]);
        // column 2
    }
    if(board[2]['b2'] === board[5]['b5'] && board[5]['b5'] === board[8]['b8'] && board[5]['b5'] !== ""){
        setWinner(board[2]['b2']);       
        setWinnerColor([2, 5, 8]);
        // column 3
    }
    if(board[0]['b0'] === board[4]['b4'] && board[4]['b4'] === board[8]['b8'] && board[4]['b4'] !== ""){
        setWinner(board[0]['b0']);       
        setWinnerColor([0, 4, 8]);
        // diagonal from top left
    }
    if(board[2]['b2'] === board[4]['b4'] && board[4]['b4'] === board[6]['b6'] && board[4]['b4'] !== ""){
        setWinner(board[2]['b2']);       
        setWinnerColor([2, 4, 6]);
        // diagonal from top right
    }
}

const setWinner = (winSymbol)=>{
    winner = winSymbol;
}

const setWinnerColor = (arr)=>{
    for (var i = 0; i < arr.length; i++){
        document.getElementById(`b${arr[i]}`).style.color = '#ff0000';
    }
}