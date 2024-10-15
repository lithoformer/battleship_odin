/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/***/ ((module) => {

eval("class Ship {\n    constructor(length, orientation) {\n        this.length = length;\n        this.timesHit = 0;\n        this.sunk = false;\n        this.orientation = orientation;\n    }\n    hit() {\n        this.timesHit++;\n        return this.timesHit;\n    }\n    isSunk() {\n        if (this.timesHit === this.length) {\n            this.sunk = true;\n            return this.sunk;\n        } else {\n            this.sunk = false;\n            return this.sunk;\n        }\n    }\n}\n\nclass Gameboard {\n    constructor() {\n        this.hitBoard = [];\n        this.shipBoard = [];\n        this.size = 10;\n        this.ships = [];\n    }\n\n    createBoard() {\n        const board = [];\n        for (let i = 0; i < this.size; i++) {\n            board[i] = new Array(this.size).fill(null);\n        }\n        return board;\n    }\n\n    placeShip(board, x, y, length, orientation) {\n        if (x + length > this.size && orientation === 'horizontal') {\n            return false;\n        }\n        else if (y + length > this.size && orientation === 'vertical') {\n            return false;\n        }\n        else if (this.checkPlacement(board, x, y, length, orientation)) {\n            const newShip = new Ship(length, orientation);\n            this.ships.push[newShip];\n            for (let i = 0; i < length; i++) {\n                if (orientation === 'horizontal') {\n                    board[x + i][y] = newShip;\n                }\n                else if (orientation === 'vertical') {\n                    board[x][y + i] = newShip;\n                }\n            }\n            return newShip;\n        }\n        else {\n            return false;\n        }\n    }\n\n    checkPlacement(board, x, y, length, orientation) {\n        for (let i = 0; i < length; i++) {\n            if (orientation === 'horizontal') {\n                if (board[x + i][y] !== null) {\n                    return false;\n                }\n            }\n            else if (orientation === 'vertical') {\n                if (board[x][y + i] !== null) {\n                    return false;\n                }\n            }\n        }\n        return true;\n    }\n\n    receiveAttack(x, y) {\n        if (this.hitBoard[x][y] !== null) {\n            return false;\n        } else if (this.shipBoard[x][y] instanceof Ship && this.shipBoard[x][y].sunk === false && this.hitBoard[x][y] === null) {\n            this.shipBoard[x][y].timesHit++;\n            this.hitBoard[x][y] = 1;\n            return this.shipBoard[x][y].isSunk();\n        } else {\n            this.hitBoard[x][y] = 0;\n            return false;\n        }\n    }\n\n    allSunk() {\n        for (item of this.ships) {\n            if (item.sunk === false) {\n                return false;\n            }\n        }\n        return true;\n    }\n}\n\nmodule.exports.Ship = Ship;\nmodule.exports.Gameboard = Gameboard;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hcHAuanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdCQUF3QixlQUFlO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFlBQVk7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0IsWUFBWTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUI7QUFDbkIsd0JBQXdCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcF9vZGluLy4vYXBwLmpzPzlhNzgiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgU2hpcCB7XG4gICAgY29uc3RydWN0b3IobGVuZ3RoLCBvcmllbnRhdGlvbikge1xuICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICAgICAgdGhpcy50aW1lc0hpdCA9IDA7XG4gICAgICAgIHRoaXMuc3VuayA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG4gICAgfVxuICAgIGhpdCgpIHtcbiAgICAgICAgdGhpcy50aW1lc0hpdCsrO1xuICAgICAgICByZXR1cm4gdGhpcy50aW1lc0hpdDtcbiAgICB9XG4gICAgaXNTdW5rKCkge1xuICAgICAgICBpZiAodGhpcy50aW1lc0hpdCA9PT0gdGhpcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc3VuayA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdW5rO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdW5rID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdW5rO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5jbGFzcyBHYW1lYm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmhpdEJvYXJkID0gW107XG4gICAgICAgIHRoaXMuc2hpcEJvYXJkID0gW107XG4gICAgICAgIHRoaXMuc2l6ZSA9IDEwO1xuICAgICAgICB0aGlzLnNoaXBzID0gW107XG4gICAgfVxuXG4gICAgY3JlYXRlQm9hcmQoKSB7XG4gICAgICAgIGNvbnN0IGJvYXJkID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaXplOyBpKyspIHtcbiAgICAgICAgICAgIGJvYXJkW2ldID0gbmV3IEFycmF5KHRoaXMuc2l6ZSkuZmlsbChudWxsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYm9hcmQ7XG4gICAgfVxuXG4gICAgcGxhY2VTaGlwKGJvYXJkLCB4LCB5LCBsZW5ndGgsIG9yaWVudGF0aW9uKSB7XG4gICAgICAgIGlmICh4ICsgbGVuZ3RoID4gdGhpcy5zaXplICYmIG9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh5ICsgbGVuZ3RoID4gdGhpcy5zaXplICYmIG9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5jaGVja1BsYWNlbWVudChib2FyZCwgeCwgeSwgbGVuZ3RoLCBvcmllbnRhdGlvbikpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1NoaXAgPSBuZXcgU2hpcChsZW5ndGgsIG9yaWVudGF0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuc2hpcHMucHVzaFtuZXdTaGlwXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAob3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgICAgICAgICBib2FyZFt4ICsgaV1beV0gPSBuZXdTaGlwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChvcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICAgICAgICAgICAgICBib2FyZFt4XVt5ICsgaV0gPSBuZXdTaGlwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXdTaGlwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hlY2tQbGFjZW1lbnQoYm9hcmQsIHgsIHksIGxlbmd0aCwgb3JpZW50YXRpb24pIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoYm9hcmRbeCArIGldW3ldICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChvcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICAgICAgICAgIGlmIChib2FyZFt4XVt5ICsgaV0gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZWNlaXZlQXR0YWNrKHgsIHkpIHtcbiAgICAgICAgaWYgKHRoaXMuaGl0Qm9hcmRbeF1beV0gIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNoaXBCb2FyZFt4XVt5XSBpbnN0YW5jZW9mIFNoaXAgJiYgdGhpcy5zaGlwQm9hcmRbeF1beV0uc3VuayA9PT0gZmFsc2UgJiYgdGhpcy5oaXRCb2FyZFt4XVt5XSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5zaGlwQm9hcmRbeF1beV0udGltZXNIaXQrKztcbiAgICAgICAgICAgIHRoaXMuaGl0Qm9hcmRbeF1beV0gPSAxO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hpcEJvYXJkW3hdW3ldLmlzU3VuaygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oaXRCb2FyZFt4XVt5XSA9IDA7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhbGxTdW5rKCkge1xuICAgICAgICBmb3IgKGl0ZW0gb2YgdGhpcy5zaGlwcykge1xuICAgICAgICAgICAgaWYgKGl0ZW0uc3VuayA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cy5TaGlwID0gU2hpcDtcbm1vZHVsZS5leHBvcnRzLkdhbWVib2FyZCA9IEdhbWVib2FyZDsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./app.js\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./app.js");
/******/ 	
/******/ })()
;