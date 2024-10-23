import { rest } from 'lodash';
import { Computer, Ship, Gameboard, Player } from './app.js';
import "./style.css"

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

const enemyHitBoard = document.createElement('div');
enemyHitBoard.classList.add('enemyHitBoard');
gameContainer.appendChild(enemyHitBoard);

const player = new Player();
player.gameBoard = new Gameboard();
player.gameBoard.hitBoard = player.gameBoard.createBoard();

const cpu = new Computer();
cpu.gameBoard = new Gameboard();
cpu.gameBoard.hitBoard = cpu.gameBoard.createBoard();
cpu.gameBoard.shipBoard = cpu.gameBoard.createBoard();

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

    for (let i = 0; i < cpu.gameBoard.size; i++) {
        for (let j = 0; j < cpu.gameBoard.size; j++) {
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
                    else { cpu.cpuAttack(player); }
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
});

function restart() {
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
            success = cpu.gameBoard.placeShip(cpu.gameBoard.shipBoard, Math.floor(Math.random() * cpu.gameBoard.size), Math.floor(Math.random() * cpu.gameBoard.size), i, orientation);
        } while (!success);
    }

    for (let i = 0; i < player.gameBoard.size; i++) {
        for (let j = 0; j < player.gameBoard.size; j++) {
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
        ship.addEventListener('touchend', () => {
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
};

const endGame = (winner) => {
    if (winner === 'player') {
        status.textContent = 'GAME OVER! PLAYER WINS!';
    }
    else if (winner === 'cpu') {
        status.textContent = 'GAME OVER! CPU WINS!';
    }
    const myShipBoardCells = document.querySelectorAll('.myShipBoardCell');
    for (const cell of myShipBoardCells) {
        cell.remove();
    }
    const enemyHitBoardCells = document.querySelectorAll('.enemyHitBoardCell');
    for (const cell of enemyHitBoardCells) {
        cell.remove();
    }
    startBtn.textContent = 'NEW GAME';
    player.gameBoard.reset();
    cpu.gameBoard.reset();
    restart();
}

restart();

export { endGame };