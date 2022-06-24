//#region Game board module

var gameBoard = (() => {
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

})();

//#endregion