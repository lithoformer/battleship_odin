import { Ship, Gameboard, Player } from './app.js';
import "./style.css";

const boardSize = 10;
const cpuHits = [];
const cpuAttacks = [];
let AIdata = { coords: null, orientation: null };

const player = new Player();
player.gameBoard = new Gameboard();
player.gameBoard.hitBoard = player.gameBoard.createBoard();

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
        shipDiv.addEventListener('touchmove', () => {
        });
        shipDiv.addEventListener('dragstart', () => {
            shipDiv.classList.add('dragging');
        });
        shipDiv.addEventListener('touchstart', () => {
            shipDiv.classList.add('dragging');
        })
        shipDiv.addEventListener('dragend', () => {
            shipDiv.classList.remove('dragging');
        });
        shipDiv.addEventListener('touchend', () => {
            shipDiv.classList.remove('dragging');
        })
        ship.appendChild(shipDiv);
    }
    ship.addEventListener('drag', () => {
    });
    ship.addEventListener('touchmove', () => {
    });

    ship.addEventListener('dragstart', () => {
        dragged = ship;
        ship.classList.add('dragging');
    });
    ship.addEventListener('touchstart', () => {
        dragged = ship;
        ship.classList.add('dragging');
    })

    ship.addEventListener('dragend', () => {
        ship.classList.remove('dragging');
    });
    ship.addEveltListener('touchend', () => {
        ship.classList.remove('dragging');
    })

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
    player.gameBoard.ships.splice(0, player.gameBoard.ships.length);
    let begin = [];
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
            if (player.gameBoard.placeShip(player.gameBoard.shipBoard, x, y, length, orientation) === false) {
                status.textContent = 'INVALID SHIP POSITION!';
                begin.push(false);
            }
            else if (player.gameBoard.placeShip(player.gameBoard.shipBoard, x, y, length, orientation)) {
                begin.push(true);
            }
        }
    }
    if (!begin.includes(false)) {
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
                    if (cpu.gameBoard.shipBoard[i][j].isSunk() === true) {
                        status.textContent = 'HIT! SHIP SUNK!';
                    } else {
                        status.textContent = 'HIT!';
                    }
                }
                if (cpu.gameBoard.allSunk()) {
                    endGame('player');
                }
                else { cpuAttack(cpuAttacks, cpuHits); }
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

const cpuAttack = (cpuAttacks, cpuHits) => {
    let x = null;
    let y = null;
    let AIhit = false;
    do {
        if (cpuAttacks.length === 0) {
            break;
        }
        else {
            const AIcoords = cpuAttacks.shift();
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
    if (player.gameBoard.hitBoard[x][y] === 1 && player.gameBoard.shipBoard[x][y].isSunk() === false) {
        cpuHits.push([x, y]);
        if (cpuHits.length > 1) {
            for (const hit1 of cpuHits) {
                for (const hit2 of cpuHits) {
                    if (hit1[0] === hit2[0] && hit1 !== hit2) {
                        AIdata.orientation = 'horizontal';
                        AIdata.coords = hit1[0];
                    }
                    if (hit1[1] === hit2[1] && hit1 !== hit2) {
                        AIdata.orientation = 'vertical';
                        AIdata.coords = hit1[1];
                    }
                }
            }
        }

        if (x - 1 >= 0 && player.gameBoard.hitBoard[x - 1][y] === null && AIdata.orientation && AIdata.orientation === 'vertical') {
            cpuAttacks.push([x - 1, y]);
            cpuAttacks.splice(0, cpuAttacks.length, ...cpuAttacks.filter((attack) => attack[1] === AIdata.coords));
        }
        else if (x - 1 >= 0 && player.gameBoard.hitBoard[x - 1][y] === null && AIdata.orientation === null) {
            cpuAttacks.push([x - 1, y]);
        }
        if (x + 1 < boardSize && player.gameBoard.hitBoard[x + 1][y] === null && AIdata.orientation && AIdata.orientation === 'vertical') {
            cpuAttacks.push([x + 1, y]);
            cpuAttacks.splice(0, cpuAttacks.length, ...cpuAttacks.filter((attack) => attack[1] === AIdata.coords));
        }
        else if (x + 1 < boardSize && player.gameBoard.hitBoard[x + 1][y] === null && AIdata.orientation === null) {
            cpuAttacks.push([x + 1, y]);
        }
        if (y - 1 >= 0 && player.gameBoard.hitBoard[x][y - 1] === null && AIdata.orientation && AIdata.orientation === 'horizontal') {
            cpuAttacks.push([x, y - 1]);
            cpuAttacks.splice(0, cpuAttacks.length, ...cpuAttacks.filter((attack) => attack[0] === AIdata.coords));
        }
        else if (y - 1 >= 0 && player.gameBoard.hitBoard[x][y - 1] === null && AIdata.orientation === null) {
            cpuAttacks.push([x, y - 1]);
        }
        if (y + 1 < boardSize && player.gameBoard.hitBoard[x][y + 1] === null && AIdata.orientation && AIdata.orientation === 'horizontal') {
            cpuAttacks.push([x, y + 1]);
            cpuAttacks.splice(0, cpuAttacks.length, ...cpuAttacks.filter((attack) => attack[0] === AIdata.coords));
        }
        else if (y + 1 < boardSize && player.gameBoard.hitBoard[x][y + 1] === null && AIdata.orientation === null) {
            cpuAttacks.push([x, y + 1]);
        }
        myShipBoardCells[x * boardSize + y].style.backgroundColor = 'red';
        myShipBoardCells[x * boardSize + y].style.transition = '1s';
    }
    else if (player.gameBoard.hitBoard[x][y] === 1 && player.gameBoard.shipBoard[x][y].isSunk() === true) {
        cpuAttacks.splice(0, cpuAttacks.length);
        cpuHits.splice(0, cpuHits.length);
        AIdata.orientation = null;
        AIdata.coords = null;
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