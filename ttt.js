
let btnParent = document.getElementById("btn-parent");
btnParent.addEventListener("click", main, false);

let board = [
    { 'b0': "" }, { 'b1': "" }, { 'b2': "" },
    { 'b3': "" }, { 'b4': "" }, { 'b5': "" },
    { 'b6': "" }, { 'b7': "" }, { 'b8': "" }
];

let tmpBoard = board.slice(0); //make a copy for ai
let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const boardLen = 9;

function main(e) {
    // console.log(e.target.id);
    markBoard(e.target.id);   
}

const markBoard = (id) => {
    human(id);
    ai();
}

const human = (id) => {
    if (document.getElementById(id).innerHTML === "") {
        document.getElementById(id).innerHTML = "x";
        updateBoard(id);
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

