//#region Game board module

const gameBoard = (() => {
    'use strict';

    //////////////
    // DOM state//
    //////////////

    const _boardCells = document.querySelectorAll('.board-cell');
    _boardCells.forEach((cell) => cell.addEventListener('click', _tryAddToken));

    const _clearBtn = document.querySelector('#clear-btn');
    _clearBtn.addEventListener('click', _clearBoard);

    // Indices for rows/cols/diagonals
    const row1 = [0, 1, 2];
    const row2 = [3, 4, 5];
    const row3 = [6, 7, 8];
    const col1 = [0, 3, 6];
    const col2 = [1, 4, 7];
    const col3 = [2, 5, 8];
    const diag1 = [0, 4, 8];
    const diag2 = [2, 4, 6];

    const allRowsAndCols = [row1, row2, row3, col1, col2, col3, diag1, diag2];

    ////////////////
    // DOM methods//
    ////////////////

    // This function checks if the cell is empty before adding a token.
    function _tryAddToken(event) {
       // If the game is not started, do nothing
       if (!gameManager.getIsGameStarted()) return;

        const _clickedCell = event.target;
       // Early return if the cell already has a token in it.
       if (_clickedCell.hasChildNodes()) return;
       // Otherwise, calls the _addToken function.
       _addTokenToCell(gameManager.getCurrentPlayer().token, _clickedCell.dataset.index) // Will eventually get ref to the token from player
    }

    // This function adds a token to an empty cell.
    function _addTokenToCell(token, cellIndex) {
        // Element creation
        const cellContent = document.createElement('div');
        cellContent.classList.add(token); // For this, ensure I store the token name correctly in Player objects

        // Appending element to the correct cell
        _boardCells[cellIndex].appendChild(cellContent);

        // Registers that it is the other player's turn; could be done with event later!
        gameManager.nextTurn();
    }

    //////////////////////
    // Checking for win //
    //////////////////////

    // Checks for a win for the player whose turn it is
    function _checkForWin() {
        let conditionFulfilled = false;

        // Go through each line to check for a match
        allRowsAndCols.forEach( (array) => {
            if(_checkEveryCell(array)) conditionFulfilled = true;
        });

        // If it went through the whole loop and could not find a match:
        return conditionFulfilled;
    }

    function _checkEveryCell(array) {
        const _token = gameManager.getCurrentPlayer().token;

        let _testPassed = true; // Will change to false as soon as an element other than specified token is found

        array.forEach(i => {
            if (!(_boardCells[i].hasChildNodes()) ||
            !(_boardCells[i].firstChild.classList.contains(_token)))  {
                _testPassed = false;
            }
        });

        return _testPassed;

        // Code below was not functional because of empty cells, they gave null refs       
        /*array.every(cell => {
            // Checks for empty cells to avoid null ref exceptions
            if (_boardCells[cell].hasChildNodes()) {
                // If not null, check if it has the specified token
                _boardCells[cell].firstChild.classList.contains(token);
            }
        });*/
    }

    function _checkForTie() {
        const _boardCellsArray = Array.from(_boardCells);
        return (_boardCellsArray.every(cell => cell.hasChildNodes())) 
    }
    
    ////////////
    // PUBLIC //
    ////////////

    // This function clears the board
    function _clearBoard() {
        _boardCells.forEach((cell) => {
            while (cell.lastChild) {
                cell.removeChild(cell.lastChild);
            }
        })
    }

    return { clearBoard: ()=> {_clearBoard()},
            checkForWin: ()=> _checkForWin(),
            checkForTie: ()=> _checkForTie()
        };

})();

//#endregion

//#region Player factory
const playerFactory = (name, token) => { 
    return {name, token};
}
//#endregion

//#region Game Manager module
const gameManager = (() => {
    'use strict';
    
    ////////////////
    // Local state//
    ////////////////

    // Players
    const _player1 = playerFactory("Player 1", "tokenA");
    const _player2 = playerFactory("Player 2", "tokenB");

    let _isPlayer1Turn = true;  // Initialized as true because Player 1 goes first, could change.

    // Game states 
    let _isGameStarted = false;  // Starts out false; would be better as events once I learn how 


    ///////////////////////
    // Private functions //
    ///////////////////////

    function _winGame() {
        // Ends the game 
        _isGameStarted = false;

        alert(`${_getCurrentPlayer().name} won!`);
    }

    function _gameTied() {
        // Ends the game 
        _isGameStarted = false;

        alert("It's a tie!");
    }

    function _startGame() {
        _isGameStarted = true;
    }

    ////////////
    // PUBLIC //
    ////////////

    // Changes turn but checks for a win first.
    function _nextTurn() {
        // If the game was won, launch game won behaviour and do not change turn.
        if (gameBoard.checkForWin()) {
            _winGame();
            return;
        }
        // Otherwise, checks for a tie, and if so, launches tie behaviour and early returns.
        if (gameBoard.checkForTie()) {
            _gameTied();
            return;
        }
        _isPlayer1Turn = !_isPlayer1Turn;
    }

    function _getCurrentPlayer() {
        return (_isPlayer1Turn ? _player1 : _player2);
    }

    return {
        getCurrentPlayer: () => { return (_isPlayer1Turn ? _player1 : _player2); },
        nextTurn: () => {_nextTurn();},
        startGame: () => _startGame(),
        getIsGameStarted: () => { return _isGameStarted; }
    }

})();
//#endregion

//#region uiDisplay 

const uiDisplay = (() => {

    // Start button
    const _startBtn = document.querySelector('#start-btn');
    _startBtn.addEventListener('click', _openModal); 

    // Modal menu
    const _selectionContainer = document.querySelector('.selection-container');

    // Form 
    const _submitBtn = document.querySelector('#submit-btn');
    _submitBtn.addEventListener('click', _submitSelection);
    const player1NameField = document.querySelector('#player1-name');
    const player2NameField = document.querySelector('#player2-name');

    const defaultPlayer1Name = 'Player 1';
    const defaultPlayer2Name = 'Player 2';
    let player1Name = defaultPlayer1Name;
    let player2Name = defaultPlayer2Name;

    // PRIVATE FUNCTIONS //
    function _openModal() {
        _selectionContainer.classList.remove('invisible');
    }

    function _submitSelection(event) {
        player1Name = (player1NameField.value === '') ? defaultPlayer1Name : player1NameField.value;

        player2Name = (player2NameField.value === '') ? defaultPlayer2Name : player2NameField.value;

        console.log(`Player 1: ${player1Name}. Player 2: ${player2Name}.`);
    }
})();

//#endregion