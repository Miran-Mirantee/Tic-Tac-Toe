const gameBoard = (function(doc) {
    let _board = {
        0: ['', '', ''],
        1: ['', '', ''],
        2: ['', '', ''],
    };

    let _player1Turn = true;
    let gameWinner;

    const clear = function() {
        if (!!doc && "querySelector" in doc) {
            const boardDiv = doc.querySelector('.board');
            if (boardDiv) {
                doc.body.removeChild(boardDiv);  
                _board = {
                    0: ['', '', ''],
                    1: ['', '', ''],
                    2: ['', '', ''],
                };
                _display();
                _controller();
                gameWinner = '';
            }
        }
    }

    const _display = function() {
         if (!!doc && "querySelector" in doc) {
            const boardDiv = doc.createElement('div');
            const restartBtn = doc.querySelector('.restart-btn');
            boardDiv.classList.add('board');
            restartBtn.before(boardDiv);
            
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
    };
    _display();

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

    const _controller = function() {
        if (!!doc && "querySelector" in doc) {
            const slots = doc.querySelectorAll('.slot');
            for (const slot of slots) {
                slot.addEventListener('click', () => {
                    if (!gameWinner) {
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
                    }
                });
            }
        }
    };
    _controller();

    return {
        gameWinner,
        clear,
    };
})(document);   

const ui = (function(doc) {
    const congratulate = function(player) {
        console.log(`${player} is the winner!`);
    };

    const restart = (function() {
        const restartBtn = doc.querySelector('.restart-btn');
        restartBtn.addEventListener('click', () => {
            gameBoard.clear();
        });
    })();

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