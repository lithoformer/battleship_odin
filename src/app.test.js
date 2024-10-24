// const Ship = require('./app.js');
// const Gameboard = require('./app.js');

import { Ship } from './app.js';
import { Gameboard } from './app.js';

const battleShip = new Ship.Ship(5, 'horizontal');

test('get ship length', () => {
    expect(battleShip.length).toBe(5);
})

test('ship gets hit', () => {
    battleShip.hit();
    expect(battleShip.timesHit).toBe(1);
})

test('ship sunk', () => {
    battleShip.hit();
    battleShip.hit();
    battleShip.hit();
    battleShip.hit();
    expect(battleShip.isSunk()).toBe(true);
})

const newBoard = new Gameboard.Gameboard();

test('test gameboard', () => {
    expect(newBoard.createBoard()).toBeInstanceOf(Array);
})

newBoard.shipBoard = newBoard.createBoard();
newBoard.hitBoard = newBoard.createBoard();


test('check bad ship placement', () => {
    expect(newBoard.placeShip(newBoard.shipBoard, 8, 8, 5, 'horizontal')).toBeFalsy();
})

test('check good ship placement', () => {
    expect(newBoard.placeShip(newBoard.shipBoard, 0, 0, 5, 'horizontal')).toBeTruthy();
})

test('test ship location', () => {
    expect(newBoard.shipBoard[0][0] instanceof Ship.Ship).toBeTruthy();
})

test('receive attacks', () => {
    newBoard.receiveAttack(0, 0);
    expect(newBoard.hitBoard[0][0]).toBe(1);
})

test('ship sunk', () => {
    newBoard.receiveAttack(1, 0);
    newBoard.receiveAttack(2, 0);
    newBoard.receiveAttack(3, 0);
    newBoard.receiveAttack(4, 0);
    expect(newBoard.allSunk()).toBeTruthy();
})