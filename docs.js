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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 72);
/******/ })
/************************************************************************/
/******/ ({

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(73);

__webpack_require__(74);

/* ====================================== *\
 * DO NOT INCLUDE IN DISTRIBUTED ASSETS!! *
\* ====================================== */

// Demonstrate BS3 Tooltips
$(function () {
    $('[data-toggle="tooltip"]').tooltip({
        container: 'body'
    });
});

/***/ }),

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (document.getElementById('vue-boxDemo')) {
    new Vue({
        el: '#vue-boxDemo',
        data: {
            size: {
                label: 'Medium',
                value: 'hxBox-md'
            },
            sizes: [{ value: 'hxBox-xs', label: 'Extra Small' }, { value: 'hxBox-sm', label: 'Small' }, { value: 'hxBox-md', label: 'Medium' }, { value: 'hxBox-lg', label: 'Large' }, { value: 'hxBox-xl', label: 'Extra Large' }]
        }
    });
}

/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (document.getElementById('vue-panelDemo')) {
    new Vue({
        el: '#vue-panelDemo',
        data: {
            hasHead: true,
            hasFoot: true
        }
    });
}

/***/ })

/******/ });