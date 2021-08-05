/*          --- FACTORY FUNCTIONS ---           */
const createPlayer = (name, mark, isTurn) => {
    return {
        name,
        mark,
        isTurn
    }
};

const player1 = createPlayer("human", "x", "true");
const player2 = createPlayer("computer", "o", "false");



/*          --- MODULES ---         */
const gameBoardModule = (() => {
    const gameBoardContainer = document.querySelector(".game-board");
    const boardBoxes = document.querySelectorAll("[data-box]");
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer;
    let playerMode;


    // display and bind events 
    const bindingEvents = (() => {
        // bind events
        boardBoxes.forEach(box => {   
            box.addEventListener("click", handleMark)
        })

        function handleMark(e) {
            if (gameBoard[this.dataset.box]) { return }
            if (playerMode === "vsPlayer") { setMark(e) }
            else if (playerMode === "vsAI") {
                setMark(e)
                /*  AI STUFF    */
                if (!gameBoard.includes("")) { return }
                if (player2.isTurn === "true") {
                    checkPlayerTurn()
                    setMarkAI()
                    checkWinner()
                }
                /*  --------    */
            }
            else return
        }

        function setMark(e){
            checkPlayerTurn()
            gameBoard.splice(e.target.dataset.box, 1, currentPlayer.mark)
            e.target.textContent = currentPlayer.mark;
            checkWinner()
            changePlayerTurn()
        }

        function setMarkAI() {
            const randomAIPick = Math.floor(Math.random() * gameBoard.length);
            if (gameBoard[randomAIPick]) {
                return setMarkAI()
            }
            gameBoard.splice(randomAIPick, 1, currentPlayer.mark)
            boardBoxes[randomAIPick].textContent = currentPlayer.mark;
        }
        
        function checkPlayerTurn() {
            if (player1.isTurn === "true") {
                currentPlayer = player1;
                player2.isTurn = "true";
                return
            }
            if (player2.isTurn === "true") {
                currentPlayer = player2;
                player1.isTurn = "true";
                return
            }
        }

        function changePlayerTurn() {
            if (currentPlayer.isTurn === "true") { return currentPlayer.isTurn = "false" }
            if (currentPlayer.isTurn === "false") { return currentPlayer.isTurn = "true" }
        }
    })();

    const displayControllerModule = (() => {
        const restartBtn = document.querySelector(".restart-btn").addEventListener("click", () => { resetGame() });
        const vsPlayerBtn = document.querySelector(".vsPlayer-btn").addEventListener("click", () => { playerMode = "vsPlayer" });
        const vsAIBtn = document.querySelector(".vsAI-btn").addEventListener("click", () => { playerMode = "vsAI" });
        // handle when you are currently playing a game so if you click on a button it will restard the whole game
    })();



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
            if (gameBoard[condition[0]] === currentPlayer.mark &&
                gameBoard[condition[1]] === currentPlayer.mark &&
                gameBoard[condition[2]] === currentPlayer.mark) {
                console.log(condition)
                console.log(currentPlayer)
                console.log("you win")
                gameBoardContainer.style.pointerEvents = "none";
            }
        })
    }

    function resetGame() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        for (let i = 0; i < gameBoard.length; i++) {
            boardBoxes[i].textContent = "";
        }
        player1.isTurn = "true";
        player2.isTurn = "false";
        gameBoardContainer.style.pointerEvents = "auto";
    }

    return {
        checkWinner,
        currentPlayer,
        gameBoard
    }
})();



