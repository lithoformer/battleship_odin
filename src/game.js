import { Ship, Gameboard, Player } from './app.js';
import "./style.css";

const boardSize = 10;
const cpuHit = [];

const player = new Player();
player.gameBoard = new Gameboard();
player.gameBoard.hitBoard = player.gameBoard.createBoard();
// player.gameBoard.shipBoard = player.gameBoard.createBoard();

// if (player.gameBoard.placeShip(player.gameBoard.shipBoard, 3, 4, 5, 'horizontal')) {
//     console.log('successfully placed ship');
// }
// if (player.gameBoard.placeShip(player.gameBoard.shipBoard, 0, 0, 4, 'vertical')) {
//     console.log('successfully placed ship');
// }
// if (player.gameBoard.placeShip(player.gameBoard.shipBoard, 6, 6, 3, 'horizontal')) {
//     console.log('successfully placed ship');
// }
// if (player.gameBoard.placeShip(player.gameBoard.shipBoard, 1, 1, 2, 'vertical')) {
//     console.log('successfully placed ship');
// }
// if (player.gameBoard.placeShip(player.gameBoard.shipBoard, 8, 8, 1, 'horizontal')) {
//     console.log('successfully placed ship');
// }

const cpu = new Player();
cpu.gameBoard = new Gameboard();
cpu.gameBoard.hitBoard = cpu.gameBoard.createBoard();
cpu.gameBoard.shipBoard = cpu.gameBoard.createBoard();

for (let i = 1; i < 6; i++) {
    let orientation;
    let success = false;
    do {
        const orient = Math.floor(Math.random() * 2);
        if (orient === 1) {
            orientation = 'horizontal'
        }
        else {
            orientation = 'vertical';
        }
        success = cpu.gameBoard.placeShip(cpu.gameBoard.shipBoard, Math.floor(Math.random() * boardSize), Math.floor(Math.random() * boardSize), i, orientation);
    } while (!success);
}

const body = document.querySelector('body');
const outer = document.createElement('div');
outer.classList.add('outer');
body.appendChild(outer);
const title = document.createElement('h1');
title.classList.add('title');
outer.appendChild(title);
title.textContent = `BATTLESHIP`;
const status = document.createElement('div');
status.classList.add('status');
outer.appendChild(status);
status.textContent = 'DRAG TO PLACE YOUR SHIPS!  DOUBLE-CLICK TO CHANGE ORIENTATION';

const gameContainer = document.createElement('div');
gameContainer.classList.add('gameContainer');
outer.appendChild(gameContainer);

const myShipBoard = document.createElement('div');
myShipBoard.classList.add('myShipBoard');
gameContainer.appendChild(myShipBoard);

const startBtn = document.createElement('button');
startBtn.classList.add('btn');
startBtn.textContent = 'START GAME';
gameContainer.appendChild(startBtn);

for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
        const cell = document.createElement('div');
        cell.classList.add('myShipBoardCell');
        cell.classList.add('dropZone');
        cell.addEventListener('dragover', (event) => {
            event.preventDefault();
        }, false);
        cell.addEventListener('dragenter', (event) => {
            if (event.target.classList.contains('dropZone')) {
                event.target.classList.add('dragover');
            }
        });
        cell.addEventListener('dragleave', (event) => {
            if (event.target.classList.contains('dropZone')) {
                event.target.classList.remove('dragover');
            }
        });
        cell.addEventListener('drop', (event) => {
            event.preventDefault();
            if (event.target.classList.contains('dropZone')) {
                event.target.classList.remove('dragover');
                event.target.appendChild(dragged);
            }
        });
        myShipBoard.appendChild(cell);
    }
}

let dragged;

for (let i = 5; i > 0; i--) {
    const ship = document.createElement('div');
    ship.draggable = 'true';
    ship.classList.add('ship');
    myShipBoard.appendChild(ship);
    for (let j = 0; j < i; j++) {
        const shipDiv = document.createElement('div');
        shipDiv.classList.add('shipDiv');
        shipDiv.classList.add('normal');
        shipDiv.addEventListener('drag', () => {
        });
        shipDiv.addEventListener('dragstart', () => {
            shipDiv.classList.add('dragging');
        });
        shipDiv.addEventListener('dragend', () => {
            shipDiv.classList.remove('dragging');
        });
        ship.appendChild(shipDiv);
    }
    ship.addEventListener('drag', () => {
    });

    ship.addEventListener('dragstart', () => {
        dragged = ship;
        ship.classList.add('dragging');
    });

    ship.addEventListener('dragend', () => {
        ship.classList.remove('dragging');
    });

    ship.addEventListener('dblclick', () => {
        if (ship.style.flexDirection === 'column') {
            ship.style.flexDirection = 'row';
        }
        else {
            ship.style.flexDirection = 'column';
        }
    });
}

startBtn.addEventListener('click', () => {
    player.gameBoard.shipBoard = player.gameBoard.createBoard();
    let begin = true;
    let orientation = '';
    const myShipBoardCells = document.querySelectorAll('.myShipBoardCell');
    for (let i = 0; i < myShipBoardCells.length; i++) {
        if (myShipBoardCells[i].querySelector('.ship')) {
            const ship = myShipBoardCells[i].querySelector('.ship');
            const y = i % 10;
            const x = Math.floor(i / 10);
            if (ship.style.flexDirection === 'row' || ship.style.flexDirection === '') {
                orientation = 'horizontal';
            }
            else if (ship.style.flexDirection === 'column') {
                orientation = 'vertical';
            }
            const length = ship.childNodes.length;
            if (player.gameBoard.checkPlacement(player.gameBoard.shipBoard, x, y, length, orientation) === false) {
                status.textContent = 'INVALID SHIP POSITION!';
                begin = false;
            }
            else if (player.gameBoard.placeShip(player.gameBoard.shipBoard, x, y, length, orientation)) {
                begin = true;
            }
        }
    }
    if (begin) {
        for (let i = 0; i < myShipBoardCells.length; i++) {
            const y = i % 10;
            const x = Math.floor(i / 10);
            if (player.gameBoard.shipBoard[x][y] instanceof Ship) {
                myShipBoardCells[i].style.backgroundColor = 'slategrey';
            }
            else {
                myShipBoardCells[i].style.backgroundColor = 'lightblue'
            }
        }
        const ships = document.querySelectorAll('.ship');
        for (const ship of ships) {
            ship.style.visibility = 'hidden';
        }
        status.textContent = 'SINK YOUR OPPONENT\'S SHIPS!';
    }
});

const enemyHitBoard = document.createElement('div');
enemyHitBoard.classList.add('enemyHitBoard');
gameContainer.appendChild(enemyHitBoard);

for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
        const cell = document.createElement('div');
        cell.classList.add('enemyHitBoardCell');
        enemyHitBoard.appendChild(cell);
        cell.addEventListener('click', () => {
            if (cpu.gameBoard.receiveAttack(i, j) === true) {
                if (cpu.gameBoard.hitBoard[i][j] === 0) {
                    status.textContent = 'MISS!';
                    cell.style.transition = '1s';
                    cell.style.opacity = '0.5';
                }
                else if (cpu.gameBoard.hitBoard[i][j] === 1) {
                    cell.style.transition = '1s';
                    cell.style.backgroundColor = 'red'
                    if (cpu.gameBoard.shipBoard[i][j].sunk === true) {
                        status.textContent = 'HIT! SHIP SUNK!';
                    } else {
                        status.textContent = 'HIT!';
                    }
                }
                if (cpu.gameBoard.allSunk()) {
                    endGame('player');
                }
                else { cpuAttack(cpuHit); }
            } else {
                status.textContent = 'INVALID MOVE! TRY AGAIN!';
            }
        });

        if (cpu.gameBoard.hitBoard[i][j] === 0) {
            cell.style.backgroundColor = 'white';
        }
        else if (cpu.gameBoard.hitBoard[i][j] === 1) {
            cell.style.backgroundColor = 'red'
        }
        else if (cpu.gameBoard.hitBoard[i][j] === null) {
            cell.style.backgroundColor = 'lightblue'
        }
    }
}

const cpuAttack = (cpuHit) => {
    let x = null;
    let y = null;
    let AIhit = false;
    do {
        if (cpuHit.length === 0) {
            break;
        }
        else {
            const AIcoords = cpuHit.shift();
            x = AIcoords[0];
            y = AIcoords[1];
            AIhit = player.gameBoard.receiveAttack(x, y);
        }
    } while (!AIhit);
    if (!AIhit) {
        do {
            x = Math.floor(Math.random() * boardSize);
            y = Math.floor(Math.random() * boardSize);
        } while (player.gameBoard.receiveAttack(x, y) === false);
    }
    const myShipBoardCells = document.querySelectorAll('.myShipBoardCell');
    if (player.gameBoard.hitBoard[x][y] === 1 && player.gameBoard.shipBoard[x][y].sunk === false) {
        if (x - 1 >= 0 && player.gameBoard.hitBoard[x - 1][y] === null) {
            cpuHit.push([x - 1, y]);
        }
        if (x + 1 < boardSize && player.gameBoard.hitBoard[x + 1][y] === null) {
            cpuHit.push([x + 1, y]);
        }
        if (y - 1 >= 0 && player.gameBoard.hitBoard[x][y - 1] === null) {
            cpuHit.push([x, y - 1]);
        }
        if (y + 1 < boardSize && player.gameBoard.hitBoard[x][y + 1] === null) {
            cpuHit.push([x, y + 1]);
        }
        myShipBoardCells[x * boardSize + y].style.backgroundColor = 'red';
        myShipBoardCells[x * boardSize + y].style.transition = '1s';
    }
    else if (player.gameBoard.hitBoard[x][y] === 1 && player.gameBoard.shipBoard[x][y].sunk === true) {
        cpuHit.splice(0, cpuHit.length);
        myShipBoardCells[x * boardSize + y].style.backgroundColor = 'red';
        myShipBoardCells[x * boardSize + y].style.transition = '1s';
    }
    else {
        myShipBoardCells[x * boardSize + y].style.opacity = '0.5';
        myShipBoardCells[x * boardSize + y].style.transition = '1s';
    }
    if (player.gameBoard.allSunk()) {
        endGame('cpu');
    }
}

const endGame = (winner) => {
    if (winner === 'player') {
        status.textContent = 'GAME OVER! PLAYER WINS!';
    }
    else if (winner === 'cpu') {
        status.textContent = 'GAME OVER! CPU WINS!';
    }
    myShipBoard.style.visibility = 'hidden';
    enemyHitBoard.style.visibility = 'hidden';
}