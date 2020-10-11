/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/cursor.js":
/*!***********************!*\
  !*** ./src/cursor.js ***!
  \***********************/
/*! exports provided: cursor, chosenShape, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cursor\", function() { return cursor; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"chosenShape\", function() { return chosenShape; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return drawCursor; });\n/* harmony import */ var _shapes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shapes.js */ \"./src/shapes.js\");\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./globals */ \"./src/globals.js\");\n\r\n\r\n\r\nconst cursorCtx = document.createElement(\"canvas\").getContext(\"2d\");\r\ncursorCtx.canvas.width = _globals__WEBPACK_IMPORTED_MODULE_1__[\"W\"];\r\ncursorCtx.canvas.height = _globals__WEBPACK_IMPORTED_MODULE_1__[\"H\"];\r\n\r\nconst cursor = {x: 0, y: 0};\r\nlet chosenShape = _globals__WEBPACK_IMPORTED_MODULE_1__[\"Shapes\"].KITE;\r\n\r\nlet k = new _shapes_js__WEBPACK_IMPORTED_MODULE_0__[\"Kite\"](0, 0);\r\nlet d = new _shapes_js__WEBPACK_IMPORTED_MODULE_0__[\"Dart\"](0, 0);\r\nlet theta = 0;\r\n\r\nfunction drawCursor(ctx) {\r\n  cursorCtx.clearRect(0, 0, _globals__WEBPACK_IMPORTED_MODULE_1__[\"W\"], _globals__WEBPACK_IMPORTED_MODULE_1__[\"H\"]);\r\n  if (chosenShape == _globals__WEBPACK_IMPORTED_MODULE_1__[\"Shapes\"].KITE) {\r\n    k.x = cursor.x;\r\n    k.y = cursor.y;\r\n    k.draw(cursorCtx, theta, 50);\r\n  } else {\r\n    d.x = cursor.x;\r\n    d.y = cursor.y;\r\n    d.draw(cursorCtx, theta, 50);\r\n  }\r\n\r\n  ctx.drawImage(cursorCtx.canvas, 0, 0);\r\n}\r\n\r\nconst canvasClientRatio = 1;\r\ncanvas.addEventListener(\"mousemove\", e => {\r\n  cursor.x = e.offsetX * canvasClientRatio;\r\n  cursor.y = e.offsetY * canvasClientRatio;\r\n\r\n});\r\n\r\nwindow.addEventListener(\"mousewheel\", e => {\r\n  chosenShape = 1 - chosenShape;\r\n});\r\n\r\nwindow.addEventListener(\"keypress\", e => {\r\n  if      (e.key == \"q\") theta -= Math.PI / 5;\r\n  else if (e.key == \"e\") theta += Math.PI / 5;\r\n  else if (e.key == \"1\") chosenShape = _globals__WEBPACK_IMPORTED_MODULE_1__[\"Shapes\"].KITE;\r\n  else if (e.key == \"2\") chosenShape = _globals__WEBPACK_IMPORTED_MODULE_1__[\"Shapes\"].DART;\r\n});\r\n\r\n\n\n//# sourceURL=webpack:///./src/cursor.js?");

/***/ }),

/***/ "./src/floor.js":
/*!**********************!*\
  !*** ./src/floor.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return drawFloor; });\n/* harmony import */ var _shapes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shapes.js */ \"./src/shapes.js\");\n/* harmony import */ var _cursor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cursor.js */ \"./src/cursor.js\");\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./globals */ \"./src/globals.js\");\n\r\n\r\n\r\n\r\n\r\nconst tileCtx = document.createElement(\"canvas\").getContext(\"2d\");\r\ntileCtx.canvas.width = _globals__WEBPACK_IMPORTED_MODULE_2__[\"W\"];\r\ntileCtx.canvas.height = _globals__WEBPACK_IMPORTED_MODULE_2__[\"H\"];\r\n\r\nfunction drawFloor(ctx) {\r\n  ctx.drawImage(tileCtx.canvas, 0, 0);\r\n}\r\n\r\nwindow.addEventListener(\"mousedown\", () => {\r\n  Object(_cursor_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(tileCtx);\r\n});\r\n\r\nconst clearBtn = document.getElementById(\"clear-btn\");\r\nclearBtn.addEventListener(\"click\", () => tileCtx.clearRect(0, 0, _globals__WEBPACK_IMPORTED_MODULE_2__[\"W\"], _globals__WEBPACK_IMPORTED_MODULE_2__[\"H\"]))\r\n\n\n//# sourceURL=webpack:///./src/floor.js?");

/***/ }),

/***/ "./src/globals.js":
/*!************************!*\
  !*** ./src/globals.js ***!
  \************************/
/*! exports provided: W, H, Shapes, canvas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"W\", function() { return W; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"H\", function() { return H; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Shapes\", function() { return Shapes; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"canvas\", function() { return canvas; });\nconst W = 600;\r\nconst H = 600;\r\n\r\n\r\nconst Shapes = { KITE: 0, DART: 1 };\r\n\r\nconst canvas = document.getElementById(\"canvas\");\r\n\n\n//# sourceURL=webpack:///./src/globals.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _shapes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shapes.js */ \"./src/shapes.js\");\n/* harmony import */ var _cursor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cursor.js */ \"./src/cursor.js\");\n/* harmony import */ var _floor_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./floor.js */ \"./src/floor.js\");\n/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./globals */ \"./src/globals.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nconst visCtx = _globals__WEBPACK_IMPORTED_MODULE_3__[\"canvas\"].getContext(\"2d\");\r\nvisCtx.canvas.width = _globals__WEBPACK_IMPORTED_MODULE_3__[\"W\"];\r\nvisCtx.canvas.width = _globals__WEBPACK_IMPORTED_MODULE_3__[\"H\"];\r\n\r\n\r\nrequestAnimationFrame(tick);\r\n\r\nfunction tick() {\r\n  visCtx.clearRect(0, 0, _globals__WEBPACK_IMPORTED_MODULE_3__[\"W\"], _globals__WEBPACK_IMPORTED_MODULE_3__[\"H\"]);\r\n\r\n  Object(_floor_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(visCtx);\r\n  Object(_cursor_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(visCtx);\r\n\r\n  requestAnimationFrame(tick);\r\n}\r\n\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/shapes.js":
/*!***********************!*\
  !*** ./src/shapes.js ***!
  \***********************/
/*! exports provided: Kite, Dart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Kite\", function() { return Kite; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Dart\", function() { return Dart; });\n\r\nconst kiteVertices = [\r\n   0,        0        + .5,\r\n  -0.58779, -0.80902  + .5,\r\n   0,       -1        + .5,\r\n   0.58779, -0.80902  + .5,\r\n]\r\n\r\nconst dartVertices = [\r\n    0,        0      ,\r\n    0.58779,  0.19098,\r\n    0,       -0.61803,\r\n   -0.58779,  0.19098,\r\n]\r\n\r\nfunction drawVertices(ctx, vertices) {\r\n  ctx.moveTo(vertices[0], vertices[1]);\r\n  ctx.lineTo(vertices[2], vertices[3]);\r\n  ctx.lineTo(vertices[4], vertices[5]);\r\n  ctx.lineTo(vertices[6], vertices[7]);\r\n  ctx.fill();\r\n}\r\n\r\nconst pi = Math.PI;\r\nconst tau = 2 * pi;\r\n\r\nclass Kite {\r\n  constructor(x, y) {\r\n    this.x = x || 0;\r\n    this.y = y || 0;\r\n  }\r\n  draw(ctx, theta=0, scale=1) {\r\n    let {x, y} = this;\r\n    ctx.save();\r\n    ctx.translate(x, y);\r\n    ctx.rotate(theta);\r\n    ctx.scale(scale, scale);\r\n\r\n    ctx.beginPath();\r\n    ctx.fillStyle = \"lime\";\r\n    drawVertices(ctx, kiteVertices);\r\n\r\n    ctx.lineWidth = 5/scale;\r\n    ctx.beginPath();\r\n    ctx.strokeStyle=\"red\";\r\n    ctx.arc(0, -1 + .5, 1-0.61803, .1*pi, .9*pi);\r\n    ctx.stroke();\r\n\r\n    ctx.beginPath();\r\n    ctx.strokeStyle=\"blue\";\r\n    ctx.arc(0, 0 + .5, 0.61803, -.7*pi, -.3*pi);\r\n    ctx.stroke();\r\n\r\n    ctx.restore();\r\n  }\r\n}\r\n\r\nclass Dart {\r\n  constructor(x, y) {\r\n    this.x = x || 0;\r\n    this.y = y || 0;\r\n  }\r\n  draw(ctx, theta=0, scale=1) {\r\n    let {x, y} = this;\r\n    ctx.save();\r\n    ctx.translate(x, y);\r\n    ctx.rotate(theta);\r\n    ctx.scale(scale, scale);\r\n    \r\n    ctx.beginPath();\r\n    ctx.fillStyle = \"yellow\";\r\n    drawVertices(ctx, dartVertices);\r\n    \r\n    ctx.lineWidth = 5/scale;\r\n    ctx.beginPath();\r\n    ctx.strokeStyle=\"red\";\r\n    ctx.arc(0, 0, (1-0.61803)*0.61803, .9*pi, 2.1*pi);\r\n    ctx.stroke();\r\n\r\n    ctx.beginPath();\r\n    ctx.strokeStyle=\"blue\";\r\n    ctx.arc(0, -0.61803, 1-0.61803, .3*pi, .7*pi);\r\n    ctx.stroke();\r\n\r\n    ctx.restore();\r\n  }\r\n}\n\n//# sourceURL=webpack:///./src/shapes.js?");

/***/ })

/******/ });