const gameBoard = (function(doc) {
    const _board = {
        0: ['', '', ''],
        1: ['', '', ''],
        2: ['', '', ''],
    };

    let _player1Turn = true;
    let gameWinner;

    const clear = function() {
        if (!!doc && "querySelector" in doc) {
            const boardDiv = doc.querySelector('.board');
            const displayMessage = doc.querySelector('.display-message');
            if (boardDiv) {
                doc.body.removeChild(boardDiv);  
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        _board[i][j] = '';
                    }
                }
                _display();
                _controller();
                gameWinner = '';
                displayMessage.textContent = '';
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

    const _checkTie = function() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (_board[i][j] == '')
                    return false;
            }
        }
        return true;
    };

    const _controller = function() {
        if (!!doc && "querySelector" in doc) {
            const slots = doc.querySelectorAll('.slot');
            for (const slot of slots) {
                slot.addEventListener('click', () => {
                    if (!gameWinner) {
                        let currentPlayer;
                        _player1Turn ? currentPlayer = players.player1 : currentPlayer = players.player2;
    
                        if (slot.textContent == '') {
                            _board[slot.dataset.row][slot.dataset.column] = currentPlayer.playerCharacter;
                            slot.textContent = currentPlayer.playerCharacter;
                            _player1Turn = !_player1Turn;
                        }
                        if (_checkWinner()) {
                            gameWinner = currentPlayer;
                            ui.congratulate(gameWinner);   
                        }
                        if (!_checkWinner() && _checkTie()) {
                            const displayMessage = doc.querySelector('.display-message');
                            displayMessage.textContent = `Tie!`;
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
        const displayMessage = doc.querySelector('.display-message');
        player.won++;
        displayMessage.textContent = `${player.name} is the winner!`;
        playerInfo();
    };

    const _restart = (function() {
        const restartBtn = doc.querySelector('.restart-btn');
        restartBtn.addEventListener('click', () => {
            gameBoard.clear();
        });
    })();

    const playerInfo = function() {
        const player1Marker = doc.querySelector('.player1-marker');
        const player2Marker = doc.querySelector('.player2-marker');
        const player1WonCount = doc.querySelector('.player1-won');
        const player2WonCount = doc.querySelector('.player2-won');
        player1Marker.textContent = `Marker: ${players.player1.playerCharacter}`;
        player2Marker.textContent = `Marker: ${players.player2.playerCharacter}`;
        player1WonCount.textContent = `Score: ${players.player1.won}`;
        player2WonCount.textContent = `Score: ${players.player2.won}`;
    };

    const changeName = (function() {
        const changeNameBtns = doc.querySelectorAll('.change-name-btn');
        for (const changeNameBtn of changeNameBtns) {
            changeNameBtn.addEventListener('click', () => {
                const player = changeNameBtn.dataset.player;
                const input = doc.getElementById(`${player}-name`);
                input.value ? players[player].name = input.value : players[player].name = player;
            });
        }
    })();

    return {
        congratulate,
        playerInfo,
        changeName,
    };
})(document);

const playerCreator = (name, playerCharacter) => {
    return {
        name,
        playerCharacter,
        won: 0,
    };
};

const players = {
    player1: playerCreator('player1', 'O'),
    player2: playerCreator('player2', 'X'),
};

ui.playerInfo();

