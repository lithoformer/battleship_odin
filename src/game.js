import { Ship, Gameboard, Player } from './app.js';

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

const cpu = new Player(new Gameboard());
cpu.gameBoard = new Gameboard();
cpu.gameBoard.hitBoard = cpu.gameBoard.createBoard();
cpu.gameBoard.shipBoard = cpu.gameBoard.createBoard();