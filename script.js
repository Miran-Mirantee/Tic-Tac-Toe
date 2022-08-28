const gameBoard = (function(doc) {
    let _board = {
        first: ['o', 'o', 'o'],
        second: ['o', 'o', 'o'],
        third: ['o', 'o', 'o'],
    };
    const _display = (function() {
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
                    boardDiv.appendChild(slotDiv);
                }
            }
        }
    })();
})(document);   
