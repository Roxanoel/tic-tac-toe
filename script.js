//#region Game board module

const gameBoard = (() => {
    'use strict';

    //////////////
    // DOM state//
    //////////////

    const _boardCells = document.querySelectorAll('.board-cell');
    _boardCells.forEach((cell) => cell.addEventListener('click', _tryAddToken));

    ////////////////
    // DOM methods//
    ////////////////

    // This function checks if the cell is empty before adding a token.
    function _tryAddToken(event) {
       const _clickedCell = event.target;
       // Early return if the cell already has a token in it.
       if (_clickedCell.hasChildNodes()) return;
       // Otherwise, calls the _addToken function.
       _addTokenToCell("tokenA", _clickedCell.dataset.index) // Will eventually get ref to the token from player
    }

    // This function adds a token to an empty cell.
    function _addTokenToCell(token, cellIndex) {
        // Element creation
        const cellContent = document.createElement('div');
        cellContent.classList.add(token); // For this, ensure I store the token name correctly in Player objects

        // Appending element to the correct cell
        _boardCells[cellIndex].appendChild(cellContent);
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

    return {clearBoard: ()=> {_clearBoard()}};

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
        console.log(_isPlayer1Turn);
    }

    return {
        getCurrentPlayer: () => { return (_isPlayer1Turn ? _player1 : _player2) },
        nextTurn: () => {_nextTurn();}
    };

})();
//#endregion

//#region Global 

//#endregion