//#region Game board module

const gameBoard = (() => {
    'use strict';

    //////////////
    // DOM state//
    //////////////

    const _boardCells = document.querySelectorAll('.board-cell');
    _boardCells.forEach((cell) => cell.addEventListener('click', _tryAddToken));

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

    function _checkForWin() {
        let conditionFulfilled = false;

        // Go through each row, column, or diagonal
        allRowsAndCols.forEach( (array) => {
            if(_checkEveryCell(array)) conditionFulfilled = true;
        });

        // If it went through the whole loop and could not find a match:
        return conditionFulfilled;
    }

    function _checkEveryCell(array) {
        const token = gameManager.getCurrentPlayer().token;

        let testPassed = true; // Will change to false as soon as an element other than specified token is found

        array.forEach(i => {
            if (!(_boardCells[i].hasChildNodes()) ||
            !(_boardCells[i].firstChild.classList.contains(token)))  {
                testPassed = false;
            }
        });

        return testPassed;

        /*array.every(cell => {
            // Checks for empty cells to avoid null ref exceptions
            if (_boardCells[cell].hasChildNodes()) {
                // If not null, check if it has the specified token
                _boardCells[cell].firstChild.classList.contains(token);
            }
        });*/
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

    return {clearBoard: ()=> {_clearBoard()},
            checkForWin: ()=> _checkForWin()};

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

    const _player1 = playerFactory("Player 1", "tokenA");
    const _player2 = playerFactory("Player 2", "tokenB");

    let _isPlayer1Turn = true;  // Initialized as true because Player 1 goes first, could change.

    ///////////////////////
    // Private functions //
    ///////////////////////

    function _winGame() {
        // Add logic later
    }

    ////////////
    // PUBLIC //
    ////////////

    function _nextTurn() {
        _isPlayer1Turn = !_isPlayer1Turn;
    }

    return {
        getCurrentPlayer: () => { return (_isPlayer1Turn ? _player1 : _player2) },
        nextTurn: () => {_nextTurn();}
    };

})();
//#endregion

//#region Global 

//#endregion