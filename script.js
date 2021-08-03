/*          --- MODULES ---         */
const gameBoardModule = (() => {
    let boardBoxes = document.querySelectorAll("[data-box]");
    let gameBoard = [
        "x", "x", "o",
        "o", "o", "x",
        "x", "x", "x"
    ];


    for (let i = 0; i < gameBoard.length; i++) {
        boardBoxes[i].textContent = gameBoard[i] + i;
    }

    // bind events
    boardBoxes.forEach(box => {   
        box.addEventListener("click", setMark)
    })

    function setMark() {
        console.log(gameBoard)
    }

    // check for winner
    function checkWinner() {
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        winningConditions.forEach(condition => {
            if (gameBoard[condition[0]] === "x" && gameBoard[condition[1]] === "x" && gameBoard[condition[2]] === "x") {
                console.log(condition)
                console.log("you win")
            }
        })
    }
    checkWinner();

    return {
        
    }
})();

const displayControllerModule = (() => {

})();


/*          --- OBJECTS ---         */



/*          --- FACTORY FUNCTIONS ---           */
const createPlayer = (name, mark) => {
    return {
        name,
        mark
    }
};

const human = createPlayer("human", "x");
const computer = createPlayer("computer", "o");