// const { test } = require('media-typer');
const Ship = require('./app.js');
const Gameboard = require('./app.js');
// const { default: expect } = require('expect');

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

const newBoard = new Gameboard.Gameboard;

test('test gameboard', () => {
    expect(newBoard.createBoard()).toBeInstanceOf(Array);
})

const shipBoard = newBoard.createBoard();

test('check bad ship placement', () => {
    expect(newBoard.placeShip(shipBoard, 8, 8, 5, 'horizontal')).toBeFalsy();
})

test('check good ship placement', () => {
    expect(newBoard.placeShip(shipBoard, 0, 0, 5, 'horizontal')).toBeTruthy();
})