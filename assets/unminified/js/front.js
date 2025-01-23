/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./inc/support/modules/cookies/src/scss/index.scss":
/*!*********************************************************!*\
  !*** ./inc/support/modules/cookies/src/scss/index.scss ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*****************************************************!*\
  !*** ./inc/support/modules/cookies/src/js/front.js ***!
  \*****************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../scss/index.scss */ "./inc/support/modules/cookies/src/scss/index.scss");
/**
 * --------------------------------------------------------------------------
 * Cookies Module
 *
 * @author 	Zied Jridet
 * @version 1.0.0
 * --------------------------------------------------------------------------
 */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((function (glimfse) {
  const {
    Events,
    Selector,
    isDevMode
  } = glimfse;
  const {
    classes = [],
    cookiePath = '/',
    toast: {},
    cookies: {
      necessary = '',
      necessaryPrefix = '',
      expire: expireTime = 30,
      block: cookieBlock = false
    } = {}
  } = glimfseSupportModulesCookies || {};
  const cookiesForm = Selector.findOne('form[name="wp-cookies"]');
  const necessaryArray = necessary.split(',').map(c => c.trim());
  const necessaryPrefixArray = necessaryPrefix.split(',').map(c => c.trim());
  const Cookies = {
    get(name) {
      const cookies = document.cookie.split('; ').map(c => c.split('=')).reduce((a, [b, c]) => ({
        ...a,
        [b]: c
      }), {});
      return cookies[name] ? decodeURIComponent(cookies[name]) : '';
    },
    set(name, value, expire = expireTime, path = cookiePath, domain) {
      const {
        protocol
      } = window.location;
      const domainString = domain ? `;domain=${domain}` : '';
      const isSecure = protocol === 'https:' ? ';secure' : '';
      const expireDate = new Date();
      expireDate.setTime(expireDate.getTime() + expire * 24 * 60 * 60 * 1000);
      const expires = `;expires=${expireDate.toUTCString()}`;
      const cookieString = `${name}=${value}${expires};path=${path}${domainString}${isSecure}`;
      document.cookie = cookieString;
    },
    remove(name) {
      if (Cookies.isNecessary(name)) {
        if (isDevMode) {
          console.warn(`Cookies :: Cannot remove necessary cookie: ${name}`);
        }
        return;
      }
      const {
        hostname
      } = window.location;
      Cookies.set(name, '', -1);
      Cookies.set(name, '', -1, '/');
      Cookies.set(name, '', -1, '/', hostname.startsWith('www') ? hostname.substring(3) : hostname);
    },
    removeMultiple(cookies = []) {
      cookies.forEach(Cookies.remove);
    },
    isNecessary(name) {
      return necessaryArray.includes(name) || necessaryPrefixArray.some(prefix => name.match('^' + prefix + '(|.+?)'));
    },
    getChoices() {
      let choices = [];
      if (!cookiesForm) {
        choices = document.cookie.split(';').map(cookie => cookie.split('=')[0].trim()).filter(c => !Cookies.isNecessary(c));
        const blockedCookies = Cookies.get('wp-cookies-blocked');
        if (blockedCookies) {
          choices = [...choices, blockedCookies.split(',').map(c => c.trim())];
        }
        return choices;
      }
      choices = Selector.find('input[name="wp-cookies[]"]:not(:disabled)', cookiesForm);
      return Array.from(choices).filter(({
        checked
      }) => checked === false).map(({
        value
      }) => value);
    },
    setChoices(value) {
      let choices = [];
      if (cookiesForm) {
        choices = Selector.find('input[name="wp-cookies[]"]:not(:disabled)', cookiesForm);
      }
      Cookies.set('wp-cookies-status', value);
      switch (value) {
        // Accept cookies
        case 'true':
          choices.map(field => field.checked = true);
          Cookies.set('wp-cookies-blocked', '');
          break;
        // Reject cookies
        case 'false':
          choices.map(field => field.checked = false);
          Cookies.set('wp-cookies-blocked', Cookies.getChoices().toString());
          break;
        // Update preferences
        case 'save':
          Cookies.set('wp-cookies-status', 'true');
          Cookies.set('wp-cookies-blocked', Cookies.getChoices().toString());
          Cookies.removeMultiple(Cookies.getChoices());
          break;
      }
    }
  };

  // Load events
  Events.on(document, 'DOMContentLoaded', () => {
    const cookie = Cookies.get('wp-cookies-status');

    // Respect user choices
    if (cookie) {
      var _Cookies$get;
      // Handle switches based on user preference.
      let blockedCookies = (_Cookies$get = Cookies.get('wp-cookies-blocked')) !== null && _Cookies$get !== void 0 ? _Cookies$get : [];
      if (blockedCookies) {
        blockedCookies = blockedCookies.split(',').map(c => c.trim());
        Cookies.removeMultiple(blockedCookies);
      }

      // Handle switches based on block (for cache).
      if (cookiesForm) {
        const choices = Selector.find('input[name="wp-cookies[]"]:not(:disabled)', cookiesForm);
        choices.map(field => field.checked = blockedCookies.includes(field.value) ? false : true);
      }
    } else {
      // Remove cookies if no preference.
      if (cookieBlock) {
        const cookies = document.cookie.split(';').map(cookie => cookie.split('=')[0].trim());
        Cookies.removeMultiple(cookies);
        Cookies.set('wp-cookies-blocked', cookies.filter(n => !Cookies.isNecessary(n)).toString());
      }

      // Adjust choices if form exists (for cache).
      if (cookiesForm) {
        const choices = Selector.find('input[name="wp-cookies[]"]:not(:disabled)', cookiesForm);
        choices.map(field => field.checked = cookieBlock ? false : true);
      }

      // Open cookies offcanvas.
      setTimeout(() => {
        Selector.findOne('#wp-cookies-toggle').click();
        console.log('WP Cookies: Undefined preferences.');
      }, 500);
    }
  });

  /**
   * @static
   * @memberof Component
   */
  glimfse.Cookies = Cookies;
}).apply(undefined, [window.glimfse]));
})();

/******/ })()
;
//# sourceMappingURL=front.js.map