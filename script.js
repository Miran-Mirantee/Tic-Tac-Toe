const gameBoard = (function(doc) {
    const _board = {
        0: ['', '', ''],
        1: ['', '', ''],
        2: ['', '', ''],
    };

    let _player1Turn = true;
    let gameWinner;


    // const _clear = function() {
    //     if (!!doc && "querySelector" in doc) {
    //         const boardDiv = doc.querySelector('.board');
    //         if (boardDiv)
    //             doc.body.removeChild(boardDiv);  
    //     }
    // }

    const _display = (function() {
        // _clear();

        if (!!doc && "querySelector" in doc) {
            const boardDiv = doc.createElement('div');
            boardDiv.classList.add('board');
            doc.body.appendChild(boardDiv);
            
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    const slotDiv = doc.createElement('div');
                    slotDiv.classList.add('slot');
                    slotDiv.setAttribute('data-row', i);
                    slotDiv.setAttribute('data-column', j); 
                    slotDiv.style.gridRowStart = i + 1;
                    slotDiv.style.gridColumnStart = j + 1;
                    slotDiv.textContent = _board[i][j];
                    boardDiv.appendChild(slotDiv);
                }
            }  
        }
    })();

    const _checkWinner = function() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {                
                if (_board[i][j] != '') {
                    // check horizontally
                    if (_board[i][j + 1] != undefined && _board[i][j] == _board[i][j + 1]) {
                        if (_board[i][j + 2] != undefined && _board[i][j] == _board[i][j + 2]) {
                            return _winner = _board[i][j];
                        }
                    }
                    if (_board[i + 1] != undefined && _board[i + 2] != undefined) {
                        // check vertically
                        if (_board[i][j] == _board[i + 1][j]) {
                            if (_board[i][j] == _board[i + 2][j]) {
                                return _winner = _board[i][j];
                            }
                        }
                        // check left diagonally
                        if (_board[i][j] == _board[i + 1][j + 1]) {
                            if (_board[i][j] == _board[i + 2][j + 2]) {
                                return _winner = _board[i][j];
                            }
                        }
                        // check right diagonally 
                        if (_board[i][j] == _board[i + 1][j - 1]) {
                            if (_board[i][j] == _board[i + 2][j - 2]) {
                                return _winner = _board[i][j];
                            }
                        }
                    }
                }
            }
        }
    };

    const _controller = (function() {
        if (!!doc && "querySelector" in doc) {
            const slots = doc.querySelectorAll('.slot');
            for (const slot of slots) {
                slot.addEventListener('click', () => {
                    let currentPlayer;
                    _player1Turn ? currentPlayer = player1 : currentPlayer = player2;

                    if (slot.textContent == '') {
                        _board[slot.dataset.row][slot.dataset.column] = currentPlayer.playerCharacter;
                        slot.textContent = currentPlayer.playerCharacter;
                        _player1Turn = !_player1Turn;
                    }

                    if (_checkWinner()) {
                        gameWinner = currentPlayer;
                        ui.congratulate(gameWinner.name);   
                    }
                });
            }
        }
    })();

    return {
        gameWinner,
    };
})(document);   

const ui = (function(doc) {
    function congratulate(player) {
        console.log(`${player} is the winner!`);
    }

    return {
        congratulate,
    };
})(document);


const playerCreator = (name, playerCharacter) => {
    return {
        name,
        playerCharacter,
    };
};

const player1 = playerCreator('player1', 'O');
const player2 = playerCreator('player2', 'X');