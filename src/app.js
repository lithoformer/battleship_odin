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
        if (x + length > this.size && orientation === 'vertical') {
            return false;
        }
        else if (y + length > this.size && orientation === 'horizontal') {
            return false;
        }
        else if (this.checkPlacement(board, x, y, length, orientation)) {
            const newShip = new Ship(length, orientation);
            this.ships.push(newShip);
            for (let i = 0; i < length; i++) {
                if (orientation === 'vertical') {
                    board[x + i][y] = newShip;
                }
                else if (orientation === 'horizontal') {
                    board[x][y + i] = newShip;
                }
            }
            return true;
        }
        else {
            return false;
        }
    }

    checkPlacement(board, x, y, length, orientation) {
        for (let i = 0; i < length; i++) {
            if (orientation === 'vertical') {
                if (board[x + i] === undefined) {
                    return false;
                }
                else if (board[x + i][y] !== null) {
                    return false;
                }
            }
            else if (orientation === 'horizontal') {
                if (board[x] === undefined) {
                    return false;
                }
                else if (board[x][y + i] !== null) {
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

class Computer extends Player {
    constructor() {
        super();
        this.cpuHits = [];
        this.cpuAttacks = [];
        this.AIdata = { coords: null, orientation: null };
    }

    cpuAttack = (player) => {
        let x = null;
        let y = null;
        let AIhit = false;
        do {
            if (this.cpuAttacks.length === 0) {
                break;
            }
            else {
                const AIcoords = this.cpuAttacks.shift();
                x = AIcoords[0];
                y = AIcoords[1];
                AIhit = player.gameBoard.receiveAttack(x, y);
            }
        } while (!AIhit);
        if (!AIhit) {
            do {
                x = Math.floor(Math.random() * player.gameBoard.size);
                y = Math.floor(Math.random() * player.gameBoard.size);
            } while (player.gameBoard.receiveAttack(x, y) === false);
        }
        const myShipBoardCells = document.querySelectorAll('.myShipBoardCell');
        if (player.gameBoard.hitBoard[x][y] === 1 && player.gameBoard.shipBoard[x][y].isSunk() === false) {
            this.cpuHits.push([x, y]);
            if (this.cpuHits.length > 1) {
                for (const hit1 of this.cpuHits) {
                    for (const hit2 of this.cpuHits) {
                        if (hit1[0] === hit2[0] && hit1 !== hit2) {
                            this.AIdata.orientation = 'horizontal';
                            this.AIdata.coords = hit1[0];
                        }
                        if (hit1[1] === hit2[1] && hit1 !== hit2) {
                            this.AIdata.orientation = 'vertical';
                            this.AIdata.coords = hit1[1];
                        }
                    }
                }
            }

            if (x - 1 >= 0 && player.gameBoard.hitBoard[x - 1][y] === null && this.AIdata.orientation && this.AIdata.orientation === 'vertical') {
                this.cpuAttacks.push([x - 1, y]);
                this.cpuAttacks.splice(0, this.cpuAttacks.length, ...this.cpuAttacks.filter((attack) => attack[1] === this.AIdata.coords));
            }
            else if (x - 1 >= 0 && player.gameBoard.hitBoard[x - 1][y] === null && this.AIdata.orientation === null) {
                this.cpuAttacks.push([x - 1, y]);
            }
            if (x + 1 < player.gameBoard.size && player.gameBoard.hitBoard[x + 1][y] === null && this.AIdata.orientation && this.AIdata.orientation === 'vertical') {
                this.cpuAttacks.push([x + 1, y]);
                this.cpuAttacks.splice(0, this.cpuAttacks.length, ...this.cpuAttacks.filter((attack) => attack[1] === this.AIdata.coords));
            }
            else if (x + 1 < player.gameBoard.size && player.gameBoard.hitBoard[x + 1][y] === null && this.AIdata.orientation === null) {
                this.cpuAttacks.push([x + 1, y]);
            }
            if (y - 1 >= 0 && player.gameBoard.hitBoard[x][y - 1] === null && this.AIdata.orientation && this.AIdata.orientation === 'horizontal') {
                this.cpuAttacks.push([x, y - 1]);
                this.cpuAttacks.splice(0, this.cpuAttacks.length, ...this.cpuAttacks.filter((attack) => attack[0] === this.AIdata.coords));
            }
            else if (y - 1 >= 0 && player.gameBoard.hitBoard[x][y - 1] === null && this.AIdata.orientation === null) {
                this.cpuAttacks.push([x, y - 1]);
            }
            if (y + 1 < player.gameBoard.size && player.gameBoard.hitBoard[x][y + 1] === null && this.AIdata.orientation && this.AIdata.orientation === 'horizontal') {
                this.cpuAttacks.push([x, y + 1]);
                this.cpuAttacks.splice(0, this.cpuAttacks.length, ...this.cpuAttacks.filter((attack) => attack[0] === this.AIdata.coords));
            }
            else if (y + 1 < player.gameBoard.size && player.gameBoard.hitBoard[x][y + 1] === null && this.AIdata.orientation === null) {
                this.cpuAttacks.push([x, y + 1]);
            }
            myShipBoardCells[x * player.gameBoard.size + y].style.backgroundColor = 'red';
            myShipBoardCells[x * player.gameBoard.size + y].style.transition = '1s';
        }
        else if (player.gameBoard.hitBoard[x][y] === 1 && player.gameBoard.shipBoard[x][y].isSunk() === true) {
            this.cpuAttacks.splice(0, this.cpuAttacks.length);
            this.cpuHits.splice(0, this.cpuHits.length);
            this.AIdata.orientation = null;
            this.AIdata.coords = null;
            myShipBoardCells[x * player.gameBoard.size + y].style.backgroundColor = 'red';
            myShipBoardCells[x * player.gameBoard.size + y].style.transition = '1s';
        }
        else {
            myShipBoardCells[x * player.gameBoard.size + y].style.opacity = '0.5';
            myShipBoardCells[x * player.gameBoard.size + y].style.transition = '1s';
        }
        // if (player.gameBoard.allSunk()) {
        //     endGame('cpu');
        // }
    }
}

export { Computer, Player, Ship, Gameboard };

// module.exports.Player = Player;
// module.exports.Ship = Ship;
// module.exports.Gameboard = Gameboard;