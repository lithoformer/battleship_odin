import { Ship, Gameboard, Player } from './app.js';
import "./style.css";

const player = new Player();
player.gameBoard = new Gameboard();
player.gameBoard.hitBoard = player.gameBoard.createBoard();
player.gameBoard.shipBoard = player.gameBoard.createBoard();

if (player.gameBoard.placeShip(player.gameBoard.shipBoard, 3, 4, 5, 'horizontal')) {
    console.log('successfully placed ship');
}
if (player.gameBoard.placeShip(player.gameBoard.shipBoard, 0, 0, 4, 'vertical')) {
    console.log('successfully placed ship');
}
if (player.gameBoard.placeShip(player.gameBoard.shipBoard, 6, 6, 3, 'horizontal')) {
    console.log('successfully placed ship');
}
if (player.gameBoard.placeShip(player.gameBoard.shipBoard, 1, 1, 2, 'vertical')) {
    console.log('successfully placed ship');
}
if (player.gameBoard.placeShip(player.gameBoard.shipBoard, 8, 8, 1, 'horizontal')) {
    console.log('successfully placed ship');
}

const cpu = new Player();
cpu.gameBoard = new Gameboard();
cpu.gameBoard.hitBoard = cpu.gameBoard.createBoard();
cpu.gameBoard.shipBoard = cpu.gameBoard.createBoard();

if (cpu.gameBoard.placeShip(cpu.gameBoard.shipBoard, 0, 0, 5, 'horizontal')) {
    console.log('successfully placed ship');
}
if (cpu.gameBoard.placeShip(cpu.gameBoard.shipBoard, 1, 1, 4, 'vertical')) {
    console.log('successfully placed ship');
}
if (cpu.gameBoard.placeShip(cpu.gameBoard.shipBoard, 6, 6, 3, 'vertical')) {
    console.log('successfully placed ship');
}
if (cpu.gameBoard.placeShip(cpu.gameBoard.shipBoard, 5, 4, 2, 'horizontal')) {
    console.log('successfully placed ship');
}
if (cpu.gameBoard.placeShip(cpu.gameBoard.shipBoard, 3, 3, 1, 'horizontal')) {
    console.log('successfully placed ship');
}

const body = document.querySelector('body');
const outer = document.createElement('div');
outer.classList.add('outer');
body.appendChild(outer);
const title = document.createElement('h1');
title.classList.add('title');
outer.appendChild(title);
title.textContent = `BATTLESHIP`;

const gameContainer = document.createElement('div');
gameContainer.classList.add('gameContainer');
outer.appendChild(gameContainer);

const boardSize = 10;

const myShipBoard = document.createElement('div');
myShipBoard.classList.add('myShipBoard');
gameContainer.appendChild(myShipBoard);

for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
        const cell = document.createElement('div');
        cell.classList.add('myShipBoardCell');
        myShipBoard.appendChild(cell);
        if (player.gameBoard.shipBoard[i][j] instanceof Ship) {
            cell.style.backgroundColor = 'slategray';
        }
        else {
            cell.style.backgroundColor = 'lightblue'
        }
    }
}

const enemyHitBoard = document.createElement('div');
enemyHitBoard.classList.add('enemyHitBoard');
gameContainer.appendChild(enemyHitBoard);

for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
        const cell = document.createElement('div');
        cell.classList.add('enemyHitBoardCell');
        enemyHitBoard.appendChild(cell);
        cell.addEventListener('click', function () {
            cpu.gameBoard.receiveAttack(i, j);
            if (cpu.gameBoard.hitBoard[i][j] === 0) {
                cell.style.transition = '1s';
                cell.style.opacity = '0.5';
            }
            else if (cpu.gameBoard.hitBoard[i][j] === 1) {
                cell.style.transition = '1s';
                cell.style.backgroundColor = 'red'
            }
            else if (cpu.gameBoard.hitBoard[i][j] === null) {
                cell.style.transition = '1s';
                cell.style.backgroundColor = 'lightblue'
            }
            if (cpu.gameBoard.allSunk()) {
                endGame();
            }
            else { cpuAttack(); }
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

const cpuAttack = () => {
    let x;
    let y;
    do {
        x = Math.floor(Math.random() * boardSize);
        y = Math.floor(Math.random() * boardSize);
    } while (player.gameBoard.receiveAttack(x, y) === false);
    const myShipBoardCells = document.querySelectorAll('.myShipBoardCell');
    if (player.gameBoard.hitBoard[x][y] === 1) {
        myShipBoardCells[x * 10 + y].style.backgroundColor = 'red';
        myShipBoardCells[x * 10 + y].style.transition = '1s';
    }
    else {
        myShipBoardCells[x * 10 + y].style.opacity = '0.5';
        myShipBoardCells[x * 10 + y].style.transition = '1s';
    }
    if (player.gameBoard.allSunk()) {
        endGame();
    }
}

const endGame = () => {
}