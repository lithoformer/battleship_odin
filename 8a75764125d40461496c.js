class Ship {
    constructor(length) {
        this.length = length;
        this.timesHit = 0;
        this.sunk = false;
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

export { Ship }