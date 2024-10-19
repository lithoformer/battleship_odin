class Ship {
    constructor(length, orientation) {
        this.length = length;
        this.timesHit = 0;
        this.sunk = false;
        this.orientation = orientation;
    }
    hit() {
        this.timesHit++;
        return this.timesHit;
    }
    isSunk() {
        if (this.timesHit === this.length) {
            this.sunk = true;
            return this.sunk;
        } else {
            this.sunk = false;
            return this.sunk;
        }
    }
}

class Gameboard {
    constructor() {
        this.hitBoard = [];
        this.shipBoard = [];
        this.size = 10;
        this.ships = [];
    }

    createBoard() {
        const board = [];
        for (let i = 0; i < this.size; i++) {
            board[i] = new Array(this.size).fill(null);
        }
        return board;
    }

    placeShip(board, x, y, length, orientation) {
        if (x + length > this.size && orientation === 'horizontal') {
            return false;
        }
        else if (y + length > this.size && orientation === 'vertical') {
            return false;
        }
        else if (this.checkPlacement(board, x, y, length, orientation)) {
            const newShip = new Ship(length, orientation);
            this.ships.push(newShip);
            for (let i = 0; i < length; i++) {
                if (orientation === 'horizontal') {
                    board[x + i][y] = newShip;
                }
                else if (orientation === 'vertical') {
                    board[x][y + i] = newShip;
                }
            }
            return newShip;
        }
        else {
            return false;
        }
    }

    checkPlacement(board, x, y, length, orientation) {
        for (let i = 0; i < length; i++) {
            if (orientation === 'horizontal') {
                if (board[x + i][y] !== null) {
                    return false;
                }
            }
            else if (orientation === 'vertical') {
                if (board[x][y + i] !== null) {
                    return false;
                }
            }
        }
        return true;
    }

    receiveAttack(x, y) {
        if (x === null || y === null) {
            return false;
        }
        else if (this.hitBoard[x][y] !== null) {
            return false;
        }
        else if (this.shipBoard[x][y] instanceof Ship && this.shipBoard[x][y].sunk === false && this.hitBoard[x][y] === null) {
            this.shipBoard[x][y].timesHit++;
            this.hitBoard[x][y] = 1;
            this.shipBoard[x][y].isSunk();
            return true;
        } else {
            this.hitBoard[x][y] = 0;
            return true;
        }
    }

    allSunk() {
        for (const item of this.ships) {
            if (!item.sunk) {
                return false;
            }
        }
        return true;
    }
}

class Player {
    constructor() {
        this.gameBoard = null;
    }
}

export { Player, Ship, Gameboard };

// module.exports.Player = Player;
// module.exports.Ship = Ship;
// module.exports.Gameboard = Gameboard;