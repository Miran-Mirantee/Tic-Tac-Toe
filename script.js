const gameBoard = (function(doc) {
    const _board = {
        0: ['', '', ''],
        1: ['', '', ''],
        2: ['', '', ''],
    };

    let player1Turn = true;

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

    const _controller = (function() {
        if (!!doc && "querySelector" in doc) {
            const slots = doc.querySelectorAll('.slot');
            for (const slot of slots) {
                slot.addEventListener('click', () => {
                    let currentPlayer;
                    if (player1Turn ? currentPlayer = player1 : currentPlayer = player2)

                    if (slot.textContent == '') {
                        _board[slot.dataset.row][slot.dataset.column] = currentPlayer.playerCharacter;
                        slot.textContent = currentPlayer.playerCharacter;
                        player1Turn = !player1Turn;
                    }
                });
            }
        }
    })();

    // temp
    return {
        _board,
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