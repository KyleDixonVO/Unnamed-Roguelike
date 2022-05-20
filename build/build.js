/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/ansi-html-community/index.js":
/*!***************************************************!*\
  !*** ./node_modules/ansi-html-community/index.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";


module.exports = ansiHTML

// Reference to https://github.com/sindresorhus/ansi-regex
var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/

var _defColors = {
  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]
  black: '000',
  red: 'ff0000',
  green: '209805',
  yellow: 'e8bf03',
  blue: '0000ff',
  magenta: 'ff00ff',
  cyan: '00ffee',
  lightgrey: 'f0f0f0',
  darkgrey: '888'
}
var _styles = {
  30: 'black',
  31: 'red',
  32: 'green',
  33: 'yellow',
  34: 'blue',
  35: 'magenta',
  36: 'cyan',
  37: 'lightgrey'
}
var _openTags = {
  '1': 'font-weight:bold', // bold
  '2': 'opacity:0.5', // dim
  '3': '<i>', // italic
  '4': '<u>', // underscore
  '8': 'display:none', // hidden
  '9': '<del>' // delete
}
var _closeTags = {
  '23': '</i>', // reset italic
  '24': '</u>', // reset underscore
  '29': '</del>' // reset delete
}

;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
  _closeTags[n] = '</span>'
})

/**
 * Converts text with ANSI color codes to HTML markup.
 * @param {String} text
 * @returns {*}
 */
function ansiHTML (text) {
  // Returns the text if the string has no ANSI escape code.
  if (!_regANSI.test(text)) {
    return text
  }

  // Cache opened sequence.
  var ansiCodes = []
  // Replace with markup.
  var ret = text.replace(/\033\[(\d+)m/g, function (match, seq) {
    var ot = _openTags[seq]
    if (ot) {
      // If current sequence has been opened, close it.
      if (!!~ansiCodes.indexOf(seq)) { // eslint-disable-line no-extra-boolean-cast
        ansiCodes.pop()
        return '</span>'
      }
      // Open tag.
      ansiCodes.push(seq)
      return ot[0] === '<' ? ot : '<span style="' + ot + ';">'
    }

    var ct = _closeTags[seq]
    if (ct) {
      // Pop sequence
      ansiCodes.pop()
      return ct
    }
    return ''
  })

  // Make sure tags are closed.
  var l = ansiCodes.length
  ;(l > 0) && (ret += Array(l + 1).join('</span>'))

  return ret
}

/**
 * Customize colors.
 * @param {Object} colors reference to _defColors
 */
ansiHTML.setColors = function (colors) {
  if (typeof colors !== 'object') {
    throw new Error('`colors` parameter must be an Object.')
  }

  var _finalColors = {}
  for (var key in _defColors) {
    var hex = colors.hasOwnProperty(key) ? colors[key] : null
    if (!hex) {
      _finalColors[key] = _defColors[key]
      continue
    }
    if ('reset' === key) {
      if (typeof hex === 'string') {
        hex = [hex]
      }
      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
        return typeof h !== 'string'
      })) {
        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000')
      }
      var defHexColor = _defColors[key]
      if (!hex[0]) {
        hex[0] = defHexColor[0]
      }
      if (hex.length === 1 || !hex[1]) {
        hex = [hex[0]]
        hex.push(defHexColor[1])
      }

      hex = hex.slice(0, 2)
    } else if (typeof hex !== 'string') {
      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000')
    }
    _finalColors[key] = hex
  }
  _setTags(_finalColors)
}

/**
 * Reset colors.
 */
ansiHTML.reset = function () {
  _setTags(_defColors)
}

/**
 * Expose tags, including open and close.
 * @type {Object}
 */
ansiHTML.tags = {}

if (Object.defineProperty) {
  Object.defineProperty(ansiHTML.tags, 'open', {
    get: function () { return _openTags }
  })
  Object.defineProperty(ansiHTML.tags, 'close', {
    get: function () { return _closeTags }
  })
} else {
  ansiHTML.tags.open = _openTags
  ansiHTML.tags.close = _closeTags
}

function _setTags (colors) {
  // reset all
  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]
  // inverse
  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]
  // dark grey
  _openTags['90'] = 'color:#' + colors.darkgrey

  for (var code in _styles) {
    var color = _styles[code]
    var oriColor = colors[color] || '000'
    _openTags[code] = 'color:#' + oriColor
    code = parseInt(code)
    _openTags[(code + 10).toString()] = 'background:#' + oriColor
  }
}

ansiHTML.reset()


/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ "./node_modules/createjs/builds/1.0.0/createjs.min.js":
/*!************************************************************!*\
  !*** ./node_modules/createjs/builds/1.0.0/createjs.min.js ***!
  \************************************************************/
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;/*** IMPORTS FROM imports-loader ***/

(function() {
/*!
* @license CreateJS
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2011-2015 gskinner.com, inc.
*
* Distributed under the terms of the MIT license.
* http://www.opensource.org/licenses/mit-license.html
*
* This notice shall be included in all copies or substantial portions of the Software.
*/
this.createjs=this.createjs||{},createjs.extend=function(a,b){"use strict";function c(){this.constructor=a}return c.prototype=b.prototype,a.prototype=new c},this.createjs=this.createjs||{},createjs.promote=function(a,b){"use strict";var c=a.prototype,d=Object.getPrototypeOf&&Object.getPrototypeOf(c)||c.__proto__;if(d){c[(b+="_")+"constructor"]=d.constructor;for(var e in d)c.hasOwnProperty(e)&&"function"==typeof d[e]&&(c[b+e]=d[e])}return a},this.createjs=this.createjs||{},createjs.indexOf=function(a,b){"use strict";for(var c=0,d=a.length;d>c;c++)if(b===a[c])return c;return-1},this.createjs=this.createjs||{},function(){"use strict";function a(){throw"UID cannot be instantiated"}a._nextID=0,a.get=function(){return a._nextID++},createjs.UID=a}(),this.createjs=this.createjs||{},createjs.deprecate=function(a,b){"use strict";return function(){var c="Deprecated property or method '"+b+"'. See docs for info.";return console&&(console.warn?console.warn(c):console.log(c)),a&&a.apply(this,arguments)}},this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c){this.type=a,this.target=null,this.currentTarget=null,this.eventPhase=0,this.bubbles=!!b,this.cancelable=!!c,this.timeStamp=(new Date).getTime(),this.defaultPrevented=!1,this.propagationStopped=!1,this.immediatePropagationStopped=!1,this.removed=!1}var b=a.prototype;b.preventDefault=function(){this.defaultPrevented=this.cancelable&&!0},b.stopPropagation=function(){this.propagationStopped=!0},b.stopImmediatePropagation=function(){this.immediatePropagationStopped=this.propagationStopped=!0},b.remove=function(){this.removed=!0},b.clone=function(){return new a(this.type,this.bubbles,this.cancelable)},b.set=function(a){for(var b in a)this[b]=a[b];return this},b.toString=function(){return"[Event (type="+this.type+")]"},createjs.Event=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(){this._listeners=null,this._captureListeners=null}var b=a.prototype;a.initialize=function(a){a.addEventListener=b.addEventListener,a.on=b.on,a.removeEventListener=a.off=b.removeEventListener,a.removeAllEventListeners=b.removeAllEventListeners,a.hasEventListener=b.hasEventListener,a.dispatchEvent=b.dispatchEvent,a._dispatchEvent=b._dispatchEvent,a.willTrigger=b.willTrigger},b.addEventListener=function(a,b,c){var d;d=c?this._captureListeners=this._captureListeners||{}:this._listeners=this._listeners||{};var e=d[a];return e&&this.removeEventListener(a,b,c),e=d[a],e?e.push(b):d[a]=[b],b},b.on=function(a,b,c,d,e,f){return b.handleEvent&&(c=c||b,b=b.handleEvent),c=c||this,this.addEventListener(a,function(a){b.call(c,a,e),d&&a.remove()},f)},b.removeEventListener=function(a,b,c){var d=c?this._captureListeners:this._listeners;if(d){var e=d[a];if(e)for(var f=0,g=e.length;g>f;f++)if(e[f]==b){1==g?delete d[a]:e.splice(f,1);break}}},b.off=b.removeEventListener,b.removeAllEventListeners=function(a){a?(this._listeners&&delete this._listeners[a],this._captureListeners&&delete this._captureListeners[a]):this._listeners=this._captureListeners=null},b.dispatchEvent=function(a,b,c){if("string"==typeof a){var d=this._listeners;if(!(b||d&&d[a]))return!0;a=new createjs.Event(a,b,c)}else a.target&&a.clone&&(a=a.clone());try{a.target=this}catch(e){}if(a.bubbles&&this.parent){for(var f=this,g=[f];f.parent;)g.push(f=f.parent);var h,i=g.length;for(h=i-1;h>=0&&!a.propagationStopped;h--)g[h]._dispatchEvent(a,1+(0==h));for(h=1;i>h&&!a.propagationStopped;h++)g[h]._dispatchEvent(a,3)}else this._dispatchEvent(a,2);return!a.defaultPrevented},b.hasEventListener=function(a){var b=this._listeners,c=this._captureListeners;return!!(b&&b[a]||c&&c[a])},b.willTrigger=function(a){for(var b=this;b;){if(b.hasEventListener(a))return!0;b=b.parent}return!1},b.toString=function(){return"[EventDispatcher]"},b._dispatchEvent=function(a,b){var c,d,e=2>=b?this._captureListeners:this._listeners;if(a&&e&&(d=e[a.type])&&(c=d.length)){try{a.currentTarget=this}catch(f){}try{a.eventPhase=0|b}catch(f){}a.removed=!1,d=d.slice();for(var g=0;c>g&&!a.immediatePropagationStopped;g++){var h=d[g];h.handleEvent?h.handleEvent(a):h(a),a.removed&&(this.off(a.type,h,1==b),a.removed=!1)}}2===b&&this._dispatchEvent(a,2.1)},createjs.EventDispatcher=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(){throw"Ticker cannot be instantiated."}a.RAF_SYNCHED="synched",a.RAF="raf",a.TIMEOUT="timeout",a.timingMode=null,a.maxDelta=0,a.paused=!1,a.removeEventListener=null,a.removeAllEventListeners=null,a.dispatchEvent=null,a.hasEventListener=null,a._listeners=null,createjs.EventDispatcher.initialize(a),a._addEventListener=a.addEventListener,a.addEventListener=function(){return!a._inited&&a.init(),a._addEventListener.apply(a,arguments)},a._inited=!1,a._startTime=0,a._pausedTime=0,a._ticks=0,a._pausedTicks=0,a._interval=50,a._lastTime=0,a._times=null,a._tickTimes=null,a._timerId=null,a._raf=!0,a._setInterval=function(b){a._interval=b,a._inited&&a._setupTick()},a.setInterval=createjs.deprecate(a._setInterval,"Ticker.setInterval"),a._getInterval=function(){return a._interval},a.getInterval=createjs.deprecate(a._getInterval,"Ticker.getInterval"),a._setFPS=function(b){a._setInterval(1e3/b)},a.setFPS=createjs.deprecate(a._setFPS,"Ticker.setFPS"),a._getFPS=function(){return 1e3/a._interval},a.getFPS=createjs.deprecate(a._getFPS,"Ticker.getFPS");try{Object.defineProperties(a,{interval:{get:a._getInterval,set:a._setInterval},framerate:{get:a._getFPS,set:a._setFPS}})}catch(b){console.log(b)}a.init=function(){a._inited||(a._inited=!0,a._times=[],a._tickTimes=[],a._startTime=a._getTime(),a._times.push(a._lastTime=0),a.interval=a._interval)},a.reset=function(){if(a._raf){var b=window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame;b&&b(a._timerId)}else clearTimeout(a._timerId);a.removeAllEventListeners("tick"),a._timerId=a._times=a._tickTimes=null,a._startTime=a._lastTime=a._ticks=a._pausedTime=0,a._inited=!1},a.getMeasuredTickTime=function(b){var c=0,d=a._tickTimes;if(!d||d.length<1)return-1;b=Math.min(d.length,b||0|a._getFPS());for(var e=0;b>e;e++)c+=d[e];return c/b},a.getMeasuredFPS=function(b){var c=a._times;return!c||c.length<2?-1:(b=Math.min(c.length-1,b||0|a._getFPS()),1e3/((c[0]-c[b])/b))},a.getTime=function(b){return a._startTime?a._getTime()-(b?a._pausedTime:0):-1},a.getEventTime=function(b){return a._startTime?(a._lastTime||a._startTime)-(b?a._pausedTime:0):-1},a.getTicks=function(b){return a._ticks-(b?a._pausedTicks:0)},a._handleSynch=function(){a._timerId=null,a._setupTick(),a._getTime()-a._lastTime>=.97*(a._interval-1)&&a._tick()},a._handleRAF=function(){a._timerId=null,a._setupTick(),a._tick()},a._handleTimeout=function(){a._timerId=null,a._setupTick(),a._tick()},a._setupTick=function(){if(null==a._timerId){var b=a.timingMode;if(b==a.RAF_SYNCHED||b==a.RAF){var c=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame;if(c)return a._timerId=c(b==a.RAF?a._handleRAF:a._handleSynch),void(a._raf=!0)}a._raf=!1,a._timerId=setTimeout(a._handleTimeout,a._interval)}},a._tick=function(){var b=a.paused,c=a._getTime(),d=c-a._lastTime;if(a._lastTime=c,a._ticks++,b&&(a._pausedTicks++,a._pausedTime+=d),a.hasEventListener("tick")){var e=new createjs.Event("tick"),f=a.maxDelta;e.delta=f&&d>f?f:d,e.paused=b,e.time=c,e.runTime=c-a._pausedTime,a.dispatchEvent(e)}for(a._tickTimes.unshift(a._getTime()-c);a._tickTimes.length>100;)a._tickTimes.pop();for(a._times.unshift(c);a._times.length>100;)a._times.pop()};var c=window,d=c.performance.now||c.performance.mozNow||c.performance.msNow||c.performance.oNow||c.performance.webkitNow;a._getTime=function(){return(d&&d.call(c.performance)||(new Date).getTime())-a._startTime},createjs.Ticker=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.readyState=a.readyState,this._video=a,this._canvas=null,this._lastTime=-1,this.readyState<2&&a.addEventListener("canplaythrough",this._videoReady.bind(this))}var b=a.prototype;b.getImage=function(){if(!(this.readyState<2)){var a=this._canvas,b=this._video;if(a||(a=this._canvas=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas"),a.width=b.videoWidth,a.height=b.videoHeight),b.readyState>=2&&b.currentTime!==this._lastTime){var c=a.getContext("2d");c.clearRect(0,0,a.width,a.height),c.drawImage(b,0,0,a.width,a.height),this._lastTime=b.currentTime}return a}},b._videoReady=function(){this.readyState=2},createjs.VideoBuffer=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c,d,e,f,g,h,i,j,k){this.Event_constructor(a,b,c),this.stageX=d,this.stageY=e,this.rawX=null==i?d:i,this.rawY=null==j?e:j,this.nativeEvent=f,this.pointerID=g,this.primary=!!h,this.relatedTarget=k}var b=createjs.extend(a,createjs.Event);b._get_localX=function(){return this.currentTarget.globalToLocal(this.rawX,this.rawY).x},b._get_localY=function(){return this.currentTarget.globalToLocal(this.rawX,this.rawY).y},b._get_isTouch=function(){return-1!==this.pointerID};try{Object.defineProperties(b,{localX:{get:b._get_localX},localY:{get:b._get_localY},isTouch:{get:b._get_isTouch}})}catch(c){}b.clone=function(){return new a(this.type,this.bubbles,this.cancelable,this.stageX,this.stageY,this.nativeEvent,this.pointerID,this.primary,this.rawX,this.rawY)},b.toString=function(){return"[MouseEvent (type="+this.type+" stageX="+this.stageX+" stageY="+this.stageY+")]"},createjs.MouseEvent=createjs.promote(a,"Event")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c,d,e,f){this.setValues(a,b,c,d,e,f)}var b=a.prototype;a.DEG_TO_RAD=Math.PI/180,a.identity=null,b.setValues=function(a,b,c,d,e,f){return this.a=null==a?1:a,this.b=b||0,this.c=c||0,this.d=null==d?1:d,this.tx=e||0,this.ty=f||0,this},b.append=function(a,b,c,d,e,f){var g=this.a,h=this.b,i=this.c,j=this.d;return(1!=a||0!=b||0!=c||1!=d)&&(this.a=g*a+i*b,this.b=h*a+j*b,this.c=g*c+i*d,this.d=h*c+j*d),this.tx=g*e+i*f+this.tx,this.ty=h*e+j*f+this.ty,this},b.prepend=function(a,b,c,d,e,f){var g=this.a,h=this.c,i=this.tx;return this.a=a*g+c*this.b,this.b=b*g+d*this.b,this.c=a*h+c*this.d,this.d=b*h+d*this.d,this.tx=a*i+c*this.ty+e,this.ty=b*i+d*this.ty+f,this},b.appendMatrix=function(a){return this.append(a.a,a.b,a.c,a.d,a.tx,a.ty)},b.prependMatrix=function(a){return this.prepend(a.a,a.b,a.c,a.d,a.tx,a.ty)},b.appendTransform=function(b,c,d,e,f,g,h,i,j){if(f%360)var k=f*a.DEG_TO_RAD,l=Math.cos(k),m=Math.sin(k);else l=1,m=0;return g||h?(g*=a.DEG_TO_RAD,h*=a.DEG_TO_RAD,this.append(Math.cos(h),Math.sin(h),-Math.sin(g),Math.cos(g),b,c),this.append(l*d,m*d,-m*e,l*e,0,0)):this.append(l*d,m*d,-m*e,l*e,b,c),(i||j)&&(this.tx-=i*this.a+j*this.c,this.ty-=i*this.b+j*this.d),this},b.prependTransform=function(b,c,d,e,f,g,h,i,j){if(f%360)var k=f*a.DEG_TO_RAD,l=Math.cos(k),m=Math.sin(k);else l=1,m=0;return(i||j)&&(this.tx-=i,this.ty-=j),g||h?(g*=a.DEG_TO_RAD,h*=a.DEG_TO_RAD,this.prepend(l*d,m*d,-m*e,l*e,0,0),this.prepend(Math.cos(h),Math.sin(h),-Math.sin(g),Math.cos(g),b,c)):this.prepend(l*d,m*d,-m*e,l*e,b,c),this},b.rotate=function(b){b*=a.DEG_TO_RAD;var c=Math.cos(b),d=Math.sin(b),e=this.a,f=this.b;return this.a=e*c+this.c*d,this.b=f*c+this.d*d,this.c=-e*d+this.c*c,this.d=-f*d+this.d*c,this},b.skew=function(b,c){return b*=a.DEG_TO_RAD,c*=a.DEG_TO_RAD,this.append(Math.cos(c),Math.sin(c),-Math.sin(b),Math.cos(b),0,0),this},b.scale=function(a,b){return this.a*=a,this.b*=a,this.c*=b,this.d*=b,this},b.translate=function(a,b){return this.tx+=this.a*a+this.c*b,this.ty+=this.b*a+this.d*b,this},b.identity=function(){return this.a=this.d=1,this.b=this.c=this.tx=this.ty=0,this},b.invert=function(){var a=this.a,b=this.b,c=this.c,d=this.d,e=this.tx,f=a*d-b*c;return this.a=d/f,this.b=-b/f,this.c=-c/f,this.d=a/f,this.tx=(c*this.ty-d*e)/f,this.ty=-(a*this.ty-b*e)/f,this},b.isIdentity=function(){return 0===this.tx&&0===this.ty&&1===this.a&&0===this.b&&0===this.c&&1===this.d},b.equals=function(a){return this.tx===a.tx&&this.ty===a.ty&&this.a===a.a&&this.b===a.b&&this.c===a.c&&this.d===a.d},b.transformPoint=function(a,b,c){return c=c||{},c.x=a*this.a+b*this.c+this.tx,c.y=a*this.b+b*this.d+this.ty,c},b.decompose=function(b){null==b&&(b={}),b.x=this.tx,b.y=this.ty,b.scaleX=Math.sqrt(this.a*this.a+this.b*this.b),b.scaleY=Math.sqrt(this.c*this.c+this.d*this.d);var c=Math.atan2(-this.c,this.d),d=Math.atan2(this.b,this.a),e=Math.abs(1-c/d);return 1e-5>e?(b.rotation=d/a.DEG_TO_RAD,this.a<0&&this.d>=0&&(b.rotation+=b.rotation<=0?180:-180),b.skewX=b.skewY=0):(b.skewX=c/a.DEG_TO_RAD,b.skewY=d/a.DEG_TO_RAD),b},b.copy=function(a){return this.setValues(a.a,a.b,a.c,a.d,a.tx,a.ty)},b.clone=function(){return new a(this.a,this.b,this.c,this.d,this.tx,this.ty)},b.toString=function(){return"[Matrix2D (a="+this.a+" b="+this.b+" c="+this.c+" d="+this.d+" tx="+this.tx+" ty="+this.ty+")]"},a.identity=new a,createjs.Matrix2D=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c,d,e){this.setValues(a,b,c,d,e)}var b=a.prototype;b.setValues=function(a,b,c,d,e){return this.visible=null==a?!0:!!a,this.alpha=null==b?1:b,this.shadow=c,this.compositeOperation=d,this.matrix=e||this.matrix&&this.matrix.identity()||new createjs.Matrix2D,this},b.append=function(a,b,c,d,e){return this.alpha*=b,this.shadow=c||this.shadow,this.compositeOperation=d||this.compositeOperation,this.visible=this.visible&&a,e&&this.matrix.appendMatrix(e),this},b.prepend=function(a,b,c,d,e){return this.alpha*=b,this.shadow=this.shadow||c,this.compositeOperation=this.compositeOperation||d,this.visible=this.visible&&a,e&&this.matrix.prependMatrix(e),this},b.identity=function(){return this.visible=!0,this.alpha=1,this.shadow=this.compositeOperation=null,this.matrix.identity(),this},b.clone=function(){return new a(this.alpha,this.shadow,this.compositeOperation,this.visible,this.matrix.clone())},createjs.DisplayProps=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b){this.setValues(a,b)}var b=a.prototype;b.setValues=function(a,b){return this.x=a||0,this.y=b||0,this},b.copy=function(a){return this.x=a.x,this.y=a.y,this},b.clone=function(){return new a(this.x,this.y)},b.toString=function(){return"[Point (x="+this.x+" y="+this.y+")]"},createjs.Point=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c,d){this.setValues(a,b,c,d)}var b=a.prototype;b.setValues=function(a,b,c,d){return this.x=a||0,this.y=b||0,this.width=c||0,this.height=d||0,this},b.extend=function(a,b,c,d){return c=c||0,d=d||0,a+c>this.x+this.width&&(this.width=a+c-this.x),b+d>this.y+this.height&&(this.height=b+d-this.y),a<this.x&&(this.width+=this.x-a,this.x=a),b<this.y&&(this.height+=this.y-b,this.y=b),this},b.pad=function(a,b,c,d){return this.x-=b,this.y-=a,this.width+=b+d,this.height+=a+c,this},b.copy=function(a){return this.setValues(a.x,a.y,a.width,a.height)},b.contains=function(a,b,c,d){return c=c||0,d=d||0,a>=this.x&&a+c<=this.x+this.width&&b>=this.y&&b+d<=this.y+this.height},b.union=function(a){return this.clone().extend(a.x,a.y,a.width,a.height)},b.intersection=function(b){var c=b.x,d=b.y,e=c+b.width,f=d+b.height;return this.x>c&&(c=this.x),this.y>d&&(d=this.y),this.x+this.width<e&&(e=this.x+this.width),this.y+this.height<f&&(f=this.y+this.height),c>=e||d>=f?null:new a(c,d,e-c,f-d)},b.intersects=function(a){return a.x<=this.x+this.width&&this.x<=a.x+a.width&&a.y<=this.y+this.height&&this.y<=a.y+a.height},b.isEmpty=function(){return this.width<=0||this.height<=0},b.clone=function(){return new a(this.x,this.y,this.width,this.height)},b.toString=function(){return"[Rectangle (x="+this.x+" y="+this.y+" width="+this.width+" height="+this.height+")]"},createjs.Rectangle=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c,d,e,f,g){a.addEventListener&&(this.target=a,this.overLabel=null==c?"over":c,this.outLabel=null==b?"out":b,this.downLabel=null==d?"down":d,this.play=e,this._isPressed=!1,this._isOver=!1,this._enabled=!1,a.mouseChildren=!1,this.enabled=!0,this.handleEvent({}),f&&(g&&(f.actionsEnabled=!1,f.gotoAndStop&&f.gotoAndStop(g)),a.hitArea=f))}var b=a.prototype;b._setEnabled=function(a){if(a!=this._enabled){var b=this.target;this._enabled=a,a?(b.cursor="pointer",b.addEventListener("rollover",this),b.addEventListener("rollout",this),b.addEventListener("mousedown",this),b.addEventListener("pressup",this),b._reset&&(b.__reset=b._reset,b._reset=this._reset)):(b.cursor=null,b.removeEventListener("rollover",this),b.removeEventListener("rollout",this),b.removeEventListener("mousedown",this),b.removeEventListener("pressup",this),b.__reset&&(b._reset=b.__reset,delete b.__reset))}},b.setEnabled=createjs.deprecate(b._setEnabled,"ButtonHelper.setEnabled"),b._getEnabled=function(){return this._enabled},b.getEnabled=createjs.deprecate(b._getEnabled,"ButtonHelper.getEnabled");try{Object.defineProperties(b,{enabled:{get:b._getEnabled,set:b._setEnabled}})}catch(c){}b.toString=function(){return"[ButtonHelper]"},b.handleEvent=function(a){var b,c=this.target,d=a.type;"mousedown"==d?(this._isPressed=!0,b=this.downLabel):"pressup"==d?(this._isPressed=!1,b=this._isOver?this.overLabel:this.outLabel):"rollover"==d?(this._isOver=!0,b=this._isPressed?this.downLabel:this.overLabel):(this._isOver=!1,b=this._isPressed?this.overLabel:this.outLabel),this.play?c.gotoAndPlay&&c.gotoAndPlay(b):c.gotoAndStop&&c.gotoAndStop(b)},b._reset=function(){var a=this.paused;this.__reset(),this.paused=a},createjs.ButtonHelper=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c,d){this.color=a||"black",this.offsetX=b||0,this.offsetY=c||0,this.blur=d||0}var b=a.prototype;a.identity=new a("transparent",0,0,0),b.toString=function(){return"[Shadow]"},b.clone=function(){return new a(this.color,this.offsetX,this.offsetY,this.blur)},createjs.Shadow=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.EventDispatcher_constructor(),this.complete=!0,this.framerate=0,this._animations=null,this._frames=null,this._images=null,this._data=null,this._loadCount=0,this._frameHeight=0,this._frameWidth=0,this._numFrames=0,this._regX=0,this._regY=0,this._spacing=0,this._margin=0,this._parseData(a)}var b=createjs.extend(a,createjs.EventDispatcher);b._getAnimations=function(){return this._animations.slice()},b.getAnimations=createjs.deprecate(b._getAnimations,"SpriteSheet.getAnimations");try{Object.defineProperties(b,{animations:{get:b._getAnimations}})}catch(c){}b.getNumFrames=function(a){if(null==a)return this._frames?this._frames.length:this._numFrames||0;var b=this._data[a];return null==b?0:b.frames.length},b.getAnimation=function(a){return this._data[a]},b.getFrame=function(a){var b;return this._frames&&(b=this._frames[a])?b:null},b.getFrameBounds=function(a,b){var c=this.getFrame(a);return c?(b||new createjs.Rectangle).setValues(-c.regX,-c.regY,c.rect.width,c.rect.height):null},b.toString=function(){return"[SpriteSheet]"},b.clone=function(){throw"SpriteSheet cannot be cloned."},b._parseData=function(a){var b,c,d,e;if(null!=a){if(this.framerate=a.framerate||0,a.images&&(c=a.images.length)>0)for(e=this._images=[],b=0;c>b;b++){var f=a.images[b];if("string"==typeof f){var g=f;f=document.createElement("img"),f.src=g}e.push(f),f.getContext||f.naturalWidth||(this._loadCount++,this.complete=!1,function(a,b){f.onload=function(){a._handleImageLoad(b)}}(this,g),function(a,b){f.onerror=function(){a._handleImageError(b)}}(this,g))}if(null==a.frames);else if(Array.isArray(a.frames))for(this._frames=[],e=a.frames,b=0,c=e.length;c>b;b++){var h=e[b];this._frames.push({image:this._images[h[4]?h[4]:0],rect:new createjs.Rectangle(h[0],h[1],h[2],h[3]),regX:h[5]||0,regY:h[6]||0})}else d=a.frames,this._frameWidth=d.width,this._frameHeight=d.height,this._regX=d.regX||0,this._regY=d.regY||0,this._spacing=d.spacing||0,this._margin=d.margin||0,this._numFrames=d.count,0==this._loadCount&&this._calculateFrames();if(this._animations=[],null!=(d=a.animations)){this._data={};var i;for(i in d){var j={name:i},k=d[i];if("number"==typeof k)e=j.frames=[k];else if(Array.isArray(k))if(1==k.length)j.frames=[k[0]];else for(j.speed=k[3],j.next=k[2],e=j.frames=[],b=k[0];b<=k[1];b++)e.push(b);else{j.speed=k.speed,j.next=k.next;var l=k.frames;e=j.frames="number"==typeof l?[l]:l.slice(0)}(j.next===!0||void 0===j.next)&&(j.next=i),(j.next===!1||e.length<2&&j.next==i)&&(j.next=null),j.speed||(j.speed=1),this._animations.push(i),this._data[i]=j}}}},b._handleImageLoad=function(a){0==--this._loadCount&&(this._calculateFrames(),this.complete=!0,this.dispatchEvent("complete"))},b._handleImageError=function(a){var b=new createjs.Event("error");b.src=a,this.dispatchEvent(b),0==--this._loadCount&&this.dispatchEvent("complete")},b._calculateFrames=function(){if(!this._frames&&0!=this._frameWidth){this._frames=[];var a=this._numFrames||1e5,b=0,c=this._frameWidth,d=this._frameHeight,e=this._spacing,f=this._margin;a:for(var g=0,h=this._images;g<h.length;g++)for(var i=h[g],j=i.width||i.naturalWidth,k=i.height||i.naturalHeight,l=f;k-f-d>=l;){for(var m=f;j-f-c>=m;){if(b>=a)break a;b++,this._frames.push({image:i,rect:new createjs.Rectangle(m,l,c,d),regX:this._regX,regY:this._regY}),m+=c+e}l+=d+e}this._numFrames=b}},createjs.SpriteSheet=createjs.promote(a,"EventDispatcher")}(),this.createjs=this.createjs||{},function(){"use strict";function a(){this.command=null,this._stroke=null,this._strokeStyle=null,this._oldStrokeStyle=null,this._strokeDash=null,this._oldStrokeDash=null,this._strokeIgnoreScale=!1,this._fill=null,this._instructions=[],this._commitIndex=0,this._activeInstructions=[],this._dirty=!1,this._storeIndex=0,this.clear()}var b=a.prototype,c=a;a.getRGB=function(a,b,c,d){return null!=a&&null==c&&(d=b,c=255&a,b=a>>8&255,a=a>>16&255),null==d?"rgb("+a+","+b+","+c+")":"rgba("+a+","+b+","+c+","+d+")"},a.getHSL=function(a,b,c,d){return null==d?"hsl("+a%360+","+b+"%,"+c+"%)":"hsla("+a%360+","+b+"%,"+c+"%,"+d+")"},a.BASE_64={A:0,B:1,C:2,D:3,E:4,F:5,G:6,H:7,I:8,J:9,K:10,L:11,M:12,N:13,O:14,P:15,Q:16,R:17,S:18,T:19,U:20,V:21,W:22,X:23,Y:24,Z:25,a:26,b:27,c:28,d:29,e:30,f:31,g:32,h:33,i:34,j:35,k:36,l:37,m:38,n:39,o:40,p:41,q:42,r:43,s:44,t:45,u:46,v:47,w:48,x:49,y:50,z:51,0:52,1:53,2:54,3:55,4:56,5:57,6:58,7:59,8:60,9:61,"+":62,"/":63},a.STROKE_CAPS_MAP=["butt","round","square"],a.STROKE_JOINTS_MAP=["miter","round","bevel"];var d=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");d.getContext&&(a._ctx=d.getContext("2d"),d.width=d.height=1),b._getInstructions=function(){return this._updateInstructions(),this._instructions},b.getInstructions=createjs.deprecate(b._getInstructions,"Graphics.getInstructions");try{Object.defineProperties(b,{instructions:{get:b._getInstructions}})}catch(e){}b.isEmpty=function(){return!(this._instructions.length||this._activeInstructions.length)},b.draw=function(a,b){this._updateInstructions();for(var c=this._instructions,d=this._storeIndex,e=c.length;e>d;d++)c[d].exec(a,b)},b.drawAsPath=function(a){this._updateInstructions();for(var b,c=this._instructions,d=this._storeIndex,e=c.length;e>d;d++)(b=c[d]).path!==!1&&b.exec(a)},b.moveTo=function(a,b){return this.append(new c.MoveTo(a,b),!0)},b.lineTo=function(a,b){return this.append(new c.LineTo(a,b))},b.arcTo=function(a,b,d,e,f){return this.append(new c.ArcTo(a,b,d,e,f))},b.arc=function(a,b,d,e,f,g){return this.append(new c.Arc(a,b,d,e,f,g))},b.quadraticCurveTo=function(a,b,d,e){return this.append(new c.QuadraticCurveTo(a,b,d,e))},b.bezierCurveTo=function(a,b,d,e,f,g){return this.append(new c.BezierCurveTo(a,b,d,e,f,g))},b.rect=function(a,b,d,e){return this.append(new c.Rect(a,b,d,e))},b.closePath=function(){return this._activeInstructions.length?this.append(new c.ClosePath):this},b.clear=function(){return this._instructions.length=this._activeInstructions.length=this._commitIndex=0,this._strokeStyle=this._oldStrokeStyle=this._stroke=this._fill=this._strokeDash=this._oldStrokeDash=null,this._dirty=this._strokeIgnoreScale=!1,this},b.beginFill=function(a){return this._setFill(a?new c.Fill(a):null)},b.beginLinearGradientFill=function(a,b,d,e,f,g){return this._setFill((new c.Fill).linearGradient(a,b,d,e,f,g))},b.beginRadialGradientFill=function(a,b,d,e,f,g,h,i){return this._setFill((new c.Fill).radialGradient(a,b,d,e,f,g,h,i))},b.beginBitmapFill=function(a,b,d){return this._setFill(new c.Fill(null,d).bitmap(a,b))},b.endFill=function(){return this.beginFill()},b.setStrokeStyle=function(a,b,d,e,f){return this._updateInstructions(!0),this._strokeStyle=this.command=new c.StrokeStyle(a,b,d,e,f),this._stroke&&(this._stroke.ignoreScale=f),this._strokeIgnoreScale=f,this},b.setStrokeDash=function(a,b){return this._updateInstructions(!0),this._strokeDash=this.command=new c.StrokeDash(a,b),this},b.beginStroke=function(a){return this._setStroke(a?new c.Stroke(a):null)},b.beginLinearGradientStroke=function(a,b,d,e,f,g){return this._setStroke((new c.Stroke).linearGradient(a,b,d,e,f,g))},b.beginRadialGradientStroke=function(a,b,d,e,f,g,h,i){return this._setStroke((new c.Stroke).radialGradient(a,b,d,e,f,g,h,i))},b.beginBitmapStroke=function(a,b){return this._setStroke((new c.Stroke).bitmap(a,b))},b.endStroke=function(){return this.beginStroke()},b.curveTo=b.quadraticCurveTo,b.drawRect=b.rect,b.drawRoundRect=function(a,b,c,d,e){return this.drawRoundRectComplex(a,b,c,d,e,e,e,e)},b.drawRoundRectComplex=function(a,b,d,e,f,g,h,i){return this.append(new c.RoundRect(a,b,d,e,f,g,h,i))},b.drawCircle=function(a,b,d){return this.append(new c.Circle(a,b,d))},b.drawEllipse=function(a,b,d,e){return this.append(new c.Ellipse(a,b,d,e))},b.drawPolyStar=function(a,b,d,e,f,g){return this.append(new c.PolyStar(a,b,d,e,f,g))},b.append=function(a,b){return this._activeInstructions.push(a),this.command=a,b||(this._dirty=!0),this},b.decodePath=function(b){for(var c=[this.moveTo,this.lineTo,this.quadraticCurveTo,this.bezierCurveTo,this.closePath],d=[2,2,4,6,0],e=0,f=b.length,g=[],h=0,i=0,j=a.BASE_64;f>e;){var k=b.charAt(e),l=j[k],m=l>>3,n=c[m];if(!n||3&l)throw"bad path data (@"+e+"): "+k;var o=d[m];m||(h=i=0),g.length=0,e++;for(var p=(l>>2&1)+2,q=0;o>q;q++){var r=j[b.charAt(e)],s=r>>5?-1:1;r=(31&r)<<6|j[b.charAt(e+1)],3==p&&(r=r<<6|j[b.charAt(e+2)]),r=s*r/10,q%2?h=r+=h:i=r+=i,g[q]=r,e+=p}n.apply(this,g)}return this},b.store=function(){return this._updateInstructions(!0),this._storeIndex=this._instructions.length,this},b.unstore=function(){return this._storeIndex=0,this},b.clone=function(){var b=new a;return b.command=this.command,b._stroke=this._stroke,b._strokeStyle=this._strokeStyle,b._strokeDash=this._strokeDash,b._strokeIgnoreScale=this._strokeIgnoreScale,b._fill=this._fill,b._instructions=this._instructions.slice(),b._commitIndex=this._commitIndex,b._activeInstructions=this._activeInstructions.slice(),b._dirty=this._dirty,b._storeIndex=this._storeIndex,b},b.toString=function(){return"[Graphics]"},b.mt=b.moveTo,b.lt=b.lineTo,b.at=b.arcTo,b.bt=b.bezierCurveTo,b.qt=b.quadraticCurveTo,b.a=b.arc,b.r=b.rect,b.cp=b.closePath,b.c=b.clear,b.f=b.beginFill,b.lf=b.beginLinearGradientFill,b.rf=b.beginRadialGradientFill,b.bf=b.beginBitmapFill,b.ef=b.endFill,b.ss=b.setStrokeStyle,b.sd=b.setStrokeDash,b.s=b.beginStroke,b.ls=b.beginLinearGradientStroke,b.rs=b.beginRadialGradientStroke,b.bs=b.beginBitmapStroke,b.es=b.endStroke,b.dr=b.drawRect,b.rr=b.drawRoundRect,b.rc=b.drawRoundRectComplex,b.dc=b.drawCircle,b.de=b.drawEllipse,b.dp=b.drawPolyStar,b.p=b.decodePath,b._updateInstructions=function(b){var c=this._instructions,d=this._activeInstructions,e=this._commitIndex;if(this._dirty&&d.length){c.length=e,c.push(a.beginCmd);var f=d.length,g=c.length;c.length=g+f;for(var h=0;f>h;h++)c[h+g]=d[h];this._fill&&c.push(this._fill),this._stroke&&(this._strokeDash!==this._oldStrokeDash&&c.push(this._strokeDash),this._strokeStyle!==this._oldStrokeStyle&&c.push(this._strokeStyle),b&&(this._oldStrokeStyle=this._strokeStyle,this._oldStrokeDash=this._strokeDash),c.push(this._stroke)),this._dirty=!1}b&&(d.length=0,this._commitIndex=c.length)},b._setFill=function(a){return this._updateInstructions(!0),this.command=this._fill=a,this},b._setStroke=function(a){return this._updateInstructions(!0),(this.command=this._stroke=a)&&(a.ignoreScale=this._strokeIgnoreScale),this},(c.LineTo=function(a,b){this.x=a,this.y=b}).prototype.exec=function(a){a.lineTo(this.x,this.y)},(c.MoveTo=function(a,b){this.x=a,this.y=b}).prototype.exec=function(a){a.moveTo(this.x,this.y)},(c.ArcTo=function(a,b,c,d,e){this.x1=a,this.y1=b,this.x2=c,this.y2=d,this.radius=e}).prototype.exec=function(a){a.arcTo(this.x1,this.y1,this.x2,this.y2,this.radius)},(c.Arc=function(a,b,c,d,e,f){this.x=a,this.y=b,this.radius=c,this.startAngle=d,this.endAngle=e,this.anticlockwise=!!f}).prototype.exec=function(a){a.arc(this.x,this.y,this.radius,this.startAngle,this.endAngle,this.anticlockwise)},(c.QuadraticCurveTo=function(a,b,c,d){this.cpx=a,this.cpy=b,this.x=c,this.y=d}).prototype.exec=function(a){a.quadraticCurveTo(this.cpx,this.cpy,this.x,this.y)},(c.BezierCurveTo=function(a,b,c,d,e,f){this.cp1x=a,this.cp1y=b,this.cp2x=c,this.cp2y=d,this.x=e,this.y=f}).prototype.exec=function(a){a.bezierCurveTo(this.cp1x,this.cp1y,this.cp2x,this.cp2y,this.x,this.y)},(c.Rect=function(a,b,c,d){this.x=a,this.y=b,this.w=c,this.h=d}).prototype.exec=function(a){a.rect(this.x,this.y,this.w,this.h)},(c.ClosePath=function(){}).prototype.exec=function(a){a.closePath()},(c.BeginPath=function(){}).prototype.exec=function(a){a.beginPath()},b=(c.Fill=function(a,b){this.style=a,this.matrix=b}).prototype,b.exec=function(a){if(this.style){a.fillStyle=this.style;var b=this.matrix;b&&(a.save(),a.transform(b.a,b.b,b.c,b.d,b.tx,b.ty)),a.fill(),b&&a.restore()}},b.linearGradient=function(b,c,d,e,f,g){for(var h=this.style=a._ctx.createLinearGradient(d,e,f,g),i=0,j=b.length;j>i;i++)h.addColorStop(c[i],b[i]);return h.props={colors:b,ratios:c,x0:d,y0:e,x1:f,y1:g,type:"linear"},this},b.radialGradient=function(b,c,d,e,f,g,h,i){for(var j=this.style=a._ctx.createRadialGradient(d,e,f,g,h,i),k=0,l=b.length;l>k;k++)j.addColorStop(c[k],b[k]);return j.props={colors:b,ratios:c,x0:d,y0:e,r0:f,x1:g,y1:h,r1:i,type:"radial"},this},b.bitmap=function(b,c){if(b.naturalWidth||b.getContext||b.readyState>=2){var d=this.style=a._ctx.createPattern(b,c||"");d.props={image:b,repetition:c,type:"bitmap"}}return this},b.path=!1,b=(c.Stroke=function(a,b){this.style=a,this.ignoreScale=b}).prototype,b.exec=function(a){this.style&&(a.strokeStyle=this.style,this.ignoreScale&&(a.save(),a.setTransform(1,0,0,1,0,0)),a.stroke(),this.ignoreScale&&a.restore())},b.linearGradient=c.Fill.prototype.linearGradient,b.radialGradient=c.Fill.prototype.radialGradient,b.bitmap=c.Fill.prototype.bitmap,b.path=!1,b=(c.StrokeStyle=function(a,b,c,d,e){this.width=a,this.caps=b,this.joints=c,this.miterLimit=d,this.ignoreScale=e}).prototype,b.exec=function(b){b.lineWidth=null==this.width?"1":this.width,b.lineCap=null==this.caps?"butt":isNaN(this.caps)?this.caps:a.STROKE_CAPS_MAP[this.caps],b.lineJoin=null==this.joints?"miter":isNaN(this.joints)?this.joints:a.STROKE_JOINTS_MAP[this.joints],b.miterLimit=null==this.miterLimit?"10":this.miterLimit,b.ignoreScale=null==this.ignoreScale?!1:this.ignoreScale},b.path=!1,(c.StrokeDash=function(a,b){this.segments=a,this.offset=b||0}).prototype.exec=function(a){a.setLineDash&&(a.setLineDash(this.segments||c.StrokeDash.EMPTY_SEGMENTS),a.lineDashOffset=this.offset||0)},c.StrokeDash.EMPTY_SEGMENTS=[],(c.RoundRect=function(a,b,c,d,e,f,g,h){this.x=a,this.y=b,this.w=c,this.h=d,this.radiusTL=e,this.radiusTR=f,this.radiusBR=g,this.radiusBL=h}).prototype.exec=function(a){var b=(j>i?i:j)/2,c=0,d=0,e=0,f=0,g=this.x,h=this.y,i=this.w,j=this.h,k=this.radiusTL,l=this.radiusTR,m=this.radiusBR,n=this.radiusBL;0>k&&(k*=c=-1),k>b&&(k=b),0>l&&(l*=d=-1),l>b&&(l=b),0>m&&(m*=e=-1),m>b&&(m=b),0>n&&(n*=f=-1),n>b&&(n=b),a.moveTo(g+i-l,h),a.arcTo(g+i+l*d,h-l*d,g+i,h+l,l),a.lineTo(g+i,h+j-m),a.arcTo(g+i+m*e,h+j+m*e,g+i-m,h+j,m),a.lineTo(g+n,h+j),a.arcTo(g-n*f,h+j+n*f,g,h+j-n,n),
a.lineTo(g,h+k),a.arcTo(g-k*c,h-k*c,g+k,h,k),a.closePath()},(c.Circle=function(a,b,c){this.x=a,this.y=b,this.radius=c}).prototype.exec=function(a){a.arc(this.x,this.y,this.radius,0,2*Math.PI)},(c.Ellipse=function(a,b,c,d){this.x=a,this.y=b,this.w=c,this.h=d}).prototype.exec=function(a){var b=this.x,c=this.y,d=this.w,e=this.h,f=.5522848,g=d/2*f,h=e/2*f,i=b+d,j=c+e,k=b+d/2,l=c+e/2;a.moveTo(b,l),a.bezierCurveTo(b,l-h,k-g,c,k,c),a.bezierCurveTo(k+g,c,i,l-h,i,l),a.bezierCurveTo(i,l+h,k+g,j,k,j),a.bezierCurveTo(k-g,j,b,l+h,b,l)},(c.PolyStar=function(a,b,c,d,e,f){this.x=a,this.y=b,this.radius=c,this.sides=d,this.pointSize=e,this.angle=f}).prototype.exec=function(a){var b=this.x,c=this.y,d=this.radius,e=(this.angle||0)/180*Math.PI,f=this.sides,g=1-(this.pointSize||0),h=Math.PI/f;a.moveTo(b+Math.cos(e)*d,c+Math.sin(e)*d);for(var i=0;f>i;i++)e+=h,1!=g&&a.lineTo(b+Math.cos(e)*d*g,c+Math.sin(e)*d*g),e+=h,a.lineTo(b+Math.cos(e)*d,c+Math.sin(e)*d);a.closePath()},a.beginCmd=new c.BeginPath,createjs.Graphics=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(){this.EventDispatcher_constructor(),this.alpha=1,this.cacheCanvas=null,this.bitmapCache=null,this.id=createjs.UID.get(),this.mouseEnabled=!0,this.tickEnabled=!0,this.name=null,this.parent=null,this.regX=0,this.regY=0,this.rotation=0,this.scaleX=1,this.scaleY=1,this.skewX=0,this.skewY=0,this.shadow=null,this.visible=!0,this.x=0,this.y=0,this.transformMatrix=null,this.compositeOperation=null,this.snapToPixel=!0,this.filters=null,this.mask=null,this.hitArea=null,this.cursor=null,this._props=new createjs.DisplayProps,this._rectangle=new createjs.Rectangle,this._bounds=null,this._webGLRenderStyle=a._StageGL_NONE}var b=createjs.extend(a,createjs.EventDispatcher);a._MOUSE_EVENTS=["click","dblclick","mousedown","mouseout","mouseover","pressmove","pressup","rollout","rollover"],a.suppressCrossDomainErrors=!1,a._snapToPixelEnabled=!1,a._StageGL_NONE=0,a._StageGL_SPRITE=1,a._StageGL_BITMAP=2;var c=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");c.getContext&&(a._hitTestCanvas=c,a._hitTestContext=c.getContext("2d"),c.width=c.height=1),b._getStage=function(){for(var a=this,b=createjs.Stage;a.parent;)a=a.parent;return a instanceof b?a:null},b.getStage=createjs.deprecate(b._getStage,"DisplayObject.getStage");try{Object.defineProperties(b,{stage:{get:b._getStage},cacheID:{get:function(){return this.bitmapCache&&this.bitmapCache.cacheID},set:function(a){this.bitmapCache&&(this.bitmapCache.cacheID=a)}},scale:{get:function(){return this.scaleX},set:function(a){this.scaleX=this.scaleY=a}}})}catch(d){}b.isVisible=function(){return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY)},b.draw=function(a,b){var c=this.bitmapCache;return c&&!b?c.draw(a):!1},b.updateContext=function(b){var c=this,d=c.mask,e=c._props.matrix;d&&d.graphics&&!d.graphics.isEmpty()&&(d.getMatrix(e),b.transform(e.a,e.b,e.c,e.d,e.tx,e.ty),d.graphics.drawAsPath(b),b.clip(),e.invert(),b.transform(e.a,e.b,e.c,e.d,e.tx,e.ty)),this.getMatrix(e);var f=e.tx,g=e.ty;a._snapToPixelEnabled&&c.snapToPixel&&(f=f+(0>f?-.5:.5)|0,g=g+(0>g?-.5:.5)|0),b.transform(e.a,e.b,e.c,e.d,f,g),b.globalAlpha*=c.alpha,c.compositeOperation&&(b.globalCompositeOperation=c.compositeOperation),c.shadow&&this._applyShadow(b,c.shadow)},b.cache=function(a,b,c,d,e,f){this.bitmapCache||(this.bitmapCache=new createjs.BitmapCache),this.bitmapCache.define(this,a,b,c,d,e,f)},b.updateCache=function(a){if(!this.bitmapCache)throw"cache() must be called before updateCache()";this.bitmapCache.update(a)},b.uncache=function(){this.bitmapCache&&(this.bitmapCache.release(),this.bitmapCache=void 0)},b.getCacheDataURL=function(){return this.bitmapCache?this.bitmapCache.getDataURL():null},b.localToGlobal=function(a,b,c){return this.getConcatenatedMatrix(this._props.matrix).transformPoint(a,b,c||new createjs.Point)},b.globalToLocal=function(a,b,c){return this.getConcatenatedMatrix(this._props.matrix).invert().transformPoint(a,b,c||new createjs.Point)},b.localToLocal=function(a,b,c,d){return d=this.localToGlobal(a,b,d),c.globalToLocal(d.x,d.y,d)},b.setTransform=function(a,b,c,d,e,f,g,h,i){return this.x=a||0,this.y=b||0,this.scaleX=null==c?1:c,this.scaleY=null==d?1:d,this.rotation=e||0,this.skewX=f||0,this.skewY=g||0,this.regX=h||0,this.regY=i||0,this},b.getMatrix=function(a){var b=this,c=a&&a.identity()||new createjs.Matrix2D;return b.transformMatrix?c.copy(b.transformMatrix):c.appendTransform(b.x,b.y,b.scaleX,b.scaleY,b.rotation,b.skewX,b.skewY,b.regX,b.regY)},b.getConcatenatedMatrix=function(a){for(var b=this,c=this.getMatrix(a);b=b.parent;)c.prependMatrix(b.getMatrix(b._props.matrix));return c},b.getConcatenatedDisplayProps=function(a){a=a?a.identity():new createjs.DisplayProps;var b=this,c=b.getMatrix(a.matrix);do a.prepend(b.visible,b.alpha,b.shadow,b.compositeOperation),b!=this&&c.prependMatrix(b.getMatrix(b._props.matrix));while(b=b.parent);return a},b.hitTest=function(b,c){var d=a._hitTestContext;d.setTransform(1,0,0,1,-b,-c),this.draw(d);var e=this._testHit(d);return d.setTransform(1,0,0,1,0,0),d.clearRect(0,0,2,2),e},b.set=function(a){for(var b in a)this[b]=a[b];return this},b.getBounds=function(){if(this._bounds)return this._rectangle.copy(this._bounds);var a=this.cacheCanvas;if(a){var b=this._cacheScale;return this._rectangle.setValues(this._cacheOffsetX,this._cacheOffsetY,a.width/b,a.height/b)}return null},b.getTransformedBounds=function(){return this._getBounds()},b.setBounds=function(a,b,c,d){return null==a?void(this._bounds=a):void(this._bounds=(this._bounds||new createjs.Rectangle).setValues(a,b,c,d))},b.clone=function(){return this._cloneProps(new a)},b.toString=function(){return"[DisplayObject (name="+this.name+")]"},b._updateState=null,b._cloneProps=function(a){return a.alpha=this.alpha,a.mouseEnabled=this.mouseEnabled,a.tickEnabled=this.tickEnabled,a.name=this.name,a.regX=this.regX,a.regY=this.regY,a.rotation=this.rotation,a.scaleX=this.scaleX,a.scaleY=this.scaleY,a.shadow=this.shadow,a.skewX=this.skewX,a.skewY=this.skewY,a.visible=this.visible,a.x=this.x,a.y=this.y,a.compositeOperation=this.compositeOperation,a.snapToPixel=this.snapToPixel,a.filters=null==this.filters?null:this.filters.slice(0),a.mask=this.mask,a.hitArea=this.hitArea,a.cursor=this.cursor,a._bounds=this._bounds,a},b._applyShadow=function(a,b){b=b||Shadow.identity,a.shadowColor=b.color,a.shadowOffsetX=b.offsetX,a.shadowOffsetY=b.offsetY,a.shadowBlur=b.blur},b._tick=function(a){var b=this._listeners;b&&b.tick&&(a.target=null,a.propagationStopped=a.immediatePropagationStopped=!1,this.dispatchEvent(a))},b._testHit=function(b){try{var c=b.getImageData(0,0,1,1).data[3]>1}catch(d){if(!a.suppressCrossDomainErrors)throw"An error has occurred. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images."}return c},b._getBounds=function(a,b){return this._transformBounds(this.getBounds(),a,b)},b._transformBounds=function(a,b,c){if(!a)return a;var d=a.x,e=a.y,f=a.width,g=a.height,h=this._props.matrix;h=c?h.identity():this.getMatrix(h),(d||e)&&h.appendTransform(0,0,1,1,0,0,0,-d,-e),b&&h.prependMatrix(b);var i=f*h.a,j=f*h.b,k=g*h.c,l=g*h.d,m=h.tx,n=h.ty,o=m,p=m,q=n,r=n;return(d=i+m)<o?o=d:d>p&&(p=d),(d=i+k+m)<o?o=d:d>p&&(p=d),(d=k+m)<o?o=d:d>p&&(p=d),(e=j+n)<q?q=e:e>r&&(r=e),(e=j+l+n)<q?q=e:e>r&&(r=e),(e=l+n)<q?q=e:e>r&&(r=e),a.setValues(o,q,p-o,r-q)},b._hasMouseEventListener=function(){for(var b=a._MOUSE_EVENTS,c=0,d=b.length;d>c;c++)if(this.hasEventListener(b[c]))return!0;return!!this.cursor},createjs.DisplayObject=createjs.promote(a,"EventDispatcher")}(),this.createjs=this.createjs||{},function(){"use strict";function a(){this.DisplayObject_constructor(),this.children=[],this.mouseChildren=!0,this.tickChildren=!0}var b=createjs.extend(a,createjs.DisplayObject);b._getNumChildren=function(){return this.children.length},b.getNumChildren=createjs.deprecate(b._getNumChildren,"Container.getNumChildren");try{Object.defineProperties(b,{numChildren:{get:b._getNumChildren}})}catch(c){}b.initialize=a,b.isVisible=function(){var a=this.cacheCanvas||this.children.length;return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY&&a)},b.draw=function(a,b){if(this.DisplayObject_draw(a,b))return!0;for(var c=this.children.slice(),d=0,e=c.length;e>d;d++){var f=c[d];f.isVisible()&&(a.save(),f.updateContext(a),f.draw(a),a.restore())}return!0},b.addChild=function(a){if(null==a)return a;var b=arguments.length;if(b>1){for(var c=0;b>c;c++)this.addChild(arguments[c]);return arguments[b-1]}var d=a.parent,e=d===this;return d&&d._removeChildAt(createjs.indexOf(d.children,a),e),a.parent=this,this.children.push(a),e||a.dispatchEvent("added"),a},b.addChildAt=function(a,b){var c=arguments.length,d=arguments[c-1];if(0>d||d>this.children.length)return arguments[c-2];if(c>2){for(var e=0;c-1>e;e++)this.addChildAt(arguments[e],d+e);return arguments[c-2]}var f=a.parent,g=f===this;return f&&f._removeChildAt(createjs.indexOf(f.children,a),g),a.parent=this,this.children.splice(b,0,a),g||a.dispatchEvent("added"),a},b.removeChild=function(a){var b=arguments.length;if(b>1){for(var c=!0,d=0;b>d;d++)c=c&&this.removeChild(arguments[d]);return c}return this._removeChildAt(createjs.indexOf(this.children,a))},b.removeChildAt=function(a){var b=arguments.length;if(b>1){for(var c=[],d=0;b>d;d++)c[d]=arguments[d];c.sort(function(a,b){return b-a});for(var e=!0,d=0;b>d;d++)e=e&&this._removeChildAt(c[d]);return e}return this._removeChildAt(a)},b.removeAllChildren=function(){for(var a=this.children;a.length;)this._removeChildAt(0)},b.getChildAt=function(a){return this.children[a]},b.getChildByName=function(a){for(var b=this.children,c=0,d=b.length;d>c;c++)if(b[c].name==a)return b[c];return null},b.sortChildren=function(a){this.children.sort(a)},b.getChildIndex=function(a){return createjs.indexOf(this.children,a)},b.swapChildrenAt=function(a,b){var c=this.children,d=c[a],e=c[b];d&&e&&(c[a]=e,c[b]=d)},b.swapChildren=function(a,b){for(var c,d,e=this.children,f=0,g=e.length;g>f&&(e[f]==a&&(c=f),e[f]==b&&(d=f),null==c||null==d);f++);f!=g&&(e[c]=b,e[d]=a)},b.setChildIndex=function(a,b){var c=this.children,d=c.length;if(!(a.parent!=this||0>b||b>=d)){for(var e=0;d>e&&c[e]!=a;e++);e!=d&&e!=b&&(c.splice(e,1),c.splice(b,0,a))}},b.contains=function(a){for(;a;){if(a==this)return!0;a=a.parent}return!1},b.hitTest=function(a,b){return null!=this.getObjectUnderPoint(a,b)},b.getObjectsUnderPoint=function(a,b,c){var d=[],e=this.localToGlobal(a,b);return this._getObjectsUnderPoint(e.x,e.y,d,c>0,1==c),d},b.getObjectUnderPoint=function(a,b,c){var d=this.localToGlobal(a,b);return this._getObjectsUnderPoint(d.x,d.y,null,c>0,1==c)},b.getBounds=function(){return this._getBounds(null,!0)},b.getTransformedBounds=function(){return this._getBounds()},b.clone=function(b){var c=this._cloneProps(new a);return b&&this._cloneChildren(c),c},b.toString=function(){return"[Container (name="+this.name+")]"},b._tick=function(a){if(this.tickChildren)for(var b=this.children.length-1;b>=0;b--){var c=this.children[b];c.tickEnabled&&c._tick&&c._tick(a)}this.DisplayObject__tick(a)},b._cloneChildren=function(a){a.children.length&&a.removeAllChildren();for(var b=a.children,c=0,d=this.children.length;d>c;c++){var e=this.children[c].clone(!0);e.parent=a,b.push(e)}},b._removeChildAt=function(a,b){if(0>a||a>this.children.length-1)return!1;var c=this.children[a];return c&&(c.parent=null),this.children.splice(a,1),b||c.dispatchEvent("removed"),!0},b._getObjectsUnderPoint=function(b,c,d,e,f,g){if(g=g||0,!g&&!this._testMask(this,b,c))return null;var h,i=createjs.DisplayObject._hitTestContext;f=f||e&&this._hasMouseEventListener();for(var j=this.children,k=j.length,l=k-1;l>=0;l--){var m=j[l],n=m.hitArea;if(m.visible&&(n||m.isVisible())&&(!e||m.mouseEnabled)&&(n||this._testMask(m,b,c)))if(!n&&m instanceof a){var o=m._getObjectsUnderPoint(b,c,d,e,f,g+1);if(!d&&o)return e&&!this.mouseChildren?this:o}else{if(e&&!f&&!m._hasMouseEventListener())continue;var p=m.getConcatenatedDisplayProps(m._props);if(h=p.matrix,n&&(h.appendMatrix(n.getMatrix(n._props.matrix)),p.alpha=n.alpha),i.globalAlpha=p.alpha,i.setTransform(h.a,h.b,h.c,h.d,h.tx-b,h.ty-c),(n||m).draw(i),!this._testHit(i))continue;if(i.setTransform(1,0,0,1,0,0),i.clearRect(0,0,2,2),!d)return e&&!this.mouseChildren?this:m;d.push(m)}}return null},b._testMask=function(a,b,c){var d=a.mask;if(!d||!d.graphics||d.graphics.isEmpty())return!0;var e=this._props.matrix,f=a.parent;e=f?f.getConcatenatedMatrix(e):e.identity(),e=d.getMatrix(d._props.matrix).prependMatrix(e);var g=createjs.DisplayObject._hitTestContext;return g.setTransform(e.a,e.b,e.c,e.d,e.tx-b,e.ty-c),d.graphics.drawAsPath(g),g.fillStyle="#000",g.fill(),this._testHit(g)?(g.setTransform(1,0,0,1,0,0),g.clearRect(0,0,2,2),!0):!1},b._getBounds=function(a,b){var c=this.DisplayObject_getBounds();if(c)return this._transformBounds(c,a,b);var d=this._props.matrix;d=b?d.identity():this.getMatrix(d),a&&d.prependMatrix(a);for(var e=this.children.length,f=null,g=0;e>g;g++){var h=this.children[g];h.visible&&(c=h._getBounds(d))&&(f?f.extend(c.x,c.y,c.width,c.height):f=c.clone())}return f},createjs.Container=createjs.promote(a,"DisplayObject")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.Container_constructor(),this.autoClear=!0,this.canvas="string"==typeof a?document.getElementById(a):a,this.mouseX=0,this.mouseY=0,this.drawRect=null,this.snapToPixelEnabled=!1,this.mouseInBounds=!1,this.tickOnUpdate=!0,this.mouseMoveOutside=!1,this.preventSelection=!0,this._pointerData={},this._pointerCount=0,this._primaryPointerID=null,this._mouseOverIntervalID=null,this._nextStage=null,this._prevStage=null,this.enableDOMEvents(!0)}var b=createjs.extend(a,createjs.Container);b._get_nextStage=function(){return this._nextStage},b._set_nextStage=function(a){this._nextStage&&(this._nextStage._prevStage=null),a&&(a._prevStage=this),this._nextStage=a};try{Object.defineProperties(b,{nextStage:{get:b._get_nextStage,set:b._set_nextStage}})}catch(c){}b.update=function(a){if(this.canvas&&(this.tickOnUpdate&&this.tick(a),this.dispatchEvent("drawstart",!1,!0)!==!1)){createjs.DisplayObject._snapToPixelEnabled=this.snapToPixelEnabled;var b=this.drawRect,c=this.canvas.getContext("2d");c.setTransform(1,0,0,1,0,0),this.autoClear&&(b?c.clearRect(b.x,b.y,b.width,b.height):c.clearRect(0,0,this.canvas.width+1,this.canvas.height+1)),c.save(),this.drawRect&&(c.beginPath(),c.rect(b.x,b.y,b.width,b.height),c.clip()),this.updateContext(c),this.draw(c,!1),c.restore(),this.dispatchEvent("drawend")}},b.tick=function(a){if(this.tickEnabled&&this.dispatchEvent("tickstart",!1,!0)!==!1){var b=new createjs.Event("tick");if(a)for(var c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);this._tick(b),this.dispatchEvent("tickend")}},b.handleEvent=function(a){"tick"==a.type&&this.update(a)},b.clear=function(){if(this.canvas){var a=this.canvas.getContext("2d");a.setTransform(1,0,0,1,0,0),a.clearRect(0,0,this.canvas.width+1,this.canvas.height+1)}},b.toDataURL=function(a,b){var c,d=this.canvas.getContext("2d"),e=this.canvas.width,f=this.canvas.height;if(a){c=d.getImageData(0,0,e,f);var g=d.globalCompositeOperation;d.globalCompositeOperation="destination-over",d.fillStyle=a,d.fillRect(0,0,e,f)}var h=this.canvas.toDataURL(b||"image/png");return a&&(d.putImageData(c,0,0),d.globalCompositeOperation=g),h},b.enableMouseOver=function(a){if(this._mouseOverIntervalID&&(clearInterval(this._mouseOverIntervalID),this._mouseOverIntervalID=null,0==a&&this._testMouseOver(!0)),null==a)a=20;else if(0>=a)return;var b=this;this._mouseOverIntervalID=setInterval(function(){b._testMouseOver()},1e3/Math.min(50,a))},b.enableDOMEvents=function(a){null==a&&(a=!0);var b,c,d=this._eventListeners;if(!a&&d){for(b in d)c=d[b],c.t.removeEventListener(b,c.f,!1);this._eventListeners=null}else if(a&&!d&&this.canvas){var e=window.addEventListener?window:document,f=this;d=this._eventListeners={},d.mouseup={t:e,f:function(a){f._handleMouseUp(a)}},d.mousemove={t:e,f:function(a){f._handleMouseMove(a)}},d.dblclick={t:this.canvas,f:function(a){f._handleDoubleClick(a)}},d.mousedown={t:this.canvas,f:function(a){f._handleMouseDown(a)}};for(b in d)c=d[b],c.t.addEventListener(b,c.f,!1)}},b.clone=function(){throw"Stage cannot be cloned."},b.toString=function(){return"[Stage (name="+this.name+")]"},b._getElementRect=function(a){var b;try{b=a.getBoundingClientRect()}catch(c){b={top:a.offsetTop,left:a.offsetLeft,width:a.offsetWidth,height:a.offsetHeight}}var d=(window.pageXOffset||document.scrollLeft||0)-(document.clientLeft||document.body.clientLeft||0),e=(window.pageYOffset||document.scrollTop||0)-(document.clientTop||document.body.clientTop||0),f=window.getComputedStyle?getComputedStyle(a,null):a.currentStyle,g=parseInt(f.paddingLeft)+parseInt(f.borderLeftWidth),h=parseInt(f.paddingTop)+parseInt(f.borderTopWidth),i=parseInt(f.paddingRight)+parseInt(f.borderRightWidth),j=parseInt(f.paddingBottom)+parseInt(f.borderBottomWidth);return{left:b.left+d+g,right:b.right+d-i,top:b.top+e+h,bottom:b.bottom+e-j}},b._getPointerData=function(a){var b=this._pointerData[a];return b||(b=this._pointerData[a]={x:0,y:0}),b},b._handleMouseMove=function(a){a||(a=window.event),this._handlePointerMove(-1,a,a.pageX,a.pageY)},b._handlePointerMove=function(a,b,c,d,e){if((!this._prevStage||void 0!==e)&&this.canvas){var f=this._nextStage,g=this._getPointerData(a),h=g.inBounds;this._updatePointerPosition(a,b,c,d),(h||g.inBounds||this.mouseMoveOutside)&&(-1===a&&g.inBounds==!h&&this._dispatchMouseEvent(this,h?"mouseleave":"mouseenter",!1,a,g,b),this._dispatchMouseEvent(this,"stagemousemove",!1,a,g,b),this._dispatchMouseEvent(g.target,"pressmove",!0,a,g,b)),f&&f._handlePointerMove(a,b,c,d,null)}},b._updatePointerPosition=function(a,b,c,d){var e=this._getElementRect(this.canvas);c-=e.left,d-=e.top;var f=this.canvas.width,g=this.canvas.height;c/=(e.right-e.left)/f,d/=(e.bottom-e.top)/g;var h=this._getPointerData(a);(h.inBounds=c>=0&&d>=0&&f-1>=c&&g-1>=d)?(h.x=c,h.y=d):this.mouseMoveOutside&&(h.x=0>c?0:c>f-1?f-1:c,h.y=0>d?0:d>g-1?g-1:d),h.posEvtObj=b,h.rawX=c,h.rawY=d,(a===this._primaryPointerID||-1===a)&&(this.mouseX=h.x,this.mouseY=h.y,this.mouseInBounds=h.inBounds)},b._handleMouseUp=function(a){this._handlePointerUp(-1,a,!1)},b._handlePointerUp=function(a,b,c,d){var e=this._nextStage,f=this._getPointerData(a);if(!this._prevStage||void 0!==d){var g=null,h=f.target;d||!h&&!e||(g=this._getObjectsUnderPoint(f.x,f.y,null,!0)),f.down&&(this._dispatchMouseEvent(this,"stagemouseup",!1,a,f,b,g),f.down=!1),g==h&&this._dispatchMouseEvent(h,"click",!0,a,f,b),this._dispatchMouseEvent(h,"pressup",!0,a,f,b),c?(a==this._primaryPointerID&&(this._primaryPointerID=null),delete this._pointerData[a]):f.target=null,e&&e._handlePointerUp(a,b,c,d||g&&this)}},b._handleMouseDown=function(a){this._handlePointerDown(-1,a,a.pageX,a.pageY)},b._handlePointerDown=function(a,b,c,d,e){this.preventSelection&&b.preventDefault(),(null==this._primaryPointerID||-1===a)&&(this._primaryPointerID=a),null!=d&&this._updatePointerPosition(a,b,c,d);var f=null,g=this._nextStage,h=this._getPointerData(a);e||(f=h.target=this._getObjectsUnderPoint(h.x,h.y,null,!0)),h.inBounds&&(this._dispatchMouseEvent(this,"stagemousedown",!1,a,h,b,f),h.down=!0),this._dispatchMouseEvent(f,"mousedown",!0,a,h,b),g&&g._handlePointerDown(a,b,c,d,e||f&&this)},b._testMouseOver=function(a,b,c){if(!this._prevStage||void 0!==b){var d=this._nextStage;if(!this._mouseOverIntervalID)return void(d&&d._testMouseOver(a,b,c));var e=this._getPointerData(-1);if(e&&(a||this.mouseX!=this._mouseOverX||this.mouseY!=this._mouseOverY||!this.mouseInBounds)){var f,g,h,i=e.posEvtObj,j=c||i&&i.target==this.canvas,k=null,l=-1,m="";!b&&(a||this.mouseInBounds&&j)&&(k=this._getObjectsUnderPoint(this.mouseX,this.mouseY,null,!0),this._mouseOverX=this.mouseX,this._mouseOverY=this.mouseY);var n=this._mouseOverTarget||[],o=n[n.length-1],p=this._mouseOverTarget=[];for(f=k;f;)p.unshift(f),m||(m=f.cursor),f=f.parent;for(this.canvas.style.cursor=m,!b&&c&&(c.canvas.style.cursor=m),g=0,h=p.length;h>g&&p[g]==n[g];g++)l=g;for(o!=k&&this._dispatchMouseEvent(o,"mouseout",!0,-1,e,i,k),g=n.length-1;g>l;g--)this._dispatchMouseEvent(n[g],"rollout",!1,-1,e,i,k);for(g=p.length-1;g>l;g--)this._dispatchMouseEvent(p[g],"rollover",!1,-1,e,i,o);o!=k&&this._dispatchMouseEvent(k,"mouseover",!0,-1,e,i,o),d&&d._testMouseOver(a,b||k&&this,c||j&&this)}}},b._handleDoubleClick=function(a,b){var c=null,d=this._nextStage,e=this._getPointerData(-1);b||(c=this._getObjectsUnderPoint(e.x,e.y,null,!0),this._dispatchMouseEvent(c,"dblclick",!0,-1,e,a)),d&&d._handleDoubleClick(a,b||c&&this)},b._dispatchMouseEvent=function(a,b,c,d,e,f,g){if(a&&(c||a.hasEventListener(b))){var h=new createjs.MouseEvent(b,c,!1,e.x,e.y,f,d,d===this._primaryPointerID||-1===d,e.rawX,e.rawY,g);a.dispatchEvent(h)}},createjs.Stage=createjs.promote(a,"Container")}(),this.createjs=this.createjs||{},function(){"use strict";function a(b,c){if(this.Stage_constructor(b),void 0!==c){if("object"!=typeof c)throw"Invalid options object";var d=c.premultiply,e=c.transparent,f=c.antialias,g=c.preserveBuffer,h=c.autoPurge}this.vocalDebug=!1,this._preserveBuffer=g||!1,this._antialias=f||!1,this._transparent=e||!1,this._premultiply=d||!1,this._autoPurge=void 0,this.autoPurge=h,this._viewportWidth=0,this._viewportHeight=0,this._projectionMatrix=null,this._webGLContext=null,this._clearColor={r:.5,g:.5,b:.5,a:0},this._maxCardsPerBatch=a.DEFAULT_MAX_BATCH_SIZE,this._activeShader=null,this._vertices=null,this._vertexPositionBuffer=null,this._uvs=null,this._uvPositionBuffer=null,this._indices=null,this._textureIndexBuffer=null,this._alphas=null,this._alphaBuffer=null,this._textureDictionary=[],this._textureIDs={},this._batchTextures=[],this._baseTextures=[],this._batchTextureCount=8,this._lastTextureInsert=-1,this._batchID=0,this._drawID=0,this._slotBlacklist=[],this._isDrawing=0,this._lastTrackedCanvas=0,this.isCacheControlled=!1,this._cacheContainer=new createjs.Container,this._initializeWebGL()}var b=createjs.extend(a,createjs.Stage);a.buildUVRects=function(a,b,c){if(!a||!a._frames)return null;void 0===b&&(b=-1),void 0===c&&(c=!1);for(var d=-1!=b&&c?b:0,e=-1!=b&&c?b+1:a._frames.length,f=d;e>f;f++){var g=a._frames[f];if(!(g.uvRect||g.image.width<=0||g.image.height<=0)){var h=g.rect;g.uvRect={t:h.y/g.image.height,l:h.x/g.image.width,b:(h.y+h.height)/g.image.height,r:(h.x+h.width)/g.image.width}}}return a._frames[-1!=b?b:0].uvRect||{t:0,l:0,b:1,r:1}},a.isWebGLActive=function(a){return a&&a instanceof WebGLRenderingContext&&"undefined"!=typeof WebGLRenderingContext},a.VERTEX_PROPERTY_COUNT=6,a.INDICIES_PER_CARD=6,a.DEFAULT_MAX_BATCH_SIZE=1e4,a.WEBGL_MAX_INDEX_NUM=Math.pow(2,16),a.UV_RECT={t:0,l:0,b:1,r:1};try{a.COVER_VERT=new Float32Array([-1,1,1,1,-1,-1,1,1,1,-1,-1,-1]),a.COVER_UV=new Float32Array([0,0,1,0,0,1,1,0,1,1,0,1]),a.COVER_UV_FLIP=new Float32Array([0,1,1,1,0,0,1,1,1,0,0,0])}catch(c){}a.REGULAR_VARYING_HEADER="precision mediump float;varying vec2 vTextureCoord;varying lowp float indexPicker;varying lowp float alphaValue;",a.REGULAR_VERTEX_HEADER=a.REGULAR_VARYING_HEADER+"attribute vec2 vertexPosition;attribute vec2 uvPosition;attribute lowp float textureIndex;attribute lowp float objectAlpha;uniform mat4 pMatrix;",a.REGULAR_FRAGMENT_HEADER=a.REGULAR_VARYING_HEADER+"uniform sampler2D uSampler[{{count}}];",a.REGULAR_VERTEX_BODY="void main(void) {gl_Position = vec4((vertexPosition.x * pMatrix[0][0]) + pMatrix[3][0],(vertexPosition.y * pMatrix[1][1]) + pMatrix[3][1],pMatrix[3][2],1.0);alphaValue = objectAlpha;indexPicker = textureIndex;vTextureCoord = uvPosition;}",a.REGULAR_FRAGMENT_BODY="void main(void) {vec4 color = vec4(1.0, 0.0, 0.0, 1.0);if (indexPicker <= 0.5) {color = texture2D(uSampler[0], vTextureCoord);{{alternates}}}{{fragColor}}}",a.REGULAR_FRAG_COLOR_NORMAL="gl_FragColor = vec4(color.rgb, color.a * alphaValue);",a.REGULAR_FRAG_COLOR_PREMULTIPLY="if(color.a > 0.0035) {gl_FragColor = vec4(color.rgb/color.a, color.a * alphaValue);} else {gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);}",a.PARTICLE_VERTEX_BODY=a.REGULAR_VERTEX_BODY,a.PARTICLE_FRAGMENT_BODY=a.REGULAR_FRAGMENT_BODY,a.COVER_VARYING_HEADER="precision mediump float;varying highp vec2 vRenderCoord;varying highp vec2 vTextureCoord;",a.COVER_VERTEX_HEADER=a.COVER_VARYING_HEADER+"attribute vec2 vertexPosition;attribute vec2 uvPosition;uniform float uUpright;",a.COVER_FRAGMENT_HEADER=a.COVER_VARYING_HEADER+"uniform sampler2D uSampler;",a.COVER_VERTEX_BODY="void main(void) {gl_Position = vec4(vertexPosition.x, vertexPosition.y, 0.0, 1.0);vRenderCoord = uvPosition;vTextureCoord = vec2(uvPosition.x, abs(uUpright - uvPosition.y));}",a.COVER_FRAGMENT_BODY="void main(void) {vec4 color = texture2D(uSampler, vRenderCoord);gl_FragColor = color;}",b._get_isWebGL=function(){return!!this._webGLContext},b._set_autoPurge=function(a){a=isNaN(a)?1200:a,-1!=a&&(a=10>a?10:a),this._autoPurge=a},b._get_autoPurge=function(){return Number(this._autoPurge)};try{Object.defineProperties(b,{isWebGL:{get:b._get_isWebGL},autoPurge:{get:b._get_autoPurge,set:b._set_autoPurge}})}catch(c){}b._initializeWebGL=function(){if(this.canvas){if(!this._webGLContext||this._webGLContext.canvas!==this.canvas){var a={depth:!1,alpha:this._transparent,stencil:!0,antialias:this._antialias,premultipliedAlpha:this._premultiply,preserveDrawingBuffer:this._preserveBuffer},b=this._webGLContext=this._fetchWebGLContext(this.canvas,a);if(!b)return null;this.updateSimultaneousTextureCount(b.getParameter(b.MAX_TEXTURE_IMAGE_UNITS)),this._maxTextureSlots=b.getParameter(b.MAX_COMBINED_TEXTURE_IMAGE_UNITS),this._createBuffers(b),this._initTextures(b),b.disable(b.DEPTH_TEST),b.enable(b.BLEND),b.blendFuncSeparate(b.SRC_ALPHA,b.ONE_MINUS_SRC_ALPHA,b.ONE,b.ONE_MINUS_SRC_ALPHA),b.pixelStorei(b.UNPACK_PREMULTIPLY_ALPHA_WEBGL,this._premultiply),this._webGLContext.clearColor(this._clearColor.r,this._clearColor.g,this._clearColor.b,this._clearColor.a),this.updateViewport(this._viewportWidth||this.canvas.width,this._viewportHeight||this.canvas.height)}}else this._webGLContext=null;return this._webGLContext},b.update=function(a){if(this.canvas){if(this.tickOnUpdate&&this.tick(a),this.dispatchEvent("drawstart"),this.autoClear&&this.clear(),this._webGLContext)this._batchDraw(this,this._webGLContext),-1==this._autoPurge||this._drawID%(this._autoPurge/2|0)||this.purgeTextures(this._autoPurge);else{var b=this.canvas.getContext("2d");b.save(),this.updateContext(b),this.draw(b,!1),b.restore()}this.dispatchEvent("drawend")}},b.clear=function(){if(this.canvas)if(a.isWebGLActive(this._webGLContext)){var b=this._webGLContext,c=this._clearColor,d=this._transparent?c.a:1;this._webGLContext.clearColor(c.r*d,c.g*d,c.b*d,d),b.clear(b.COLOR_BUFFER_BIT),this._webGLContext.clearColor(c.r,c.g,c.b,c.a)}else this.Stage_clear()},b.draw=function(b,c){if(b===this._webGLContext&&a.isWebGLActive(this._webGLContext)){var d=this._webGLContext;return this._batchDraw(this,d,c),!0}return this.Stage_draw(b,c)},b.cacheDraw=function(b,c,d){if(a.isWebGLActive(this._webGLContext)){var e=this._webGLContext;return this._cacheDraw(e,b,c,d),!0}return!1},b.protectTextureSlot=function(a,b){if(a>this._maxTextureSlots||0>a)throw"Slot outside of acceptable range";this._slotBlacklist[a]=!!b},b.getTargetRenderTexture=function(a,b,c){var d,e=!1,f=this._webGLContext;if(void 0!==a.__lastRT&&a.__lastRT===a.__rtA&&(e=!0),e?(void 0===a.__rtB?a.__rtB=this.getRenderBufferTexture(b,c):((b!=a.__rtB._width||c!=a.__rtB._height)&&this.resizeTexture(a.__rtB,b,c),this.setTextureParams(f)),d=a.__rtB):(void 0===a.__rtA?a.__rtA=this.getRenderBufferTexture(b,c):((b!=a.__rtA._width||c!=a.__rtA._height)&&this.resizeTexture(a.__rtA,b,c),this.setTextureParams(f)),d=a.__rtA),!d)throw"Problems creating render textures, known causes include using too much VRAM by not releasing WebGL texture instances";return a.__lastRT=d,d},b.releaseTexture=function(a){var b,c;if(a){if(a.children)for(b=0,c=a.children.length;c>b;b++)this.releaseTexture(a.children[b]);a.cacheCanvas&&a.uncache();var d=void 0;if(void 0!==a._storeID){if(a===this._textureDictionary[a._storeID])return this._killTextureObject(a),void(a._storeID=void 0);d=a}else if(2===a._webGLRenderStyle)d=a.image;else if(1===a._webGLRenderStyle){for(b=0,c=a.spriteSheet._images.length;c>b;b++)this.releaseTexture(a.spriteSheet._images[b]);return}if(void 0===d)return void(this.vocalDebug&&console.log("No associated texture found on release"));this._killTextureObject(this._textureDictionary[d._storeID]),d._storeID=void 0}},b.purgeTextures=function(a){void 0==a&&(a=100);for(var b=this._textureDictionary,c=b.length,d=0;c>d;d++){var e=b[d];e&&e._drawID+a<=this._drawID&&this._killTextureObject(e)}},b.updateSimultaneousTextureCount=function(a){var b=this._webGLContext,c=!1;for((1>a||isNaN(a))&&(a=1),this._batchTextureCount=a;!c;)try{this._activeShader=this._fetchShaderProgram(b),c=!0}catch(d){if(1==this._batchTextureCount)throw"Cannot compile shader "+d;this._batchTextureCount-=4,this._batchTextureCount<1&&(this._batchTextureCount=1),this.vocalDebug&&console.log("Reducing desired texture count due to errors: "+this._batchTextureCount)}},b.updateViewport=function(a,b){this._viewportWidth=0|a,this._viewportHeight=0|b;var c=this._webGLContext;c&&(c.viewport(0,0,this._viewportWidth,this._viewportHeight),this._projectionMatrix=new Float32Array([2/this._viewportWidth,0,0,0,0,-2/this._viewportHeight,1,0,0,0,1,0,-1,1,.1,0]),this._projectionMatrixFlip=new Float32Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),this._projectionMatrixFlip.set(this._projectionMatrix),this._projectionMatrixFlip[5]*=-1,this._projectionMatrixFlip[13]*=-1)},b.getFilterShader=function(a){a||(a=this);var b=this._webGLContext,c=this._activeShader;if(a._builtShader)c=a._builtShader,a.shaderParamSetup&&(b.useProgram(c),a.shaderParamSetup(b,this,c));else try{c=this._fetchShaderProgram(b,"filter",a.VTX_SHADER_BODY,a.FRAG_SHADER_BODY,a.shaderParamSetup&&a.shaderParamSetup.bind(a)),a._builtShader=c,c._name=a.toString()}catch(d){console&&console.log("SHADER SWITCH FAILURE",d)}return c},b.getBaseTexture=function(a,b){var c=Math.ceil(a>0?a:1)||1,d=Math.ceil(b>0?b:1)||1,e=this._webGLContext,f=e.createTexture();return this.resizeTexture(f,c,d),this.setTextureParams(e,!1),f},b.resizeTexture=function(a,b,c){var d=this._webGLContext;d.bindTexture(d.TEXTURE_2D,a),d.texImage2D(d.TEXTURE_2D,0,d.RGBA,b,c,0,d.RGBA,d.UNSIGNED_BYTE,null),a.width=b,a.height=c},b.getRenderBufferTexture=function(a,b){var c=this._webGLContext,d=this.getBaseTexture(a,b);if(!d)return null;var e=c.createFramebuffer();return e?(d.width=a,d.height=b,c.bindFramebuffer(c.FRAMEBUFFER,e),c.framebufferTexture2D(c.FRAMEBUFFER,c.COLOR_ATTACHMENT0,c.TEXTURE_2D,d,0),e._renderTexture=d,d._frameBuffer=e,d._storeID=this._textureDictionary.length,this._textureDictionary[d._storeID]=d,c.bindFramebuffer(c.FRAMEBUFFER,null),d):null},b.setTextureParams=function(a,b){b&&this._antialias?(a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR)):(a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.NEAREST)),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE)},b.setClearColor=function(a){var b,c,d,e,f;"string"==typeof a?0==a.indexOf("#")?(4==a.length&&(a="#"+a.charAt(1)+a.charAt(1)+a.charAt(2)+a.charAt(2)+a.charAt(3)+a.charAt(3)),b=Number("0x"+a.slice(1,3))/255,c=Number("0x"+a.slice(3,5))/255,d=Number("0x"+a.slice(5,7))/255,e=Number("0x"+a.slice(7,9))/255):0==a.indexOf("rgba(")&&(f=a.slice(5,-1).split(","),b=Number(f[0])/255,c=Number(f[1])/255,d=Number(f[2])/255,e=Number(f[3])):(b=((4278190080&a)>>>24)/255,c=((16711680&a)>>>16)/255,d=((65280&a)>>>8)/255,e=(255&a)/255),this._clearColor.r=b||0,this._clearColor.g=c||0,this._clearColor.b=d||0,this._clearColor.a=e||0,this._webGLContext&&this._webGLContext.clearColor(this._clearColor.r,this._clearColor.g,this._clearColor.b,this._clearColor.a);
},b.toString=function(){return"[StageGL (name="+this.name+")]"},b._fetchWebGLContext=function(a,b){var c;try{c=a.getContext("webgl",b)||a.getContext("experimental-webgl",b)}catch(d){}if(c)c.viewportWidth=a.width,c.viewportHeight=a.height;else{var e="Could not initialize WebGL";console.error?console.error(e):console.log(e)}return c},b._fetchShaderProgram=function(b,c,d,e,f){b.useProgram(null);var g,h;switch(c){case"filter":h=a.COVER_VERTEX_HEADER+(d||a.COVER_VERTEX_BODY),g=a.COVER_FRAGMENT_HEADER+(e||a.COVER_FRAGMENT_BODY);break;case"particle":h=a.REGULAR_VERTEX_HEADER+a.PARTICLE_VERTEX_BODY,g=a.REGULAR_FRAGMENT_HEADER+a.PARTICLE_FRAGMENT_BODY;break;case"override":h=a.REGULAR_VERTEX_HEADER+(d||a.REGULAR_VERTEX_BODY),g=a.REGULAR_FRAGMENT_HEADER+(e||a.REGULAR_FRAGMENT_BODY);break;case"regular":default:h=a.REGULAR_VERTEX_HEADER+a.REGULAR_VERTEX_BODY,g=a.REGULAR_FRAGMENT_HEADER+a.REGULAR_FRAGMENT_BODY}var i=this._createShader(b,b.VERTEX_SHADER,h),j=this._createShader(b,b.FRAGMENT_SHADER,g),k=b.createProgram();if(b.attachShader(k,i),b.attachShader(k,j),b.linkProgram(k),k._type=c,!b.getProgramParameter(k,b.LINK_STATUS))throw b.useProgram(this._activeShader),b.getProgramInfoLog(k);switch(b.useProgram(k),c){case"filter":k.vertexPositionAttribute=b.getAttribLocation(k,"vertexPosition"),b.enableVertexAttribArray(k.vertexPositionAttribute),k.uvPositionAttribute=b.getAttribLocation(k,"uvPosition"),b.enableVertexAttribArray(k.uvPositionAttribute),k.samplerUniform=b.getUniformLocation(k,"uSampler"),b.uniform1i(k.samplerUniform,0),k.uprightUniform=b.getUniformLocation(k,"uUpright"),b.uniform1f(k.uprightUniform,0),f&&f(b,this,k);break;case"override":case"particle":case"regular":default:k.vertexPositionAttribute=b.getAttribLocation(k,"vertexPosition"),b.enableVertexAttribArray(k.vertexPositionAttribute),k.uvPositionAttribute=b.getAttribLocation(k,"uvPosition"),b.enableVertexAttribArray(k.uvPositionAttribute),k.textureIndexAttribute=b.getAttribLocation(k,"textureIndex"),b.enableVertexAttribArray(k.textureIndexAttribute),k.alphaAttribute=b.getAttribLocation(k,"objectAlpha"),b.enableVertexAttribArray(k.alphaAttribute);for(var l=[],m=0;m<this._batchTextureCount;m++)l[m]=m;k.samplerData=l,k.samplerUniform=b.getUniformLocation(k,"uSampler"),b.uniform1iv(k.samplerUniform,l),k.pMatrixUniform=b.getUniformLocation(k,"pMatrix")}return b.useProgram(this._activeShader),k},b._createShader=function(b,c,d){d=d.replace(/{{count}}/g,this._batchTextureCount);for(var e="",f=1;f<this._batchTextureCount;f++)e+="} else if (indexPicker <= "+f+".5) { color = texture2D(uSampler["+f+"], vTextureCoord);";d=d.replace(/{{alternates}}/g,e),d=d.replace(/{{fragColor}}/g,this._premultiply?a.REGULAR_FRAG_COLOR_PREMULTIPLY:a.REGULAR_FRAG_COLOR_NORMAL);var g=b.createShader(c);if(b.shaderSource(g,d),b.compileShader(g),!b.getShaderParameter(g,b.COMPILE_STATUS))throw b.getShaderInfoLog(g);return g},b._createBuffers=function(b){var c,d,e,f=this._maxCardsPerBatch*a.INDICIES_PER_CARD,g=this._vertexPositionBuffer=b.createBuffer();b.bindBuffer(b.ARRAY_BUFFER,g),c=2;var h=this._vertices=new Float32Array(f*c);for(d=0,e=h.length;e>d;d+=c)h[d]=h[d+1]=0;b.bufferData(b.ARRAY_BUFFER,h,b.DYNAMIC_DRAW),g.itemSize=c,g.numItems=f;var i=this._uvPositionBuffer=b.createBuffer();b.bindBuffer(b.ARRAY_BUFFER,i),c=2;var j=this._uvs=new Float32Array(f*c);for(d=0,e=j.length;e>d;d+=c)j[d]=j[d+1]=0;b.bufferData(b.ARRAY_BUFFER,j,b.DYNAMIC_DRAW),i.itemSize=c,i.numItems=f;var k=this._textureIndexBuffer=b.createBuffer();b.bindBuffer(b.ARRAY_BUFFER,k),c=1;var l=this._indices=new Float32Array(f*c);for(d=0,e=l.length;e>d;d++)l[d]=0;b.bufferData(b.ARRAY_BUFFER,l,b.DYNAMIC_DRAW),k.itemSize=c,k.numItems=f;var m=this._alphaBuffer=b.createBuffer();b.bindBuffer(b.ARRAY_BUFFER,m),c=1;var n=this._alphas=new Float32Array(f*c);for(d=0,e=n.length;e>d;d++)n[d]=1;b.bufferData(b.ARRAY_BUFFER,n,b.DYNAMIC_DRAW),m.itemSize=c,m.numItems=f},b._initTextures=function(){this._lastTextureInsert=-1,this._textureDictionary=[],this._textureIDs={},this._baseTextures=[],this._batchTextures=[];for(var a=0;a<this._batchTextureCount;a++){var b=this.getBaseTexture();if(this._baseTextures[a]=this._batchTextures[a]=b,!b)throw"Problems creating basic textures, known causes include using too much VRAM by not releasing WebGL texture instances"}},b._loadTextureImage=function(a,b){var c=b.src;c||(b._isCanvas=!0,c=b.src="canvas_"+this._lastTrackedCanvas++);var d=this._textureIDs[c];void 0===d&&(d=this._textureIDs[c]=this._textureDictionary.length),void 0===this._textureDictionary[d]&&(this._textureDictionary[d]=this.getBaseTexture());var e=this._textureDictionary[d];if(e)e._batchID=this._batchID,e._storeID=d,e._imageData=b,this._insertTextureInBatch(a,e),b._storeID=d,b.complete||b.naturalWidth||b._isCanvas?this._updateTextureImageData(a,b):b.addEventListener("load",this._updateTextureImageData.bind(this,a,b));else{var f="Problem creating desired texture, known causes include using too much VRAM by not releasing WebGL texture instances";console.error&&console.error(f)||console.log(f),e=this._baseTextures[0],e._batchID=this._batchID,e._storeID=-1,e._imageData=e,this._insertTextureInBatch(a,e)}return e},b._updateTextureImageData=function(a,b){var c=b.width&b.width-1||b.height&b.height-1,d=this._textureDictionary[b._storeID];a.activeTexture(a.TEXTURE0+d._activeIndex),a.bindTexture(a.TEXTURE_2D,d),d.isPOT=!c,this.setTextureParams(a,d.isPOT);try{a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,b)}catch(e){var f="\nAn error has occurred. This is most likely due to security restrictions on WebGL images with local or cross-domain origins";console.error?(console.error(f),console.error(e)):console&&(console.log(f),console.log(e))}b._invalid=!1,d._w=b.width,d._h=b.height,this.vocalDebug&&(c&&console.warn("NPOT(Non Power of Two) Texture: "+b.src),(b.width>a.MAX_TEXTURE_SIZE||b.height>a.MAX_TEXTURE_SIZE)&&console&&console.error("Oversized Texture: "+b.width+"x"+b.height+" vs "+a.MAX_TEXTURE_SIZE+"max"))},b._insertTextureInBatch=function(a,b){if(this._batchTextures[b._activeIndex]!==b){var c=-1,d=(this._lastTextureInsert+1)%this._batchTextureCount,e=d;do{if(this._batchTextures[e]._batchID!=this._batchID&&!this._slotBlacklist[e]){c=e;break}e=(e+1)%this._batchTextureCount}while(e!==d);-1===c&&(this.batchReason="textureOverflow",this._drawBuffers(a),this.batchCardCount=0,c=d),this._batchTextures[c]=b,b._activeIndex=c;var f=b._imageData;f&&f._invalid&&void 0!==b._drawID?this._updateTextureImageData(a,f):(a.activeTexture(a.TEXTURE0+c),a.bindTexture(a.TEXTURE_2D,b),this.setTextureParams(a)),this._lastTextureInsert=c}else{var f=b._imageData;void 0!=b._storeID&&f&&f._invalid&&this._updateTextureImageData(a,f)}b._drawID=this._drawID,b._batchID=this._batchID},b._killTextureObject=function(a){if(a){var b=this._webGLContext;if(void 0!==a._storeID&&a._storeID>=0){this._textureDictionary[a._storeID]=void 0;for(var c in this._textureIDs)this._textureIDs[c]==a._storeID&&delete this._textureIDs[c];a._imageData&&(a._imageData._storeID=void 0),a._imageData=a._storeID=void 0}void 0!==a._activeIndex&&this._batchTextures[a._activeIndex]===a&&(this._batchTextures[a._activeIndex]=this._baseTextures[a._activeIndex]);try{a._frameBuffer&&b.deleteFramebuffer(a._frameBuffer),a._frameBuffer=void 0}catch(d){this.vocalDebug&&console.log(d)}try{b.deleteTexture(a)}catch(d){this.vocalDebug&&console.log(d)}}},b._backupBatchTextures=function(a,b){var c=this._webGLContext;this._backupTextures||(this._backupTextures=[]),void 0===b&&(b=this._backupTextures);for(var d=0;d<this._batchTextureCount;d++)c.activeTexture(c.TEXTURE0+d),a?this._batchTextures[d]=b[d]:(b[d]=this._batchTextures[d],this._batchTextures[d]=this._baseTextures[d]),c.bindTexture(c.TEXTURE_2D,this._batchTextures[d]),this.setTextureParams(c,this._batchTextures[d].isPOT);a&&b===this._backupTextures&&(this._backupTextures=[])},b._batchDraw=function(a,b,c){this._isDrawing>0&&this._drawBuffers(b),this._isDrawing++,this._drawID++,this.batchCardCount=0,this.depth=0,this._appendToBatchGroup(a,b,new createjs.Matrix2D,this.alpha,c),this.batchReason="drawFinish",this._drawBuffers(b),this._isDrawing--},b._cacheDraw=function(a,b,c,d){var e,f=this._activeShader,g=this._slotBlacklist,h=this._maxTextureSlots-1,i=this._viewportWidth,j=this._viewportHeight;this.protectTextureSlot(h,!0);var k=b.getMatrix();k=k.clone(),k.scale(1/d.scale,1/d.scale),k=k.invert(),k.translate(-d.offX/d.scale*b.scaleX,-d.offY/d.scale*b.scaleY);var l=this._cacheContainer;l.children=[b],l.transformMatrix=k,this._backupBatchTextures(!1),c&&c.length?this._drawFilters(b,c,d):this.isCacheControlled?(a.clear(a.COLOR_BUFFER_BIT),this._batchDraw(l,a,!0)):(a.activeTexture(a.TEXTURE0+h),b.cacheCanvas=this.getTargetRenderTexture(b,d._drawWidth,d._drawHeight),e=b.cacheCanvas,a.bindFramebuffer(a.FRAMEBUFFER,e._frameBuffer),this.updateViewport(d._drawWidth,d._drawHeight),this._projectionMatrix=this._projectionMatrixFlip,a.clear(a.COLOR_BUFFER_BIT),this._batchDraw(l,a,!0),a.bindFramebuffer(a.FRAMEBUFFER,null),this.updateViewport(i,j)),this._backupBatchTextures(!0),this.protectTextureSlot(h,!1),this._activeShader=f,this._slotBlacklist=g},b._drawFilters=function(a,b,c){var d,e=this._webGLContext,f=this._maxTextureSlots-1,g=this._viewportWidth,h=this._viewportHeight,i=this._cacheContainer,j=b.length;e.activeTexture(e.TEXTURE0+f),d=this.getTargetRenderTexture(a,c._drawWidth,c._drawHeight),e.bindFramebuffer(e.FRAMEBUFFER,d._frameBuffer),this.updateViewport(c._drawWidth,c._drawHeight),e.clear(e.COLOR_BUFFER_BIT),this._batchDraw(i,e,!0),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,d),this.setTextureParams(e);var k=!1,l=0,m=b[l];do this._activeShader=this.getFilterShader(m),this._activeShader&&(e.activeTexture(e.TEXTURE0+f),d=this.getTargetRenderTexture(a,c._drawWidth,c._drawHeight),e.bindFramebuffer(e.FRAMEBUFFER,d._frameBuffer),e.viewport(0,0,c._drawWidth,c._drawHeight),e.clear(e.COLOR_BUFFER_BIT),this._drawCover(e,k),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,d),this.setTextureParams(e),(j>1||b[0]._multiPass)&&(k=!k),m=null!==m._multiPass?m._multiPass:b[++l]);while(m);this.isCacheControlled?(e.bindFramebuffer(e.FRAMEBUFFER,null),this.updateViewport(g,h),this._activeShader=this.getFilterShader(this),e.clear(e.COLOR_BUFFER_BIT),this._drawCover(e,k)):(k&&(e.activeTexture(e.TEXTURE0+f),d=this.getTargetRenderTexture(a,c._drawWidth,c._drawHeight),e.bindFramebuffer(e.FRAMEBUFFER,d._frameBuffer),this._activeShader=this.getFilterShader(this),e.viewport(0,0,c._drawWidth,c._drawHeight),e.clear(e.COLOR_BUFFER_BIT),this._drawCover(e,!k)),e.bindFramebuffer(e.FRAMEBUFFER,null),this.updateViewport(g,h),a.cacheCanvas=d)},b._appendToBatchGroup=function(b,c,d,e,f){b._glMtx||(b._glMtx=new createjs.Matrix2D);var g=b._glMtx;g.copy(d),b.transformMatrix?g.appendMatrix(b.transformMatrix):g.appendTransform(b.x,b.y,b.scaleX,b.scaleY,b.rotation,b.skewX,b.skewY,b.regX,b.regY);for(var h,i,j,k,l=b.children.length,m=0;l>m;m++){var n=b.children[m];if(n.visible&&e)if(n.cacheCanvas&&!f||(n._updateState&&n._updateState(),!n.children)){this.batchCardCount+1>this._maxCardsPerBatch&&(this.batchReason="vertexOverflow",this._drawBuffers(c),this.batchCardCount=0),n._glMtx||(n._glMtx=new createjs.Matrix2D);var o=n._glMtx;o.copy(g),n.transformMatrix?o.appendMatrix(n.transformMatrix):o.appendTransform(n.x,n.y,n.scaleX,n.scaleY,n.rotation,n.skewX,n.skewY,n.regX,n.regY);var p,q,r,s,t,u,v=n.cacheCanvas&&!f;if(2===n._webGLRenderStyle||v)r=(f?!1:n.cacheCanvas)||n.image;else{if(1!==n._webGLRenderStyle)continue;if(s=n.spriteSheet.getFrame(n.currentFrame),null===s)continue;r=s.image}var w=this._uvs,x=this._vertices,y=this._indices,z=this._alphas;if(r){if(void 0===r._storeID)t=this._loadTextureImage(c,r),this._insertTextureInBatch(c,t);else{if(t=this._textureDictionary[r._storeID],!t){this.vocalDebug&&console.log("Texture should not be looked up while not being stored.");continue}t._batchID!==this._batchID&&this._insertTextureInBatch(c,t)}if(q=t._activeIndex,2===n._webGLRenderStyle||v)!v&&n.sourceRect?(n._uvRect||(n._uvRect={}),u=n.sourceRect,p=n._uvRect,p.t=u.y/r.height,p.l=u.x/r.width,p.b=(u.y+u.height)/r.height,p.r=(u.x+u.width)/r.width,h=0,i=0,j=u.width+h,k=u.height+i):(p=a.UV_RECT,v?(u=n.bitmapCache,h=u.x+u._filterOffX/u.scale,i=u.y+u._filterOffY/u.scale,j=u._drawWidth/u.scale+h,k=u._drawHeight/u.scale+i):(h=0,i=0,j=r.width+h,k=r.height+i));else if(1===n._webGLRenderStyle){var A=s.rect;p=s.uvRect,p||(p=a.buildUVRects(n.spriteSheet,n.currentFrame,!1)),h=-s.regX,i=-s.regY,j=A.width-s.regX,k=A.height-s.regY}var B=this.batchCardCount*a.INDICIES_PER_CARD,C=2*B;x[C]=h*o.a+i*o.c+o.tx,x[C+1]=h*o.b+i*o.d+o.ty,x[C+2]=h*o.a+k*o.c+o.tx,x[C+3]=h*o.b+k*o.d+o.ty,x[C+4]=j*o.a+i*o.c+o.tx,x[C+5]=j*o.b+i*o.d+o.ty,x[C+6]=x[C+2],x[C+7]=x[C+3],x[C+8]=x[C+4],x[C+9]=x[C+5],x[C+10]=j*o.a+k*o.c+o.tx,x[C+11]=j*o.b+k*o.d+o.ty,w[C]=p.l,w[C+1]=p.t,w[C+2]=p.l,w[C+3]=p.b,w[C+4]=p.r,w[C+5]=p.t,w[C+6]=p.l,w[C+7]=p.b,w[C+8]=p.r,w[C+9]=p.t,w[C+10]=p.r,w[C+11]=p.b,y[B]=y[B+1]=y[B+2]=y[B+3]=y[B+4]=y[B+5]=q,z[B]=z[B+1]=z[B+2]=z[B+3]=z[B+4]=z[B+5]=n.alpha*e,this.batchCardCount++}}else this._appendToBatchGroup(n,c,g,n.alpha*e)}},b._drawBuffers=function(b){if(!(this.batchCardCount<=0)){this.vocalDebug&&console.log("Draw["+this._drawID+":"+this._batchID+"] : "+this.batchReason);var c=this._activeShader,d=this._vertexPositionBuffer,e=this._textureIndexBuffer,f=this._uvPositionBuffer,g=this._alphaBuffer;b.useProgram(c),b.bindBuffer(b.ARRAY_BUFFER,d),b.vertexAttribPointer(c.vertexPositionAttribute,d.itemSize,b.FLOAT,!1,0,0),b.bufferSubData(b.ARRAY_BUFFER,0,this._vertices),b.bindBuffer(b.ARRAY_BUFFER,e),b.vertexAttribPointer(c.textureIndexAttribute,e.itemSize,b.FLOAT,!1,0,0),b.bufferSubData(b.ARRAY_BUFFER,0,this._indices),b.bindBuffer(b.ARRAY_BUFFER,f),b.vertexAttribPointer(c.uvPositionAttribute,f.itemSize,b.FLOAT,!1,0,0),b.bufferSubData(b.ARRAY_BUFFER,0,this._uvs),b.bindBuffer(b.ARRAY_BUFFER,g),b.vertexAttribPointer(c.alphaAttribute,g.itemSize,b.FLOAT,!1,0,0),b.bufferSubData(b.ARRAY_BUFFER,0,this._alphas),b.uniformMatrix4fv(c.pMatrixUniform,b.FALSE,this._projectionMatrix);for(var h=0;h<this._batchTextureCount;h++){var i=this._batchTextures[h];b.activeTexture(b.TEXTURE0+h),b.bindTexture(b.TEXTURE_2D,i),this.setTextureParams(b,i.isPOT)}b.drawArrays(b.TRIANGLES,0,this.batchCardCount*a.INDICIES_PER_CARD),this._batchID++}},b._drawCover=function(b,c){this._isDrawing>0&&this._drawBuffers(b),this.vocalDebug&&console.log("Draw["+this._drawID+":"+this._batchID+"] : Cover");var d=this._activeShader,e=this._vertexPositionBuffer,f=this._uvPositionBuffer;b.clear(b.COLOR_BUFFER_BIT),b.useProgram(d),b.bindBuffer(b.ARRAY_BUFFER,e),b.vertexAttribPointer(d.vertexPositionAttribute,e.itemSize,b.FLOAT,!1,0,0),b.bufferSubData(b.ARRAY_BUFFER,0,a.COVER_VERT),b.bindBuffer(b.ARRAY_BUFFER,f),b.vertexAttribPointer(d.uvPositionAttribute,f.itemSize,b.FLOAT,!1,0,0),b.bufferSubData(b.ARRAY_BUFFER,0,c?a.COVER_UV_FLIP:a.COVER_UV),b.uniform1i(d.samplerUniform,0),b.uniform1f(d.uprightUniform,c?0:1),b.drawArrays(b.TRIANGLES,0,a.INDICIES_PER_CARD)},createjs.StageGL=createjs.promote(a,"Stage")}(),this.createjs=this.createjs||{},function(){function a(a){this.DisplayObject_constructor(),"string"==typeof a?(this.image=document.createElement("img"),this.image.src=a):this.image=a,this.sourceRect=null,this._webGLRenderStyle=createjs.DisplayObject._StageGL_BITMAP}var b=createjs.extend(a,createjs.DisplayObject);b.initialize=a,b.isVisible=function(){var a=this.image,b=this.cacheCanvas||a&&(a.naturalWidth||a.getContext||a.readyState>=2);return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY&&b)},b.draw=function(a,b){if(this.DisplayObject_draw(a,b))return!0;var c=this.image,d=this.sourceRect;if(c.getImage&&(c=c.getImage()),!c)return!0;if(d){var e=d.x,f=d.y,g=e+d.width,h=f+d.height,i=0,j=0,k=c.width,l=c.height;0>e&&(i-=e,e=0),g>k&&(g=k),0>f&&(j-=f,f=0),h>l&&(h=l),a.drawImage(c,e,f,g-e,h-f,i,j,g-e,h-f)}else a.drawImage(c,0,0);return!0},b.getBounds=function(){var a=this.DisplayObject_getBounds();if(a)return a;var b=this.image,c=this.sourceRect||b,d=b&&(b.naturalWidth||b.getContext||b.readyState>=2);return d?this._rectangle.setValues(0,0,c.width,c.height):null},b.clone=function(b){var c=this.image;c&&b&&(c=c.cloneNode());var d=new a(c);return this.sourceRect&&(d.sourceRect=this.sourceRect.clone()),this._cloneProps(d),d},b.toString=function(){return"[Bitmap (name="+this.name+")]"},createjs.Bitmap=createjs.promote(a,"DisplayObject")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b){this.DisplayObject_constructor(),this.currentFrame=0,this.currentAnimation=null,this.paused=!0,this.spriteSheet=a,this.currentAnimationFrame=0,this.framerate=0,this._animation=null,this._currentFrame=null,this._skipAdvance=!1,this._webGLRenderStyle=createjs.DisplayObject._StageGL_SPRITE,null!=b&&this.gotoAndPlay(b)}var b=createjs.extend(a,createjs.DisplayObject);b.initialize=a,b.isVisible=function(){var a=this.cacheCanvas||this.spriteSheet.complete;return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY&&a)},b.draw=function(a,b){if(this.DisplayObject_draw(a,b))return!0;this._normalizeFrame();var c=this.spriteSheet.getFrame(0|this._currentFrame);if(!c)return!1;var d=c.rect;return d.width&&d.height&&a.drawImage(c.image,d.x,d.y,d.width,d.height,-c.regX,-c.regY,d.width,d.height),!0},b.play=function(){this.paused=!1},b.stop=function(){this.paused=!0},b.gotoAndPlay=function(a){this.paused=!1,this._skipAdvance=!0,this._goto(a)},b.gotoAndStop=function(a){this.paused=!0,this._goto(a)},b.advance=function(a){var b=this.framerate||this.spriteSheet.framerate,c=b&&null!=a?a/(1e3/b):1;this._normalizeFrame(c)},b.getBounds=function(){return this.DisplayObject_getBounds()||this.spriteSheet.getFrameBounds(this.currentFrame,this._rectangle)},b.clone=function(){return this._cloneProps(new a(this.spriteSheet))},b.toString=function(){return"[Sprite (name="+this.name+")]"},b._cloneProps=function(a){return this.DisplayObject__cloneProps(a),a.currentFrame=this.currentFrame,a.currentAnimation=this.currentAnimation,a.paused=this.paused,a.currentAnimationFrame=this.currentAnimationFrame,a.framerate=this.framerate,a._animation=this._animation,a._currentFrame=this._currentFrame,a._skipAdvance=this._skipAdvance,a},b._tick=function(a){this.paused||(this._skipAdvance||this.advance(a&&a.delta),this._skipAdvance=!1),this.DisplayObject__tick(a)},b._normalizeFrame=function(a){a=a||0;var b,c=this._animation,d=this.paused,e=this._currentFrame;if(c){var f=c.speed||1,g=this.currentAnimationFrame;if(b=c.frames.length,g+a*f>=b){var h=c.next;if(this._dispatchAnimationEnd(c,e,d,h,b-1))return;if(h)return this._goto(h,a-(b-g)/f);this.paused=!0,g=c.frames.length-1}else g+=a*f;this.currentAnimationFrame=g,this._currentFrame=c.frames[0|g]}else if(e=this._currentFrame+=a,b=this.spriteSheet.getNumFrames(),e>=b&&b>0&&!this._dispatchAnimationEnd(c,e,d,b-1)&&(this._currentFrame-=b)>=b)return this._normalizeFrame();e=0|this._currentFrame,this.currentFrame!=e&&(this.currentFrame=e,this.dispatchEvent("change"))},b._dispatchAnimationEnd=function(a,b,c,d,e){var f=a?a.name:null;if(this.hasEventListener("animationend")){var g=new createjs.Event("animationend");g.name=f,g.next=d,this.dispatchEvent(g)}var h=this._animation!=a||this._currentFrame!=b;return h||c||!this.paused||(this.currentAnimationFrame=e,h=!0),h},b._goto=function(a,b){if(this.currentAnimationFrame=0,isNaN(a)){var c=this.spriteSheet.getAnimation(a);c&&(this._animation=c,this.currentAnimation=a,this._normalizeFrame(b))}else this.currentAnimation=this._animation=null,this._currentFrame=a,this._normalizeFrame()},createjs.Sprite=createjs.promote(a,"DisplayObject")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.DisplayObject_constructor(),this.graphics=a?a:new createjs.Graphics}var b=createjs.extend(a,createjs.DisplayObject);b.isVisible=function(){var a=this.cacheCanvas||this.graphics&&!this.graphics.isEmpty();return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY&&a)},b.draw=function(a,b){return this.DisplayObject_draw(a,b)?!0:(this.graphics.draw(a,this),!0)},b.clone=function(b){var c=b&&this.graphics?this.graphics.clone():this.graphics;return this._cloneProps(new a(c))},b.toString=function(){return"[Shape (name="+this.name+")]"},createjs.Shape=createjs.promote(a,"DisplayObject")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c){this.DisplayObject_constructor(),this.text=a,this.font=b,this.color=c,this.textAlign="left",this.textBaseline="top",this.maxWidth=null,this.outline=0,this.lineHeight=0,this.lineWidth=null}var b=createjs.extend(a,createjs.DisplayObject),c=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");c.getContext&&(a._workingContext=c.getContext("2d"),c.width=c.height=1),a.H_OFFSETS={start:0,left:0,center:-.5,end:-1,right:-1},a.V_OFFSETS={top:0,hanging:-.01,middle:-.4,alphabetic:-.8,ideographic:-.85,bottom:-1},b.isVisible=function(){var a=this.cacheCanvas||null!=this.text&&""!==this.text;return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY&&a)},b.draw=function(a,b){if(this.DisplayObject_draw(a,b))return!0;var c=this.color||"#000";return this.outline?(a.strokeStyle=c,a.lineWidth=1*this.outline):a.fillStyle=c,this._drawText(this._prepContext(a)),!0},b.getMeasuredWidth=function(){return this._getMeasuredWidth(this.text)},b.getMeasuredLineHeight=function(){return 1.2*this._getMeasuredWidth("M")},b.getMeasuredHeight=function(){return this._drawText(null,{}).height},b.getBounds=function(){var b=this.DisplayObject_getBounds();if(b)return b;if(null==this.text||""===this.text)return null;var c=this._drawText(null,{}),d=this.maxWidth&&this.maxWidth<c.width?this.maxWidth:c.width,e=d*a.H_OFFSETS[this.textAlign||"left"],f=this.lineHeight||this.getMeasuredLineHeight(),g=f*a.V_OFFSETS[this.textBaseline||"top"];return this._rectangle.setValues(e,g,d,c.height)},b.getMetrics=function(){var b={lines:[]};return b.lineHeight=this.lineHeight||this.getMeasuredLineHeight(),b.vOffset=b.lineHeight*a.V_OFFSETS[this.textBaseline||"top"],this._drawText(null,b,b.lines)},b.clone=function(){return this._cloneProps(new a(this.text,this.font,this.color))},b.toString=function(){return"[Text (text="+(this.text.length>20?this.text.substr(0,17)+"...":this.text)+")]"},b._cloneProps=function(a){return this.DisplayObject__cloneProps(a),a.textAlign=this.textAlign,a.textBaseline=this.textBaseline,a.maxWidth=this.maxWidth,a.outline=this.outline,a.lineHeight=this.lineHeight,a.lineWidth=this.lineWidth,a},b._prepContext=function(a){return a.font=this.font||"10px sans-serif",a.textAlign=this.textAlign||"left",a.textBaseline=this.textBaseline||"top",a.lineJoin="miter",a.miterLimit=2.5,a},b._drawText=function(b,c,d){var e=!!b;e||(b=a._workingContext,b.save(),this._prepContext(b));for(var f=this.lineHeight||this.getMeasuredLineHeight(),g=0,h=0,i=String(this.text).split(/(?:\r\n|\r|\n)/),j=0,k=i.length;k>j;j++){var l=i[j],m=null;if(null!=this.lineWidth&&(m=b.measureText(l).width)>this.lineWidth){var n=l.split(/(\s)/);l=n[0],m=b.measureText(l).width;for(var o=1,p=n.length;p>o;o+=2){var q=b.measureText(n[o]+n[o+1]).width;m+q>this.lineWidth?(e&&this._drawTextLine(b,l,h*f),d&&d.push(l),m>g&&(g=m),l=n[o+1],m=b.measureText(l).width,h++):(l+=n[o]+n[o+1],m+=q)}}e&&this._drawTextLine(b,l,h*f),d&&d.push(l),c&&null==m&&(m=b.measureText(l).width),m>g&&(g=m),h++}return c&&(c.width=g,c.height=h*f),e||b.restore(),c},b._drawTextLine=function(a,b,c){this.outline?a.strokeText(b,0,c,this.maxWidth||65535):a.fillText(b,0,c,this.maxWidth||65535)},b._getMeasuredWidth=function(b){var c=a._workingContext;c.save();var d=this._prepContext(c).measureText(b).width;return c.restore(),d},createjs.Text=createjs.promote(a,"DisplayObject")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b){this.Container_constructor(),this.text=a||"",this.spriteSheet=b,this.lineHeight=0,this.letterSpacing=0,this.spaceWidth=0,this._oldProps={text:0,spriteSheet:0,lineHeight:0,letterSpacing:0,spaceWidth:0},this._oldStage=null,this._drawAction=null}var b=createjs.extend(a,createjs.Container);a.maxPoolSize=100,a._spritePool=[],b.draw=function(a,b){this.DisplayObject_draw(a,b)||(this._updateState(),this.Container_draw(a,b))},b.getBounds=function(){return this._updateText(),this.Container_getBounds()},b.isVisible=function(){var a=this.cacheCanvas||this.spriteSheet&&this.spriteSheet.complete&&this.text;return!!(this.visible&&this.alpha>0&&0!==this.scaleX&&0!==this.scaleY&&a)},b.clone=function(){return this._cloneProps(new a(this.text,this.spriteSheet))},b.addChild=b.addChildAt=b.removeChild=b.removeChildAt=b.removeAllChildren=function(){},b._updateState=function(){this._updateText()},b._cloneProps=function(a){return this.Container__cloneProps(a),a.lineHeight=this.lineHeight,a.letterSpacing=this.letterSpacing,a.spaceWidth=this.spaceWidth,a},b._getFrameIndex=function(a,b){var c,d=b.getAnimation(a);return d||(a!=(c=a.toUpperCase())||a!=(c=a.toLowerCase())||(c=null),c&&(d=b.getAnimation(c))),d&&d.frames[0]},b._getFrame=function(a,b){var c=this._getFrameIndex(a,b);return null==c?c:b.getFrame(c)},b._getLineHeight=function(a){var b=this._getFrame("1",a)||this._getFrame("T",a)||this._getFrame("L",a)||a.getFrame(0);return b?b.rect.height:1},b._getSpaceWidth=function(a){var b=this._getFrame("1",a)||this._getFrame("l",a)||this._getFrame("e",a)||this._getFrame("a",a)||a.getFrame(0);return b?b.rect.width:1},b._updateText=function(){var b,c=0,d=0,e=this._oldProps,f=!1,g=this.spaceWidth,h=this.lineHeight,i=this.spriteSheet,j=a._spritePool,k=this.children,l=0,m=k.length;for(var n in e)e[n]!=this[n]&&(e[n]=this[n],f=!0);if(f){var o=!!this._getFrame(" ",i);o||g||(g=this._getSpaceWidth(i)),h||(h=this._getLineHeight(i));for(var p=0,q=this.text.length;q>p;p++){var r=this.text.charAt(p);if(" "!=r||o)if("\n"!=r&&"\r"!=r){var s=this._getFrameIndex(r,i);null!=s&&(m>l?b=k[l]:(k.push(b=j.length?j.pop():new createjs.Sprite),b.parent=this,m++),b.spriteSheet=i,b.gotoAndStop(s),b.x=c,b.y=d,l++,c+=b.getBounds().width+this.letterSpacing)}else"\r"==r&&"\n"==this.text.charAt(p+1)&&p++,c=0,d+=h;else c+=g}for(;m>l;)j.push(b=k.pop()),b.parent=null,m--;j.length>a.maxPoolSize&&(j.length=a.maxPoolSize)}},createjs.BitmapText=createjs.promote(a,"Container")}(),this.createjs=this.createjs||{},function(){"use strict";function a(b){this.Container_constructor(),!a.inited&&a.init();var c,d,e,f;b instanceof String||arguments.length>1?(c=b,d=arguments[1],e=arguments[2],f=arguments[3],null==e&&(e=-1),b=null):b&&(c=b.mode,d=b.startPosition,e=b.loop,f=b.labels),b||(b={labels:f}),this.mode=c||a.INDEPENDENT,this.startPosition=d||0,this.loop=e===!0?-1:e||0,this.currentFrame=0,this.paused=b.paused||!1,this.actionsEnabled=!0,this.autoReset=!0,this.frameBounds=this.frameBounds||b.frameBounds,this.framerate=null,b.useTicks=b.paused=!0,this.timeline=new createjs.Timeline(b),this._synchOffset=0,this._rawPosition=-1,this._bound_resolveState=this._resolveState.bind(this),this._t=0,this._managed={}}function b(){throw"MovieClipPlugin cannot be instantiated."}var c=createjs.extend(a,createjs.Container);a.INDEPENDENT="independent",a.SINGLE_FRAME="single",a.SYNCHED="synched",a.inited=!1,a.init=function(){a.inited||(b.install(),a.inited=!0)},c._getLabels=function(){return this.timeline.getLabels()},c.getLabels=createjs.deprecate(c._getLabels,"MovieClip.getLabels"),c._getCurrentLabel=function(){return this.timeline.currentLabel},c.getCurrentLabel=createjs.deprecate(c._getCurrentLabel,"MovieClip.getCurrentLabel"),c._getDuration=function(){return this.timeline.duration},c.getDuration=createjs.deprecate(c._getDuration,"MovieClip.getDuration");try{Object.defineProperties(c,{labels:{get:c._getLabels},currentLabel:{get:c._getCurrentLabel},totalFrames:{get:c._getDuration},duration:{get:c._getDuration}})}catch(d){}c.initialize=a,c.isVisible=function(){return!!(this.visible&&this.alpha>0&&0!=this.scaleX&&0!=this.scaleY)},c.draw=function(a,b){return this.DisplayObject_draw(a,b)?!0:(this._updateState(),this.Container_draw(a,b),!0)},c.play=function(){this.paused=!1},c.stop=function(){this.paused=!0},c.gotoAndPlay=function(a){this.paused=!1,this._goto(a)},c.gotoAndStop=function(a){this.paused=!0,this._goto(a)},c.advance=function(b){var c=a.INDEPENDENT;if(this.mode===c){for(var d=this,e=d.framerate;(d=d.parent)&&null===e;)d.mode===c&&(e=d._framerate);if(this._framerate=e,!this.paused){var f=null!==e&&-1!==e&&null!==b?b/(1e3/e)+this._t:1,g=0|f;for(this._t=f-g;g--;)this._updateTimeline(this._rawPosition+1,!1)}}},c.clone=function(){throw"MovieClip cannot be cloned."},c.toString=function(){return"[MovieClip (name="+this.name+")]"},c._updateState=function(){(-1===this._rawPosition||this.mode!==a.INDEPENDENT)&&this._updateTimeline(-1)},c._tick=function(a){this.advance(a&&a.delta),this.Container__tick(a)},c._goto=function(a){var b=this.timeline.resolve(a);null!=b&&(this._t=0,this._updateTimeline(b,!0))},c._reset=function(){this._rawPosition=-1,this._t=this.currentFrame=0,this.paused=!1},c._updateTimeline=function(b,c){var d=this.mode!==a.INDEPENDENT,e=this.timeline;d&&(b=this.startPosition+(this.mode===a.SINGLE_FRAME?0:this._synchOffset)),0>b&&(b=0),(this._rawPosition!==b||d)&&(this._rawPosition=b,e.loop=this.loop,e.setPosition(b,d||!this.actionsEnabled,c,this._bound_resolveState))},c._renderFirstFrame=function(){var a=this.timeline,b=a.rawPosition;a.setPosition(0,!0,!0,this._bound_resolveState),a.rawPosition=b},c._resolveState=function(){var a=this.timeline;this.currentFrame=a.position;for(var b in this._managed)this._managed[b]=1;for(var c=a.tweens,d=0,e=c.length;e>d;d++){var f=c[d],g=f.target;if(g!==this&&!f.passive){var h=f._stepPosition;g instanceof createjs.DisplayObject?this._addManagedChild(g,h):this._setState(g.state,h)}}var i=this.children;for(d=i.length-1;d>=0;d--){var j=i[d].id;1===this._managed[j]&&(this.removeChildAt(d),delete this._managed[j])}},c._setState=function(a,b){if(a)for(var c=a.length-1;c>=0;c--){var d=a[c],e=d.t,f=d.p;for(var g in f)e[g]=f[g];this._addManagedChild(e,b)}},c._addManagedChild=function(b,c){b._off||(this.addChildAt(b,0),b instanceof a&&(b._synchOffset=c,b.mode===a.INDEPENDENT&&b.autoReset&&!this._managed[b.id]&&b._reset()),this._managed[b.id]=2)},c._getBounds=function(a,b){var c=this.DisplayObject_getBounds();return c||this.frameBounds&&(c=this._rectangle.copy(this.frameBounds[this.currentFrame])),c?this._transformBounds(c,a,b):this.Container__getBounds(a,b)},createjs.MovieClip=createjs.promote(a,"Container"),b.priority=100,b.ID="MovieClip",b.install=function(){createjs.Tween._installPlugin(b)},b.init=function(c,d,e){"startPosition"===d&&c.target instanceof a&&c._addPlugin(b)},b.step=function(a,b,c){},b.change=function(a,b,c,d,e,f){return"startPosition"===c?1===e?b.props[c]:b.prev.props[c]:void 0}}(),this.createjs=this.createjs||{},function(){"use strict";function a(){throw"SpriteSheetUtils cannot be instantiated"}var b=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");b.getContext&&(a._workingCanvas=b,a._workingContext=b.getContext("2d"),b.width=b.height=1),a.extractFrame=function(b,c){isNaN(c)&&(c=b.getAnimation(c).frames[0]);var d=b.getFrame(c);if(!d)return null;var e=d.rect,f=a._workingCanvas;f.width=e.width,f.height=e.height,a._workingContext.drawImage(d.image,e.x,e.y,e.width,e.height,0,0,e.width,e.height);var g=document.createElement("img");return g.src=f.toDataURL("image/png"),g},a.addFlippedFrames=createjs.deprecate(null,"SpriteSheetUtils.addFlippedFrames"),a.mergeAlpha=createjs.deprecate(null,"SpriteSheetUtils.mergeAlpha"),a._flip=function(b,c,d,e){for(var f=b._images,g=a._workingCanvas,h=a._workingContext,i=f.length/c,j=0;i>j;j++){var k=f[j];k.__tmp=j,h.setTransform(1,0,0,1,0,0),h.clearRect(0,0,g.width+1,g.height+1),g.width=k.width,g.height=k.height,h.setTransform(d?-1:1,0,0,e?-1:1,d?k.width:0,e?k.height:0),h.drawImage(k,0,0);var l=document.createElement("img");l.src=g.toDataURL("image/png"),l.width=k.width||k.naturalWidth,l.height=k.height||k.naturalHeight,
f.push(l)}var m=b._frames,n=m.length/c;for(j=0;n>j;j++){k=m[j];var o=k.rect.clone();l=f[k.image.__tmp+i*c];var p={image:l,rect:o,regX:k.regX,regY:k.regY};d&&(o.x=(l.width||l.naturalWidth)-o.x-o.width,p.regX=o.width-k.regX),e&&(o.y=(l.height||l.naturalHeight)-o.y-o.height,p.regY=o.height-k.regY),m.push(p)}var q="_"+(d?"h":"")+(e?"v":""),r=b._animations,s=b._data,t=r.length/c;for(j=0;t>j;j++){var u=r[j];k=s[u];var v={name:u+q,speed:k.speed,next:k.next,frames:[]};k.next&&(v.next+=q),m=k.frames;for(var w=0,x=m.length;x>w;w++)v.frames.push(m[w]+n*c);s[v.name]=v,r.push(v.name)}},createjs.SpriteSheetUtils=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.EventDispatcher_constructor(),this.maxWidth=2048,this.maxHeight=2048,this.spriteSheet=null,this.scale=1,this.padding=1,this.timeSlice=.3,this.progress=-1,this.framerate=a||0,this._frames=[],this._animations={},this._data=null,this._nextFrameIndex=0,this._index=0,this._timerID=null,this._scale=1}var b=createjs.extend(a,createjs.EventDispatcher);a.ERR_DIMENSIONS="frame dimensions exceed max spritesheet dimensions",a.ERR_RUNNING="a build is already running",b.addFrame=function(b,c,d,e,f){if(this._data)throw a.ERR_RUNNING;var g=c||b.bounds||b.nominalBounds;return!g&&b.getBounds&&(g=b.getBounds()),g?(d=d||1,this._frames.push({source:b,sourceRect:g,scale:d,funct:e,data:f,index:this._frames.length,height:g.height*d})-1):null},b.addAnimation=function(b,c,d,e){if(this._data)throw a.ERR_RUNNING;this._animations[b]={frames:c,next:d,speed:e}},b.addMovieClip=function(b,c,d,e,f,g){if(this._data)throw a.ERR_RUNNING;var h=b.frameBounds,i=c||b.bounds||b.nominalBounds;if(!i&&b.getBounds&&(i=b.getBounds()),i||h){var j,k,l=this._frames.length,m=b.timeline.duration;for(j=0;m>j;j++){var n=h&&h[j]?h[j]:i;this.addFrame(b,n,d,this._setupMovieClipFrame,{i:j,f:e,d:f})}var o=b.timeline._labels,p=[];for(var q in o)p.push({index:o[q],label:q});if(p.length)for(p.sort(function(a,b){return a.index-b.index}),j=0,k=p.length;k>j;j++){for(var r=p[j].label,s=l+p[j].index,t=l+(j==k-1?m:p[j+1].index),u=[],v=s;t>v;v++)u.push(v);(!g||(r=g(r,b,s,t)))&&this.addAnimation(r,u,!0)}}},b.build=function(){if(this._data)throw a.ERR_RUNNING;for(this._startBuild();this._drawNext(););return this._endBuild(),this.spriteSheet},b.buildAsync=function(b){if(this._data)throw a.ERR_RUNNING;this.timeSlice=b,this._startBuild();var c=this;this._timerID=setTimeout(function(){c._run()},50-50*Math.max(.01,Math.min(.99,this.timeSlice||.3)))},b.stopAsync=function(){clearTimeout(this._timerID),this._data=null},b.clone=function(){throw"SpriteSheetBuilder cannot be cloned."},b.toString=function(){return"[SpriteSheetBuilder]"},b._startBuild=function(){var b=this.padding||0;this.progress=0,this.spriteSheet=null,this._index=0,this._scale=this.scale;var c=[];this._data={images:[],frames:c,framerate:this.framerate,animations:this._animations};var d=this._frames.slice();if(d.sort(function(a,b){return a.height<=b.height?-1:1}),d[d.length-1].height+2*b>this.maxHeight)throw a.ERR_DIMENSIONS;for(var e=0,f=0,g=0;d.length;){var h=this._fillRow(d,e,g,c,b);if(h.w>f&&(f=h.w),e+=h.h,!h.h||!d.length){var i=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas");i.width=this._getSize(f,this.maxWidth),i.height=this._getSize(e,this.maxHeight),this._data.images[g]=i,h.h||(f=e=0,g++)}}},b._setupMovieClipFrame=function(a,b){var c=a.actionsEnabled;a.actionsEnabled=!1,a.gotoAndStop(b.i),a.actionsEnabled=c,b.f&&b.f(a,b.d,b.i)},b._getSize=function(a,b){for(var c=4;Math.pow(2,++c)<a;);return Math.min(b,Math.pow(2,c))},b._fillRow=function(b,c,d,e,f){var g=this.maxWidth,h=this.maxHeight;c+=f;for(var i=h-c,j=f,k=0,l=b.length-1;l>=0;l--){var m=b[l],n=this._scale*m.scale,o=m.sourceRect,p=m.source,q=Math.floor(n*o.x-f),r=Math.floor(n*o.y-f),s=Math.ceil(n*o.height+2*f),t=Math.ceil(n*o.width+2*f);if(t>g)throw a.ERR_DIMENSIONS;s>i||j+t>g||(m.img=d,m.rect=new createjs.Rectangle(j,c,t,s),k=k||s,b.splice(l,1),e[m.index]=[j,c,t,s,d,Math.round(-q+n*p.regX-f),Math.round(-r+n*p.regY-f)],j+=t)}return{w:j,h:k}},b._endBuild=function(){this.spriteSheet=new createjs.SpriteSheet(this._data),this._data=null,this.progress=1,this.dispatchEvent("complete")},b._run=function(){for(var a=50*Math.max(.01,Math.min(.99,this.timeSlice||.3)),b=(new Date).getTime()+a,c=!1;b>(new Date).getTime();)if(!this._drawNext()){c=!0;break}if(c)this._endBuild();else{var d=this;this._timerID=setTimeout(function(){d._run()},50-a)}var e=this.progress=this._index/this._frames.length;if(this.hasEventListener("progress")){var f=new createjs.Event("progress");f.progress=e,this.dispatchEvent(f)}},b._drawNext=function(){var a=this._frames[this._index],b=a.scale*this._scale,c=a.rect,d=a.sourceRect,e=this._data.images[a.img],f=e.getContext("2d");return a.funct&&a.funct(a.source,a.data),f.save(),f.beginPath(),f.rect(c.x,c.y,c.width,c.height),f.clip(),f.translate(Math.ceil(c.x-d.x*b),Math.ceil(c.y-d.y*b)),f.scale(b,b),a.source.draw(f),f.restore(),++this._index<this._frames.length},createjs.SpriteSheetBuilder=createjs.promote(a,"EventDispatcher")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.DisplayObject_constructor(),"string"==typeof a&&(a=document.getElementById(a)),this.mouseEnabled=!1;var b=a.style;b.position="absolute",b.transformOrigin=b.WebkitTransformOrigin=b.msTransformOrigin=b.MozTransformOrigin=b.OTransformOrigin="0% 0%",this.htmlElement=a,this._oldProps=null,this._oldStage=null,this._drawAction=null}var b=createjs.extend(a,createjs.DisplayObject);b.isVisible=function(){return null!=this.htmlElement},b.draw=function(a,b){return!0},b.cache=function(){},b.uncache=function(){},b.updateCache=function(){},b.hitTest=function(){},b.localToGlobal=function(){},b.globalToLocal=function(){},b.localToLocal=function(){},b.clone=function(){throw"DOMElement cannot be cloned."},b.toString=function(){return"[DOMElement (name="+this.name+")]"},b._tick=function(a){var b=this.stage;b&&b!==this._oldStage&&(this._drawAction&&b.off("drawend",this._drawAction),this._drawAction=b.on("drawend",this._handleDrawEnd,this),this._oldStage=b),this.DisplayObject__tick(a)},b._handleDrawEnd=function(a){var b=this.htmlElement;if(b){var c=b.style,d=this.getConcatenatedDisplayProps(this._props),e=d.matrix,f=d.visible?"visible":"hidden";if(f!=c.visibility&&(c.visibility=f),d.visible){var g=this._oldProps,h=g&&g.matrix,i=1e4;if(!h||!h.equals(e)){var j="matrix("+(e.a*i|0)/i+","+(e.b*i|0)/i+","+(e.c*i|0)/i+","+(e.d*i|0)/i+","+(e.tx+.5|0);c.transform=c.WebkitTransform=c.OTransform=c.msTransform=j+","+(e.ty+.5|0)+")",c.MozTransform=j+"px,"+(e.ty+.5|0)+"px)",g||(g=this._oldProps=new createjs.DisplayProps(!0,null)),g.matrix.copy(e)}g.alpha!=d.alpha&&(c.opacity=""+(d.alpha*i|0)/i,g.alpha=d.alpha)}}},createjs.DOMElement=createjs.promote(a,"DisplayObject")}(),this.createjs=this.createjs||{},function(){"use strict";function a(){this.usesContext=!1,this._multiPass=null,this.VTX_SHADER_BODY=null,this.FRAG_SHADER_BODY=null}var b=a.prototype;b.getBounds=function(a){return a},b.shaderParamSetup=function(a,b,c){},b.applyFilter=function(a,b,c,d,e,f,g,h){f=f||a,null==g&&(g=b),null==h&&(h=c);try{var i=a.getImageData(b,c,d,e)}catch(j){return!1}return this._applyFilter(i)?(f.putImageData(i,g,h),!0):!1},b.toString=function(){return"[Filter]"},b.clone=function(){return new a},b._applyFilter=function(a){return!0},createjs.Filter=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(){this.width=void 0,this.height=void 0,this.x=void 0,this.y=void 0,this.scale=1,this.offX=0,this.offY=0,this.cacheID=0,this._filterOffX=0,this._filterOffY=0,this._cacheDataURLID=0,this._cacheDataURL=null,this._drawWidth=0,this._drawHeight=0}var b=a.prototype;a.getFilterBounds=function(a,b){b||(b=new createjs.Rectangle);var c=a.filters,d=c&&c.length;if(0>=!!d)return b;for(var e=0;d>e;e++){var f=c[e];if(f&&f.getBounds){var g=f.getBounds();g&&(0==e?b.setValues(g.x,g.y,g.width,g.height):b.extend(g.x,g.y,g.width,g.height))}}return b},b.toString=function(){return"[BitmapCache]"},b.define=function(a,b,c,d,e,f,g){if(!a)throw"No symbol to cache";this._options=g,this.target=a,this.width=d>=1?d:1,this.height=e>=1?e:1,this.x=b||0,this.y=c||0,this.scale=f||1,this.update()},b.update=function(b){if(!this.target)throw"define() must be called before update()";var c=a.getFilterBounds(this.target),d=this.target.cacheCanvas;this._drawWidth=Math.ceil(this.width*this.scale)+c.width,this._drawHeight=Math.ceil(this.height*this.scale)+c.height,d&&this._drawWidth==d.width&&this._drawHeight==d.height||this._updateSurface(),this._filterOffX=c.x,this._filterOffY=c.y,this.offX=this.x*this.scale+this._filterOffX,this.offY=this.y*this.scale+this._filterOffY,this._drawToCache(b),this.cacheID=this.cacheID?this.cacheID+1:1},b.release=function(){if(this._webGLCache)this._webGLCache.isCacheControlled||(this.__lastRT&&(this.__lastRT=void 0),this.__rtA&&this._webGLCache._killTextureObject(this.__rtA),this.__rtB&&this._webGLCache._killTextureObject(this.__rtB),this.target&&this.target.cacheCanvas&&this._webGLCache._killTextureObject(this.target.cacheCanvas)),this._webGLCache=!1;else{var a=this.target.stage;a instanceof createjs.StageGL&&a.releaseTexture(this.target.cacheCanvas)}this.target=this.target.cacheCanvas=null,this.cacheID=this._cacheDataURLID=this._cacheDataURL=void 0,this.width=this.height=this.x=this.y=this.offX=this.offY=0,this.scale=1},b.getCacheDataURL=function(){var a=this.target&&this.target.cacheCanvas;return a?(this.cacheID!=this._cacheDataURLID&&(this._cacheDataURLID=this.cacheID,this._cacheDataURL=a.toDataURL?a.toDataURL():null),this._cacheDataURL):null},b.draw=function(a){return this.target?(a.drawImage(this.target.cacheCanvas,this.x+this._filterOffX/this.scale,this.y+this._filterOffY/this.scale,this._drawWidth/this.scale,this._drawHeight/this.scale),!0):!1},b._updateSurface=function(){if(!this._options||!this._options.useGL){var a=this.target.cacheCanvas;return a||(a=this.target.cacheCanvas=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas")),a.width=this._drawWidth,void(a.height=this._drawHeight)}if(!this._webGLCache)if("stage"===this._options.useGL){if(!this.target.stage||!this.target.stage.isWebGL){var b="Cannot use 'stage' for cache because the object's parent stage is ";throw b+=this.target.stage?"non WebGL.":"not set, please addChild to the correct stage."}this.target.cacheCanvas=!0,this._webGLCache=this.target.stage}else if("new"===this._options.useGL)this.target.cacheCanvas=document.createElement("canvas"),this._webGLCache=new createjs.StageGL(this.target.cacheCanvas,{antialias:!0,transparent:!0,autoPurge:-1}),this._webGLCache.isCacheControlled=!0;else{if(!(this._options.useGL instanceof createjs.StageGL))throw"Invalid option provided to useGL, expected ['stage', 'new', StageGL, undefined], got "+this._options.useGL;this.target.cacheCanvas=!0,this._webGLCache=this._options.useGL,this._webGLCache.isCacheControlled=!0}var a=this.target.cacheCanvas,c=this._webGLCache;c.isCacheControlled&&(a.width=this._drawWidth,a.height=this._drawHeight,c.updateViewport(this._drawWidth,this._drawHeight)),this.target.filters?(c.getTargetRenderTexture(this.target,this._drawWidth,this._drawHeight),c.getTargetRenderTexture(this.target,this._drawWidth,this._drawHeight)):c.isCacheControlled||c.getTargetRenderTexture(this.target,this._drawWidth,this._drawHeight)},b._drawToCache=function(a){var b=this.target.cacheCanvas,c=this.target,d=this._webGLCache;if(d)d.cacheDraw(c,c.filters,this),b=this.target.cacheCanvas,b.width=this._drawWidth,b.height=this._drawHeight;else{var e=b.getContext("2d");a||e.clearRect(0,0,this._drawWidth+1,this._drawHeight+1),e.save(),e.globalCompositeOperation=a,e.setTransform(this.scale,0,0,this.scale,-this._filterOffX,-this._filterOffY),e.translate(-this.x,-this.y),c.draw(e,!0),e.restore(),c.filters&&c.filters.length&&this._applyFilters(e)}b._invalid=!0},b._applyFilters=function(a){var b,c=this.target.filters,d=this._drawWidth,e=this._drawHeight,f=0,g=c[f];do g.usesContext?(b&&(a.putImageData(b,0,0),b=null),g.applyFilter(a,0,0,d,e)):(b||(b=a.getImageData(0,0,d,e)),g._applyFilter(b)),g=null!==g._multiPass?g._multiPass:c[++f];while(g);b&&a.putImageData(b,0,0)},createjs.BitmapCache=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c){this.Filter_constructor(),this._blurX=a,this._blurXTable=[],this._lastBlurX=null,this._blurY=b,this._blurYTable=[],this._lastBlurY=null,this._quality,this._lastQuality=null,this.FRAG_SHADER_TEMPLATE="uniform float xWeight[{{blurX}}];uniform float yWeight[{{blurY}}];uniform vec2 textureOffset;void main(void) {vec4 color = vec4(0.0);float xAdj = ({{blurX}}.0-1.0)/2.0;float yAdj = ({{blurY}}.0-1.0)/2.0;vec2 sampleOffset;for(int i=0; i<{{blurX}}; i++) {for(int j=0; j<{{blurY}}; j++) {sampleOffset = vRenderCoord + (textureOffset * vec2(float(i)-xAdj, float(j)-yAdj));color += texture2D(uSampler, sampleOffset) * (xWeight[i] * yWeight[j]);}}gl_FragColor = color.rgba;}",(isNaN(c)||1>c)&&(c=1),this.setQuality(0|c)}var b=createjs.extend(a,createjs.Filter);b.getBlurX=function(){return this._blurX},b.getBlurY=function(){return this._blurY},b.setBlurX=function(a){(isNaN(a)||0>a)&&(a=0),this._blurX=a},b.setBlurY=function(a){(isNaN(a)||0>a)&&(a=0),this._blurY=a},b.getQuality=function(){return this._quality},b.setQuality=function(a){(isNaN(a)||0>a)&&(a=0),this._quality=0|a},b._getShader=function(){var a=this._lastBlurX!==this._blurX,b=this._lastBlurY!==this._blurY,c=this._lastQuality!==this._quality;return a||b||c?((a||c)&&(this._blurXTable=this._getTable(this._blurX*this._quality)),(b||c)&&(this._blurYTable=this._getTable(this._blurY*this._quality)),this._updateShader(),this._lastBlurX=this._blurX,this._lastBlurY=this._blurY,void(this._lastQuality=this._quality)):this._compiledShader},b._setShader=function(){this._compiledShader};try{Object.defineProperties(b,{blurX:{get:b.getBlurX,set:b.setBlurX},blurY:{get:b.getBlurY,set:b.setBlurY},quality:{get:b.getQuality,set:b.setQuality},_builtShader:{get:b._getShader,set:b._setShader}})}catch(c){console.log(c)}b._getTable=function(a){var b=4.2;if(1>=a)return[1];var c=[],d=Math.ceil(2*a);d+=d%2?0:1;for(var e=d/2|0,f=-e;e>=f;f++){var g=f/e*b;c.push(1/Math.sqrt(2*Math.PI)*Math.pow(Math.E,-(Math.pow(g,2)/4)))}var h=c.reduce(function(a,b){return a+b});return c.map(function(a,b,c){return a/h})},b._updateShader=function(){if(void 0!==this._blurX&&void 0!==this._blurY){var a=this.FRAG_SHADER_TEMPLATE;a=a.replace(/\{\{blurX\}\}/g,this._blurXTable.length.toFixed(0)),a=a.replace(/\{\{blurY\}\}/g,this._blurYTable.length.toFixed(0)),this.FRAG_SHADER_BODY=a}},b.shaderParamSetup=function(a,b,c){a.uniform1fv(a.getUniformLocation(c,"xWeight"),this._blurXTable),a.uniform1fv(a.getUniformLocation(c,"yWeight"),this._blurYTable),a.uniform2f(a.getUniformLocation(c,"textureOffset"),2/(b._viewportWidth*this._quality),2/(b._viewportHeight*this._quality))},a.MUL_TABLE=[1,171,205,293,57,373,79,137,241,27,391,357,41,19,283,265,497,469,443,421,25,191,365,349,335,161,155,149,9,278,269,261,505,245,475,231,449,437,213,415,405,395,193,377,369,361,353,345,169,331,325,319,313,307,301,37,145,285,281,69,271,267,263,259,509,501,493,243,479,118,465,459,113,446,55,435,429,423,209,413,51,403,199,393,97,3,379,375,371,367,363,359,355,351,347,43,85,337,333,165,327,323,5,317,157,311,77,305,303,75,297,294,73,289,287,71,141,279,277,275,68,135,67,133,33,262,260,129,511,507,503,499,495,491,61,121,481,477,237,235,467,232,115,457,227,451,7,445,221,439,218,433,215,427,425,211,419,417,207,411,409,203,202,401,399,396,197,49,389,387,385,383,95,189,47,187,93,185,23,183,91,181,45,179,89,177,11,175,87,173,345,343,341,339,337,21,167,83,331,329,327,163,81,323,321,319,159,79,315,313,39,155,309,307,153,305,303,151,75,299,149,37,295,147,73,291,145,289,287,143,285,71,141,281,35,279,139,69,275,137,273,17,271,135,269,267,133,265,33,263,131,261,130,259,129,257,1],a.SHG_TABLE=[0,9,10,11,9,12,10,11,12,9,13,13,10,9,13,13,14,14,14,14,10,13,14,14,14,13,13,13,9,14,14,14,15,14,15,14,15,15,14,15,15,15,14,15,15,15,15,15,14,15,15,15,15,15,15,12,14,15,15,13,15,15,15,15,16,16,16,15,16,14,16,16,14,16,13,16,16,16,15,16,13,16,15,16,14,9,16,16,16,16,16,16,16,16,16,13,14,16,16,15,16,16,10,16,15,16,14,16,16,14,16,16,14,16,16,14,15,16,16,16,14,15,14,15,13,16,16,15,17,17,17,17,17,17,14,15,17,17,16,16,17,16,15,17,16,17,11,17,16,17,16,17,16,17,17,16,17,17,16,17,17,16,16,17,17,17,16,14,17,17,17,17,15,16,14,16,15,16,13,16,15,16,14,16,15,16,12,16,15,16,17,17,17,17,17,13,16,15,17,17,17,16,15,17,17,17,16,15,17,17,14,16,17,17,16,17,17,16,15,17,16,14,17,16,15,17,16,17,17,16,17,15,16,17,14,17,16,15,17,16,17,13,17,16,17,17,16,17,14,17,16,17,16,17,16,17,9],b.getBounds=function(a){var b=0|this.blurX,c=0|this.blurY;if(0>=b&&0>=c)return a;var d=Math.pow(this.quality,.2);return(a||new createjs.Rectangle).pad(c*d+1,b*d+1,c*d+1,b*d+1)},b.clone=function(){return new a(this.blurX,this.blurY,this.quality)},b.toString=function(){return"[BlurFilter]"},b._applyFilter=function(b){var c=this._blurX>>1;if(isNaN(c)||0>c)return!1;var d=this._blurY>>1;if(isNaN(d)||0>d)return!1;if(0==c&&0==d)return!1;var e=this.quality;(isNaN(e)||1>e)&&(e=1),e|=0,e>3&&(e=3),1>e&&(e=1);var f=b.data,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=c+c+1|0,w=d+d+1|0,x=0|b.width,y=0|b.height,z=x-1|0,A=y-1|0,B=c+1|0,C=d+1|0,D={r:0,b:0,g:0,a:0},E=D;for(i=1;v>i;i++)E=E.n={r:0,b:0,g:0,a:0};E.n=D;var F={r:0,b:0,g:0,a:0},G=F;for(i=1;w>i;i++)G=G.n={r:0,b:0,g:0,a:0};G.n=F;for(var H=null,I=0|a.MUL_TABLE[c],J=0|a.SHG_TABLE[c],K=0|a.MUL_TABLE[d],L=0|a.SHG_TABLE[d];e-->0;){m=l=0;var M=I,N=J;for(h=y;--h>-1;){for(n=B*(r=f[0|l]),o=B*(s=f[l+1|0]),p=B*(t=f[l+2|0]),q=B*(u=f[l+3|0]),E=D,i=B;--i>-1;)E.r=r,E.g=s,E.b=t,E.a=u,E=E.n;for(i=1;B>i;i++)j=l+((i>z?z:i)<<2)|0,n+=E.r=f[j],o+=E.g=f[j+1],p+=E.b=f[j+2],q+=E.a=f[j+3],E=E.n;for(H=D,g=0;x>g;g++)f[l++]=n*M>>>N,f[l++]=o*M>>>N,f[l++]=p*M>>>N,f[l++]=q*M>>>N,j=m+((j=g+c+1)<z?j:z)<<2,n-=H.r-(H.r=f[j]),o-=H.g-(H.g=f[j+1]),p-=H.b-(H.b=f[j+2]),q-=H.a-(H.a=f[j+3]),H=H.n;m+=x}for(M=K,N=L,g=0;x>g;g++){for(l=g<<2|0,n=C*(r=f[l])|0,o=C*(s=f[l+1|0])|0,p=C*(t=f[l+2|0])|0,q=C*(u=f[l+3|0])|0,G=F,i=0;C>i;i++)G.r=r,G.g=s,G.b=t,G.a=u,G=G.n;for(k=x,i=1;d>=i;i++)l=k+g<<2,n+=G.r=f[l],o+=G.g=f[l+1],p+=G.b=f[l+2],q+=G.a=f[l+3],G=G.n,A>i&&(k+=x);if(l=g,H=F,e>0)for(h=0;y>h;h++)j=l<<2,f[j+3]=u=q*M>>>N,u>0?(f[j]=n*M>>>N,f[j+1]=o*M>>>N,f[j+2]=p*M>>>N):f[j]=f[j+1]=f[j+2]=0,j=g+((j=h+C)<A?j:A)*x<<2,n-=H.r-(H.r=f[j]),o-=H.g-(H.g=f[j+1]),p-=H.b-(H.b=f[j+2]),q-=H.a-(H.a=f[j+3]),H=H.n,l+=x;else for(h=0;y>h;h++)j=l<<2,f[j+3]=u=q*M>>>N,u>0?(u=255/u,f[j]=(n*M>>>N)*u,f[j+1]=(o*M>>>N)*u,f[j+2]=(p*M>>>N)*u):f[j]=f[j+1]=f[j+2]=0,j=g+((j=h+C)<A?j:A)*x<<2,n-=H.r-(H.r=f[j]),o-=H.g-(H.g=f[j+1]),p-=H.b-(H.b=f[j+2]),q-=H.a-(H.a=f[j+3]),H=H.n,l+=x}}return!0},createjs.BlurFilter=createjs.promote(a,"Filter")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.Filter_constructor(),this.alphaMap=a,this._alphaMap=null,this._mapData=null,this._mapTexture=null,this.FRAG_SHADER_BODY="uniform sampler2D uAlphaSampler;void main(void) {vec4 color = texture2D(uSampler, vRenderCoord);vec4 alphaMap = texture2D(uAlphaSampler, vTextureCoord);gl_FragColor = vec4(color.rgb, color.a * (alphaMap.r * ceil(alphaMap.a)));}"}var b=createjs.extend(a,createjs.Filter);b.shaderParamSetup=function(a,b,c){this._mapTexture||(this._mapTexture=a.createTexture()),a.activeTexture(a.TEXTURE1),a.bindTexture(a.TEXTURE_2D,this._mapTexture),b.setTextureParams(a),a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,this.alphaMap),a.uniform1i(a.getUniformLocation(c,"uAlphaSampler"),1)},b.clone=function(){var b=new a(this.alphaMap);return b._alphaMap=this._alphaMap,b._mapData=this._mapData,b},b.toString=function(){return"[AlphaMapFilter]"},b._applyFilter=function(a){if(!this.alphaMap)return!0;if(!this._prepAlphaMap())return!1;for(var b=a.data,c=this._mapData,d=0,e=b.length;e>d;d+=4)b[d+3]=c[d]||0;return!0},b._prepAlphaMap=function(){if(!this.alphaMap)return!1;if(this.alphaMap==this._alphaMap&&this._mapData)return!0;this._mapData=null;var a,b=this._alphaMap=this.alphaMap,c=b;b instanceof HTMLCanvasElement?a=c.getContext("2d"):(c=createjs.createCanvas?createjs.createCanvas():document.createElement("canvas"),c.width=b.width,c.height=b.height,a=c.getContext("2d"),a.drawImage(b,0,0));try{var d=a.getImageData(0,0,b.width,b.height)}catch(e){return!1}return this._mapData=d.data,!0},createjs.AlphaMapFilter=createjs.promote(a,"Filter")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.Filter_constructor(),this.mask=a,this.usesContext=!0,this.FRAG_SHADER_BODY="uniform sampler2D uAlphaSampler;void main(void) {vec4 color = texture2D(uSampler, vRenderCoord);vec4 alphaMap = texture2D(uAlphaSampler, vTextureCoord);gl_FragColor = vec4(color.rgb, color.a * alphaMap.a);}"}var b=createjs.extend(a,createjs.Filter);b.shaderParamSetup=function(a,b,c){this._mapTexture||(this._mapTexture=a.createTexture()),a.activeTexture(a.TEXTURE1),a.bindTexture(a.TEXTURE_2D,this._mapTexture),b.setTextureParams(a),a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,this.mask),a.uniform1i(a.getUniformLocation(c,"uAlphaSampler"),1)},b.applyFilter=function(a,b,c,d,e,f,g,h){return this.mask?(f=f||a,null==g&&(g=b),null==h&&(h=c),f.save(),a!=f?!1:(f.globalCompositeOperation="destination-in",f.drawImage(this.mask,g,h),f.restore(),!0)):!0},b.clone=function(){return new a(this.mask)},b.toString=function(){return"[AlphaMaskFilter]"},createjs.AlphaMaskFilter=createjs.promote(a,"Filter")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c,d,e,f,g,h){this.Filter_constructor(),this.redMultiplier=null!=a?a:1,this.greenMultiplier=null!=b?b:1,this.blueMultiplier=null!=c?c:1,this.alphaMultiplier=null!=d?d:1,this.redOffset=e||0,this.greenOffset=f||0,this.blueOffset=g||0,this.alphaOffset=h||0,this.FRAG_SHADER_BODY="uniform vec4 uColorMultiplier;uniform vec4 uColorOffset;void main(void) {vec4 color = texture2D(uSampler, vRenderCoord);gl_FragColor = (color * uColorMultiplier) + uColorOffset;}"}var b=createjs.extend(a,createjs.Filter);b.shaderParamSetup=function(a,b,c){a.uniform4f(a.getUniformLocation(c,"uColorMultiplier"),this.redMultiplier,this.greenMultiplier,this.blueMultiplier,this.alphaMultiplier),a.uniform4f(a.getUniformLocation(c,"uColorOffset"),this.redOffset/255,this.greenOffset/255,this.blueOffset/255,this.alphaOffset/255)},b.toString=function(){return"[ColorFilter]"},b.clone=function(){return new a(this.redMultiplier,this.greenMultiplier,this.blueMultiplier,this.alphaMultiplier,this.redOffset,this.greenOffset,this.blueOffset,this.alphaOffset)},b._applyFilter=function(a){for(var b=a.data,c=b.length,d=0;c>d;d+=4)b[d]=b[d]*this.redMultiplier+this.redOffset,b[d+1]=b[d+1]*this.greenMultiplier+this.greenOffset,b[d+2]=b[d+2]*this.blueMultiplier+this.blueOffset,b[d+3]=b[d+3]*this.alphaMultiplier+this.alphaOffset;return!0},createjs.ColorFilter=createjs.promote(a,"Filter")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c,d){this.setColor(a,b,c,d)}var b=a.prototype;a.DELTA_INDEX=[0,.01,.02,.04,.05,.06,.07,.08,.1,.11,.12,.14,.15,.16,.17,.18,.2,.21,.22,.24,.25,.27,.28,.3,.32,.34,.36,.38,.4,.42,.44,.46,.48,.5,.53,.56,.59,.62,.65,.68,.71,.74,.77,.8,.83,.86,.89,.92,.95,.98,1,1.06,1.12,1.18,1.24,1.3,1.36,1.42,1.48,1.54,1.6,1.66,1.72,1.78,1.84,1.9,1.96,2,2.12,2.25,2.37,2.5,2.62,2.75,2.87,3,3.2,3.4,3.6,3.8,4,4.3,4.7,4.9,5,5.5,6,6.5,6.8,7,7.3,7.5,7.8,8,8.4,8.7,9,9.4,9.6,9.8,10],a.IDENTITY_MATRIX=[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1],a.LENGTH=a.IDENTITY_MATRIX.length,b.setColor=function(a,b,c,d){return this.reset().adjustColor(a,b,c,d)},b.reset=function(){return this.copy(a.IDENTITY_MATRIX)},b.adjustColor=function(a,b,c,d){return this.adjustHue(d),this.adjustContrast(b),this.adjustBrightness(a),this.adjustSaturation(c)},b.adjustBrightness=function(a){return 0==a||isNaN(a)?this:(a=this._cleanValue(a,255),this._multiplyMatrix([1,0,0,0,a,0,1,0,0,a,0,0,1,0,a,0,0,0,1,0,0,0,0,0,1]),this)},b.adjustContrast=function(b){if(0==b||isNaN(b))return this;b=this._cleanValue(b,100);var c;return 0>b?c=127+b/100*127:(c=b%1,c=0==c?a.DELTA_INDEX[b]:a.DELTA_INDEX[b<<0]*(1-c)+a.DELTA_INDEX[(b<<0)+1]*c,c=127*c+127),this._multiplyMatrix([c/127,0,0,0,.5*(127-c),0,c/127,0,0,.5*(127-c),0,0,c/127,0,.5*(127-c),0,0,0,1,0,0,0,0,0,1]),this},b.adjustSaturation=function(a){if(0==a||isNaN(a))return this;a=this._cleanValue(a,100);var b=1+(a>0?3*a/100:a/100),c=.3086,d=.6094,e=.082;return this._multiplyMatrix([c*(1-b)+b,d*(1-b),e*(1-b),0,0,c*(1-b),d*(1-b)+b,e*(1-b),0,0,c*(1-b),d*(1-b),e*(1-b)+b,0,0,0,0,0,1,0,0,0,0,0,1]),this},b.adjustHue=function(a){if(0==a||isNaN(a))return this;a=this._cleanValue(a,180)/180*Math.PI;var b=Math.cos(a),c=Math.sin(a),d=.213,e=.715,f=.072;return this._multiplyMatrix([d+b*(1-d)+c*-d,e+b*-e+c*-e,f+b*-f+c*(1-f),0,0,d+b*-d+.143*c,e+b*(1-e)+.14*c,f+b*-f+c*-.283,0,0,d+b*-d+c*-(1-d),e+b*-e+c*e,f+b*(1-f)+c*f,0,0,0,0,0,1,0,0,0,0,0,1]),this},b.concat=function(b){return b=this._fixMatrix(b),b.length!=a.LENGTH?this:(this._multiplyMatrix(b),this)},b.clone=function(){return(new a).copy(this)},b.toArray=function(){for(var b=[],c=0,d=a.LENGTH;d>c;c++)b[c]=this[c];return b},b.copy=function(b){for(var c=a.LENGTH,d=0;c>d;d++)this[d]=b[d];return this},b.toString=function(){return"[ColorMatrix]"},b._multiplyMatrix=function(a){var b,c,d,e=[];for(b=0;5>b;b++){for(c=0;5>c;c++)e[c]=this[c+5*b];for(c=0;5>c;c++){var f=0;for(d=0;5>d;d++)f+=a[c+5*d]*e[d];this[c+5*b]=f}}},b._cleanValue=function(a,b){return Math.min(b,Math.max(-b,a))},b._fixMatrix=function(b){return b instanceof a&&(b=b.toArray()),b.length<a.LENGTH?b=b.slice(0,b.length).concat(a.IDENTITY_MATRIX.slice(b.length,a.LENGTH)):b.length>a.LENGTH&&(b=b.slice(0,a.LENGTH)),b},createjs.ColorMatrix=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.Filter_constructor(),this.matrix=a,this.FRAG_SHADER_BODY="uniform mat4 uColorMatrix;uniform vec4 uColorMatrixOffset;void main(void) {vec4 color = texture2D(uSampler, vRenderCoord);mat4 m = uColorMatrix;vec4 newColor = vec4(0,0,0,0);newColor.r = color.r*m[0][0] + color.g*m[0][1] + color.b*m[0][2] + color.a*m[0][3];newColor.g = color.r*m[1][0] + color.g*m[1][1] + color.b*m[1][2] + color.a*m[1][3];newColor.b = color.r*m[2][0] + color.g*m[2][1] + color.b*m[2][2] + color.a*m[2][3];newColor.a = color.r*m[3][0] + color.g*m[3][1] + color.b*m[3][2] + color.a*m[3][3];gl_FragColor = newColor + uColorMatrixOffset;}"}var b=createjs.extend(a,createjs.Filter);b.shaderParamSetup=function(a,b,c){var d=this.matrix,e=new Float32Array([d[0],d[1],d[2],d[3],d[5],d[6],d[7],d[8],d[10],d[11],d[12],d[13],d[15],d[16],d[17],d[18]]);a.uniformMatrix4fv(a.getUniformLocation(c,"uColorMatrix"),!1,e),a.uniform4f(a.getUniformLocation(c,"uColorMatrixOffset"),d[4]/255,d[9]/255,d[14]/255,d[19]/255)},b.toString=function(){return"[ColorMatrixFilter]"},b.clone=function(){return new a(this.matrix)},b._applyFilter=function(a){for(var b,c,d,e,f=a.data,g=f.length,h=this.matrix,i=h[0],j=h[1],k=h[2],l=h[3],m=h[4],n=h[5],o=h[6],p=h[7],q=h[8],r=h[9],s=h[10],t=h[11],u=h[12],v=h[13],w=h[14],x=h[15],y=h[16],z=h[17],A=h[18],B=h[19],C=0;g>C;C+=4)b=f[C],c=f[C+1],d=f[C+2],e=f[C+3],f[C]=b*i+c*j+d*k+e*l+m,f[C+1]=b*n+c*o+d*p+e*q+r,f[C+2]=b*s+c*t+d*u+e*v+w,f[C+3]=b*x+c*y+d*z+e*A+B;return!0},createjs.ColorMatrixFilter=createjs.promote(a,"Filter")}(),this.createjs=this.createjs||{},function(){"use strict";function a(){throw"Touch cannot be instantiated"}a.isSupported=function(){return!!("ontouchstart"in window||window.navigator.msPointerEnabled&&window.navigator.msMaxTouchPoints>0||window.navigator.pointerEnabled&&window.navigator.maxTouchPoints>0)},a.enable=function(b,c,d){return b&&b.canvas&&a.isSupported()?b.__touch?!0:(b.__touch={pointers:{},multitouch:!c,preventDefault:!d,count:0},"ontouchstart"in window?a._IOS_enable(b):(window.navigator.msPointerEnabled||window.navigator.pointerEnabled)&&a._IE_enable(b),!0):!1},a.disable=function(b){b&&("ontouchstart"in window?a._IOS_disable(b):(window.navigator.msPointerEnabled||window.navigator.pointerEnabled)&&a._IE_disable(b),delete b.__touch)},a._IOS_enable=function(b){var c=b.canvas,d=b.__touch.f=function(c){a._IOS_handleEvent(b,c)};c.addEventListener("touchstart",d,!1),c.addEventListener("touchmove",d,!1),c.addEventListener("touchend",d,!1),c.addEventListener("touchcancel",d,!1)},a._IOS_disable=function(a){var b=a.canvas;if(b){var c=a.__touch.f;b.removeEventListener("touchstart",c,!1),b.removeEventListener("touchmove",c,!1),b.removeEventListener("touchend",c,!1),b.removeEventListener("touchcancel",c,!1)}},a._IOS_handleEvent=function(a,b){if(a){a.__touch.preventDefault&&b.preventDefault&&b.preventDefault();for(var c=b.changedTouches,d=b.type,e=0,f=c.length;f>e;e++){var g=c[e],h=g.identifier;g.target==a.canvas&&("touchstart"==d?this._handleStart(a,h,b,g.pageX,g.pageY):"touchmove"==d?this._handleMove(a,h,b,g.pageX,g.pageY):("touchend"==d||"touchcancel"==d)&&this._handleEnd(a,h,b))}}},a._IE_enable=function(b){var c=b.canvas,d=b.__touch.f=function(c){a._IE_handleEvent(b,c)};void 0===window.navigator.pointerEnabled?(c.addEventListener("MSPointerDown",d,!1),window.addEventListener("MSPointerMove",d,!1),window.addEventListener("MSPointerUp",d,!1),window.addEventListener("MSPointerCancel",d,!1),b.__touch.preventDefault&&(c.style.msTouchAction="none")):(c.addEventListener("pointerdown",d,!1),window.addEventListener("pointermove",d,!1),window.addEventListener("pointerup",d,!1),window.addEventListener("pointercancel",d,!1),b.__touch.preventDefault&&(c.style.touchAction="none")),b.__touch.activeIDs={}},a._IE_disable=function(a){var b=a.__touch.f;void 0===window.navigator.pointerEnabled?(window.removeEventListener("MSPointerMove",b,!1),window.removeEventListener("MSPointerUp",b,!1),window.removeEventListener("MSPointerCancel",b,!1),a.canvas&&a.canvas.removeEventListener("MSPointerDown",b,!1)):(window.removeEventListener("pointermove",b,!1),window.removeEventListener("pointerup",b,!1),window.removeEventListener("pointercancel",b,!1),a.canvas&&a.canvas.removeEventListener("pointerdown",b,!1))},a._IE_handleEvent=function(a,b){if(a){a.__touch.preventDefault&&b.preventDefault&&b.preventDefault();var c=b.type,d=b.pointerId,e=a.__touch.activeIDs;if("MSPointerDown"==c||"pointerdown"==c){if(b.srcElement!=a.canvas)return;e[d]=!0,this._handleStart(a,d,b,b.pageX,b.pageY)}else e[d]&&("MSPointerMove"==c||"pointermove"==c?this._handleMove(a,d,b,b.pageX,b.pageY):("MSPointerUp"==c||"MSPointerCancel"==c||"pointerup"==c||"pointercancel"==c)&&(delete e[d],this._handleEnd(a,d,b)))}},a._handleStart=function(a,b,c,d,e){var f=a.__touch;if(f.multitouch||!f.count){var g=f.pointers;g[b]||(g[b]=!0,f.count++,a._handlePointerDown(b,c,d,e))}},a._handleMove=function(a,b,c,d,e){a.__touch.pointers[b]&&a._handlePointerMove(b,c,d,e)},a._handleEnd=function(a,b,c){var d=a.__touch,e=d.pointers;e[b]&&(d.count--,a._handlePointerUp(b,c,!0),delete e[b])},createjs.Touch=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=createjs.EaselJS=createjs.EaselJS||{};a.version="NEXT",a.buildDate="Thu, 14 Sep 2017 22:19:48 GMT"}(),this.createjs=this.createjs||{},function(){"use strict";var a=createjs.PreloadJS=createjs.PreloadJS||{};a.version="NEXT",a.buildDate="Thu, 14 Sep 2017 22:19:45 GMT"}(),this.createjs=this.createjs||{},function(){"use strict";createjs.proxy=function(a,b){var c=Array.prototype.slice.call(arguments,2);return function(){return a.apply(b,Array.prototype.slice.call(arguments,0).concat(c))}}}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c){this.Event_constructor("error"),this.title=a,this.message=b,this.data=c}var b=createjs.extend(a,createjs.Event);b.clone=function(){return new createjs.ErrorEvent(this.title,this.message,this.data)},createjs.ErrorEvent=createjs.promote(a,"Event")}(),this.createjs=this.createjs||{},function(a){"use strict";function b(a,b){this.Event_constructor("progress"),this.loaded=a,this.total=null==b?1:b,this.progress=0==b?0:this.loaded/this.total;
}var c=createjs.extend(b,createjs.Event);c.clone=function(){return new createjs.ProgressEvent(this.loaded,this.total)},createjs.ProgressEvent=createjs.promote(b,"Event")}(window),function(){function a(b,d){function f(a){if(f[a]!==q)return f[a];var b;if("bug-string-char-index"==a)b="a"!="a"[0];else if("json"==a)b=f("json-stringify")&&f("json-parse");else{var c,e='{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';if("json-stringify"==a){var i=d.stringify,k="function"==typeof i&&t;if(k){(c=function(){return 1}).toJSON=c;try{k="0"===i(0)&&"0"===i(new g)&&'""'==i(new h)&&i(s)===q&&i(q)===q&&i()===q&&"1"===i(c)&&"[1]"==i([c])&&"[null]"==i([q])&&"null"==i(null)&&"[null,null,null]"==i([q,s,null])&&i({a:[c,!0,!1,null,"\x00\b\n\f\r	"]})==e&&"1"===i(null,c)&&"[\n 1,\n 2\n]"==i([1,2],null,1)&&'"-271821-04-20T00:00:00.000Z"'==i(new j(-864e13))&&'"+275760-09-13T00:00:00.000Z"'==i(new j(864e13))&&'"-000001-01-01T00:00:00.000Z"'==i(new j(-621987552e5))&&'"1969-12-31T23:59:59.999Z"'==i(new j(-1))}catch(l){k=!1}}b=k}if("json-parse"==a){var m=d.parse;if("function"==typeof m)try{if(0===m("0")&&!m(!1)){c=m(e);var n=5==c.a.length&&1===c.a[0];if(n){try{n=!m('"	"')}catch(l){}if(n)try{n=1!==m("01")}catch(l){}if(n)try{n=1!==m("1.")}catch(l){}}}}catch(l){n=!1}b=n}}return f[a]=!!b}b||(b=e.Object()),d||(d=e.Object());var g=b.Number||e.Number,h=b.String||e.String,i=b.Object||e.Object,j=b.Date||e.Date,k=b.SyntaxError||e.SyntaxError,l=b.TypeError||e.TypeError,m=b.Math||e.Math,n=b.JSON||e.JSON;"object"==typeof n&&n&&(d.stringify=n.stringify,d.parse=n.parse);var o,p,q,r=i.prototype,s=r.toString,t=new j(-0xc782b5b800cec);try{t=-109252==t.getUTCFullYear()&&0===t.getUTCMonth()&&1===t.getUTCDate()&&10==t.getUTCHours()&&37==t.getUTCMinutes()&&6==t.getUTCSeconds()&&708==t.getUTCMilliseconds()}catch(u){}if(!f("json")){var v="[object Function]",w="[object Date]",x="[object Number]",y="[object String]",z="[object Array]",A="[object Boolean]",B=f("bug-string-char-index");if(!t)var C=m.floor,D=[0,31,59,90,120,151,181,212,243,273,304,334],E=function(a,b){return D[b]+365*(a-1970)+C((a-1969+(b=+(b>1)))/4)-C((a-1901+b)/100)+C((a-1601+b)/400)};if((o=r.hasOwnProperty)||(o=function(a){var b,c={};return(c.__proto__=null,c.__proto__={toString:1},c).toString!=s?o=function(a){var b=this.__proto__,c=a in(this.__proto__=null,this);return this.__proto__=b,c}:(b=c.constructor,o=function(a){var c=(this.constructor||b).prototype;return a in this&&!(a in c&&this[a]===c[a])}),c=null,o.call(this,a)}),p=function(a,b){var d,e,f,g=0;(d=function(){this.valueOf=0}).prototype.valueOf=0,e=new d;for(f in e)o.call(e,f)&&g++;return d=e=null,g?p=2==g?function(a,b){var c,d={},e=s.call(a)==v;for(c in a)e&&"prototype"==c||o.call(d,c)||!(d[c]=1)||!o.call(a,c)||b(c)}:function(a,b){var c,d,e=s.call(a)==v;for(c in a)e&&"prototype"==c||!o.call(a,c)||(d="constructor"===c)||b(c);(d||o.call(a,c="constructor"))&&b(c)}:(e=["valueOf","toString","toLocaleString","propertyIsEnumerable","isPrototypeOf","hasOwnProperty","constructor"],p=function(a,b){var d,f,g=s.call(a)==v,h=!g&&"function"!=typeof a.constructor&&c[typeof a.hasOwnProperty]&&a.hasOwnProperty||o;for(d in a)g&&"prototype"==d||!h.call(a,d)||b(d);for(f=e.length;d=e[--f];h.call(a,d)&&b(d));}),p(a,b)},!f("json-stringify")){var F={92:"\\\\",34:'\\"',8:"\\b",12:"\\f",10:"\\n",13:"\\r",9:"\\t"},G="000000",H=function(a,b){return(G+(b||0)).slice(-a)},I="\\u00",J=function(a){for(var b='"',c=0,d=a.length,e=!B||d>10,f=e&&(B?a.split(""):a);d>c;c++){var g=a.charCodeAt(c);switch(g){case 8:case 9:case 10:case 12:case 13:case 34:case 92:b+=F[g];break;default:if(32>g){b+=I+H(2,g.toString(16));break}b+=e?f[c]:a.charAt(c)}}return b+'"'},K=function(a,b,c,d,e,f,g){var h,i,j,k,m,n,r,t,u,v,B,D,F,G,I,L;try{h=b[a]}catch(M){}if("object"==typeof h&&h)if(i=s.call(h),i!=w||o.call(h,"toJSON"))"function"==typeof h.toJSON&&(i!=x&&i!=y&&i!=z||o.call(h,"toJSON"))&&(h=h.toJSON(a));else if(h>-1/0&&1/0>h){if(E){for(m=C(h/864e5),j=C(m/365.2425)+1970-1;E(j+1,0)<=m;j++);for(k=C((m-E(j,0))/30.42);E(j,k+1)<=m;k++);m=1+m-E(j,k),n=(h%864e5+864e5)%864e5,r=C(n/36e5)%24,t=C(n/6e4)%60,u=C(n/1e3)%60,v=n%1e3}else j=h.getUTCFullYear(),k=h.getUTCMonth(),m=h.getUTCDate(),r=h.getUTCHours(),t=h.getUTCMinutes(),u=h.getUTCSeconds(),v=h.getUTCMilliseconds();h=(0>=j||j>=1e4?(0>j?"-":"+")+H(6,0>j?-j:j):H(4,j))+"-"+H(2,k+1)+"-"+H(2,m)+"T"+H(2,r)+":"+H(2,t)+":"+H(2,u)+"."+H(3,v)+"Z"}else h=null;if(c&&(h=c.call(b,a,h)),null===h)return"null";if(i=s.call(h),i==A)return""+h;if(i==x)return h>-1/0&&1/0>h?""+h:"null";if(i==y)return J(""+h);if("object"==typeof h){for(G=g.length;G--;)if(g[G]===h)throw l();if(g.push(h),B=[],I=f,f+=e,i==z){for(F=0,G=h.length;G>F;F++)D=K(F,h,c,d,e,f,g),B.push(D===q?"null":D);L=B.length?e?"[\n"+f+B.join(",\n"+f)+"\n"+I+"]":"["+B.join(",")+"]":"[]"}else p(d||h,function(a){var b=K(a,h,c,d,e,f,g);b!==q&&B.push(J(a)+":"+(e?" ":"")+b)}),L=B.length?e?"{\n"+f+B.join(",\n"+f)+"\n"+I+"}":"{"+B.join(",")+"}":"{}";return g.pop(),L}};d.stringify=function(a,b,d){var e,f,g,h;if(c[typeof b]&&b)if((h=s.call(b))==v)f=b;else if(h==z){g={};for(var i,j=0,k=b.length;k>j;i=b[j++],h=s.call(i),(h==y||h==x)&&(g[i]=1));}if(d)if((h=s.call(d))==x){if((d-=d%1)>0)for(e="",d>10&&(d=10);e.length<d;e+=" ");}else h==y&&(e=d.length<=10?d:d.slice(0,10));return K("",(i={},i[""]=a,i),f,g,e,"",[])}}if(!f("json-parse")){var L,M,N=h.fromCharCode,O={92:"\\",34:'"',47:"/",98:"\b",116:"	",110:"\n",102:"\f",114:"\r"},P=function(){throw L=M=null,k()},Q=function(){for(var a,b,c,d,e,f=M,g=f.length;g>L;)switch(e=f.charCodeAt(L)){case 9:case 10:case 13:case 32:L++;break;case 123:case 125:case 91:case 93:case 58:case 44:return a=B?f.charAt(L):f[L],L++,a;case 34:for(a="@",L++;g>L;)if(e=f.charCodeAt(L),32>e)P();else if(92==e)switch(e=f.charCodeAt(++L)){case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:a+=O[e],L++;break;case 117:for(b=++L,c=L+4;c>L;L++)e=f.charCodeAt(L),e>=48&&57>=e||e>=97&&102>=e||e>=65&&70>=e||P();a+=N("0x"+f.slice(b,L));break;default:P()}else{if(34==e)break;for(e=f.charCodeAt(L),b=L;e>=32&&92!=e&&34!=e;)e=f.charCodeAt(++L);a+=f.slice(b,L)}if(34==f.charCodeAt(L))return L++,a;P();default:if(b=L,45==e&&(d=!0,e=f.charCodeAt(++L)),e>=48&&57>=e){for(48==e&&(e=f.charCodeAt(L+1),e>=48&&57>=e)&&P(),d=!1;g>L&&(e=f.charCodeAt(L),e>=48&&57>=e);L++);if(46==f.charCodeAt(L)){for(c=++L;g>c&&(e=f.charCodeAt(c),e>=48&&57>=e);c++);c==L&&P(),L=c}if(e=f.charCodeAt(L),101==e||69==e){for(e=f.charCodeAt(++L),(43==e||45==e)&&L++,c=L;g>c&&(e=f.charCodeAt(c),e>=48&&57>=e);c++);c==L&&P(),L=c}return+f.slice(b,L)}if(d&&P(),"true"==f.slice(L,L+4))return L+=4,!0;if("false"==f.slice(L,L+5))return L+=5,!1;if("null"==f.slice(L,L+4))return L+=4,null;P()}return"$"},R=function(a){var b,c;if("$"==a&&P(),"string"==typeof a){if("@"==(B?a.charAt(0):a[0]))return a.slice(1);if("["==a){for(b=[];a=Q(),"]"!=a;c||(c=!0))c&&(","==a?(a=Q(),"]"==a&&P()):P()),","==a&&P(),b.push(R(a));return b}if("{"==a){for(b={};a=Q(),"}"!=a;c||(c=!0))c&&(","==a?(a=Q(),"}"==a&&P()):P()),(","==a||"string"!=typeof a||"@"!=(B?a.charAt(0):a[0])||":"!=Q())&&P(),b[a.slice(1)]=R(Q());return b}P()}return a},S=function(a,b,c){var d=T(a,b,c);d===q?delete a[b]:a[b]=d},T=function(a,b,c){var d,e=a[b];if("object"==typeof e&&e)if(s.call(e)==z)for(d=e.length;d--;)S(e,d,c);else p(e,function(a){S(e,a,c)});return c.call(a,b,e)};d.parse=function(a,b){var c,d;return L=0,M=""+a,c=R(Q()),"$"!=Q()&&P(),L=M=null,b&&s.call(b)==v?T((d={},d[""]=c,d),"",b):c}}}return d.runInContext=a,d}var b= true&&__webpack_require__.amdO,c={"function":!0,object:!0},d=c[typeof exports]&&exports&&!exports.nodeType&&exports,e=c[typeof window]&&window||this,f=d&&c["object"]&&module&&!module.nodeType&&"object"==typeof __webpack_require__.g&&__webpack_require__.g;if(!f||f.global!==f&&f.window!==f&&f.self!==f||(e=f),d&&!b)a(e,d);else{var g=e.JSON,h=e.JSON3,i=!1,j=a(e,e.JSON3={noConflict:function(){return i||(i=!0,e.JSON=g,e.JSON3=h,g=h=null),j}});e.JSON={parse:j.parse,stringify:j.stringify}}b&&!(__WEBPACK_AMD_DEFINE_RESULT__ = (function(){return j}).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))}.call(this),function(){var a={};a.a=function(){return a.el("a")},a.svg=function(){return a.el("svg")},a.object=function(){return a.el("object")},a.image=function(){return a.el("image")},a.img=function(){return a.el("img")},a.style=function(){return a.el("style")},a.link=function(){return a.el("link")},a.script=function(){return a.el("script")},a.audio=function(){return a.el("audio")},a.video=function(){return a.el("video")},a.text=function(a){return document.createTextNode(a)},a.el=function(a){return document.createElement(a)},createjs.Elements=a}(),function(){var a={};a.ABSOLUTE_PATT=/^(?:\w+:)?\/{2}/i,a.RELATIVE_PATT=/^[.\/]*?\//i,a.EXTENSION_PATT=/\/?[^\/]+\.(\w{1,5})$/i,a.parseURI=function(b){var c={absolute:!1,relative:!1,protocol:null,hostname:null,port:null,pathname:null,search:null,hash:null,host:null};if(null==b)return c;var d=createjs.Elements.a();d.href=b;for(var e in c)e in d&&(c[e]=d[e]);var f=b.indexOf("?");f>-1&&(b=b.substr(0,f));var g;return a.ABSOLUTE_PATT.test(b)?c.absolute=!0:a.RELATIVE_PATT.test(b)&&(c.relative=!0),(g=b.match(a.EXTENSION_PATT))&&(c.extension=g[1].toLowerCase()),c},a.formatQueryString=function(a,b){if(null==a)throw new Error("You must specify data.");var c=[];for(var d in a)c.push(d+"="+escape(a[d]));return b&&(c=c.concat(b)),c.join("&")},a.buildURI=function(a,b){if(null==b)return a;var c=[],d=a.indexOf("?");if(-1!=d){var e=a.slice(d+1);c=c.concat(e.split("&"))}return-1!=d?a.slice(0,d)+"?"+this.formatQueryString(b,c):a+"?"+this.formatQueryString(b,c)},a.isCrossDomain=function(a){var b=createjs.Elements.a();b.href=a.src;var c=createjs.Elements.a();c.href=location.href;var d=""!=b.hostname&&(b.port!=c.port||b.protocol!=c.protocol||b.hostname!=c.hostname);return d},a.isLocal=function(a){var b=createjs.Elements.a();return b.href=a.src,""==b.hostname&&"file:"==b.protocol},createjs.URLUtils=a}(),function(){var a={container:null};a.appendToHead=function(b){a.getHead().appendChild(b)},a.appendToBody=function(b){if(null==a.container){a.container=document.createElement("div"),a.container.id="preloadjs-container";var c=a.container.style;c.visibility="hidden",c.position="absolute",c.width=a.container.style.height="10px",c.overflow="hidden",c.transform=c.msTransform=c.webkitTransform=c.oTransform="translate(-10px, -10px)",a.getBody().appendChild(a.container)}a.container.appendChild(b)},a.getHead=function(){return document.head||document.getElementsByTagName("head")[0]},a.getBody=function(){return document.body||document.getElementsByTagName("body")[0]},a.removeChild=function(a){a.parent&&a.parent.removeChild(a)},a.isImageTag=function(a){return a instanceof HTMLImageElement},a.isAudioTag=function(a){return window.HTMLAudioElement?a instanceof HTMLAudioElement:!1},a.isVideoTag=function(a){return window.HTMLVideoElement?a instanceof HTMLVideoElement:!1},createjs.DomUtils=a}(),function(){var a={};a.parseXML=function(a){var b=null;try{if(window.DOMParser){var c=new DOMParser;b=c.parseFromString(a,"text/xml")}}catch(d){}if(!b)try{b=new ActiveXObject("Microsoft.XMLDOM"),b.async=!1,b.loadXML(a)}catch(d){b=null}return b},a.parseJSON=function(a){if(null==a)return null;try{return JSON.parse(a)}catch(b){throw b}},createjs.DataUtils=a}(),this.createjs=this.createjs||{},function(){var a={};a.BINARY="binary",a.CSS="css",a.FONT="font",a.FONTCSS="fontcss",a.IMAGE="image",a.JAVASCRIPT="javascript",a.JSON="json",a.JSONP="jsonp",a.MANIFEST="manifest",a.SOUND="sound",a.VIDEO="video",a.SPRITESHEET="spritesheet",a.SVG="svg",a.TEXT="text",a.XML="xml",createjs.Types=a}(),this.createjs=this.createjs||{},function(){var a={};a.POST="POST",a.GET="GET",createjs.Methods=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(){this.src=null,this.type=null,this.id=null,this.maintainOrder=!1,this.callback=null,this.data=null,this.method=createjs.Methods.GET,this.values=null,this.headers=null,this.withCredentials=!1,this.mimeType=null,this.crossOrigin=null,this.loadTimeout=c.LOAD_TIMEOUT_DEFAULT}var b=a.prototype={},c=a;c.LOAD_TIMEOUT_DEFAULT=8e3,c.create=function(b){if("string"==typeof b){var d=new a;return d.src=b,d}if(b instanceof c)return b;if(b instanceof Object&&b.src)return null==b.loadTimeout&&(b.loadTimeout=c.LOAD_TIMEOUT_DEFAULT),b;throw new Error("Type not recognized.")},b.set=function(a){for(var b in a)this[b]=a[b];return this},createjs.LoadItem=c}(),function(){var a={};a.isBinary=function(a){switch(a){case createjs.Types.IMAGE:case createjs.Types.BINARY:return!0;default:return!1}},a.isText=function(a){switch(a){case createjs.Types.TEXT:case createjs.Types.JSON:case createjs.Types.MANIFEST:case createjs.Types.XML:case createjs.Types.CSS:case createjs.Types.SVG:case createjs.Types.JAVASCRIPT:case createjs.Types.SPRITESHEET:return!0;default:return!1}},a.getTypeByExtension=function(a){if(null==a)return createjs.Types.TEXT;switch(a.toLowerCase()){case"jpeg":case"jpg":case"gif":case"png":case"webp":case"bmp":return createjs.Types.IMAGE;case"ogg":case"mp3":case"webm":return createjs.Types.SOUND;case"mp4":case"webm":case"ts":return createjs.Types.VIDEO;case"json":return createjs.Types.JSON;case"xml":return createjs.Types.XML;case"css":return createjs.Types.CSS;case"js":return createjs.Types.JAVASCRIPT;case"svg":return createjs.Types.SVG;default:return createjs.Types.TEXT}},createjs.RequestUtils=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c){this.EventDispatcher_constructor(),this.loaded=!1,this.canceled=!1,this.progress=0,this.type=c,this.resultFormatter=null,a?this._item=createjs.LoadItem.create(a):this._item=null,this._preferXHR=b,this._result=null,this._rawResult=null,this._loadedItems=null,this._tagSrcAttribute=null,this._tag=null}var b=createjs.extend(a,createjs.EventDispatcher),c=a;try{Object.defineProperties(c,{POST:{get:createjs.deprecate(function(){return createjs.Methods.POST},"AbstractLoader.POST")},GET:{get:createjs.deprecate(function(){return createjs.Methods.GET},"AbstractLoader.GET")},BINARY:{get:createjs.deprecate(function(){return createjs.Types.BINARY},"AbstractLoader.BINARY")},CSS:{get:createjs.deprecate(function(){return createjs.Types.CSS},"AbstractLoader.CSS")},FONT:{get:createjs.deprecate(function(){return createjs.Types.FONT},"AbstractLoader.FONT")},FONTCSS:{get:createjs.deprecate(function(){return createjs.Types.FONTCSS},"AbstractLoader.FONTCSS")},IMAGE:{get:createjs.deprecate(function(){return createjs.Types.IMAGE},"AbstractLoader.IMAGE")},JAVASCRIPT:{get:createjs.deprecate(function(){return createjs.Types.JAVASCRIPT},"AbstractLoader.JAVASCRIPT")},JSON:{get:createjs.deprecate(function(){return createjs.Types.JSON},"AbstractLoader.JSON")},JSONP:{get:createjs.deprecate(function(){return createjs.Types.JSONP},"AbstractLoader.JSONP")},MANIFEST:{get:createjs.deprecate(function(){return createjs.Types.MANIFEST},"AbstractLoader.MANIFEST")},SOUND:{get:createjs.deprecate(function(){return createjs.Types.SOUND},"AbstractLoader.SOUND")},VIDEO:{get:createjs.deprecate(function(){return createjs.Types.VIDEO},"AbstractLoader.VIDEO")},SPRITESHEET:{get:createjs.deprecate(function(){return createjs.Types.SPRITESHEET},"AbstractLoader.SPRITESHEET")},SVG:{get:createjs.deprecate(function(){return createjs.Types.SVG},"AbstractLoader.SVG")},TEXT:{get:createjs.deprecate(function(){return createjs.Types.TEXT},"AbstractLoader.TEXT")},XML:{get:createjs.deprecate(function(){return createjs.Types.XML},"AbstractLoader.XML")}})}catch(d){}b.getItem=function(){return this._item},b.getResult=function(a){return a?this._rawResult:this._result},b.getTag=function(){return this._tag},b.setTag=function(a){this._tag=a},b.load=function(){this._createRequest(),this._request.on("complete",this,this),this._request.on("progress",this,this),this._request.on("loadStart",this,this),this._request.on("abort",this,this),this._request.on("timeout",this,this),this._request.on("error",this,this);var a=new createjs.Event("initialize");a.loader=this._request,this.dispatchEvent(a),this._request.load()},b.cancel=function(){this.canceled=!0,this.destroy()},b.destroy=function(){this._request&&(this._request.removeAllEventListeners(),this._request.destroy()),this._request=null,this._item=null,this._rawResult=null,this._result=null,this._loadItems=null,this.removeAllEventListeners()},b.getLoadedItems=function(){return this._loadedItems},b._createRequest=function(){this._preferXHR?this._request=new createjs.XHRRequest(this._item):this._request=new createjs.TagRequest(this._item,this._tag||this._createTag(),this._tagSrcAttribute)},b._createTag=function(a){return null},b._sendLoadStart=function(){this._isCanceled()||this.dispatchEvent("loadstart")},b._sendProgress=function(a){if(!this._isCanceled()){var b=null;"number"==typeof a?(this.progress=a,b=new createjs.ProgressEvent(this.progress)):(b=a,this.progress=a.loaded/a.total,b.progress=this.progress,(isNaN(this.progress)||this.progress==1/0)&&(this.progress=0)),this.hasEventListener("progress")&&this.dispatchEvent(b)}},b._sendComplete=function(){if(!this._isCanceled()){this.loaded=!0;var a=new createjs.Event("complete");a.rawResult=this._rawResult,null!=this._result&&(a.result=this._result),this.dispatchEvent(a)}},b._sendError=function(a){!this._isCanceled()&&this.hasEventListener("error")&&(null==a&&(a=new createjs.ErrorEvent("PRELOAD_ERROR_EMPTY")),this.dispatchEvent(a))},b._isCanceled=function(){return null==window.createjs||this.canceled?!0:!1},b.resultFormatter=null,b.handleEvent=function(a){switch(a.type){case"complete":this._rawResult=a.target._response;var b=this.resultFormatter&&this.resultFormatter(this);b instanceof Function?b.call(this,createjs.proxy(this._resultFormatSuccess,this),createjs.proxy(this._resultFormatFailed,this)):(this._result=b||this._rawResult,this._sendComplete());break;case"progress":this._sendProgress(a);break;case"error":this._sendError(a);break;case"loadstart":this._sendLoadStart();break;case"abort":case"timeout":this._isCanceled()||this.dispatchEvent(new createjs.ErrorEvent("PRELOAD_"+a.type.toUpperCase()+"_ERROR"))}},b._resultFormatSuccess=function(a){this._result=a,this._sendComplete()},b._resultFormatFailed=function(a){this._sendError(a)},b.toString=function(){return"[PreloadJS AbstractLoader]"},createjs.AbstractLoader=createjs.promote(a,"EventDispatcher")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c){this.AbstractLoader_constructor(a,b,c),this.resultFormatter=this._formatResult,this._tagSrcAttribute="src",this.on("initialize",this._updateXHR,this)}var b=createjs.extend(a,createjs.AbstractLoader);b.load=function(){this._tag||(this._tag=this._createTag(this._item.src)),this._tag.preload="auto",this._tag.load(),this.AbstractLoader_load()},b._createTag=function(){},b._createRequest=function(){this._preferXHR?this._request=new createjs.XHRRequest(this._item):this._request=new createjs.MediaTagRequest(this._item,this._tag||this._createTag(),this._tagSrcAttribute)},b._updateXHR=function(a){a.loader.setResponseType&&a.loader.setResponseType("blob")},b._formatResult=function(a){if(this._tag.removeEventListener&&this._tag.removeEventListener("canplaythrough",this._loadedHandler),this._tag.onstalled=null,this._preferXHR){var b=window.URL||window.webkitURL,c=a.getResult(!0);a.getTag().src=b.createObjectURL(c)}return a.getTag()},createjs.AbstractMediaLoader=createjs.promote(a,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a){this._item=a},b=createjs.extend(a,createjs.EventDispatcher);b.load=function(){},b.destroy=function(){},b.cancel=function(){},createjs.AbstractRequest=createjs.promote(a,"EventDispatcher")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c){this.AbstractRequest_constructor(a),this._tag=b,this._tagSrcAttribute=c,this._loadedHandler=createjs.proxy(this._handleTagComplete,this),this._addedToDOM=!1}var b=createjs.extend(a,createjs.AbstractRequest);b.load=function(){this._tag.onload=createjs.proxy(this._handleTagComplete,this),this._tag.onreadystatechange=createjs.proxy(this._handleReadyStateChange,this),this._tag.onerror=createjs.proxy(this._handleError,this);var a=new createjs.Event("initialize");a.loader=this._tag,this.dispatchEvent(a),this._loadTimeout=setTimeout(createjs.proxy(this._handleTimeout,this),this._item.loadTimeout),this._tag[this._tagSrcAttribute]=this._item.src,null==this._tag.parentNode&&(createjs.DomUtils.appendToBody(this._tag),this._addedToDOM=!0)},b.destroy=function(){this._clean(),this._tag=null,this.AbstractRequest_destroy()},b._handleReadyStateChange=function(){clearTimeout(this._loadTimeout);var a=this._tag;("loaded"==a.readyState||"complete"==a.readyState)&&this._handleTagComplete()},b._handleError=function(){this._clean(),this.dispatchEvent("error")},b._handleTagComplete=function(){this._rawResult=this._tag,this._result=this.resultFormatter&&this.resultFormatter(this)||this._rawResult,this._clean(),this.dispatchEvent("complete")},b._handleTimeout=function(){this._clean(),this.dispatchEvent(new createjs.Event("timeout"))},b._clean=function(){this._tag.onload=null,this._tag.onreadystatechange=null,this._tag.onerror=null,this._addedToDOM&&null!=this._tag.parentNode&&this._tag.parentNode.removeChild(this._tag),clearTimeout(this._loadTimeout)},b._handleStalled=function(){},createjs.TagRequest=createjs.promote(a,"AbstractRequest")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c){this.AbstractRequest_constructor(a),this._tag=b,this._tagSrcAttribute=c,this._loadedHandler=createjs.proxy(this._handleTagComplete,this)}var b=createjs.extend(a,createjs.TagRequest);b.load=function(){var a=createjs.proxy(this._handleStalled,this);this._stalledCallback=a;var b=createjs.proxy(this._handleProgress,this);this._handleProgress=b,this._tag.addEventListener("stalled",a),this._tag.addEventListener("progress",b),this._tag.addEventListener&&this._tag.addEventListener("canplaythrough",this._loadedHandler,!1),this.TagRequest_load()},b._handleReadyStateChange=function(){clearTimeout(this._loadTimeout);var a=this._tag;("loaded"==a.readyState||"complete"==a.readyState)&&this._handleTagComplete()},b._handleStalled=function(){},b._handleProgress=function(a){if(a&&!(a.loaded>0&&0==a.total)){var b=new createjs.ProgressEvent(a.loaded,a.total);this.dispatchEvent(b)}},b._clean=function(){this._tag.removeEventListener&&this._tag.removeEventListener("canplaythrough",this._loadedHandler),this._tag.removeEventListener("stalled",this._stalledCallback),this._tag.removeEventListener("progress",this._progressCallback),this.TagRequest__clean()},createjs.MediaTagRequest=createjs.promote(a,"TagRequest")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.AbstractRequest_constructor(a),this._request=null,this._loadTimeout=null,this._xhrLevel=1,this._response=null,this._rawResponse=null,this._canceled=!1,this._handleLoadStartProxy=createjs.proxy(this._handleLoadStart,this),this._handleProgressProxy=createjs.proxy(this._handleProgress,this),this._handleAbortProxy=createjs.proxy(this._handleAbort,this),this._handleErrorProxy=createjs.proxy(this._handleError,this),this._handleTimeoutProxy=createjs.proxy(this._handleTimeout,this),this._handleLoadProxy=createjs.proxy(this._handleLoad,this),this._handleReadyStateChangeProxy=createjs.proxy(this._handleReadyStateChange,this),!this._createXHR(a)}var b=createjs.extend(a,createjs.AbstractRequest);a.ACTIVEX_VERSIONS=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.5.0","Msxml2.XMLHTTP.4.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],b.getResult=function(a){return a&&this._rawResponse?this._rawResponse:this._response},b.cancel=function(){this.canceled=!0,this._clean(),this._request.abort()},b.load=function(){if(null==this._request)return void this._handleError();null!=this._request.addEventListener?(this._request.addEventListener("loadstart",this._handleLoadStartProxy,!1),this._request.addEventListener("progress",this._handleProgressProxy,!1),this._request.addEventListener("abort",this._handleAbortProxy,!1),this._request.addEventListener("error",this._handleErrorProxy,!1),this._request.addEventListener("timeout",this._handleTimeoutProxy,!1),this._request.addEventListener("load",this._handleLoadProxy,!1),this._request.addEventListener("readystatechange",this._handleReadyStateChangeProxy,!1)):(this._request.onloadstart=this._handleLoadStartProxy,this._request.onprogress=this._handleProgressProxy,this._request.onabort=this._handleAbortProxy,this._request.onerror=this._handleErrorProxy,this._request.ontimeout=this._handleTimeoutProxy,this._request.onload=this._handleLoadProxy,this._request.onreadystatechange=this._handleReadyStateChangeProxy),1==this._xhrLevel&&(this._loadTimeout=setTimeout(createjs.proxy(this._handleTimeout,this),this._item.loadTimeout));try{this._item.values?this._request.send(createjs.URLUtils.formatQueryString(this._item.values)):this._request.send()}catch(a){this.dispatchEvent(new createjs.ErrorEvent("XHR_SEND",null,a))}},b.setResponseType=function(a){"blob"===a&&(a=window.URL?"blob":"arraybuffer",this._responseType=a),this._request.responseType=a},b.getAllResponseHeaders=function(){return this._request.getAllResponseHeaders instanceof Function?this._request.getAllResponseHeaders():null},b.getResponseHeader=function(a){return this._request.getResponseHeader instanceof Function?this._request.getResponseHeader(a):null},b._handleProgress=function(a){if(a&&!(a.loaded>0&&0==a.total)){var b=new createjs.ProgressEvent(a.loaded,a.total);this.dispatchEvent(b)}},b._handleLoadStart=function(a){clearTimeout(this._loadTimeout),this.dispatchEvent("loadstart")},b._handleAbort=function(a){this._clean(),this.dispatchEvent(new createjs.ErrorEvent("XHR_ABORTED",null,a))},b._handleError=function(a){this._clean(),this.dispatchEvent(new createjs.ErrorEvent(a.message))},b._handleReadyStateChange=function(a){4==this._request.readyState&&this._handleLoad()},b._handleLoad=function(a){if(!this.loaded){this.loaded=!0;var b=this._checkError();if(b)return void this._handleError(b);if(this._response=this._getResponse(),"arraybuffer"===this._responseType)try{this._response=new Blob([this._response])}catch(c){if(window.BlobBuilder=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder,"TypeError"===c.name&&window.BlobBuilder){var d=new BlobBuilder;d.append(this._response),this._response=d.getBlob()}}this._clean(),this.dispatchEvent(new createjs.Event("complete"))}},b._handleTimeout=function(a){this._clean(),this.dispatchEvent(new createjs.ErrorEvent("PRELOAD_TIMEOUT",null,a))},b._checkError=function(){var a=parseInt(this._request.status);return a>=400&&599>=a?new Error(a):0==a&&/^https?:/.test(location.protocol)?new Error(0):null},b._getResponse=function(){if(null!=this._response)return this._response;if(null!=this._request.response)return this._request.response;try{if(null!=this._request.responseText)return this._request.responseText}catch(a){}try{if(null!=this._request.responseXML)return this._request.responseXML}catch(a){}return null},b._createXHR=function(a){var b=createjs.URLUtils.isCrossDomain(a),c={},d=null;if(window.XMLHttpRequest)d=new XMLHttpRequest,b&&void 0===d.withCredentials&&window.XDomainRequest&&(d=new XDomainRequest);else{for(var e=0,f=s.ACTIVEX_VERSIONS.length;f>e;e++){var g=s.ACTIVEX_VERSIONS[e];try{d=new ActiveXObject(g);break}catch(h){}}if(null==d)return!1}null==a.mimeType&&createjs.RequestUtils.isText(a.type)&&(a.mimeType="text/plain; charset=utf-8"),a.mimeType&&d.overrideMimeType&&d.overrideMimeType(a.mimeType),this._xhrLevel="string"==typeof d.responseType?2:1;var i=null;if(i=a.method==createjs.Methods.GET?createjs.URLUtils.buildURI(a.src,a.values):a.src,d.open(a.method||createjs.Methods.GET,i,!0),b&&d instanceof XMLHttpRequest&&1==this._xhrLevel&&(c.Origin=location.origin),a.values&&a.method==createjs.Methods.POST&&(c["Content-Type"]="application/x-www-form-urlencoded"),b||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest"),a.headers)for(var j in a.headers)c[j]=a.headers[j];for(j in c)d.setRequestHeader(j,c[j]);return d instanceof XMLHttpRequest&&void 0!==a.withCredentials&&(d.withCredentials=a.withCredentials),this._request=d,!0},b._clean=function(){clearTimeout(this._loadTimeout),null!=this._request.removeEventListener?(this._request.removeEventListener("loadstart",this._handleLoadStartProxy),this._request.removeEventListener("progress",this._handleProgressProxy),this._request.removeEventListener("abort",this._handleAbortProxy),this._request.removeEventListener("error",this._handleErrorProxy),this._request.removeEventListener("timeout",this._handleTimeoutProxy),this._request.removeEventListener("load",this._handleLoadProxy),this._request.removeEventListener("readystatechange",this._handleReadyStateChangeProxy)):(this._request.onloadstart=null,this._request.onprogress=null,this._request.onabort=null,this._request.onerror=null,this._request.ontimeout=null,this._request.onload=null,this._request.onreadystatechange=null)},b.toString=function(){return"[PreloadJS XHRRequest]"},createjs.XHRRequest=createjs.promote(a,"AbstractRequest")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c){this.AbstractLoader_constructor(),this._plugins=[],this._typeCallbacks={},this._extensionCallbacks={},this.next=null,this.maintainScriptOrder=!0,this.stopOnError=!1,this._maxConnections=1,this._availableLoaders=[createjs.FontLoader,createjs.ImageLoader,createjs.JavaScriptLoader,createjs.CSSLoader,createjs.JSONLoader,createjs.JSONPLoader,createjs.SoundLoader,createjs.ManifestLoader,createjs.SpriteSheetLoader,createjs.XMLLoader,createjs.SVGLoader,createjs.BinaryLoader,createjs.VideoLoader,createjs.TextLoader],this._defaultLoaderLength=this._availableLoaders.length,this.init(a,b,c)}var b=createjs.extend(a,createjs.AbstractLoader),c=a;try{Object.defineProperties(c,{POST:{get:createjs.deprecate(function(){return createjs.Methods.POST},"AbstractLoader.POST")},GET:{get:createjs.deprecate(function(){return createjs.Methods.GET},"AbstractLoader.GET")},BINARY:{get:createjs.deprecate(function(){return createjs.Types.BINARY},"AbstractLoader.BINARY")},CSS:{get:createjs.deprecate(function(){return createjs.Types.CSS},"AbstractLoader.CSS")},FONT:{get:createjs.deprecate(function(){return createjs.Types.FONT},"AbstractLoader.FONT")},FONTCSS:{get:createjs.deprecate(function(){return createjs.Types.FONTCSS},"AbstractLoader.FONTCSS")},IMAGE:{get:createjs.deprecate(function(){return createjs.Types.IMAGE},"AbstractLoader.IMAGE")},JAVASCRIPT:{get:createjs.deprecate(function(){return createjs.Types.JAVASCRIPT},"AbstractLoader.JAVASCRIPT")},JSON:{get:createjs.deprecate(function(){return createjs.Types.JSON},"AbstractLoader.JSON")},JSONP:{get:createjs.deprecate(function(){return createjs.Types.JSONP},"AbstractLoader.JSONP")},MANIFEST:{get:createjs.deprecate(function(){return createjs.Types.MANIFEST},"AbstractLoader.MANIFEST")},SOUND:{get:createjs.deprecate(function(){return createjs.Types.SOUND},"AbstractLoader.SOUND")},VIDEO:{get:createjs.deprecate(function(){return createjs.Types.VIDEO},"AbstractLoader.VIDEO")},SPRITESHEET:{get:createjs.deprecate(function(){return createjs.Types.SPRITESHEET},"AbstractLoader.SPRITESHEET")},SVG:{get:createjs.deprecate(function(){return createjs.Types.SVG},"AbstractLoader.SVG")},TEXT:{get:createjs.deprecate(function(){return createjs.Types.TEXT},"AbstractLoader.TEXT")},XML:{get:createjs.deprecate(function(){return createjs.Types.XML},"AbstractLoader.XML")}})}catch(d){}b.init=function(a,b,c){this.preferXHR=!0,this._preferXHR=!0,this.setPreferXHR(a),this._paused=!1,this._basePath=b,this._crossOrigin=c,this._loadStartWasDispatched=!1,this._currentlyLoadingScript=null,this._currentLoads=[],this._loadQueue=[],this._loadQueueBackup=[],this._loadItemsById={},this._loadItemsBySrc={},this._loadedResults={},this._loadedRawResults={},this._numItems=0,this._numItemsLoaded=0,this._scriptOrder=[],this._loadedScripts=[],this._lastProgress=NaN},b.registerLoader=function(a){if(!a||!a.canLoadItem)throw new Error("loader is of an incorrect type.");if(-1!=this._availableLoaders.indexOf(a))throw new Error("loader already exists.");
this._availableLoaders.unshift(a)},b.unregisterLoader=function(a){var b=this._availableLoaders.indexOf(a);-1!=b&&b<this._defaultLoaderLength-1&&this._availableLoaders.splice(b,1)},b.setPreferXHR=function(a){return this.preferXHR=0!=a&&null!=window.XMLHttpRequest,this.preferXHR},b.removeAll=function(){this.remove()},b.remove=function(a){var b=null;if(a&&!Array.isArray(a))b=[a];else if(a)b=a;else if(arguments.length>0)return;var c=!1;if(b){for(;b.length;){var d=b.pop(),e=this.getResult(d);for(f=this._loadQueue.length-1;f>=0;f--)if(g=this._loadQueue[f].getItem(),g.id==d||g.src==d){this._loadQueue.splice(f,1)[0].cancel();break}for(f=this._loadQueueBackup.length-1;f>=0;f--)if(g=this._loadQueueBackup[f].getItem(),g.id==d||g.src==d){this._loadQueueBackup.splice(f,1)[0].cancel();break}if(e)this._disposeItem(this.getItem(d));else for(var f=this._currentLoads.length-1;f>=0;f--){var g=this._currentLoads[f].getItem();if(g.id==d||g.src==d){this._currentLoads.splice(f,1)[0].cancel(),c=!0;break}}}c&&this._loadNext()}else{this.close();for(var h in this._loadItemsById)this._disposeItem(this._loadItemsById[h]);this.init(this.preferXHR,this._basePath)}},b.reset=function(){this.close();for(var a in this._loadItemsById)this._disposeItem(this._loadItemsById[a]);for(var b=[],c=0,d=this._loadQueueBackup.length;d>c;c++)b.push(this._loadQueueBackup[c].getItem());this.loadManifest(b,!1)},b.installPlugin=function(a){if(null!=a&&null!=a.getPreloadHandlers){this._plugins.push(a);var b=a.getPreloadHandlers();if(b.scope=a,null!=b.types)for(var c=0,d=b.types.length;d>c;c++)this._typeCallbacks[b.types[c]]=b;if(null!=b.extensions)for(c=0,d=b.extensions.length;d>c;c++)this._extensionCallbacks[b.extensions[c]]=b}},b.setMaxConnections=function(a){this._maxConnections=a,!this._paused&&this._loadQueue.length>0&&this._loadNext()},b.loadFile=function(a,b,c){if(null==a){var d=new createjs.ErrorEvent("PRELOAD_NO_FILE");return void this._sendError(d)}this._addItem(a,null,c),b!==!1?this.setPaused(!1):this.setPaused(!0)},b.loadManifest=function(a,b,d){var e=null,f=null;if(Array.isArray(a)){if(0==a.length){var g=new createjs.ErrorEvent("PRELOAD_MANIFEST_EMPTY");return void this._sendError(g)}e=a}else if("string"==typeof a)e=[{src:a,type:c.MANIFEST}];else{if("object"!=typeof a){var g=new createjs.ErrorEvent("PRELOAD_MANIFEST_NULL");return void this._sendError(g)}if(void 0!==a.src){if(null==a.type)a.type=c.MANIFEST;else if(a.type!=c.MANIFEST){var g=new createjs.ErrorEvent("PRELOAD_MANIFEST_TYPE");this._sendError(g)}e=[a]}else void 0!==a.manifest&&(e=a.manifest,f=a.path)}for(var h=0,i=e.length;i>h;h++)this._addItem(e[h],f,d);b!==!1?this.setPaused(!1):this.setPaused(!0)},b.load=function(){this.setPaused(!1)},b.getItem=function(a){return this._loadItemsById[a]||this._loadItemsBySrc[a]},b.getResult=function(a,b){var c=this._loadItemsById[a]||this._loadItemsBySrc[a];if(null==c)return null;var d=c.id;return b&&this._loadedRawResults[d]?this._loadedRawResults[d]:this._loadedResults[d]},b.getItems=function(a){var b=[];for(var c in this._loadItemsById){var d=this._loadItemsById[c],e=this.getResult(c);(a!==!0||null!=e)&&b.push({item:d,result:e,rawResult:this.getResult(c,!0)})}return b},b.setPaused=function(a){this._paused=a,this._paused||this._loadNext()},b.close=function(){for(;this._currentLoads.length;)this._currentLoads.pop().cancel();this._scriptOrder.length=0,this._loadedScripts.length=0,this.loadStartWasDispatched=!1,this._itemCount=0,this._lastProgress=NaN},b._addItem=function(a,b,c){var d=this._createLoadItem(a,b,c);if(null!=d){var e=this._createLoader(d);null!=e&&("plugins"in e&&(e.plugins=this._plugins),d._loader=e,this._loadQueue.push(e),this._loadQueueBackup.push(e),this._numItems++,this._updateProgress(),(this.maintainScriptOrder&&d.type==createjs.Types.JAVASCRIPT||d.maintainOrder===!0)&&(this._scriptOrder.push(d),this._loadedScripts.push(null)))}},b._createLoadItem=function(a,b,c){var d=createjs.LoadItem.create(a);if(null==d)return null;var e="",f=c||this._basePath;if(d.src instanceof Object){if(!d.type)return null;if(b){e=b;var g=createjs.URLUtils.parseURI(b);null==f||g.absolute||g.relative||(e=f+e)}else null!=f&&(e=f)}else{var h=createjs.URLUtils.parseURI(d.src);h.extension&&(d.ext=h.extension),null==d.type&&(d.type=createjs.RequestUtils.getTypeByExtension(d.ext));var i=d.src;if(!h.absolute&&!h.relative)if(b){e=b;var g=createjs.URLUtils.parseURI(b);i=b+i,null==f||g.absolute||g.relative||(e=f+e)}else null!=f&&(e=f);d.src=e+d.src}d.path=e,(void 0===d.id||null===d.id||""===d.id)&&(d.id=i);var j=this._typeCallbacks[d.type]||this._extensionCallbacks[d.ext];if(j){var k=j.callback.call(j.scope,d,this);if(k===!1)return null;k===!0||null!=k&&(d._loader=k),h=createjs.URLUtils.parseURI(d.src),null!=h.extension&&(d.ext=h.extension)}return this._loadItemsById[d.id]=d,this._loadItemsBySrc[d.src]=d,null==d.crossOrigin&&(d.crossOrigin=this._crossOrigin),d},b._createLoader=function(a){if(null!=a._loader)return a._loader;for(var b=this.preferXHR,c=0;c<this._availableLoaders.length;c++){var d=this._availableLoaders[c];if(d&&d.canLoadItem(a))return new d(a,b)}return null},b._loadNext=function(){if(!this._paused){this._loadStartWasDispatched||(this._sendLoadStart(),this._loadStartWasDispatched=!0),this._numItems==this._numItemsLoaded?(this.loaded=!0,this._sendComplete(),this.next&&this.next.load&&this.next.load()):this.loaded=!1;for(var a=0;a<this._loadQueue.length&&!(this._currentLoads.length>=this._maxConnections);a++){var b=this._loadQueue[a];this._canStartLoad(b)&&(this._loadQueue.splice(a,1),a--,this._loadItem(b))}}},b._loadItem=function(a){a.on("fileload",this._handleFileLoad,this),a.on("progress",this._handleProgress,this),a.on("complete",this._handleFileComplete,this),a.on("error",this._handleError,this),a.on("fileerror",this._handleFileError,this),this._currentLoads.push(a),this._sendFileStart(a.getItem()),a.load()},b._handleFileLoad=function(a){a.target=null,this.dispatchEvent(a)},b._handleFileError=function(a){var b=new createjs.ErrorEvent("FILE_LOAD_ERROR",null,a.item);this._sendError(b)},b._handleError=function(a){var b=a.target;this._numItemsLoaded++,this._finishOrderedItem(b,!0),this._updateProgress();var c=new createjs.ErrorEvent("FILE_LOAD_ERROR",null,b.getItem());this._sendError(c),this.stopOnError?this.setPaused(!0):(this._removeLoadItem(b),this._cleanLoadItem(b),this._loadNext())},b._handleFileComplete=function(a){var b=a.target,c=b.getItem(),d=b.getResult();this._loadedResults[c.id]=d;var e=b.getResult(!0);null!=e&&e!==d&&(this._loadedRawResults[c.id]=e),this._saveLoadedItems(b),this._removeLoadItem(b),this._finishOrderedItem(b)||this._processFinishedLoad(c,b),this._cleanLoadItem(b)},b._saveLoadedItems=function(a){var b=a.getLoadedItems();if(null!==b)for(var c=0;c<b.length;c++){var d=b[c].item;this._loadItemsBySrc[d.src]=d,this._loadItemsById[d.id]=d,this._loadedResults[d.id]=b[c].result,this._loadedRawResults[d.id]=b[c].rawResult}},b._finishOrderedItem=function(a,b){var c=a.getItem();if(this.maintainScriptOrder&&c.type==createjs.Types.JAVASCRIPT||c.maintainOrder){a instanceof createjs.JavaScriptLoader&&(this._currentlyLoadingScript=!1);var d=createjs.indexOf(this._scriptOrder,c);return-1==d?!1:(this._loadedScripts[d]=b===!0?!0:c,this._checkScriptLoadOrder(),!0)}return!1},b._checkScriptLoadOrder=function(){for(var a=this._loadedScripts.length,b=0;a>b;b++){var c=this._loadedScripts[b];if(null===c)break;if(c!==!0){var d=this._loadedResults[c.id];c.type==createjs.Types.JAVASCRIPT&&createjs.DomUtils.appendToHead(d);var e=c._loader;this._processFinishedLoad(c,e),this._loadedScripts[b]=!0}}},b._processFinishedLoad=function(a,b){if(this._numItemsLoaded++,!this.maintainScriptOrder&&a.type==createjs.Types.JAVASCRIPT){var c=b.getTag();createjs.DomUtils.appendToHead(c)}this._updateProgress(),this._sendFileComplete(a,b),this._loadNext()},b._canStartLoad=function(a){if(!this.maintainScriptOrder||a.preferXHR)return!0;var b=a.getItem();if(b.type!=createjs.Types.JAVASCRIPT)return!0;if(this._currentlyLoadingScript)return!1;for(var c=this._scriptOrder.indexOf(b),d=0;c>d;){var e=this._loadedScripts[d];if(null==e)return!1;d++}return this._currentlyLoadingScript=!0,!0},b._removeLoadItem=function(a){for(var b=this._currentLoads.length,c=0;b>c;c++)if(this._currentLoads[c]==a){this._currentLoads.splice(c,1);break}},b._cleanLoadItem=function(a){var b=a.getItem();b&&delete b._loader},b._handleProgress=function(a){var b=a.target;this._sendFileProgress(b.getItem(),b.progress),this._updateProgress()},b._updateProgress=function(){var a=this._numItemsLoaded/this._numItems,b=this._numItems-this._numItemsLoaded;if(b>0){for(var c=0,d=0,e=this._currentLoads.length;e>d;d++)c+=this._currentLoads[d].progress;a+=c/b*(b/this._numItems)}this._lastProgress!=a&&(this._sendProgress(a),this._lastProgress=a)},b._disposeItem=function(a){delete this._loadedResults[a.id],delete this._loadedRawResults[a.id],delete this._loadItemsById[a.id],delete this._loadItemsBySrc[a.src]},b._sendFileProgress=function(a,b){if(!this._isCanceled()&&!this._paused&&this.hasEventListener("fileprogress")){var c=new createjs.Event("fileprogress");c.progress=b,c.loaded=b,c.total=1,c.item=a,this.dispatchEvent(c)}},b._sendFileComplete=function(a,b){if(!this._isCanceled()&&!this._paused){var c=new createjs.Event("fileload");c.loader=b,c.item=a,c.result=this._loadedResults[a.id],c.rawResult=this._loadedRawResults[a.id],a.completeHandler&&a.completeHandler(c),this.hasEventListener("fileload")&&this.dispatchEvent(c)}},b._sendFileStart=function(a){var b=new createjs.Event("filestart");b.item=a,this.hasEventListener("filestart")&&this.dispatchEvent(b)},b.toString=function(){return"[PreloadJS LoadQueue]"},createjs.LoadQueue=createjs.promote(a,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.AbstractLoader_constructor(a,!0,createjs.Types.TEXT)}var b=(createjs.extend(a,createjs.AbstractLoader),a);b.canLoadItem=function(a){return a.type==createjs.Types.TEXT},createjs.TextLoader=createjs.promote(a,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.AbstractLoader_constructor(a,!0,createjs.Types.BINARY),this.on("initialize",this._updateXHR,this)}var b=createjs.extend(a,createjs.AbstractLoader),c=a;c.canLoadItem=function(a){return a.type==createjs.Types.BINARY},b._updateXHR=function(a){a.loader.setResponseType("arraybuffer")},createjs.BinaryLoader=createjs.promote(a,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b){this.AbstractLoader_constructor(a,b,createjs.Types.CSS),this.resultFormatter=this._formatResult,this._tagSrcAttribute="href",b?this._tag=createjs.Elements.style():this._tag=createjs.Elements.link(),this._tag.rel="stylesheet",this._tag.type="text/css"}var b=createjs.extend(a,createjs.AbstractLoader),c=a;c.canLoadItem=function(a){return a.type==createjs.Types.CSS},b._formatResult=function(a){if(this._preferXHR){var b=a.getTag();if(b.styleSheet)b.styleSheet.cssText=a.getResult(!0);else{var c=createjs.Elements.text(a.getResult(!0));b.appendChild(c)}}else b=this._tag;return createjs.DomUtils.appendToHead(b),b},createjs.CSSLoader=createjs.promote(a,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b){this.AbstractLoader_constructor(a,b,a.type),this._faces={},this._watched=[],this._count=0,this._watchInterval=null,this._loadTimeout=null,this._injectCSS=void 0===a.injectCSS?!0:a.injectCSS,this.dispatchEvent("initialize")}var b=createjs.extend(a,createjs.AbstractLoader);a.canLoadItem=function(a){return a.type==createjs.Types.FONT||a.type==createjs.Types.FONTCSS},a.sampleText="abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ",a._ctx=document.createElement("canvas").getContext("2d"),a._referenceFonts=["serif","monospace"],a.WEIGHT_REGEX=/[- ._]*(thin|normal|book|regular|medium|black|heavy|[1-9]00|(?:extra|ultra|semi|demi)?[- ._]*(?:light|bold))[- ._]*/gi,a.STYLE_REGEX=/[- ._]*(italic|oblique)[- ._]*/gi,a.FONT_FORMAT={woff2:"woff2",woff:"woff",ttf:"truetype",otf:"truetype"},a.FONT_WEIGHT={thin:100,extralight:200,ultralight:200,light:300,semilight:300,demilight:300,book:"normal",regular:"normal",semibold:600,demibold:600,extrabold:800,ultrabold:800,black:900,heavy:900},a.WATCH_DURATION=10,b.load=function(){if(this.type==createjs.Types.FONTCSS){var a=this._watchCSS();if(!a)return void this.AbstractLoader_load()}else if(this._item.src instanceof Array)this._watchFontArray();else{var b=this._defFromSrc(this._item.src);this._watchFont(b),this._injectStyleTag(this._cssFromDef(b))}this._loadTimeout=setTimeout(createjs.proxy(this._handleTimeout,this),this._item.loadTimeout),this.dispatchEvent("loadstart")},b._handleTimeout=function(){this._stopWatching(),this.dispatchEvent(new createjs.ErrorEvent("PRELOAD_TIMEOUT"))},b._createRequest=function(){return this._request},b.handleEvent=function(a){switch(a.type){case"complete":this._rawResult=a.target._response,this._result=!0,this._parseCSS(this._rawResult);break;case"error":this._stopWatching(),this.AbstractLoader_handleEvent(a)}},b._watchCSS=function(){var a=this._item.src;return a instanceof HTMLStyleElement&&(this._injectCSS&&!a.parentNode&&(document.head||document.getElementsByTagName("head")[0]).appendChild(a),this._injectCSS=!1,a="\n"+a.textContent),-1!==a.search(/\n|\r|@font-face/i)?(this._parseCSS(a),!0):(this._request=new createjs.XHRRequest(this._item),!1)},b._parseCSS=function(a){for(var b=/@font-face\s*\{([^}]+)}/g;;){var c=b.exec(a);if(!c)break;this._watchFont(this._parseFontFace(c[1]))}this._injectStyleTag(a)},b._watchFontArray=function(){for(var a,b=this._item.src,c="",d=b.length-1;d>=0;d--){var e=b[d];a="string"==typeof e?this._defFromSrc(e):this._defFromObj(e),this._watchFont(a),c+=this._cssFromDef(a)+"\n"}this._injectStyleTag(c)},b._injectStyleTag=function(a){if(this._injectCSS){var b=document.head||document.getElementsByTagName("head")[0],c=document.createElement("style");c.type="text/css",c.styleSheet?c.styleSheet.cssText=a:c.appendChild(document.createTextNode(a)),b.appendChild(c)}},b._parseFontFace=function(a){var b=this._getCSSValue(a,"font-family"),c=this._getCSSValue(a,"src");return b&&c?this._defFromObj({family:b,src:c,style:this._getCSSValue(a,"font-style"),weight:this._getCSSValue(a,"font-weight")}):null},b._watchFont=function(a){a&&!this._faces[a.id]&&(this._faces[a.id]=a,this._watched.push(a),this._count++,this._calculateReferenceSizes(a),this._startWatching())},b._startWatching=function(){null==this._watchInterval&&(this._watchInterval=setInterval(createjs.proxy(this._watch,this),a.WATCH_DURATION))},b._stopWatching=function(){clearInterval(this._watchInterval),clearTimeout(this._loadTimeout),this._watchInterval=null},b._watch=function(){for(var b=this._watched,c=a._referenceFonts,d=b.length,e=d-1;e>=0;e--)for(var f=b[e],g=f.refs,h=g.length-1;h>=0;h--){var i=this._getTextWidth(f.family+","+c[h],f.weight,f.style);if(i!=g[h]){var j=new createjs.Event("fileload");f.type="font-family",j.item=f,this.dispatchEvent(j),b.splice(e,1);break}}if(d!==b.length){var j=new createjs.ProgressEvent(this._count-b.length,this._count);this.dispatchEvent(j)}0===d&&(this._stopWatching(),this._sendComplete())},b._calculateReferenceSizes=function(b){for(var c=a._referenceFonts,d=b.refs=[],e=0;e<c.length;e++)d[e]=this._getTextWidth(c[e],b.weight,b.style)},b._defFromSrc=function(b){var c,d=/[- ._]+/g,e=b,f=null;c=e.search(/[?#]/),-1!==c&&(e=e.substr(0,c)),c=e.lastIndexOf("."),-1!==c&&(f=e.substr(c+1),e=e.substr(0,c)),c=e.lastIndexOf("/"),-1!==c&&(e=e.substr(c+1));var g=e,h=g.match(a.WEIGHT_REGEX);h&&(h=h[0],g=g.replace(h,""),h=h.replace(d,"").toLowerCase());var i=e.match(a.STYLE_REGEX);i&&(g=g.replace(i[0],""),i="italic"),g=g.replace(d,"");var j="local('"+e.replace(d," ")+"'), url('"+b+"')",k=a.FONT_FORMAT[f];return k&&(j+=" format('"+k+"')"),this._defFromObj({family:g,weight:a.FONT_WEIGHT[h]||h,style:i,src:j})},b._defFromObj=function(a){var b={family:a.family,src:a.src,style:a.style||"normal",weight:a.weight||"normal"};return b.id=b.family+";"+b.style+";"+b.weight,b},b._cssFromDef=function(a){return"@font-face {\n	font-family: '"+a.family+"';\n	font-style: "+a.style+";\n	font-weight: "+a.weight+";\n	src: "+a.src+";\n}"},b._getTextWidth=function(b,c,d){var e=a._ctx;return e.font=d+" "+c+" 72px "+b,e.measureText(a.sampleText).width},b._getCSSValue=function(a,b){var c=new RegExp(b+":s*([^;}]+?)s*[;}]"),d=c.exec(a);return d&&d[1]?d[1]:null},createjs.FontLoader=createjs.promote(a,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b){this.AbstractLoader_constructor(a,b,createjs.Types.IMAGE),this.resultFormatter=this._formatResult,this._tagSrcAttribute="src",createjs.DomUtils.isImageTag(a)?this._tag=a:createjs.DomUtils.isImageTag(a.src)?this._tag=a.src:createjs.DomUtils.isImageTag(a.tag)&&(this._tag=a.tag),null!=this._tag?this._preferXHR=!1:this._tag=createjs.Elements.img(),this.on("initialize",this._updateXHR,this)}var b=createjs.extend(a,createjs.AbstractLoader),c=a;c.canLoadItem=function(a){return a.type==createjs.Types.IMAGE},b.load=function(){if(""!=this._tag.src&&this._tag.complete)return void this._sendComplete();var a=this._item.crossOrigin;1==a&&(a="Anonymous"),null==a||createjs.URLUtils.isLocal(this._item)||(this._tag.crossOrigin=a),this.AbstractLoader_load()},b._updateXHR=function(a){a.loader.mimeType="text/plain; charset=x-user-defined-binary",a.loader.setResponseType&&a.loader.setResponseType("blob")},b._formatResult=function(a){return this._formatImage},b._formatImage=function(a,b){var c=this._tag,d=window.URL||window.webkitURL;if(this._preferXHR)if(d){var e=d.createObjectURL(this.getResult(!0));c.src=e,c.addEventListener("load",this._cleanUpURL,!1),c.addEventListener("error",this._cleanUpURL,!1)}else c.src=this._item.src;else;c.complete?a(c):(c.onload=createjs.proxy(function(){a(this._tag),c.onload=c.onerror=null},this),c.onerror=createjs.proxy(function(a){b(new createjs.ErrorEvent("IMAGE_FORMAT",null,a)),c.onload=c.onerror=null},this))},b._cleanUpURL=function(a){var b=window.URL||window.webkitURL;b.revokeObjectURL(a.target.src)},createjs.ImageLoader=createjs.promote(a,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b){this.AbstractLoader_constructor(a,b,createjs.Types.JAVASCRIPT),this.resultFormatter=this._formatResult,this._tagSrcAttribute="src",this.setTag(createjs.Elements.script())}var b=createjs.extend(a,createjs.AbstractLoader),c=a;c.canLoadItem=function(a){return a.type==createjs.Types.JAVASCRIPT},b._formatResult=function(a){var b=a.getTag();return this._preferXHR&&(b.text=a.getResult(!0)),b},createjs.JavaScriptLoader=createjs.promote(a,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.AbstractLoader_constructor(a,!0,createjs.Types.JSON),this.resultFormatter=this._formatResult}var b=createjs.extend(a,createjs.AbstractLoader),c=a;c.canLoadItem=function(a){return a.type==createjs.Types.JSON},b._formatResult=function(a){var b=null;try{b=createjs.DataUtils.parseJSON(a.getResult(!0))}catch(c){var d=new createjs.ErrorEvent("JSON_FORMAT",null,c);return this._sendError(d),c}return b},createjs.JSONLoader=createjs.promote(a,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.AbstractLoader_constructor(a,!1,createjs.Types.JSONP),this.setTag(createjs.Elements.script()),this.getTag().type="text/javascript"}var b=createjs.extend(a,createjs.AbstractLoader),c=a;c.canLoadItem=function(a){return a.type==createjs.Types.JSONP},b.cancel=function(){this.AbstractLoader_cancel(),this._dispose()},b.load=function(){if(null==this._item.callback)throw new Error("callback is required for loading JSONP requests.");if(null!=window[this._item.callback])throw new Error("JSONP callback '"+this._item.callback+"' already exists on window. You need to specify a different callback or re-name the current one.");window[this._item.callback]=createjs.proxy(this._handleLoad,this),createjs.DomUtils.appendToBody(this._tag),this._loadTimeout=setTimeout(createjs.proxy(this._handleTimeout,this),this._item.loadTimeout),this._tag.src=this._item.src},b._handleLoad=function(a){this._result=this._rawResult=a,this._sendComplete(),this._dispose()},b._handleTimeout=function(){this._dispose(),this.dispatchEvent(new createjs.ErrorEvent("timeout"))},b._dispose=function(){createjs.DomUtils.removeChild(this._tag),delete window[this._item.callback],clearTimeout(this._loadTimeout)},createjs.JSONPLoader=createjs.promote(a,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b){this.AbstractLoader_constructor(a,b,createjs.Types.MANIFEST),this.plugins=null,this._manifestQueue=null}var b=createjs.extend(a,createjs.AbstractLoader),c=a;c.MANIFEST_PROGRESS=.25,c.canLoadItem=function(a){return a.type==createjs.Types.MANIFEST},b.load=function(){this.AbstractLoader_load()},b._createRequest=function(){var a=this._item.callback;null!=a?this._request=new createjs.JSONPLoader(this._item):this._request=new createjs.JSONLoader(this._item)},b.handleEvent=function(a){switch(a.type){case"complete":return this._rawResult=a.target.getResult(!0),this._result=a.target.getResult(),this._sendProgress(c.MANIFEST_PROGRESS),void this._loadManifest(this._result);case"progress":return a.loaded*=c.MANIFEST_PROGRESS,this.progress=a.loaded/a.total,(isNaN(this.progress)||this.progress==1/0)&&(this.progress=0),void this._sendProgress(a)}this.AbstractLoader_handleEvent(a)},b.destroy=function(){this.AbstractLoader_destroy(),this._manifestQueue.close()},b._loadManifest=function(a){if(a&&a.manifest){var b=this._manifestQueue=new createjs.LoadQueue(this._preferXHR);b.on("fileload",this._handleManifestFileLoad,this),b.on("progress",this._handleManifestProgress,this),b.on("complete",this._handleManifestComplete,this,!0),b.on("error",this._handleManifestError,this,!0);for(var c=0,d=this.plugins.length;d>c;c++)b.installPlugin(this.plugins[c]);b.loadManifest(a)}else this._sendComplete()},b._handleManifestFileLoad=function(a){a.target=null,this.dispatchEvent(a)},b._handleManifestComplete=function(a){this._loadedItems=this._manifestQueue.getItems(!0),this._sendComplete()},b._handleManifestProgress=function(a){this.progress=a.progress*(1-c.MANIFEST_PROGRESS)+c.MANIFEST_PROGRESS,this._sendProgress(this.progress)},b._handleManifestError=function(a){var b=new createjs.Event("fileerror");b.item=a.data,this.dispatchEvent(b)},createjs.ManifestLoader=createjs.promote(a,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b){this.AbstractMediaLoader_constructor(a,b,createjs.Types.SOUND),createjs.DomUtils.isAudioTag(a)?this._tag=a:createjs.DomUtils.isAudioTag(a.src)?this._tag=a:createjs.DomUtils.isAudioTag(a.tag)&&(this._tag=createjs.DomUtils.isAudioTag(a)?a:a.src),null!=this._tag&&(this._preferXHR=!1)}var b=createjs.extend(a,createjs.AbstractMediaLoader),c=a;c.canLoadItem=function(a){return a.type==createjs.Types.SOUND},b._createTag=function(a){var b=createjs.Elements.audio();return b.autoplay=!1,b.preload="none",b.src=a,b},createjs.SoundLoader=createjs.promote(a,"AbstractMediaLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b){this.AbstractMediaLoader_constructor(a,b,createjs.Types.VIDEO),createjs.DomUtils.isVideoTag(a)||createjs.DomUtils.isVideoTag(a.src)?(this.setTag(createjs.DomUtils.isVideoTag(a)?a:a.src),this._preferXHR=!1):this.setTag(this._createTag())}var b=createjs.extend(a,createjs.AbstractMediaLoader),c=a;b._createTag=function(){return createjs.Elements.video()},c.canLoadItem=function(a){return a.type==createjs.Types.VIDEO},createjs.VideoLoader=createjs.promote(a,"AbstractMediaLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b){this.AbstractLoader_constructor(a,b,createjs.Types.SPRITESHEET),this._manifestQueue=null}var b=createjs.extend(a,createjs.AbstractLoader),c=a;c.SPRITESHEET_PROGRESS=.25,c.canLoadItem=function(a){return a.type==createjs.Types.SPRITESHEET},b.destroy=function(){this.AbstractLoader_destroy(),this._manifestQueue.close()},b._createRequest=function(){var a=this._item.callback;null!=a?this._request=new createjs.JSONPLoader(this._item):this._request=new createjs.JSONLoader(this._item)},b.handleEvent=function(a){switch(a.type){case"complete":return this._rawResult=a.target.getResult(!0),this._result=a.target.getResult(),this._sendProgress(c.SPRITESHEET_PROGRESS),void this._loadManifest(this._result);case"progress":return a.loaded*=c.SPRITESHEET_PROGRESS,this.progress=a.loaded/a.total,(isNaN(this.progress)||this.progress==1/0)&&(this.progress=0),void this._sendProgress(a)}this.AbstractLoader_handleEvent(a)},b._loadManifest=function(a){if(a&&a.images){var b=this._manifestQueue=new createjs.LoadQueue(this._preferXHR,this._item.path,this._item.crossOrigin);b.on("complete",this._handleManifestComplete,this,!0),b.on("fileload",this._handleManifestFileLoad,this),b.on("progress",this._handleManifestProgress,this),b.on("error",this._handleManifestError,this,!0),b.loadManifest(a.images)}},b._handleManifestFileLoad=function(a){var b=a.result;if(null!=b){var c=this.getResult().images,d=c.indexOf(a.item.src);c[d]=b}},b._handleManifestComplete=function(a){this._result=new createjs.SpriteSheet(this._result),this._loadedItems=this._manifestQueue.getItems(!0),this._sendComplete()},b._handleManifestProgress=function(a){this.progress=a.progress*(1-c.SPRITESHEET_PROGRESS)+c.SPRITESHEET_PROGRESS,this._sendProgress(this.progress)},b._handleManifestError=function(a){var b=new createjs.Event("fileerror");b.item=a.data,this.dispatchEvent(b)},createjs.SpriteSheetLoader=createjs.promote(a,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b){this.AbstractLoader_constructor(a,b,createjs.Types.SVG),this.resultFormatter=this._formatResult,this._tagSrcAttribute="data",b?this.setTag(createjs.Elements.svg()):(this.setTag(createjs.Elements.object()),this.getTag().type="image/svg+xml")}var b=createjs.extend(a,createjs.AbstractLoader),c=a;c.canLoadItem=function(a){return a.type==createjs.Types.SVG},b._formatResult=function(a){var b=createjs.DataUtils.parseXML(a.getResult(!0)),c=a.getTag();if(!this._preferXHR&&document.body.contains(c)&&document.body.removeChild(c),null!=b.documentElement){var d=b.documentElement;return document.importNode&&(d=document.importNode(d,!0)),c.appendChild(d),c}return b},createjs.SVGLoader=createjs.promote(a,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.AbstractLoader_constructor(a,!0,createjs.Types.XML),this.resultFormatter=this._formatResult}var b=createjs.extend(a,createjs.AbstractLoader),c=a;c.canLoadItem=function(a){return a.type==createjs.Types.XML},b._formatResult=function(a){return createjs.DataUtils.parseXML(a.getResult(!0))},createjs.XMLLoader=createjs.promote(a,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){var a=createjs.SoundJS=createjs.SoundJS||{};a.version="NEXT",a.buildDate="Thu, 14 Sep 2017 22:19:45 GMT"}(),this.createjs=this.createjs||{},function(){"use strict";function a(){throw"BrowserDetect cannot be instantiated"}var b=a.agent=window.navigator.userAgent;a.isWindowPhone=b.indexOf("IEMobile")>-1||b.indexOf("Windows Phone")>-1,a.isFirefox=b.indexOf("Firefox")>-1,a.isOpera=null!=window.opera,a.isChrome=b.indexOf("Chrome")>-1,a.isIOS=(b.indexOf("iPod")>-1||b.indexOf("iPhone")>-1||b.indexOf("iPad")>-1)&&!a.isWindowPhone,a.isAndroid=b.indexOf("Android")>-1&&!a.isWindowPhone,a.isBlackberry=b.indexOf("Blackberry")>-1,createjs.BrowserDetect=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(){this.interrupt=null,this.delay=null,this.offset=null,this.loop=null,this.volume=null,this.pan=null,this.startTime=null,this.duration=null},b=a.prototype={},c=a;c.create=function(a){if("string"==typeof a)return console&&(console.warn||console.log)("Deprecated behaviour. Sound.play takes a configuration object instead of individual arguments. See docs for info."),(new createjs.PlayPropsConfig).set({interrupt:a});if(null==a||a instanceof c||a instanceof Object)return(new createjs.PlayPropsConfig).set(a);if(null==a)throw new Error("PlayProps configuration not recognized.")},b.set=function(a){if(null!=a)for(var b in a)this[b]=a[b];return this},b.toString=function(){return"[PlayPropsConfig]"},createjs.PlayPropsConfig=c}(),this.createjs=this.createjs||{},function(){"use strict";function a(){throw"Sound cannot be instantiated"}function b(a,b){this.init(a,b)}var c=a;c.INTERRUPT_ANY="any",c.INTERRUPT_EARLY="early",c.INTERRUPT_LATE="late",c.INTERRUPT_NONE="none",c.PLAY_INITED="playInited",c.PLAY_SUCCEEDED="playSucceeded",c.PLAY_INTERRUPTED="playInterrupted",c.PLAY_FINISHED="playFinished",c.PLAY_FAILED="playFailed",c.SUPPORTED_EXTENSIONS=["mp3","ogg","opus","mpeg","wav","m4a","mp4","aiff","wma","mid"],c.EXTENSION_MAP={m4a:"mp4"},c.FILE_PATTERN=/^(?:(\w+:)\/{2}(\w+(?:\.\w+)*\/?))?([\/.]*?(?:[^?]+)?\/)?((?:[^\/?]+)\.(\w+))(?:\?(\S+)?)?$/,c.defaultInterruptBehavior=c.INTERRUPT_NONE,c.alternateExtensions=[],c.activePlugin=null,c._masterVolume=1,c._getMasterVolume=function(){return this._masterVolume},c.getVolume=createjs.deprecate(c._getMasterVolume,"Sound.getVolume"),c._setMasterVolume=function(a){if(null!=Number(a)&&(a=Math.max(0,Math.min(1,a)),c._masterVolume=a,!this.activePlugin||!this.activePlugin.setVolume||!this.activePlugin.setVolume(a)))for(var b=this._instances,d=0,e=b.length;e>d;d++)b[d].setMasterVolume(a)},c.setVolume=createjs.deprecate(c._setMasterVolume,"Sound.setVolume"),c._masterMute=!1,c._getMute=function(){return this._masterMute},c.getMute=createjs.deprecate(c._getMute,"Sound.getMute"),c._setMute=function(a){if(null!=a&&(this._masterMute=a,!this.activePlugin||!this.activePlugin.setMute||!this.activePlugin.setMute(a)))for(var b=this._instances,c=0,d=b.length;d>c;c++)b[c].setMasterMute(a)},c.setMute=createjs.deprecate(c._setMute,"Sound.setMute"),c._getCapabilities=function(){return null==c.activePlugin?null:c.activePlugin._capabilities},c.getCapabilities=createjs.deprecate(c._getCapabilities,"Sound.getCapabilities"),Object.defineProperties(c,{volume:{get:c._getMasterVolume,set:c._setMasterVolume},muted:{get:c._getMute,set:c._setMute},capabilities:{get:c._getCapabilities}}),c._pluginsRegistered=!1,c._lastID=0,c._instances=[],c._idHash={},c._preloadHash={},c._defaultPlayPropsHash={},c.addEventListener=null,c.removeEventListener=null,c.removeAllEventListeners=null,c.dispatchEvent=null,c.hasEventListener=null,c._listeners=null,createjs.EventDispatcher.initialize(c),c.getPreloadHandlers=function(){return{callback:createjs.proxy(c.initLoad,c),types:["sound"],extensions:c.SUPPORTED_EXTENSIONS}},c._handleLoadComplete=function(a){var b=a.target.getItem().src;if(c._preloadHash[b])for(var d=0,e=c._preloadHash[b].length;e>d;d++){var f=c._preloadHash[b][d];if(c._preloadHash[b][d]=!0,c.hasEventListener("fileload")){var a=new createjs.Event("fileload");a.src=f.src,a.id=f.id,a.data=f.data,a.sprite=f.sprite,c.dispatchEvent(a)}}},c._handleLoadError=function(a){var b=a.target.getItem().src;if(c._preloadHash[b])for(var d=0,e=c._preloadHash[b].length;e>d;d++){var f=c._preloadHash[b][d];if(c._preloadHash[b][d]=!1,c.hasEventListener("fileerror")){var a=new createjs.Event("fileerror");a.src=f.src,a.id=f.id,a.data=f.data,a.sprite=f.sprite,c.dispatchEvent(a)}}},c._registerPlugin=function(a){return a.isSupported()?(c.activePlugin=new a,!0):!1},c.registerPlugins=function(a){c._pluginsRegistered=!0;for(var b=0,d=a.length;d>b;b++)if(c._registerPlugin(a[b]))return!0;return!1},c.initializeDefaultPlugins=function(){return null!=c.activePlugin?!0:c._pluginsRegistered?!1:c.registerPlugins([createjs.WebAudioPlugin,createjs.HTMLAudioPlugin])?!0:!1},c.isReady=function(){return null!=c.activePlugin},c.initLoad=function(a){return"video"==a.type?!0:c._registerSound(a)},c._registerSound=function(a){if(!c.initializeDefaultPlugins())return!1;var d;if(a.src instanceof Object?(d=c._parseSrc(a.src),
d.src=a.path+d.src):d=c._parsePath(a.src),null==d)return!1;a.src=d.src,a.type="sound";var e=a.data,f=null;if(null!=e&&(isNaN(e.channels)?isNaN(e)||(f=parseInt(e)):f=parseInt(e.channels),e.audioSprite))for(var g,h=e.audioSprite.length;h--;)g=e.audioSprite[h],c._idHash[g.id]={src:a.src,startTime:parseInt(g.startTime),duration:parseInt(g.duration)},g.defaultPlayProps&&(c._defaultPlayPropsHash[g.id]=createjs.PlayPropsConfig.create(g.defaultPlayProps));null!=a.id&&(c._idHash[a.id]={src:a.src});var i=c.activePlugin.register(a);return b.create(a.src,f),null!=e&&isNaN(e)?a.data.channels=f||b.maxPerChannel():a.data=f||b.maxPerChannel(),i.type&&(a.type=i.type),a.defaultPlayProps&&(c._defaultPlayPropsHash[a.src]=createjs.PlayPropsConfig.create(a.defaultPlayProps)),i},c.registerSound=function(a,b,d,e,f){var g={src:a,id:b,data:d,defaultPlayProps:f};a instanceof Object&&a.src&&(e=b,g=a),g=createjs.LoadItem.create(g),g.path=e,null==e||g.src instanceof Object||(g.src=e+g.src);var h=c._registerSound(g);if(!h)return!1;if(c._preloadHash[g.src]||(c._preloadHash[g.src]=[]),c._preloadHash[g.src].push(g),1==c._preloadHash[g.src].length)h.on("complete",this._handleLoadComplete,this),h.on("error",this._handleLoadError,this),c.activePlugin.preload(h);else if(1==c._preloadHash[g.src][0])return!0;return g},c.registerSounds=function(a,b){var c=[];a.path&&(b?b+=a.path:b=a.path,a=a.manifest);for(var d=0,e=a.length;e>d;d++)c[d]=createjs.Sound.registerSound(a[d].src,a[d].id,a[d].data,b,a[d].defaultPlayProps);return c},c.removeSound=function(a,d){if(null==c.activePlugin)return!1;a instanceof Object&&a.src&&(a=a.src);var e;if(a instanceof Object?e=c._parseSrc(a):(a=c._getSrcById(a).src,e=c._parsePath(a)),null==e)return!1;a=e.src,null!=d&&(a=d+a);for(var f in c._idHash)c._idHash[f].src==a&&delete c._idHash[f];return b.removeSrc(a),delete c._preloadHash[a],c.activePlugin.removeSound(a),!0},c.removeSounds=function(a,b){var c=[];a.path&&(b?b+=a.path:b=a.path,a=a.manifest);for(var d=0,e=a.length;e>d;d++)c[d]=createjs.Sound.removeSound(a[d].src,b);return c},c.removeAllSounds=function(){c._idHash={},c._preloadHash={},b.removeAll(),c.activePlugin&&c.activePlugin.removeAllSounds()},c.loadComplete=function(a){if(!c.isReady())return!1;var b=c._parsePath(a);return a=b?c._getSrcById(b.src).src:c._getSrcById(a).src,void 0==c._preloadHash[a]?!1:1==c._preloadHash[a][0]},c._parsePath=function(a){"string"!=typeof a&&(a=a.toString());var b=a.match(c.FILE_PATTERN);if(null==b)return!1;for(var d=b[4],e=b[5],f=c.capabilities,g=0;!f[e];)if(e=c.alternateExtensions[g++],g>c.alternateExtensions.length)return null;a=a.replace("."+b[5],"."+e);var h={name:d,src:a,extension:e};return h},c._parseSrc=function(a){var b={name:void 0,src:void 0,extension:void 0},d=c.capabilities;for(var e in a)if(a.hasOwnProperty(e)&&d[e]){b.src=a[e],b.extension=e;break}if(!b.src)return!1;var f=b.src.lastIndexOf("/");return-1!=f?b.name=b.src.slice(f+1):b.name=b.src,b},c.play=function(a,b){var d=createjs.PlayPropsConfig.create(b),e=c.createInstance(a,d.startTime,d.duration),f=c._playInstance(e,d);return f||e._playFailed(),e},c.createInstance=function(a,d,e){if(!c.initializeDefaultPlugins())return new createjs.DefaultSoundInstance(a,d,e);var f=c._defaultPlayPropsHash[a];a=c._getSrcById(a);var g=c._parsePath(a.src),h=null;return null!=g&&null!=g.src?(b.create(g.src),null==d&&(d=a.startTime),h=c.activePlugin.create(g.src,d,e||a.duration),f=f||c._defaultPlayPropsHash[g.src],f&&h.applyPlayProps(f)):h=new createjs.DefaultSoundInstance(a,d,e),h.uniqueId=c._lastID++,h},c.stop=function(){for(var a=this._instances,b=a.length;b--;)a[b].stop()},c.setDefaultPlayProps=function(a,b){a=c._getSrcById(a),c._defaultPlayPropsHash[c._parsePath(a.src).src]=createjs.PlayPropsConfig.create(b)},c.getDefaultPlayProps=function(a){return a=c._getSrcById(a),c._defaultPlayPropsHash[c._parsePath(a.src).src]},c._playInstance=function(a,b){var d=c._defaultPlayPropsHash[a.src]||{};if(null==b.interrupt&&(b.interrupt=d.interrupt||c.defaultInterruptBehavior),null==b.delay&&(b.delay=d.delay||0),null==b.offset&&(b.offset=a.position),null==b.loop&&(b.loop=a.loop),null==b.volume&&(b.volume=a.volume),null==b.pan&&(b.pan=a.pan),0==b.delay){var e=c._beginPlaying(a,b);if(!e)return!1}else{var f=setTimeout(function(){c._beginPlaying(a,b)},b.delay);a.delayTimeoutId=f}return this._instances.push(a),!0},c._beginPlaying=function(a,c){if(!b.add(a,c.interrupt))return!1;var d=a._beginPlaying(c);if(!d){var e=createjs.indexOf(this._instances,a);return e>-1&&this._instances.splice(e,1),!1}return!0},c._getSrcById=function(a){return c._idHash[a]||{src:a}},c._playFinished=function(a){b.remove(a);var c=createjs.indexOf(this._instances,a);c>-1&&this._instances.splice(c,1)},createjs.Sound=a,b.channels={},b.create=function(a,c){var d=b.get(a);return null==d?(b.channels[a]=new b(a,c),!0):!1},b.removeSrc=function(a){var c=b.get(a);return null==c?!1:(c._removeAll(),delete b.channels[a],!0)},b.removeAll=function(){for(var a in b.channels)b.channels[a]._removeAll();b.channels={}},b.add=function(a,c){var d=b.get(a.src);return null==d?!1:d._add(a,c)},b.remove=function(a){var c=b.get(a.src);return null==c?!1:(c._remove(a),!0)},b.maxPerChannel=function(){return d.maxDefault},b.get=function(a){return b.channels[a]};var d=b.prototype;d.constructor=b,d.src=null,d.max=null,d.maxDefault=100,d.length=0,d.init=function(a,b){this.src=a,this.max=b||this.maxDefault,-1==this.max&&(this.max=this.maxDefault),this._instances=[]},d._get=function(a){return this._instances[a]},d._add=function(a,b){return this._getSlot(b,a)?(this._instances.push(a),this.length++,!0):!1},d._remove=function(a){var b=createjs.indexOf(this._instances,a);return-1==b?!1:(this._instances.splice(b,1),this.length--,!0)},d._removeAll=function(){for(var a=this.length-1;a>=0;a--)this._instances[a].stop()},d._getSlot=function(b,c){var d,e;if(b!=a.INTERRUPT_NONE&&(e=this._get(0),null==e))return!0;for(var f=0,g=this.max;g>f;f++){if(d=this._get(f),null==d)return!0;if(d.playState==a.PLAY_FINISHED||d.playState==a.PLAY_INTERRUPTED||d.playState==a.PLAY_FAILED){e=d;break}b!=a.INTERRUPT_NONE&&(b==a.INTERRUPT_EARLY&&d.position<e.position||b==a.INTERRUPT_LATE&&d.position>e.position)&&(e=d)}return null!=e?(e._interrupt(),this._remove(e),!0):!1},d.toString=function(){return"[Sound SoundChannel]"}}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(a,b,c,d){this.EventDispatcher_constructor(),this.src=a,this.uniqueId=-1,this.playState=null,this.delayTimeoutId=null,this._volume=1,Object.defineProperty(this,"volume",{get:this._getVolume,set:this._setVolume}),this._pan=0,Object.defineProperty(this,"pan",{get:this._getPan,set:this._setPan}),this._startTime=Math.max(0,b||0),Object.defineProperty(this,"startTime",{get:this._getStartTime,set:this._setStartTime}),this._duration=Math.max(0,c||0),Object.defineProperty(this,"duration",{get:this._getDuration,set:this._setDuration}),this._playbackResource=null,Object.defineProperty(this,"playbackResource",{get:this._getPlaybackResource,set:this._setPlaybackResource}),d!==!1&&d!==!0&&this._setPlaybackResource(d),this._position=0,Object.defineProperty(this,"position",{get:this._getPosition,set:this._setPosition}),this._loop=0,Object.defineProperty(this,"loop",{get:this._getLoop,set:this._setLoop}),this._muted=!1,Object.defineProperty(this,"muted",{get:this._getMuted,set:this._setMuted}),this._paused=!1,Object.defineProperty(this,"paused",{get:this._getPaused,set:this._setPaused})},b=createjs.extend(a,createjs.EventDispatcher);b.play=function(a){var b=createjs.PlayPropsConfig.create(a);return this.playState==createjs.Sound.PLAY_SUCCEEDED?(this.applyPlayProps(b),void(this._paused&&this._setPaused(!1))):(this._cleanUp(),createjs.Sound._playInstance(this,b),this)},b.stop=function(){return this._position=0,this._paused=!1,this._handleStop(),this._cleanUp(),this.playState=createjs.Sound.PLAY_FINISHED,this},b.destroy=function(){this._cleanUp(),this.src=null,this.playbackResource=null,this.removeAllEventListeners()},b.applyPlayProps=function(a){return null!=a.offset&&this._setPosition(a.offset),null!=a.loop&&this._setLoop(a.loop),null!=a.volume&&this._setVolume(a.volume),null!=a.pan&&this._setPan(a.pan),null!=a.startTime&&(this._setStartTime(a.startTime),this._setDuration(a.duration)),this},b.toString=function(){return"[AbstractSoundInstance]"},b._getPaused=function(){return this._paused},b._setPaused=function(a){return a!==!0&&a!==!1||this._paused==a||1==a&&this.playState!=createjs.Sound.PLAY_SUCCEEDED?void 0:(this._paused=a,a?this._pause():this._resume(),clearTimeout(this.delayTimeoutId),this)},b._setVolume=function(a){return a==this._volume?this:(this._volume=Math.max(0,Math.min(1,a)),this._muted||this._updateVolume(),this)},b._getVolume=function(){return this._volume},b._setMuted=function(a){return a===!0||a===!1?(this._muted=a,this._updateVolume(),this):void 0},b._getMuted=function(){return this._muted},b._setPan=function(a){return a==this._pan?this:(this._pan=Math.max(-1,Math.min(1,a)),this._updatePan(),this)},b._getPan=function(){return this._pan},b._getPosition=function(){return this._paused||this.playState!=createjs.Sound.PLAY_SUCCEEDED||(this._position=this._calculateCurrentPosition()),this._position},b._setPosition=function(a){return this._position=Math.max(0,a),this.playState==createjs.Sound.PLAY_SUCCEEDED&&this._updatePosition(),this},b._getStartTime=function(){return this._startTime},b._setStartTime=function(a){return a==this._startTime?this:(this._startTime=Math.max(0,a||0),this._updateStartTime(),this)},b._getDuration=function(){return this._duration},b._setDuration=function(a){return a==this._duration?this:(this._duration=Math.max(0,a||0),this._updateDuration(),this)},b._setPlaybackResource=function(a){return this._playbackResource=a,0==this._duration&&this._playbackResource&&this._setDurationFromSource(),this},b._getPlaybackResource=function(){return this._playbackResource},b._getLoop=function(){return this._loop},b._setLoop=function(a){null!=this._playbackResource&&(0!=this._loop&&0==a?this._removeLooping(a):0==this._loop&&0!=a&&this._addLooping(a)),this._loop=a},b._sendEvent=function(a){var b=new createjs.Event(a);this.dispatchEvent(b)},b._cleanUp=function(){clearTimeout(this.delayTimeoutId),this._handleCleanUp(),this._paused=!1,createjs.Sound._playFinished(this)},b._interrupt=function(){this._cleanUp(),this.playState=createjs.Sound.PLAY_INTERRUPTED,this._sendEvent("interrupted")},b._beginPlaying=function(a){return this._setPosition(a.offset),this._setLoop(a.loop),this._setVolume(a.volume),this._setPan(a.pan),null!=a.startTime&&(this._setStartTime(a.startTime),this._setDuration(a.duration)),null!=this._playbackResource&&this._position<this._duration?(this._paused=!1,this._handleSoundReady(),this.playState=createjs.Sound.PLAY_SUCCEEDED,this._sendEvent("succeeded"),!0):(this._playFailed(),!1)},b._playFailed=function(){this._cleanUp(),this.playState=createjs.Sound.PLAY_FAILED,this._sendEvent("failed")},b._handleSoundComplete=function(a){return this._position=0,0!=this._loop?(this._loop--,this._handleLoop(),void this._sendEvent("loop")):(this._cleanUp(),this.playState=createjs.Sound.PLAY_FINISHED,void this._sendEvent("complete"))},b._handleSoundReady=function(){},b._updateVolume=function(){},b._updatePan=function(){},b._updateStartTime=function(){},b._updateDuration=function(){},b._setDurationFromSource=function(){},b._calculateCurrentPosition=function(){},b._updatePosition=function(){},b._removeLooping=function(a){},b._addLooping=function(a){},b._pause=function(){},b._resume=function(){},b._handleStop=function(){},b._handleCleanUp=function(){},b._handleLoop=function(){},createjs.AbstractSoundInstance=createjs.promote(a,"EventDispatcher"),createjs.DefaultSoundInstance=createjs.AbstractSoundInstance}(),this.createjs=this.createjs||{},function(){"use strict";var a=function(){this._capabilities=null,this._loaders={},this._audioSources={},this._soundInstances={},this._volume=1,this._loaderClass,this._soundInstanceClass},b=a.prototype;a._capabilities=null,a.isSupported=function(){return!0},b.register=function(a){var b=this._loaders[a.src];return b&&!b.canceled?this._loaders[a.src]:(this._audioSources[a.src]=!0,this._soundInstances[a.src]=[],b=new this._loaderClass(a),b.on("complete",this._handlePreloadComplete,this),this._loaders[a.src]=b,b)},b.preload=function(a){a.on("error",this._handlePreloadError,this),a.load()},b.isPreloadStarted=function(a){return null!=this._audioSources[a]},b.isPreloadComplete=function(a){return!(null==this._audioSources[a]||1==this._audioSources[a])},b.removeSound=function(a){if(this._soundInstances[a]){for(var b=this._soundInstances[a].length;b--;){var c=this._soundInstances[a][b];c.destroy()}delete this._soundInstances[a],delete this._audioSources[a],this._loaders[a]&&this._loaders[a].destroy(),delete this._loaders[a]}},b.removeAllSounds=function(){for(var a in this._audioSources)this.removeSound(a)},b.create=function(a,b,c){this.isPreloadStarted(a)||this.preload(this.register(a));var d=new this._soundInstanceClass(a,b,c,this._audioSources[a]);return this._soundInstances[a]&&this._soundInstances[a].push(d),d.setMasterVolume&&d.setMasterVolume(createjs.Sound.volume),d.setMasterMute&&d.setMasterMute(createjs.Sound.muted),d},b.setVolume=function(a){return this._volume=a,this._updateVolume(),!0},b.getVolume=function(){return this._volume},b.setMute=function(a){return this._updateVolume(),!0},b.toString=function(){return"[AbstractPlugin]"},b._handlePreloadComplete=function(a){var b=a.target.getItem().src;this._audioSources[b]=a.result;for(var c=0,d=this._soundInstances[b].length;d>c;c++){var e=this._soundInstances[b][c];e.setPlaybackResource(this._audioSources[b]),this._soundInstances[b]=null}},b._handlePreloadError=function(a){},b._updateVolume=function(){},createjs.AbstractPlugin=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.AbstractLoader_constructor(a,!0,createjs.Types.SOUND)}var b=createjs.extend(a,createjs.AbstractLoader);a.context=null,b.toString=function(){return"[WebAudioLoader]"},b._createRequest=function(){this._request=new createjs.XHRRequest(this._item,!1),this._request.setResponseType("arraybuffer")},b._sendComplete=function(b){a.context.decodeAudioData(this._rawResult,createjs.proxy(this._handleAudioDecoded,this),createjs.proxy(this._sendError,this))},b._handleAudioDecoded=function(a){this._result=a,this.AbstractLoader__sendComplete()},createjs.WebAudioLoader=createjs.promote(a,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,d,e){this.AbstractSoundInstance_constructor(a,b,d,e),this.gainNode=c.context.createGain(),this.panNode=c.context.createPanner(),this.panNode.panningModel=c._panningModel,this.panNode.connect(this.gainNode),this._updatePan(),this.sourceNode=null,this._soundCompleteTimeout=null,this._sourceNodeNext=null,this._playbackStartTime=0,this._endedHandler=createjs.proxy(this._handleSoundComplete,this)}var b=createjs.extend(a,createjs.AbstractSoundInstance),c=a;c.context=null,c._scratchBuffer=null,c.destinationNode=null,c._panningModel="equalpower",b.destroy=function(){this.AbstractSoundInstance_destroy(),this.panNode.disconnect(0),this.panNode=null,this.gainNode.disconnect(0),this.gainNode=null},b.toString=function(){return"[WebAudioSoundInstance]"},b._updatePan=function(){this.panNode.setPosition(this._pan,0,-.5)},b._removeLooping=function(a){this._sourceNodeNext=this._cleanUpAudioNode(this._sourceNodeNext)},b._addLooping=function(a){this.playState==createjs.Sound.PLAY_SUCCEEDED&&(this._sourceNodeNext=this._createAndPlayAudioNode(this._playbackStartTime,0))},b._setDurationFromSource=function(){this._duration=1e3*this.playbackResource.duration},b._handleCleanUp=function(){this.sourceNode&&this.playState==createjs.Sound.PLAY_SUCCEEDED&&(this.sourceNode=this._cleanUpAudioNode(this.sourceNode),this._sourceNodeNext=this._cleanUpAudioNode(this._sourceNodeNext)),0!=this.gainNode.numberOfOutputs&&this.gainNode.disconnect(0),clearTimeout(this._soundCompleteTimeout),this._playbackStartTime=0},b._cleanUpAudioNode=function(a){if(a){if(a.stop(0),a.disconnect(0),createjs.BrowserDetect.isIOS)try{a.buffer=c._scratchBuffer}catch(b){}a=null}return a},b._handleSoundReady=function(a){this.gainNode.connect(c.destinationNode);var b=.001*this._duration,d=Math.min(.001*Math.max(0,this._position),b);this.sourceNode=this._createAndPlayAudioNode(c.context.currentTime-b,d),this._playbackStartTime=this.sourceNode.startTime-d,this._soundCompleteTimeout=setTimeout(this._endedHandler,1e3*(b-d)),0!=this._loop&&(this._sourceNodeNext=this._createAndPlayAudioNode(this._playbackStartTime,0))},b._createAndPlayAudioNode=function(a,b){var d=c.context.createBufferSource();d.buffer=this.playbackResource,d.connect(this.panNode);var e=.001*this._duration;return d.startTime=a+e,d.start(d.startTime,b+.001*this._startTime,e-b),d},b._pause=function(){this._position=1e3*(c.context.currentTime-this._playbackStartTime),this.sourceNode=this._cleanUpAudioNode(this.sourceNode),this._sourceNodeNext=this._cleanUpAudioNode(this._sourceNodeNext),0!=this.gainNode.numberOfOutputs&&this.gainNode.disconnect(0),clearTimeout(this._soundCompleteTimeout)},b._resume=function(){this._handleSoundReady()},b._updateVolume=function(){var a=this._muted?0:this._volume;a!=this.gainNode.gain.value&&(this.gainNode.gain.value=a)},b._calculateCurrentPosition=function(){return 1e3*(c.context.currentTime-this._playbackStartTime)},b._updatePosition=function(){this.sourceNode=this._cleanUpAudioNode(this.sourceNode),this._sourceNodeNext=this._cleanUpAudioNode(this._sourceNodeNext),clearTimeout(this._soundCompleteTimeout),this._paused||this._handleSoundReady()},b._handleLoop=function(){this._cleanUpAudioNode(this.sourceNode),this.sourceNode=this._sourceNodeNext,this._playbackStartTime=this.sourceNode.startTime,this._sourceNodeNext=this._createAndPlayAudioNode(this._playbackStartTime,0),this._soundCompleteTimeout=setTimeout(this._endedHandler,this._duration)},b._updateDuration=function(){this.playState==createjs.Sound.PLAY_SUCCEEDED&&(this._pause(),this._resume())},createjs.WebAudioSoundInstance=createjs.promote(a,"AbstractSoundInstance")}(),this.createjs=this.createjs||{},function(){"use strict";function a(){this.AbstractPlugin_constructor(),this._panningModel=c._panningModel,this.context=c.context,this.dynamicsCompressorNode=this.context.createDynamicsCompressor(),this.dynamicsCompressorNode.connect(this.context.destination),this.gainNode=this.context.createGain(),this.gainNode.connect(this.dynamicsCompressorNode),createjs.WebAudioSoundInstance.destinationNode=this.gainNode,this._capabilities=c._capabilities,this._loaderClass=createjs.WebAudioLoader,this._soundInstanceClass=createjs.WebAudioSoundInstance,this._addPropsToClasses()}var b=createjs.extend(a,createjs.AbstractPlugin),c=a;c._capabilities=null,c._panningModel="equalpower",c.context=null,c._scratchBuffer=null,c._unlocked=!1,c.DEFAULT_SAMPLE_RATE=44100,c.isSupported=function(){var a=createjs.BrowserDetect.isIOS||createjs.BrowserDetect.isAndroid||createjs.BrowserDetect.isBlackberry;return"file:"!=location.protocol||a||this._isFileXHRSupported()?(c._generateCapabilities(),null==c.context?!1:!0):!1},c.playEmptySound=function(){if(null!=c.context){var a=c.context.createBufferSource();a.buffer=c._scratchBuffer,a.connect(c.context.destination),a.start(0,0,0)}},c._isFileXHRSupported=function(){var a=!0,b=new XMLHttpRequest;try{b.open("GET","WebAudioPluginTest.fail",!1)}catch(c){return a=!1}b.onerror=function(){a=!1},b.onload=function(){a=404==this.status||200==this.status||0==this.status&&""!=this.response};try{b.send()}catch(c){a=!1}return a},c._generateCapabilities=function(){if(null==c._capabilities){var a=document.createElement("audio");if(null==a.canPlayType)return null;if(null==c.context&&(c.context=c._createAudioContext(),null==c.context))return null;null==c._scratchBuffer&&(c._scratchBuffer=c.context.createBuffer(1,1,22050)),c._compatibilitySetUp(),"ontouchstart"in window&&"running"!=c.context.state&&(c._unlock(),document.addEventListener("mousedown",c._unlock,!0),document.addEventListener("touchstart",c._unlock,!0),document.addEventListener("touchend",c._unlock,!0)),c._capabilities={panning:!0,volume:!0,tracks:-1};for(var b=createjs.Sound.SUPPORTED_EXTENSIONS,d=createjs.Sound.EXTENSION_MAP,e=0,f=b.length;f>e;e++){var g=b[e],h=d[g]||g;c._capabilities[g]="no"!=a.canPlayType("audio/"+g)&&""!=a.canPlayType("audio/"+g)||"no"!=a.canPlayType("audio/"+h)&&""!=a.canPlayType("audio/"+h)}c.context.destination.numberOfChannels<2&&(c._capabilities.panning=!1)}},c._createAudioContext=function(){var a=window.AudioContext||window.webkitAudioContext;if(null==a)return null;var b=new a;if(/(iPhone|iPad)/i.test(navigator.userAgent)&&b.sampleRate!==c.DEFAULT_SAMPLE_RATE){var d=b.createBuffer(1,1,c.DEFAULT_SAMPLE_RATE),e=b.createBufferSource();e.buffer=d,e.connect(b.destination),e.start(0),e.disconnect(),b.close(),b=new a}return b},c._compatibilitySetUp=function(){if(c._panningModel="equalpower",!c.context.createGain){c.context.createGain=c.context.createGainNode;var a=c.context.createBufferSource();a.__proto__.start=a.__proto__.noteGrainOn,a.__proto__.stop=a.__proto__.noteOff,c._panningModel=0}},c._unlock=function(){c._unlocked||(c.playEmptySound(),"running"==c.context.state&&(document.removeEventListener("mousedown",c._unlock,!0),document.removeEventListener("touchend",c._unlock,!0),document.removeEventListener("touchstart",c._unlock,!0),c._unlocked=!0))},b.toString=function(){return"[WebAudioPlugin]"},b._addPropsToClasses=function(){var a=this._soundInstanceClass;a.context=this.context,a._scratchBuffer=c._scratchBuffer,a.destinationNode=this.gainNode,a._panningModel=this._panningModel,this._loaderClass.context=this.context},b._updateVolume=function(){var a=createjs.Sound._masterMute?0:this._volume;a!=this.gainNode.gain.value&&(this.gainNode.gain.value=a)},createjs.WebAudioPlugin=createjs.promote(a,"AbstractPlugin")}(),this.createjs=this.createjs||{},function(){"use strict";function a(){throw"HTMLAudioTagPool cannot be instantiated"}function b(a){this._tags=[]}var c=a;c._tags={},c._tagPool=new b,c._tagUsed={},c.get=function(a){var b=c._tags[a];return null==b?(b=c._tags[a]=c._tagPool.get(),b.src=a):c._tagUsed[a]?(b=c._tagPool.get(),b.src=a):c._tagUsed[a]=!0,b},c.set=function(a,b){b==c._tags[a]?c._tagUsed[a]=!1:c._tagPool.set(b)},c.remove=function(a){var b=c._tags[a];return null==b?!1:(c._tagPool.set(b),delete c._tags[a],delete c._tagUsed[a],!0)},c.getDuration=function(a){var b=c._tags[a];return null!=b&&b.duration?1e3*b.duration:0},createjs.HTMLAudioTagPool=a;var d=b.prototype;d.constructor=b,d.get=function(){var a;return a=0==this._tags.length?this._createTag():this._tags.pop(),null==a.parentNode&&document.body.appendChild(a),a},d.set=function(a){var b=createjs.indexOf(this._tags,a);-1==b&&(this._tags.src=null,this._tags.push(a))},d.toString=function(){return"[TagPool]"},d._createTag=function(){var a=document.createElement("audio");return a.autoplay=!1,a.preload="none",a}}(),this.createjs=this.createjs||{},function(){"use strict";function a(a,b,c,d){this.AbstractSoundInstance_constructor(a,b,c,d),this._audioSpriteStopTime=null,this._delayTimeoutId=null,this._endedHandler=createjs.proxy(this._handleSoundComplete,this),this._readyHandler=createjs.proxy(this._handleTagReady,this),this._stalledHandler=createjs.proxy(this._playFailed,this),this._audioSpriteEndHandler=createjs.proxy(this._handleAudioSpriteLoop,this),this._loopHandler=createjs.proxy(this._handleSoundComplete,this),c?this._audioSpriteStopTime=.001*(b+c):this._duration=createjs.HTMLAudioTagPool.getDuration(this.src)}var b=createjs.extend(a,createjs.AbstractSoundInstance);b.setMasterVolume=function(a){this._updateVolume()},b.setMasterMute=function(a){this._updateVolume()},b.toString=function(){return"[HTMLAudioSoundInstance]"},b._removeLooping=function(){null!=this._playbackResource&&(this._playbackResource.loop=!1,this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this._loopHandler,!1))},b._addLooping=function(){null==this._playbackResource||this._audioSpriteStopTime||(this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this._loopHandler,!1),this._playbackResource.loop=!0)},b._handleCleanUp=function(){var a=this._playbackResource;if(null!=a){a.pause(),a.loop=!1,a.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED,this._endedHandler,!1),a.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_READY,this._readyHandler,!1),a.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED,this._stalledHandler,!1),a.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this._loopHandler,!1),a.removeEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE,this._audioSpriteEndHandler,!1);try{a.currentTime=this._startTime}catch(b){}createjs.HTMLAudioTagPool.set(this.src,a),this._playbackResource=null}},b._beginPlaying=function(a){return this._playbackResource=createjs.HTMLAudioTagPool.get(this.src),this.AbstractSoundInstance__beginPlaying(a)},b._handleSoundReady=function(a){if(4!==this._playbackResource.readyState){var b=this._playbackResource;return b.addEventListener(createjs.HTMLAudioPlugin._AUDIO_READY,this._readyHandler,!1),b.addEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED,this._stalledHandler,!1),b.preload="auto",void b.load()}this._updateVolume(),this._playbackResource.currentTime=.001*(this._startTime+this._position),this._audioSpriteStopTime?this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE,this._audioSpriteEndHandler,!1):(this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED,this._endedHandler,!1),0!=this._loop&&(this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this._loopHandler,!1),this._playbackResource.loop=!0)),this._playbackResource.play()},b._handleTagReady=function(a){this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_READY,this._readyHandler,!1),this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED,this._stalledHandler,!1),this._handleSoundReady()},b._pause=function(){this._playbackResource.pause()},b._resume=function(){this._playbackResource.play()},b._updateVolume=function(){if(null!=this._playbackResource){var a=this._muted||createjs.Sound._masterMute?0:this._volume*createjs.Sound._masterVolume;a!=this._playbackResource.volume&&(this._playbackResource.volume=a)}},b._calculateCurrentPosition=function(){return 1e3*this._playbackResource.currentTime-this._startTime},b._updatePosition=function(){this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this._loopHandler,!1),this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this._handleSetPositionSeek,!1);try{this._playbackResource.currentTime=.001*(this._position+this._startTime)}catch(a){this._handleSetPositionSeek(null)}},b._handleSetPositionSeek=function(a){null!=this._playbackResource&&(this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this._handleSetPositionSeek,!1),this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this._loopHandler,!1))},b._handleAudioSpriteLoop=function(a){this._playbackResource.currentTime<=this._audioSpriteStopTime||(this._playbackResource.pause(),0==this._loop?this._handleSoundComplete(null):(this._position=0,this._loop--,this._playbackResource.currentTime=.001*this._startTime,this._paused||this._playbackResource.play(),this._sendEvent("loop")))},b._handleLoop=function(a){0==this._loop&&(this._playbackResource.loop=!1,this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this._loopHandler,!1))},b._updateStartTime=function(){this._audioSpriteStopTime=.001*(this._startTime+this._duration),this.playState==createjs.Sound.PLAY_SUCCEEDED&&(this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED,this._endedHandler,!1),this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE,this._audioSpriteEndHandler,!1))},b._updateDuration=function(){this._audioSpriteStopTime=.001*(this._startTime+this._duration),this.playState==createjs.Sound.PLAY_SUCCEEDED&&(this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED,this._endedHandler,!1),this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE,this._audioSpriteEndHandler,!1))},b._setDurationFromSource=function(){this._duration=createjs.HTMLAudioTagPool.getDuration(this.src),this._playbackResource=null},createjs.HTMLAudioSoundInstance=createjs.promote(a,"AbstractSoundInstance")}(),this.createjs=this.createjs||{},function(){"use strict";function a(){this.AbstractPlugin_constructor(),this._capabilities=c._capabilities,this._loaderClass=createjs.SoundLoader,this._soundInstanceClass=createjs.HTMLAudioSoundInstance}var b=createjs.extend(a,createjs.AbstractPlugin),c=a;c.MAX_INSTANCES=30,c._AUDIO_READY="canplaythrough",c._AUDIO_ENDED="ended",c._AUDIO_SEEKED="seeked",c._AUDIO_STALLED="stalled",c._TIME_UPDATE="timeupdate",c._capabilities=null,c.isSupported=function(){return c._generateCapabilities(),null!=c._capabilities},c._generateCapabilities=function(){if(null==c._capabilities){var a=document.createElement("audio");if(null==a.canPlayType)return null;c._capabilities={panning:!1,volume:!0,tracks:-1};for(var b=createjs.Sound.SUPPORTED_EXTENSIONS,d=createjs.Sound.EXTENSION_MAP,e=0,f=b.length;f>e;e++){var g=b[e],h=d[g]||g;c._capabilities[g]="no"!=a.canPlayType("audio/"+g)&&""!=a.canPlayType("audio/"+g)||"no"!=a.canPlayType("audio/"+h)&&""!=a.canPlayType("audio/"+h)}}},b.register=function(a){var b=createjs.HTMLAudioTagPool.get(a.src),c=this.AbstractPlugin_register(a);return c.setTag(b),c},b.removeSound=function(a){this.AbstractPlugin_removeSound(a),createjs.HTMLAudioTagPool.remove(a)},b.create=function(a,b,c){var d=this.AbstractPlugin_create(a,b,c);return d.playbackResource=null,d},b.toString=function(){return"[HTMLAudioPlugin]"},b.setVolume=b.getVolume=b.setMute=null,createjs.HTMLAudioPlugin=createjs.promote(a,"AbstractPlugin")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.EventDispatcher_constructor(),this.ignoreGlobalPause=!1,this.loop=0,this.useTicks=!1,this.reversed=!1,this.bounce=!1,this.timeScale=1,this.duration=0,this.position=0,this.rawPosition=-1,this._paused=!0,this._next=null,this._prev=null,this._parent=null,this._labels=null,this._labelList=null,a&&(this.useTicks=!!a.useTicks,this.ignoreGlobalPause=!!a.ignoreGlobalPause,this.loop=a.loop===!0?-1:a.loop||0,this.reversed=!!a.reversed,this.bounce=!!a.bounce,this.timeScale=a.timeScale||1,a.onChange&&this.addEventListener("change",a.onChange),a.onComplete&&this.addEventListener("complete",a.onComplete))}var b=createjs.extend(a,createjs.EventDispatcher);b._setPaused=function(a){return createjs.Tween._register(this,a),this},b.setPaused=createjs.deprecate(b._setPaused,"AbstractTween.setPaused"),b._getPaused=function(){return this._paused},b.getPaused=createjs.deprecate(b._getPaused,"AbstactTween.getPaused"),b._getCurrentLabel=function(a){var b=this.getLabels();null==a&&(a=this.position);for(var c=0,d=b.length;d>c&&!(a<b[c].position);c++);return 0===c?null:b[c-1].label},b.getCurrentLabel=createjs.deprecate(b._getCurrentLabel,"AbstractTween.getCurrentLabel");try{Object.defineProperties(b,{paused:{set:b._setPaused,get:b._getPaused},currentLabel:{get:b._getCurrentLabel}})}catch(c){}b.advance=function(a,b){this.setPosition(this.rawPosition+a*this.timeScale,b)},b.setPosition=function(a,b,c,d){var e=this.duration,f=this.loop,g=this.rawPosition,h=0,i=0,j=!1;if(0>a&&(a=0),0===e){if(j=!0,-1!==g)return j}else{if(h=a/e|0,i=a-h*e,j=-1!==f&&a>=f*e+e,j&&(a=(i=e)*(h=f)+e),a===g)return j;var k=!this.reversed!=!(this.bounce&&h%2);k&&(i=e-i)}this.position=i,this.rawPosition=a,this._updatePosition(c,j),j&&(this.paused=!0),d&&d(this),b||this._runActions(g,a,c,!c&&-1===g),this.dispatchEvent("change"),j&&this.dispatchEvent("complete");
},b.calculatePosition=function(a){var b=this.duration,c=this.loop,d=0,e=0;if(0===b)return 0;-1!==c&&a>=c*b+b?(e=b,d=c):0>a?e=0:(d=a/b|0,e=a-d*b);var f=!this.reversed!=!(this.bounce&&d%2);return f?b-e:e},b.getLabels=function(){var a=this._labelList;if(!a){a=this._labelList=[];var b=this._labels;for(var c in b)a.push({label:c,position:b[c]});a.sort(function(a,b){return a.position-b.position})}return a},b.setLabels=function(a){this._labels=a,this._labelList=null},b.addLabel=function(a,b){this._labels||(this._labels={}),this._labels[a]=b;var c=this._labelList;if(c){for(var d=0,e=c.length;e>d&&!(b<c[d].position);d++);c.splice(d,0,{label:a,position:b})}},b.gotoAndPlay=function(a){this.paused=!1,this._goto(a)},b.gotoAndStop=function(a){this.paused=!0,this._goto(a)},b.resolve=function(a){var b=Number(a);return isNaN(b)&&(b=this._labels&&this._labels[a]),b},b.toString=function(){return"[AbstractTween]"},b.clone=function(){throw"AbstractTween can not be cloned."},b._init=function(a){a&&a.paused||(this.paused=!1),a&&null!=a.position&&this.setPosition(a.position)},b._updatePosition=function(a,b){},b._goto=function(a){var b=this.resolve(a);null!=b&&this.setPosition(b,!1,!0)},b._runActions=function(a,b,c,d){if(this._actionHead||this.tweens){var e,f,g,h,i=this.duration,j=this.reversed,k=this.bounce,l=this.loop;if(0===i?(e=f=g=h=0,j=k=!1):(e=a/i|0,f=b/i|0,g=a-e*i,h=b-f*i),-1!==l&&(f>l&&(h=i,f=l),e>l&&(g=i,e=l)),c)return this._runActionsRange(h,h,c,d);if(e!==f||g!==h||c||d){-1===e&&(e=g=0);var m=b>=a,n=e;do{var o=!j!=!(k&&n%2),p=n===e?g:m?0:i,q=n===f?h:m?i:0;if(o&&(p=i-p,q=i-q),k&&n!==e&&p===q);else if(this._runActionsRange(p,q,c,d||n!==e&&!k))return!0;d=!1}while(m&&++n<=f||!m&&--n>=f)}}},b._runActionsRange=function(a,b,c,d){},createjs.AbstractTween=createjs.promote(a,"EventDispatcher")}(),this.createjs=this.createjs||{},function(){"use strict";function a(c,d){this.AbstractTween_constructor(d),this.pluginData=null,this.target=c,this.passive=!1,this._stepHead=new b(null,0,0,{},null,!0),this._stepTail=this._stepHead,this._stepPosition=0,this._actionHead=null,this._actionTail=null,this._plugins=null,this._pluginIds=null,this._injected=null,d&&(this.pluginData=d.pluginData,d.override&&a.removeTweens(c)),this.pluginData||(this.pluginData={}),this._init(d)}function b(a,b,c,d,e,f){this.next=null,this.prev=a,this.t=b,this.d=c,this.props=d,this.ease=e,this.passive=f,this.index=a?a.index+1:0}function c(a,b,c,d,e){this.next=null,this.prev=a,this.t=b,this.d=0,this.scope=c,this.funct=d,this.params=e}var d=createjs.extend(a,createjs.AbstractTween);a.IGNORE={},a._tweens=[],a._plugins=null,a._tweenHead=null,a._tweenTail=null,a.get=function(b,c){return new a(b,c)},a.tick=function(b,c){for(var d=a._tweenHead;d;){var e=d._next;c&&!d.ignoreGlobalPause||d._paused||d.advance(d.useTicks?1:b),d=e}},a.handleEvent=function(a){"tick"===a.type&&this.tick(a.delta,a.paused)},a.removeTweens=function(b){if(b.tweenjs_count){for(var c=a._tweenHead;c;){var d=c._next;c.target===b&&a._register(c,!0),c=d}b.tweenjs_count=0}},a.removeAllTweens=function(){for(var b=a._tweenHead;b;){var c=b._next;b._paused=!0,b.target&&(b.target.tweenjs_count=0),b._next=b._prev=null,b=c}a._tweenHead=a._tweenTail=null},a.hasActiveTweens=function(b){return b?!!b.tweenjs_count:!!a._tweenHead},a._installPlugin=function(b){for(var c=b.priority=b.priority||0,d=a._plugins=a._plugins||[],e=0,f=d.length;f>e&&!(c<d[e].priority);e++);d.splice(e,0,b)},a._register=function(b,c){var d=b.target;if(!c&&b._paused){d&&(d.tweenjs_count=d.tweenjs_count?d.tweenjs_count+1:1);var e=a._tweenTail;e?(a._tweenTail=e._next=b,b._prev=e):a._tweenHead=a._tweenTail=b,!a._inited&&createjs.Ticker&&(createjs.Ticker.addEventListener("tick",a),a._inited=!0)}else if(c&&!b._paused){d&&d.tweenjs_count--;var f=b._next,g=b._prev;f?f._prev=g:a._tweenTail=g,g?g._next=f:a._tweenHead=f,b._next=b._prev=null}b._paused=c},d.wait=function(a,b){return a>0&&this._addStep(+a,this._stepTail.props,null,b),this},d.to=function(a,b,c){(null==b||0>b)&&(b=0);var d=this._addStep(+b,null,c);return this._appendProps(a,d),this},d.label=function(a){return this.addLabel(a,this.duration),this},d.call=function(a,b,c){return this._addAction(c||this.target,a,b||[this])},d.set=function(a,b){return this._addAction(b||this.target,this._set,[a])},d.play=function(a){return this._addAction(a||this,this._set,[{paused:!1}])},d.pause=function(a){return this._addAction(a||this,this._set,[{paused:!0}])},d.w=d.wait,d.t=d.to,d.c=d.call,d.s=d.set,d.toString=function(){return"[Tween]"},d.clone=function(){throw"Tween can not be cloned."},d._addPlugin=function(a){var b=this._pluginIds||(this._pluginIds={}),c=a.ID;if(c&&!b[c]){b[c]=!0;for(var d=this._plugins||(this._plugins=[]),e=a.priority||0,f=0,g=d.length;g>f;f++)if(e<d[f].priority)return void d.splice(f,0,a);d.push(a)}},d._updatePosition=function(a,b){var c=this._stepHead.next,d=this.position,e=this.duration;if(this.target&&c){for(var f=c.next;f&&f.t<=d;)c=c.next,f=c.next;var g=b?0===e?1:d/e:(d-c.t)/c.d;this._updateTargetProps(c,g,b)}this._stepPosition=c?d-c.t:0},d._updateTargetProps=function(b,c,d){if(!(this.passive=!!b.passive)){var e,f,g,h,i=b.prev.props,j=b.props;(h=b.ease)&&(c=h(c,0,1,1));var k=this._plugins;a:for(var l in i){if(f=i[l],g=j[l],e=f!==g&&"number"==typeof f?f+(g-f)*c:c>=1?g:f,k)for(var m=0,n=k.length;n>m;m++){var o=k[m].change(this,b,l,e,c,d);if(o===a.IGNORE)continue a;void 0!==o&&(e=o)}this.target[l]=e}}},d._runActionsRange=function(a,b,c,d){var e=a>b,f=e?this._actionTail:this._actionHead,g=b,h=a;e&&(g=a,h=b);for(var i=this.position;f;){var j=f.t;if((j===b||j>h&&g>j||d&&j===a)&&(f.funct.apply(f.scope,f.params),i!==this.position))return!0;f=e?f.prev:f.next}},d._appendProps=function(b,c,d){var e,f,g,h,i,j=this._stepHead.props,k=this.target,l=a._plugins,m=c.prev,n=m.props,o=c.props||(c.props=this._cloneProps(n)),p={};for(e in b)if(b.hasOwnProperty(e)&&(p[e]=o[e]=b[e],void 0===j[e])){if(h=void 0,l)for(f=l.length-1;f>=0;f--)if(g=l[f].init(this,e,h),void 0!==g&&(h=g),h===a.IGNORE){delete o[e],delete p[e];break}h!==a.IGNORE&&(void 0===h&&(h=k[e]),n[e]=void 0===h?null:h)}for(e in p){g=b[e];for(var q,r=m;(q=r)&&(r=q.prev);)if(r.props!==q.props){if(void 0!==r.props[e])break;r.props[e]=n[e]}}if(d!==!1&&(l=this._plugins))for(f=l.length-1;f>=0;f--)l[f].step(this,c,p);(i=this._injected)&&(this._injected=null,this._appendProps(i,c,!1))},d._injectProp=function(a,b){var c=this._injected||(this._injected={});c[a]=b},d._addStep=function(a,c,d,e){var f=new b(this._stepTail,this.duration,a,c,d,e||!1);return this.duration+=a,this._stepTail=this._stepTail.next=f},d._addAction=function(a,b,d){var e=new c(this._actionTail,this.duration,a,b,d);return this._actionTail?this._actionTail.next=e:this._actionHead=e,this._actionTail=e,this},d._set=function(a){for(var b in a)this[b]=a[b]},d._cloneProps=function(a){var b={};for(var c in a)b[c]=a[c];return b},createjs.Tween=createjs.promote(a,"AbstractTween")}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){var b,c;a instanceof Array||null==a&&arguments.length>1?(b=a,c=arguments[1],a=arguments[2]):a&&(b=a.tweens,c=a.labels),this.AbstractTween_constructor(a),this.tweens=[],b&&this.addTween.apply(this,b),this.setLabels(c),this._init(a)}var b=createjs.extend(a,createjs.AbstractTween);b.addTween=function(a){a._parent&&a._parent.removeTween(a);var b=arguments.length;if(b>1){for(var c=0;b>c;c++)this.addTween(arguments[c]);return arguments[b-1]}if(0===b)return null;this.tweens.push(a),a._parent=this,a.paused=!0;var d=a.duration;return a.loop>0&&(d*=a.loop+1),d>this.duration&&(this.duration=d),this.rawPosition>=0&&a.setPosition(this.rawPosition),a},b.removeTween=function(a){var b=arguments.length;if(b>1){for(var c=!0,d=0;b>d;d++)c=c&&this.removeTween(arguments[d]);return c}if(0===b)return!0;for(var e=this.tweens,d=e.length;d--;)if(e[d]===a)return e.splice(d,1),a._parent=null,a.duration>=this.duration&&this.updateDuration(),!0;return!1},b.updateDuration=function(){this.duration=0;for(var a=0,b=this.tweens.length;b>a;a++){var c=this.tweens[a],d=c.duration;c.loop>0&&(d*=c.loop+1),d>this.duration&&(this.duration=d)}},b.toString=function(){return"[Timeline]"},b.clone=function(){throw"Timeline can not be cloned."},b._updatePosition=function(a,b){for(var c=this.position,d=0,e=this.tweens.length;e>d;d++)this.tweens[d].setPosition(c,!0,a)},b._runActionsRange=function(a,b,c,d){for(var e=this.position,f=0,g=this.tweens.length;g>f;f++)if(this.tweens[f]._runActions(a,b,c,d),e!==this.position)return!0},createjs.Timeline=createjs.promote(a,"AbstractTween")}(),this.createjs=this.createjs||{},function(){"use strict";function a(){throw"Ease cannot be instantiated."}a.linear=function(a){return a},a.none=a.linear,a.get=function(a){return-1>a?a=-1:a>1&&(a=1),function(b){return 0==a?b:0>a?b*(b*-a+1+a):b*((2-b)*a+(1-a))}},a.getPowIn=function(a){return function(b){return Math.pow(b,a)}},a.getPowOut=function(a){return function(b){return 1-Math.pow(1-b,a)}},a.getPowInOut=function(a){return function(b){return(b*=2)<1?.5*Math.pow(b,a):1-.5*Math.abs(Math.pow(2-b,a))}},a.quadIn=a.getPowIn(2),a.quadOut=a.getPowOut(2),a.quadInOut=a.getPowInOut(2),a.cubicIn=a.getPowIn(3),a.cubicOut=a.getPowOut(3),a.cubicInOut=a.getPowInOut(3),a.quartIn=a.getPowIn(4),a.quartOut=a.getPowOut(4),a.quartInOut=a.getPowInOut(4),a.quintIn=a.getPowIn(5),a.quintOut=a.getPowOut(5),a.quintInOut=a.getPowInOut(5),a.sineIn=function(a){return 1-Math.cos(a*Math.PI/2)},a.sineOut=function(a){return Math.sin(a*Math.PI/2)},a.sineInOut=function(a){return-.5*(Math.cos(Math.PI*a)-1)},a.getBackIn=function(a){return function(b){return b*b*((a+1)*b-a)}},a.backIn=a.getBackIn(1.7),a.getBackOut=function(a){return function(b){return--b*b*((a+1)*b+a)+1}},a.backOut=a.getBackOut(1.7),a.getBackInOut=function(a){return a*=1.525,function(b){return(b*=2)<1?.5*(b*b*((a+1)*b-a)):.5*((b-=2)*b*((a+1)*b+a)+2)}},a.backInOut=a.getBackInOut(1.7),a.circIn=function(a){return-(Math.sqrt(1-a*a)-1)},a.circOut=function(a){return Math.sqrt(1- --a*a)},a.circInOut=function(a){return(a*=2)<1?-.5*(Math.sqrt(1-a*a)-1):.5*(Math.sqrt(1-(a-=2)*a)+1)},a.bounceIn=function(b){return 1-a.bounceOut(1-b)},a.bounceOut=function(a){return 1/2.75>a?7.5625*a*a:2/2.75>a?7.5625*(a-=1.5/2.75)*a+.75:2.5/2.75>a?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375},a.bounceInOut=function(b){return.5>b?.5*a.bounceIn(2*b):.5*a.bounceOut(2*b-1)+.5},a.getElasticIn=function(a,b){var c=2*Math.PI;return function(d){if(0==d||1==d)return d;var e=b/c*Math.asin(1/a);return-(a*Math.pow(2,10*(d-=1))*Math.sin((d-e)*c/b))}},a.elasticIn=a.getElasticIn(1,.3),a.getElasticOut=function(a,b){var c=2*Math.PI;return function(d){if(0==d||1==d)return d;var e=b/c*Math.asin(1/a);return a*Math.pow(2,-10*d)*Math.sin((d-e)*c/b)+1}},a.elasticOut=a.getElasticOut(1,.3),a.getElasticInOut=function(a,b){var c=2*Math.PI;return function(d){var e=b/c*Math.asin(1/a);return(d*=2)<1?-.5*(a*Math.pow(2,10*(d-=1))*Math.sin((d-e)*c/b)):a*Math.pow(2,-10*(d-=1))*Math.sin((d-e)*c/b)*.5+1}},a.elasticInOut=a.getElasticInOut(1,.3*1.5),createjs.Ease=a}(),this.createjs=this.createjs||{},function(){"use strict";function a(){throw"MotionGuidePlugin cannot be instantiated."}var b=a;b.priority=0,b.ID="MotionGuide",b.install=function(){return createjs.Tween._installPlugin(a),createjs.Tween.IGNORE},b.init=function(a,c,d){"guide"==c&&a._addPlugin(b)},b.step=function(a,c,d){for(var e in d)if("guide"===e){var f=c.props.guide,g=b._solveGuideData(d.guide,f);f.valid=!g;var h=f.endData;if(a._injectProp("x",h.x),a._injectProp("y",h.y),g||!f.orient)break;var i=void 0===c.prev.props.rotation?a.target.rotation||0:c.prev.props.rotation;if(f.startOffsetRot=i-f.startData.rotation,"fixed"==f.orient)f.endAbsRot=h.rotation+f.startOffsetRot,f.deltaRotation=0;else{var j=void 0===d.rotation?a.target.rotation||0:d.rotation,k=j-f.endData.rotation-f.startOffsetRot,l=k%360;switch(f.endAbsRot=j,f.orient){case"auto":f.deltaRotation=k;break;case"cw":f.deltaRotation=(l+360)%360+360*Math.abs(k/360|0);break;case"ccw":f.deltaRotation=(l-360)%360+-360*Math.abs(k/360|0)}}a._injectProp("rotation",f.endAbsRot)}},b.change=function(a,c,d,e,f,g){var h=c.props.guide;if(h&&c.props!==c.prev.props&&h!==c.prev.props.guide)return"guide"===d&&!h.valid||"x"==d||"y"==d||"rotation"===d&&h.orient?createjs.Tween.IGNORE:void b._ratioToPositionData(f,h,a.target)},b.debug=function(a,c,d){a=a.guide||a;var e=b._findPathProblems(a);if(e&&console.error("MotionGuidePlugin Error found: \n"+e),!c)return e;var f,g=a.path,h=g.length,i=3,j=9;for(c.save(),c.lineCap="round",c.lineJoin="miter",c.beginPath(),c.moveTo(g[0],g[1]),f=2;h>f;f+=4)c.quadraticCurveTo(g[f],g[f+1],g[f+2],g[f+3]);c.strokeStyle="black",c.lineWidth=1.5*i,c.stroke(),c.strokeStyle="white",c.lineWidth=i,c.stroke(),c.closePath();var k=d.length;if(d&&k){var l={},m={};b._solveGuideData(a,l);for(var f=0;k>f;f++)l.orient="fixed",b._ratioToPositionData(d[f],l,m),c.beginPath(),c.moveTo(m.x,m.y),c.lineTo(m.x+Math.cos(.0174533*m.rotation)*j,m.y+Math.sin(.0174533*m.rotation)*j),c.strokeStyle="black",c.lineWidth=1.5*i,c.stroke(),c.strokeStyle="red",c.lineWidth=i,c.stroke(),c.closePath()}return c.restore(),e},b._solveGuideData=function(a,c){var d=void 0;if(d=b.debug(a))return d;var e=c.path=a.path;c.orient=a.orient;c.subLines=[],c.totalLength=0,c.startOffsetRot=0,c.deltaRotation=0,c.startData={ratio:0},c.endData={ratio:1},c.animSpan=1;var f,g,h,i,j,k,l,m,n,o=e.length,p=10,q={};for(f=e[0],g=e[1],l=2;o>l;l+=4){h=e[l],i=e[l+1],j=e[l+2],k=e[l+3];var r={weightings:[],estLength:0,portion:0},s=f,t=g;for(m=1;p>=m;m++){b._getParamsForCurve(f,g,h,i,j,k,m/p,!1,q);var u=q.x-s,v=q.y-t;n=Math.sqrt(u*u+v*v),r.weightings.push(n),r.estLength+=n,s=q.x,t=q.y}for(c.totalLength+=r.estLength,m=0;p>m;m++)n=r.estLength,r.weightings[m]=r.weightings[m]/n;c.subLines.push(r),f=j,g=k}n=c.totalLength;var w=c.subLines.length;for(l=0;w>l;l++)c.subLines[l].portion=c.subLines[l].estLength/n;var x=isNaN(a.start)?0:a.start,y=isNaN(a.end)?1:a.end;b._ratioToPositionData(x,c,c.startData),b._ratioToPositionData(y,c,c.endData),c.startData.ratio=x,c.endData.ratio=y,c.animSpan=c.endData.ratio-c.startData.ratio},b._ratioToPositionData=function(a,c,d){var e,f,g,h,i,j=c.subLines,k=0,l=10,m=a*c.animSpan+c.startData.ratio;for(f=j.length,e=0;f>e;e++){if(h=j[e].portion,k+h>=m){i=e;break}k+=h}void 0===i&&(i=f-1,k-=h);var n=j[i].weightings,o=h;for(f=n.length,e=0;f>e&&(h=n[e]*o,!(k+h>=m));e++)k+=h;i=4*i+2,g=e/l+(m-k)/h*(1/l);var p=c.path;return b._getParamsForCurve(p[i-2],p[i-1],p[i],p[i+1],p[i+2],p[i+3],g,c.orient,d),c.orient&&(a>=.99999&&1.00001>=a&&void 0!==c.endAbsRot?d.rotation=c.endAbsRot:d.rotation+=c.startOffsetRot+a*c.deltaRotation),d},b._getParamsForCurve=function(a,b,c,d,e,f,g,h,i){var j=1-g;i.x=j*j*a+2*j*g*c+g*g*e,i.y=j*j*b+2*j*g*d+g*g*f,h&&(i.rotation=57.2957795*Math.atan2((d-b)*j+(f-d)*g,(c-a)*j+(e-c)*g))},b._findPathProblems=function(a){var b=a.path,c=b&&b.length||0;if(6>c||(c-2)%4){var d="	Cannot parse 'path' array due to invalid number of entries in path. ";return d+="There should be an odd number of points, at least 3 points, and 2 entries per point (x & y). ",d+="See 'CanvasRenderingContext2D.quadraticCurveTo' for details as 'path' models a quadratic bezier.\n\n",d+="Only [ "+c+" ] values found. Expected: "+Math.max(4*Math.ceil((c-2)/4)+2,6)}for(var e=0;c>e;e++)if(isNaN(b[e]))return"All data in path array must be numeric";var f=a.start;if(isNaN(f)&&void 0!==f)return"'start' out of bounds. Expected 0 to 1, got: "+f;var g=a.end;if(isNaN(g)&&void 0!==g)return"'end' out of bounds. Expected 0 to 1, got: "+g;var h=a.orient;return h&&"fixed"!=h&&"auto"!=h&&"cw"!=h&&"ccw"!=h?'Invalid orientation value. Expected ["fixed", "auto", "cw", "ccw", undefined], got: '+h:void 0},createjs.MotionGuidePlugin=a}(),this.createjs=this.createjs||{},function(){"use strict";var a=createjs.TweenJS=createjs.TweenJS||{};a.version="NEXT",a.buildDate="Thu, 14 Sep 2017 22:19:45 GMT"}();

}.call(window));

/*** EXPORTS FROM exports-loader ***/
module.exports = window.createjs;


/***/ }),

/***/ "./node_modules/html-entities/lib/index.js":
/*!*************************************************!*\
  !*** ./node_modules/html-entities/lib/index.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var named_references_1 = __webpack_require__(/*! ./named-references */ "./node_modules/html-entities/lib/named-references.js");
var numeric_unicode_map_1 = __webpack_require__(/*! ./numeric-unicode-map */ "./node_modules/html-entities/lib/numeric-unicode-map.js");
var surrogate_pairs_1 = __webpack_require__(/*! ./surrogate-pairs */ "./node_modules/html-entities/lib/surrogate-pairs.js");
var allNamedReferences = __assign(__assign({}, named_references_1.namedReferences), { all: named_references_1.namedReferences.html5 });
var encodeRegExps = {
    specialChars: /[<>'"&]/g,
    nonAscii: /(?:[<>'"&\u0080-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
    nonAsciiPrintable: /(?:[<>'"&\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
    extensive: /(?:[\x01-\x0c\x0e-\x1f\x21-\x2c\x2e-\x2f\x3a-\x40\x5b-\x60\x7b-\x7d\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g
};
var defaultEncodeOptions = {
    mode: 'specialChars',
    level: 'all',
    numeric: 'decimal'
};
/** Encodes all the necessary (specified by `level`) characters in the text */
function encode(text, _a) {
    var _b = _a === void 0 ? defaultEncodeOptions : _a, _c = _b.mode, mode = _c === void 0 ? 'specialChars' : _c, _d = _b.numeric, numeric = _d === void 0 ? 'decimal' : _d, _e = _b.level, level = _e === void 0 ? 'all' : _e;
    if (!text) {
        return '';
    }
    var encodeRegExp = encodeRegExps[mode];
    var references = allNamedReferences[level].characters;
    var isHex = numeric === 'hexadecimal';
    encodeRegExp.lastIndex = 0;
    var _b = encodeRegExp.exec(text);
    var _c;
    if (_b) {
        _c = '';
        var _d = 0;
        do {
            if (_d !== _b.index) {
                _c += text.substring(_d, _b.index);
            }
            var _e = _b[0];
            var result_1 = references[_e];
            if (!result_1) {
                var code_1 = _e.length > 1 ? surrogate_pairs_1.getCodePoint(_e, 0) : _e.charCodeAt(0);
                result_1 = (isHex ? '&#x' + code_1.toString(16) : '&#' + code_1) + ';';
            }
            _c += result_1;
            _d = _b.index + _e.length;
        } while ((_b = encodeRegExp.exec(text)));
        if (_d !== text.length) {
            _c += text.substring(_d);
        }
    }
    else {
        _c =
            text;
    }
    return _c;
}
exports.encode = encode;
var defaultDecodeOptions = {
    scope: 'body',
    level: 'all'
};
var strict = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);/g;
var attribute = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g;
var baseDecodeRegExps = {
    xml: {
        strict: strict,
        attribute: attribute,
        body: named_references_1.bodyRegExps.xml
    },
    html4: {
        strict: strict,
        attribute: attribute,
        body: named_references_1.bodyRegExps.html4
    },
    html5: {
        strict: strict,
        attribute: attribute,
        body: named_references_1.bodyRegExps.html5
    }
};
var decodeRegExps = __assign(__assign({}, baseDecodeRegExps), { all: baseDecodeRegExps.html5 });
var fromCharCode = String.fromCharCode;
var outOfBoundsChar = fromCharCode(65533);
var defaultDecodeEntityOptions = {
    level: 'all'
};
/** Decodes a single entity */
function decodeEntity(entity, _a) {
    var _b = (_a === void 0 ? defaultDecodeEntityOptions : _a).level, level = _b === void 0 ? 'all' : _b;
    if (!entity) {
        return '';
    }
    var _b = entity;
    var decodeEntityLastChar_1 = entity[entity.length - 1];
    if (false) {}
    else if (false) {}
    else {
        var decodeResultByReference_1 = allNamedReferences[level].entities[entity];
        if (decodeResultByReference_1) {
            _b = decodeResultByReference_1;
        }
        else if (entity[0] === '&' && entity[1] === '#') {
            var decodeSecondChar_1 = entity[2];
            var decodeCode_1 = decodeSecondChar_1 == 'x' || decodeSecondChar_1 == 'X'
                ? parseInt(entity.substr(3), 16)
                : parseInt(entity.substr(2));
            _b =
                decodeCode_1 >= 0x10ffff
                    ? outOfBoundsChar
                    : decodeCode_1 > 65535
                        ? surrogate_pairs_1.fromCodePoint(decodeCode_1)
                        : fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode_1] || decodeCode_1);
        }
    }
    return _b;
}
exports.decodeEntity = decodeEntity;
/** Decodes all entities in the text */
function decode(text, _a) {
    var decodeSecondChar_1 = _a === void 0 ? defaultDecodeOptions : _a, decodeCode_1 = decodeSecondChar_1.level, level = decodeCode_1 === void 0 ? 'all' : decodeCode_1, _b = decodeSecondChar_1.scope, scope = _b === void 0 ? level === 'xml' ? 'strict' : 'body' : _b;
    if (!text) {
        return '';
    }
    var decodeRegExp = decodeRegExps[level][scope];
    var references = allNamedReferences[level].entities;
    var isAttribute = scope === 'attribute';
    var isStrict = scope === 'strict';
    decodeRegExp.lastIndex = 0;
    var replaceMatch_1 = decodeRegExp.exec(text);
    var replaceResult_1;
    if (replaceMatch_1) {
        replaceResult_1 = '';
        var replaceLastIndex_1 = 0;
        do {
            if (replaceLastIndex_1 !== replaceMatch_1.index) {
                replaceResult_1 += text.substring(replaceLastIndex_1, replaceMatch_1.index);
            }
            var replaceInput_1 = replaceMatch_1[0];
            var decodeResult_1 = replaceInput_1;
            var decodeEntityLastChar_2 = replaceInput_1[replaceInput_1.length - 1];
            if (isAttribute
                && decodeEntityLastChar_2 === '=') {
                decodeResult_1 = replaceInput_1;
            }
            else if (isStrict
                && decodeEntityLastChar_2 !== ';') {
                decodeResult_1 = replaceInput_1;
            }
            else {
                var decodeResultByReference_2 = references[replaceInput_1];
                if (decodeResultByReference_2) {
                    decodeResult_1 = decodeResultByReference_2;
                }
                else if (replaceInput_1[0] === '&' && replaceInput_1[1] === '#') {
                    var decodeSecondChar_2 = replaceInput_1[2];
                    var decodeCode_2 = decodeSecondChar_2 == 'x' || decodeSecondChar_2 == 'X'
                        ? parseInt(replaceInput_1.substr(3), 16)
                        : parseInt(replaceInput_1.substr(2));
                    decodeResult_1 =
                        decodeCode_2 >= 0x10ffff
                            ? outOfBoundsChar
                            : decodeCode_2 > 65535
                                ? surrogate_pairs_1.fromCodePoint(decodeCode_2)
                                : fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode_2] || decodeCode_2);
                }
            }
            replaceResult_1 += decodeResult_1;
            replaceLastIndex_1 = replaceMatch_1.index + replaceInput_1.length;
        } while ((replaceMatch_1 = decodeRegExp.exec(text)));
        if (replaceLastIndex_1 !== text.length) {
            replaceResult_1 += text.substring(replaceLastIndex_1);
        }
    }
    else {
        replaceResult_1 =
            text;
    }
    return replaceResult_1;
}
exports.decode = decode;


/***/ }),

/***/ "./node_modules/html-entities/lib/named-references.js":
/*!************************************************************!*\
  !*** ./node_modules/html-entities/lib/named-references.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.bodyRegExps={xml:/&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,html4:/&(?:nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|ucirc|uuml|yacute|thorn|yuml|quot|amp|lt|gt|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,html5:/&(?:AElig|AMP|Aacute|Acirc|Agrave|Aring|Atilde|Auml|COPY|Ccedil|ETH|Eacute|Ecirc|Egrave|Euml|GT|Iacute|Icirc|Igrave|Iuml|LT|Ntilde|Oacute|Ocirc|Ograve|Oslash|Otilde|Ouml|QUOT|REG|THORN|Uacute|Ucirc|Ugrave|Uuml|Yacute|aacute|acirc|acute|aelig|agrave|amp|aring|atilde|auml|brvbar|ccedil|cedil|cent|copy|curren|deg|divide|eacute|ecirc|egrave|eth|euml|frac12|frac14|frac34|gt|iacute|icirc|iexcl|igrave|iquest|iuml|laquo|lt|macr|micro|middot|nbsp|not|ntilde|oacute|ocirc|ograve|ordf|ordm|oslash|otilde|ouml|para|plusmn|pound|quot|raquo|reg|sect|shy|sup1|sup2|sup3|szlig|thorn|times|uacute|ucirc|ugrave|uml|uuml|yacute|yen|yuml|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g};exports.namedReferences={xml:{entities:{"&lt;":"<","&gt;":">","&quot;":'"',"&apos;":"'","&amp;":"&"},characters:{"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;","&":"&amp;"}},html4:{entities:{"&apos;":"'","&nbsp":" ","&nbsp;":" ","&iexcl":"¡","&iexcl;":"¡","&cent":"¢","&cent;":"¢","&pound":"£","&pound;":"£","&curren":"¤","&curren;":"¤","&yen":"¥","&yen;":"¥","&brvbar":"¦","&brvbar;":"¦","&sect":"§","&sect;":"§","&uml":"¨","&uml;":"¨","&copy":"©","&copy;":"©","&ordf":"ª","&ordf;":"ª","&laquo":"«","&laquo;":"«","&not":"¬","&not;":"¬","&shy":"­","&shy;":"­","&reg":"®","&reg;":"®","&macr":"¯","&macr;":"¯","&deg":"°","&deg;":"°","&plusmn":"±","&plusmn;":"±","&sup2":"²","&sup2;":"²","&sup3":"³","&sup3;":"³","&acute":"´","&acute;":"´","&micro":"µ","&micro;":"µ","&para":"¶","&para;":"¶","&middot":"·","&middot;":"·","&cedil":"¸","&cedil;":"¸","&sup1":"¹","&sup1;":"¹","&ordm":"º","&ordm;":"º","&raquo":"»","&raquo;":"»","&frac14":"¼","&frac14;":"¼","&frac12":"½","&frac12;":"½","&frac34":"¾","&frac34;":"¾","&iquest":"¿","&iquest;":"¿","&Agrave":"À","&Agrave;":"À","&Aacute":"Á","&Aacute;":"Á","&Acirc":"Â","&Acirc;":"Â","&Atilde":"Ã","&Atilde;":"Ã","&Auml":"Ä","&Auml;":"Ä","&Aring":"Å","&Aring;":"Å","&AElig":"Æ","&AElig;":"Æ","&Ccedil":"Ç","&Ccedil;":"Ç","&Egrave":"È","&Egrave;":"È","&Eacute":"É","&Eacute;":"É","&Ecirc":"Ê","&Ecirc;":"Ê","&Euml":"Ë","&Euml;":"Ë","&Igrave":"Ì","&Igrave;":"Ì","&Iacute":"Í","&Iacute;":"Í","&Icirc":"Î","&Icirc;":"Î","&Iuml":"Ï","&Iuml;":"Ï","&ETH":"Ð","&ETH;":"Ð","&Ntilde":"Ñ","&Ntilde;":"Ñ","&Ograve":"Ò","&Ograve;":"Ò","&Oacute":"Ó","&Oacute;":"Ó","&Ocirc":"Ô","&Ocirc;":"Ô","&Otilde":"Õ","&Otilde;":"Õ","&Ouml":"Ö","&Ouml;":"Ö","&times":"×","&times;":"×","&Oslash":"Ø","&Oslash;":"Ø","&Ugrave":"Ù","&Ugrave;":"Ù","&Uacute":"Ú","&Uacute;":"Ú","&Ucirc":"Û","&Ucirc;":"Û","&Uuml":"Ü","&Uuml;":"Ü","&Yacute":"Ý","&Yacute;":"Ý","&THORN":"Þ","&THORN;":"Þ","&szlig":"ß","&szlig;":"ß","&agrave":"à","&agrave;":"à","&aacute":"á","&aacute;":"á","&acirc":"â","&acirc;":"â","&atilde":"ã","&atilde;":"ã","&auml":"ä","&auml;":"ä","&aring":"å","&aring;":"å","&aelig":"æ","&aelig;":"æ","&ccedil":"ç","&ccedil;":"ç","&egrave":"è","&egrave;":"è","&eacute":"é","&eacute;":"é","&ecirc":"ê","&ecirc;":"ê","&euml":"ë","&euml;":"ë","&igrave":"ì","&igrave;":"ì","&iacute":"í","&iacute;":"í","&icirc":"î","&icirc;":"î","&iuml":"ï","&iuml;":"ï","&eth":"ð","&eth;":"ð","&ntilde":"ñ","&ntilde;":"ñ","&ograve":"ò","&ograve;":"ò","&oacute":"ó","&oacute;":"ó","&ocirc":"ô","&ocirc;":"ô","&otilde":"õ","&otilde;":"õ","&ouml":"ö","&ouml;":"ö","&divide":"÷","&divide;":"÷","&oslash":"ø","&oslash;":"ø","&ugrave":"ù","&ugrave;":"ù","&uacute":"ú","&uacute;":"ú","&ucirc":"û","&ucirc;":"û","&uuml":"ü","&uuml;":"ü","&yacute":"ý","&yacute;":"ý","&thorn":"þ","&thorn;":"þ","&yuml":"ÿ","&yuml;":"ÿ","&quot":'"',"&quot;":'"',"&amp":"&","&amp;":"&","&lt":"<","&lt;":"<","&gt":">","&gt;":">","&OElig;":"Œ","&oelig;":"œ","&Scaron;":"Š","&scaron;":"š","&Yuml;":"Ÿ","&circ;":"ˆ","&tilde;":"˜","&ensp;":" ","&emsp;":" ","&thinsp;":" ","&zwnj;":"‌","&zwj;":"‍","&lrm;":"‎","&rlm;":"‏","&ndash;":"–","&mdash;":"—","&lsquo;":"‘","&rsquo;":"’","&sbquo;":"‚","&ldquo;":"“","&rdquo;":"”","&bdquo;":"„","&dagger;":"†","&Dagger;":"‡","&permil;":"‰","&lsaquo;":"‹","&rsaquo;":"›","&euro;":"€","&fnof;":"ƒ","&Alpha;":"Α","&Beta;":"Β","&Gamma;":"Γ","&Delta;":"Δ","&Epsilon;":"Ε","&Zeta;":"Ζ","&Eta;":"Η","&Theta;":"Θ","&Iota;":"Ι","&Kappa;":"Κ","&Lambda;":"Λ","&Mu;":"Μ","&Nu;":"Ν","&Xi;":"Ξ","&Omicron;":"Ο","&Pi;":"Π","&Rho;":"Ρ","&Sigma;":"Σ","&Tau;":"Τ","&Upsilon;":"Υ","&Phi;":"Φ","&Chi;":"Χ","&Psi;":"Ψ","&Omega;":"Ω","&alpha;":"α","&beta;":"β","&gamma;":"γ","&delta;":"δ","&epsilon;":"ε","&zeta;":"ζ","&eta;":"η","&theta;":"θ","&iota;":"ι","&kappa;":"κ","&lambda;":"λ","&mu;":"μ","&nu;":"ν","&xi;":"ξ","&omicron;":"ο","&pi;":"π","&rho;":"ρ","&sigmaf;":"ς","&sigma;":"σ","&tau;":"τ","&upsilon;":"υ","&phi;":"φ","&chi;":"χ","&psi;":"ψ","&omega;":"ω","&thetasym;":"ϑ","&upsih;":"ϒ","&piv;":"ϖ","&bull;":"•","&hellip;":"…","&prime;":"′","&Prime;":"″","&oline;":"‾","&frasl;":"⁄","&weierp;":"℘","&image;":"ℑ","&real;":"ℜ","&trade;":"™","&alefsym;":"ℵ","&larr;":"←","&uarr;":"↑","&rarr;":"→","&darr;":"↓","&harr;":"↔","&crarr;":"↵","&lArr;":"⇐","&uArr;":"⇑","&rArr;":"⇒","&dArr;":"⇓","&hArr;":"⇔","&forall;":"∀","&part;":"∂","&exist;":"∃","&empty;":"∅","&nabla;":"∇","&isin;":"∈","&notin;":"∉","&ni;":"∋","&prod;":"∏","&sum;":"∑","&minus;":"−","&lowast;":"∗","&radic;":"√","&prop;":"∝","&infin;":"∞","&ang;":"∠","&and;":"∧","&or;":"∨","&cap;":"∩","&cup;":"∪","&int;":"∫","&there4;":"∴","&sim;":"∼","&cong;":"≅","&asymp;":"≈","&ne;":"≠","&equiv;":"≡","&le;":"≤","&ge;":"≥","&sub;":"⊂","&sup;":"⊃","&nsub;":"⊄","&sube;":"⊆","&supe;":"⊇","&oplus;":"⊕","&otimes;":"⊗","&perp;":"⊥","&sdot;":"⋅","&lceil;":"⌈","&rceil;":"⌉","&lfloor;":"⌊","&rfloor;":"⌋","&lang;":"〈","&rang;":"〉","&loz;":"◊","&spades;":"♠","&clubs;":"♣","&hearts;":"♥","&diams;":"♦"},characters:{"'":"&apos;"," ":"&nbsp;","¡":"&iexcl;","¢":"&cent;","£":"&pound;","¤":"&curren;","¥":"&yen;","¦":"&brvbar;","§":"&sect;","¨":"&uml;","©":"&copy;","ª":"&ordf;","«":"&laquo;","¬":"&not;","­":"&shy;","®":"&reg;","¯":"&macr;","°":"&deg;","±":"&plusmn;","²":"&sup2;","³":"&sup3;","´":"&acute;","µ":"&micro;","¶":"&para;","·":"&middot;","¸":"&cedil;","¹":"&sup1;","º":"&ordm;","»":"&raquo;","¼":"&frac14;","½":"&frac12;","¾":"&frac34;","¿":"&iquest;","À":"&Agrave;","Á":"&Aacute;","Â":"&Acirc;","Ã":"&Atilde;","Ä":"&Auml;","Å":"&Aring;","Æ":"&AElig;","Ç":"&Ccedil;","È":"&Egrave;","É":"&Eacute;","Ê":"&Ecirc;","Ë":"&Euml;","Ì":"&Igrave;","Í":"&Iacute;","Î":"&Icirc;","Ï":"&Iuml;","Ð":"&ETH;","Ñ":"&Ntilde;","Ò":"&Ograve;","Ó":"&Oacute;","Ô":"&Ocirc;","Õ":"&Otilde;","Ö":"&Ouml;","×":"&times;","Ø":"&Oslash;","Ù":"&Ugrave;","Ú":"&Uacute;","Û":"&Ucirc;","Ü":"&Uuml;","Ý":"&Yacute;","Þ":"&THORN;","ß":"&szlig;","à":"&agrave;","á":"&aacute;","â":"&acirc;","ã":"&atilde;","ä":"&auml;","å":"&aring;","æ":"&aelig;","ç":"&ccedil;","è":"&egrave;","é":"&eacute;","ê":"&ecirc;","ë":"&euml;","ì":"&igrave;","í":"&iacute;","î":"&icirc;","ï":"&iuml;","ð":"&eth;","ñ":"&ntilde;","ò":"&ograve;","ó":"&oacute;","ô":"&ocirc;","õ":"&otilde;","ö":"&ouml;","÷":"&divide;","ø":"&oslash;","ù":"&ugrave;","ú":"&uacute;","û":"&ucirc;","ü":"&uuml;","ý":"&yacute;","þ":"&thorn;","ÿ":"&yuml;",'"':"&quot;","&":"&amp;","<":"&lt;",">":"&gt;","Œ":"&OElig;","œ":"&oelig;","Š":"&Scaron;","š":"&scaron;","Ÿ":"&Yuml;","ˆ":"&circ;","˜":"&tilde;"," ":"&ensp;"," ":"&emsp;"," ":"&thinsp;","‌":"&zwnj;","‍":"&zwj;","‎":"&lrm;","‏":"&rlm;","–":"&ndash;","—":"&mdash;","‘":"&lsquo;","’":"&rsquo;","‚":"&sbquo;","“":"&ldquo;","”":"&rdquo;","„":"&bdquo;","†":"&dagger;","‡":"&Dagger;","‰":"&permil;","‹":"&lsaquo;","›":"&rsaquo;","€":"&euro;","ƒ":"&fnof;","Α":"&Alpha;","Β":"&Beta;","Γ":"&Gamma;","Δ":"&Delta;","Ε":"&Epsilon;","Ζ":"&Zeta;","Η":"&Eta;","Θ":"&Theta;","Ι":"&Iota;","Κ":"&Kappa;","Λ":"&Lambda;","Μ":"&Mu;","Ν":"&Nu;","Ξ":"&Xi;","Ο":"&Omicron;","Π":"&Pi;","Ρ":"&Rho;","Σ":"&Sigma;","Τ":"&Tau;","Υ":"&Upsilon;","Φ":"&Phi;","Χ":"&Chi;","Ψ":"&Psi;","Ω":"&Omega;","α":"&alpha;","β":"&beta;","γ":"&gamma;","δ":"&delta;","ε":"&epsilon;","ζ":"&zeta;","η":"&eta;","θ":"&theta;","ι":"&iota;","κ":"&kappa;","λ":"&lambda;","μ":"&mu;","ν":"&nu;","ξ":"&xi;","ο":"&omicron;","π":"&pi;","ρ":"&rho;","ς":"&sigmaf;","σ":"&sigma;","τ":"&tau;","υ":"&upsilon;","φ":"&phi;","χ":"&chi;","ψ":"&psi;","ω":"&omega;","ϑ":"&thetasym;","ϒ":"&upsih;","ϖ":"&piv;","•":"&bull;","…":"&hellip;","′":"&prime;","″":"&Prime;","‾":"&oline;","⁄":"&frasl;","℘":"&weierp;","ℑ":"&image;","ℜ":"&real;","™":"&trade;","ℵ":"&alefsym;","←":"&larr;","↑":"&uarr;","→":"&rarr;","↓":"&darr;","↔":"&harr;","↵":"&crarr;","⇐":"&lArr;","⇑":"&uArr;","⇒":"&rArr;","⇓":"&dArr;","⇔":"&hArr;","∀":"&forall;","∂":"&part;","∃":"&exist;","∅":"&empty;","∇":"&nabla;","∈":"&isin;","∉":"&notin;","∋":"&ni;","∏":"&prod;","∑":"&sum;","−":"&minus;","∗":"&lowast;","√":"&radic;","∝":"&prop;","∞":"&infin;","∠":"&ang;","∧":"&and;","∨":"&or;","∩":"&cap;","∪":"&cup;","∫":"&int;","∴":"&there4;","∼":"&sim;","≅":"&cong;","≈":"&asymp;","≠":"&ne;","≡":"&equiv;","≤":"&le;","≥":"&ge;","⊂":"&sub;","⊃":"&sup;","⊄":"&nsub;","⊆":"&sube;","⊇":"&supe;","⊕":"&oplus;","⊗":"&otimes;","⊥":"&perp;","⋅":"&sdot;","⌈":"&lceil;","⌉":"&rceil;","⌊":"&lfloor;","⌋":"&rfloor;","〈":"&lang;","〉":"&rang;","◊":"&loz;","♠":"&spades;","♣":"&clubs;","♥":"&hearts;","♦":"&diams;"}},html5:{entities:{"&AElig":"Æ","&AElig;":"Æ","&AMP":"&","&AMP;":"&","&Aacute":"Á","&Aacute;":"Á","&Abreve;":"Ă","&Acirc":"Â","&Acirc;":"Â","&Acy;":"А","&Afr;":"𝔄","&Agrave":"À","&Agrave;":"À","&Alpha;":"Α","&Amacr;":"Ā","&And;":"⩓","&Aogon;":"Ą","&Aopf;":"𝔸","&ApplyFunction;":"⁡","&Aring":"Å","&Aring;":"Å","&Ascr;":"𝒜","&Assign;":"≔","&Atilde":"Ã","&Atilde;":"Ã","&Auml":"Ä","&Auml;":"Ä","&Backslash;":"∖","&Barv;":"⫧","&Barwed;":"⌆","&Bcy;":"Б","&Because;":"∵","&Bernoullis;":"ℬ","&Beta;":"Β","&Bfr;":"𝔅","&Bopf;":"𝔹","&Breve;":"˘","&Bscr;":"ℬ","&Bumpeq;":"≎","&CHcy;":"Ч","&COPY":"©","&COPY;":"©","&Cacute;":"Ć","&Cap;":"⋒","&CapitalDifferentialD;":"ⅅ","&Cayleys;":"ℭ","&Ccaron;":"Č","&Ccedil":"Ç","&Ccedil;":"Ç","&Ccirc;":"Ĉ","&Cconint;":"∰","&Cdot;":"Ċ","&Cedilla;":"¸","&CenterDot;":"·","&Cfr;":"ℭ","&Chi;":"Χ","&CircleDot;":"⊙","&CircleMinus;":"⊖","&CirclePlus;":"⊕","&CircleTimes;":"⊗","&ClockwiseContourIntegral;":"∲","&CloseCurlyDoubleQuote;":"”","&CloseCurlyQuote;":"’","&Colon;":"∷","&Colone;":"⩴","&Congruent;":"≡","&Conint;":"∯","&ContourIntegral;":"∮","&Copf;":"ℂ","&Coproduct;":"∐","&CounterClockwiseContourIntegral;":"∳","&Cross;":"⨯","&Cscr;":"𝒞","&Cup;":"⋓","&CupCap;":"≍","&DD;":"ⅅ","&DDotrahd;":"⤑","&DJcy;":"Ђ","&DScy;":"Ѕ","&DZcy;":"Џ","&Dagger;":"‡","&Darr;":"↡","&Dashv;":"⫤","&Dcaron;":"Ď","&Dcy;":"Д","&Del;":"∇","&Delta;":"Δ","&Dfr;":"𝔇","&DiacriticalAcute;":"´","&DiacriticalDot;":"˙","&DiacriticalDoubleAcute;":"˝","&DiacriticalGrave;":"`","&DiacriticalTilde;":"˜","&Diamond;":"⋄","&DifferentialD;":"ⅆ","&Dopf;":"𝔻","&Dot;":"¨","&DotDot;":"⃜","&DotEqual;":"≐","&DoubleContourIntegral;":"∯","&DoubleDot;":"¨","&DoubleDownArrow;":"⇓","&DoubleLeftArrow;":"⇐","&DoubleLeftRightArrow;":"⇔","&DoubleLeftTee;":"⫤","&DoubleLongLeftArrow;":"⟸","&DoubleLongLeftRightArrow;":"⟺","&DoubleLongRightArrow;":"⟹","&DoubleRightArrow;":"⇒","&DoubleRightTee;":"⊨","&DoubleUpArrow;":"⇑","&DoubleUpDownArrow;":"⇕","&DoubleVerticalBar;":"∥","&DownArrow;":"↓","&DownArrowBar;":"⤓","&DownArrowUpArrow;":"⇵","&DownBreve;":"̑","&DownLeftRightVector;":"⥐","&DownLeftTeeVector;":"⥞","&DownLeftVector;":"↽","&DownLeftVectorBar;":"⥖","&DownRightTeeVector;":"⥟","&DownRightVector;":"⇁","&DownRightVectorBar;":"⥗","&DownTee;":"⊤","&DownTeeArrow;":"↧","&Downarrow;":"⇓","&Dscr;":"𝒟","&Dstrok;":"Đ","&ENG;":"Ŋ","&ETH":"Ð","&ETH;":"Ð","&Eacute":"É","&Eacute;":"É","&Ecaron;":"Ě","&Ecirc":"Ê","&Ecirc;":"Ê","&Ecy;":"Э","&Edot;":"Ė","&Efr;":"𝔈","&Egrave":"È","&Egrave;":"È","&Element;":"∈","&Emacr;":"Ē","&EmptySmallSquare;":"◻","&EmptyVerySmallSquare;":"▫","&Eogon;":"Ę","&Eopf;":"𝔼","&Epsilon;":"Ε","&Equal;":"⩵","&EqualTilde;":"≂","&Equilibrium;":"⇌","&Escr;":"ℰ","&Esim;":"⩳","&Eta;":"Η","&Euml":"Ë","&Euml;":"Ë","&Exists;":"∃","&ExponentialE;":"ⅇ","&Fcy;":"Ф","&Ffr;":"𝔉","&FilledSmallSquare;":"◼","&FilledVerySmallSquare;":"▪","&Fopf;":"𝔽","&ForAll;":"∀","&Fouriertrf;":"ℱ","&Fscr;":"ℱ","&GJcy;":"Ѓ","&GT":">","&GT;":">","&Gamma;":"Γ","&Gammad;":"Ϝ","&Gbreve;":"Ğ","&Gcedil;":"Ģ","&Gcirc;":"Ĝ","&Gcy;":"Г","&Gdot;":"Ġ","&Gfr;":"𝔊","&Gg;":"⋙","&Gopf;":"𝔾","&GreaterEqual;":"≥","&GreaterEqualLess;":"⋛","&GreaterFullEqual;":"≧","&GreaterGreater;":"⪢","&GreaterLess;":"≷","&GreaterSlantEqual;":"⩾","&GreaterTilde;":"≳","&Gscr;":"𝒢","&Gt;":"≫","&HARDcy;":"Ъ","&Hacek;":"ˇ","&Hat;":"^","&Hcirc;":"Ĥ","&Hfr;":"ℌ","&HilbertSpace;":"ℋ","&Hopf;":"ℍ","&HorizontalLine;":"─","&Hscr;":"ℋ","&Hstrok;":"Ħ","&HumpDownHump;":"≎","&HumpEqual;":"≏","&IEcy;":"Е","&IJlig;":"Ĳ","&IOcy;":"Ё","&Iacute":"Í","&Iacute;":"Í","&Icirc":"Î","&Icirc;":"Î","&Icy;":"И","&Idot;":"İ","&Ifr;":"ℑ","&Igrave":"Ì","&Igrave;":"Ì","&Im;":"ℑ","&Imacr;":"Ī","&ImaginaryI;":"ⅈ","&Implies;":"⇒","&Int;":"∬","&Integral;":"∫","&Intersection;":"⋂","&InvisibleComma;":"⁣","&InvisibleTimes;":"⁢","&Iogon;":"Į","&Iopf;":"𝕀","&Iota;":"Ι","&Iscr;":"ℐ","&Itilde;":"Ĩ","&Iukcy;":"І","&Iuml":"Ï","&Iuml;":"Ï","&Jcirc;":"Ĵ","&Jcy;":"Й","&Jfr;":"𝔍","&Jopf;":"𝕁","&Jscr;":"𝒥","&Jsercy;":"Ј","&Jukcy;":"Є","&KHcy;":"Х","&KJcy;":"Ќ","&Kappa;":"Κ","&Kcedil;":"Ķ","&Kcy;":"К","&Kfr;":"𝔎","&Kopf;":"𝕂","&Kscr;":"𝒦","&LJcy;":"Љ","&LT":"<","&LT;":"<","&Lacute;":"Ĺ","&Lambda;":"Λ","&Lang;":"⟪","&Laplacetrf;":"ℒ","&Larr;":"↞","&Lcaron;":"Ľ","&Lcedil;":"Ļ","&Lcy;":"Л","&LeftAngleBracket;":"⟨","&LeftArrow;":"←","&LeftArrowBar;":"⇤","&LeftArrowRightArrow;":"⇆","&LeftCeiling;":"⌈","&LeftDoubleBracket;":"⟦","&LeftDownTeeVector;":"⥡","&LeftDownVector;":"⇃","&LeftDownVectorBar;":"⥙","&LeftFloor;":"⌊","&LeftRightArrow;":"↔","&LeftRightVector;":"⥎","&LeftTee;":"⊣","&LeftTeeArrow;":"↤","&LeftTeeVector;":"⥚","&LeftTriangle;":"⊲","&LeftTriangleBar;":"⧏","&LeftTriangleEqual;":"⊴","&LeftUpDownVector;":"⥑","&LeftUpTeeVector;":"⥠","&LeftUpVector;":"↿","&LeftUpVectorBar;":"⥘","&LeftVector;":"↼","&LeftVectorBar;":"⥒","&Leftarrow;":"⇐","&Leftrightarrow;":"⇔","&LessEqualGreater;":"⋚","&LessFullEqual;":"≦","&LessGreater;":"≶","&LessLess;":"⪡","&LessSlantEqual;":"⩽","&LessTilde;":"≲","&Lfr;":"𝔏","&Ll;":"⋘","&Lleftarrow;":"⇚","&Lmidot;":"Ŀ","&LongLeftArrow;":"⟵","&LongLeftRightArrow;":"⟷","&LongRightArrow;":"⟶","&Longleftarrow;":"⟸","&Longleftrightarrow;":"⟺","&Longrightarrow;":"⟹","&Lopf;":"𝕃","&LowerLeftArrow;":"↙","&LowerRightArrow;":"↘","&Lscr;":"ℒ","&Lsh;":"↰","&Lstrok;":"Ł","&Lt;":"≪","&Map;":"⤅","&Mcy;":"М","&MediumSpace;":" ","&Mellintrf;":"ℳ","&Mfr;":"𝔐","&MinusPlus;":"∓","&Mopf;":"𝕄","&Mscr;":"ℳ","&Mu;":"Μ","&NJcy;":"Њ","&Nacute;":"Ń","&Ncaron;":"Ň","&Ncedil;":"Ņ","&Ncy;":"Н","&NegativeMediumSpace;":"​","&NegativeThickSpace;":"​","&NegativeThinSpace;":"​","&NegativeVeryThinSpace;":"​","&NestedGreaterGreater;":"≫","&NestedLessLess;":"≪","&NewLine;":"\n","&Nfr;":"𝔑","&NoBreak;":"⁠","&NonBreakingSpace;":" ","&Nopf;":"ℕ","&Not;":"⫬","&NotCongruent;":"≢","&NotCupCap;":"≭","&NotDoubleVerticalBar;":"∦","&NotElement;":"∉","&NotEqual;":"≠","&NotEqualTilde;":"≂̸","&NotExists;":"∄","&NotGreater;":"≯","&NotGreaterEqual;":"≱","&NotGreaterFullEqual;":"≧̸","&NotGreaterGreater;":"≫̸","&NotGreaterLess;":"≹","&NotGreaterSlantEqual;":"⩾̸","&NotGreaterTilde;":"≵","&NotHumpDownHump;":"≎̸","&NotHumpEqual;":"≏̸","&NotLeftTriangle;":"⋪","&NotLeftTriangleBar;":"⧏̸","&NotLeftTriangleEqual;":"⋬","&NotLess;":"≮","&NotLessEqual;":"≰","&NotLessGreater;":"≸","&NotLessLess;":"≪̸","&NotLessSlantEqual;":"⩽̸","&NotLessTilde;":"≴","&NotNestedGreaterGreater;":"⪢̸","&NotNestedLessLess;":"⪡̸","&NotPrecedes;":"⊀","&NotPrecedesEqual;":"⪯̸","&NotPrecedesSlantEqual;":"⋠","&NotReverseElement;":"∌","&NotRightTriangle;":"⋫","&NotRightTriangleBar;":"⧐̸","&NotRightTriangleEqual;":"⋭","&NotSquareSubset;":"⊏̸","&NotSquareSubsetEqual;":"⋢","&NotSquareSuperset;":"⊐̸","&NotSquareSupersetEqual;":"⋣","&NotSubset;":"⊂⃒","&NotSubsetEqual;":"⊈","&NotSucceeds;":"⊁","&NotSucceedsEqual;":"⪰̸","&NotSucceedsSlantEqual;":"⋡","&NotSucceedsTilde;":"≿̸","&NotSuperset;":"⊃⃒","&NotSupersetEqual;":"⊉","&NotTilde;":"≁","&NotTildeEqual;":"≄","&NotTildeFullEqual;":"≇","&NotTildeTilde;":"≉","&NotVerticalBar;":"∤","&Nscr;":"𝒩","&Ntilde":"Ñ","&Ntilde;":"Ñ","&Nu;":"Ν","&OElig;":"Œ","&Oacute":"Ó","&Oacute;":"Ó","&Ocirc":"Ô","&Ocirc;":"Ô","&Ocy;":"О","&Odblac;":"Ő","&Ofr;":"𝔒","&Ograve":"Ò","&Ograve;":"Ò","&Omacr;":"Ō","&Omega;":"Ω","&Omicron;":"Ο","&Oopf;":"𝕆","&OpenCurlyDoubleQuote;":"“","&OpenCurlyQuote;":"‘","&Or;":"⩔","&Oscr;":"𝒪","&Oslash":"Ø","&Oslash;":"Ø","&Otilde":"Õ","&Otilde;":"Õ","&Otimes;":"⨷","&Ouml":"Ö","&Ouml;":"Ö","&OverBar;":"‾","&OverBrace;":"⏞","&OverBracket;":"⎴","&OverParenthesis;":"⏜","&PartialD;":"∂","&Pcy;":"П","&Pfr;":"𝔓","&Phi;":"Φ","&Pi;":"Π","&PlusMinus;":"±","&Poincareplane;":"ℌ","&Popf;":"ℙ","&Pr;":"⪻","&Precedes;":"≺","&PrecedesEqual;":"⪯","&PrecedesSlantEqual;":"≼","&PrecedesTilde;":"≾","&Prime;":"″","&Product;":"∏","&Proportion;":"∷","&Proportional;":"∝","&Pscr;":"𝒫","&Psi;":"Ψ","&QUOT":'"',"&QUOT;":'"',"&Qfr;":"𝔔","&Qopf;":"ℚ","&Qscr;":"𝒬","&RBarr;":"⤐","&REG":"®","&REG;":"®","&Racute;":"Ŕ","&Rang;":"⟫","&Rarr;":"↠","&Rarrtl;":"⤖","&Rcaron;":"Ř","&Rcedil;":"Ŗ","&Rcy;":"Р","&Re;":"ℜ","&ReverseElement;":"∋","&ReverseEquilibrium;":"⇋","&ReverseUpEquilibrium;":"⥯","&Rfr;":"ℜ","&Rho;":"Ρ","&RightAngleBracket;":"⟩","&RightArrow;":"→","&RightArrowBar;":"⇥","&RightArrowLeftArrow;":"⇄","&RightCeiling;":"⌉","&RightDoubleBracket;":"⟧","&RightDownTeeVector;":"⥝","&RightDownVector;":"⇂","&RightDownVectorBar;":"⥕","&RightFloor;":"⌋","&RightTee;":"⊢","&RightTeeArrow;":"↦","&RightTeeVector;":"⥛","&RightTriangle;":"⊳","&RightTriangleBar;":"⧐","&RightTriangleEqual;":"⊵","&RightUpDownVector;":"⥏","&RightUpTeeVector;":"⥜","&RightUpVector;":"↾","&RightUpVectorBar;":"⥔","&RightVector;":"⇀","&RightVectorBar;":"⥓","&Rightarrow;":"⇒","&Ropf;":"ℝ","&RoundImplies;":"⥰","&Rrightarrow;":"⇛","&Rscr;":"ℛ","&Rsh;":"↱","&RuleDelayed;":"⧴","&SHCHcy;":"Щ","&SHcy;":"Ш","&SOFTcy;":"Ь","&Sacute;":"Ś","&Sc;":"⪼","&Scaron;":"Š","&Scedil;":"Ş","&Scirc;":"Ŝ","&Scy;":"С","&Sfr;":"𝔖","&ShortDownArrow;":"↓","&ShortLeftArrow;":"←","&ShortRightArrow;":"→","&ShortUpArrow;":"↑","&Sigma;":"Σ","&SmallCircle;":"∘","&Sopf;":"𝕊","&Sqrt;":"√","&Square;":"□","&SquareIntersection;":"⊓","&SquareSubset;":"⊏","&SquareSubsetEqual;":"⊑","&SquareSuperset;":"⊐","&SquareSupersetEqual;":"⊒","&SquareUnion;":"⊔","&Sscr;":"𝒮","&Star;":"⋆","&Sub;":"⋐","&Subset;":"⋐","&SubsetEqual;":"⊆","&Succeeds;":"≻","&SucceedsEqual;":"⪰","&SucceedsSlantEqual;":"≽","&SucceedsTilde;":"≿","&SuchThat;":"∋","&Sum;":"∑","&Sup;":"⋑","&Superset;":"⊃","&SupersetEqual;":"⊇","&Supset;":"⋑","&THORN":"Þ","&THORN;":"Þ","&TRADE;":"™","&TSHcy;":"Ћ","&TScy;":"Ц","&Tab;":"\t","&Tau;":"Τ","&Tcaron;":"Ť","&Tcedil;":"Ţ","&Tcy;":"Т","&Tfr;":"𝔗","&Therefore;":"∴","&Theta;":"Θ","&ThickSpace;":"  ","&ThinSpace;":" ","&Tilde;":"∼","&TildeEqual;":"≃","&TildeFullEqual;":"≅","&TildeTilde;":"≈","&Topf;":"𝕋","&TripleDot;":"⃛","&Tscr;":"𝒯","&Tstrok;":"Ŧ","&Uacute":"Ú","&Uacute;":"Ú","&Uarr;":"↟","&Uarrocir;":"⥉","&Ubrcy;":"Ў","&Ubreve;":"Ŭ","&Ucirc":"Û","&Ucirc;":"Û","&Ucy;":"У","&Udblac;":"Ű","&Ufr;":"𝔘","&Ugrave":"Ù","&Ugrave;":"Ù","&Umacr;":"Ū","&UnderBar;":"_","&UnderBrace;":"⏟","&UnderBracket;":"⎵","&UnderParenthesis;":"⏝","&Union;":"⋃","&UnionPlus;":"⊎","&Uogon;":"Ų","&Uopf;":"𝕌","&UpArrow;":"↑","&UpArrowBar;":"⤒","&UpArrowDownArrow;":"⇅","&UpDownArrow;":"↕","&UpEquilibrium;":"⥮","&UpTee;":"⊥","&UpTeeArrow;":"↥","&Uparrow;":"⇑","&Updownarrow;":"⇕","&UpperLeftArrow;":"↖","&UpperRightArrow;":"↗","&Upsi;":"ϒ","&Upsilon;":"Υ","&Uring;":"Ů","&Uscr;":"𝒰","&Utilde;":"Ũ","&Uuml":"Ü","&Uuml;":"Ü","&VDash;":"⊫","&Vbar;":"⫫","&Vcy;":"В","&Vdash;":"⊩","&Vdashl;":"⫦","&Vee;":"⋁","&Verbar;":"‖","&Vert;":"‖","&VerticalBar;":"∣","&VerticalLine;":"|","&VerticalSeparator;":"❘","&VerticalTilde;":"≀","&VeryThinSpace;":" ","&Vfr;":"𝔙","&Vopf;":"𝕍","&Vscr;":"𝒱","&Vvdash;":"⊪","&Wcirc;":"Ŵ","&Wedge;":"⋀","&Wfr;":"𝔚","&Wopf;":"𝕎","&Wscr;":"𝒲","&Xfr;":"𝔛","&Xi;":"Ξ","&Xopf;":"𝕏","&Xscr;":"𝒳","&YAcy;":"Я","&YIcy;":"Ї","&YUcy;":"Ю","&Yacute":"Ý","&Yacute;":"Ý","&Ycirc;":"Ŷ","&Ycy;":"Ы","&Yfr;":"𝔜","&Yopf;":"𝕐","&Yscr;":"𝒴","&Yuml;":"Ÿ","&ZHcy;":"Ж","&Zacute;":"Ź","&Zcaron;":"Ž","&Zcy;":"З","&Zdot;":"Ż","&ZeroWidthSpace;":"​","&Zeta;":"Ζ","&Zfr;":"ℨ","&Zopf;":"ℤ","&Zscr;":"𝒵","&aacute":"á","&aacute;":"á","&abreve;":"ă","&ac;":"∾","&acE;":"∾̳","&acd;":"∿","&acirc":"â","&acirc;":"â","&acute":"´","&acute;":"´","&acy;":"а","&aelig":"æ","&aelig;":"æ","&af;":"⁡","&afr;":"𝔞","&agrave":"à","&agrave;":"à","&alefsym;":"ℵ","&aleph;":"ℵ","&alpha;":"α","&amacr;":"ā","&amalg;":"⨿","&amp":"&","&amp;":"&","&and;":"∧","&andand;":"⩕","&andd;":"⩜","&andslope;":"⩘","&andv;":"⩚","&ang;":"∠","&ange;":"⦤","&angle;":"∠","&angmsd;":"∡","&angmsdaa;":"⦨","&angmsdab;":"⦩","&angmsdac;":"⦪","&angmsdad;":"⦫","&angmsdae;":"⦬","&angmsdaf;":"⦭","&angmsdag;":"⦮","&angmsdah;":"⦯","&angrt;":"∟","&angrtvb;":"⊾","&angrtvbd;":"⦝","&angsph;":"∢","&angst;":"Å","&angzarr;":"⍼","&aogon;":"ą","&aopf;":"𝕒","&ap;":"≈","&apE;":"⩰","&apacir;":"⩯","&ape;":"≊","&apid;":"≋","&apos;":"'","&approx;":"≈","&approxeq;":"≊","&aring":"å","&aring;":"å","&ascr;":"𝒶","&ast;":"*","&asymp;":"≈","&asympeq;":"≍","&atilde":"ã","&atilde;":"ã","&auml":"ä","&auml;":"ä","&awconint;":"∳","&awint;":"⨑","&bNot;":"⫭","&backcong;":"≌","&backepsilon;":"϶","&backprime;":"‵","&backsim;":"∽","&backsimeq;":"⋍","&barvee;":"⊽","&barwed;":"⌅","&barwedge;":"⌅","&bbrk;":"⎵","&bbrktbrk;":"⎶","&bcong;":"≌","&bcy;":"б","&bdquo;":"„","&becaus;":"∵","&because;":"∵","&bemptyv;":"⦰","&bepsi;":"϶","&bernou;":"ℬ","&beta;":"β","&beth;":"ℶ","&between;":"≬","&bfr;":"𝔟","&bigcap;":"⋂","&bigcirc;":"◯","&bigcup;":"⋃","&bigodot;":"⨀","&bigoplus;":"⨁","&bigotimes;":"⨂","&bigsqcup;":"⨆","&bigstar;":"★","&bigtriangledown;":"▽","&bigtriangleup;":"△","&biguplus;":"⨄","&bigvee;":"⋁","&bigwedge;":"⋀","&bkarow;":"⤍","&blacklozenge;":"⧫","&blacksquare;":"▪","&blacktriangle;":"▴","&blacktriangledown;":"▾","&blacktriangleleft;":"◂","&blacktriangleright;":"▸","&blank;":"␣","&blk12;":"▒","&blk14;":"░","&blk34;":"▓","&block;":"█","&bne;":"=⃥","&bnequiv;":"≡⃥","&bnot;":"⌐","&bopf;":"𝕓","&bot;":"⊥","&bottom;":"⊥","&bowtie;":"⋈","&boxDL;":"╗","&boxDR;":"╔","&boxDl;":"╖","&boxDr;":"╓","&boxH;":"═","&boxHD;":"╦","&boxHU;":"╩","&boxHd;":"╤","&boxHu;":"╧","&boxUL;":"╝","&boxUR;":"╚","&boxUl;":"╜","&boxUr;":"╙","&boxV;":"║","&boxVH;":"╬","&boxVL;":"╣","&boxVR;":"╠","&boxVh;":"╫","&boxVl;":"╢","&boxVr;":"╟","&boxbox;":"⧉","&boxdL;":"╕","&boxdR;":"╒","&boxdl;":"┐","&boxdr;":"┌","&boxh;":"─","&boxhD;":"╥","&boxhU;":"╨","&boxhd;":"┬","&boxhu;":"┴","&boxminus;":"⊟","&boxplus;":"⊞","&boxtimes;":"⊠","&boxuL;":"╛","&boxuR;":"╘","&boxul;":"┘","&boxur;":"└","&boxv;":"│","&boxvH;":"╪","&boxvL;":"╡","&boxvR;":"╞","&boxvh;":"┼","&boxvl;":"┤","&boxvr;":"├","&bprime;":"‵","&breve;":"˘","&brvbar":"¦","&brvbar;":"¦","&bscr;":"𝒷","&bsemi;":"⁏","&bsim;":"∽","&bsime;":"⋍","&bsol;":"\\","&bsolb;":"⧅","&bsolhsub;":"⟈","&bull;":"•","&bullet;":"•","&bump;":"≎","&bumpE;":"⪮","&bumpe;":"≏","&bumpeq;":"≏","&cacute;":"ć","&cap;":"∩","&capand;":"⩄","&capbrcup;":"⩉","&capcap;":"⩋","&capcup;":"⩇","&capdot;":"⩀","&caps;":"∩︀","&caret;":"⁁","&caron;":"ˇ","&ccaps;":"⩍","&ccaron;":"č","&ccedil":"ç","&ccedil;":"ç","&ccirc;":"ĉ","&ccups;":"⩌","&ccupssm;":"⩐","&cdot;":"ċ","&cedil":"¸","&cedil;":"¸","&cemptyv;":"⦲","&cent":"¢","&cent;":"¢","&centerdot;":"·","&cfr;":"𝔠","&chcy;":"ч","&check;":"✓","&checkmark;":"✓","&chi;":"χ","&cir;":"○","&cirE;":"⧃","&circ;":"ˆ","&circeq;":"≗","&circlearrowleft;":"↺","&circlearrowright;":"↻","&circledR;":"®","&circledS;":"Ⓢ","&circledast;":"⊛","&circledcirc;":"⊚","&circleddash;":"⊝","&cire;":"≗","&cirfnint;":"⨐","&cirmid;":"⫯","&cirscir;":"⧂","&clubs;":"♣","&clubsuit;":"♣","&colon;":":","&colone;":"≔","&coloneq;":"≔","&comma;":",","&commat;":"@","&comp;":"∁","&compfn;":"∘","&complement;":"∁","&complexes;":"ℂ","&cong;":"≅","&congdot;":"⩭","&conint;":"∮","&copf;":"𝕔","&coprod;":"∐","&copy":"©","&copy;":"©","&copysr;":"℗","&crarr;":"↵","&cross;":"✗","&cscr;":"𝒸","&csub;":"⫏","&csube;":"⫑","&csup;":"⫐","&csupe;":"⫒","&ctdot;":"⋯","&cudarrl;":"⤸","&cudarrr;":"⤵","&cuepr;":"⋞","&cuesc;":"⋟","&cularr;":"↶","&cularrp;":"⤽","&cup;":"∪","&cupbrcap;":"⩈","&cupcap;":"⩆","&cupcup;":"⩊","&cupdot;":"⊍","&cupor;":"⩅","&cups;":"∪︀","&curarr;":"↷","&curarrm;":"⤼","&curlyeqprec;":"⋞","&curlyeqsucc;":"⋟","&curlyvee;":"⋎","&curlywedge;":"⋏","&curren":"¤","&curren;":"¤","&curvearrowleft;":"↶","&curvearrowright;":"↷","&cuvee;":"⋎","&cuwed;":"⋏","&cwconint;":"∲","&cwint;":"∱","&cylcty;":"⌭","&dArr;":"⇓","&dHar;":"⥥","&dagger;":"†","&daleth;":"ℸ","&darr;":"↓","&dash;":"‐","&dashv;":"⊣","&dbkarow;":"⤏","&dblac;":"˝","&dcaron;":"ď","&dcy;":"д","&dd;":"ⅆ","&ddagger;":"‡","&ddarr;":"⇊","&ddotseq;":"⩷","&deg":"°","&deg;":"°","&delta;":"δ","&demptyv;":"⦱","&dfisht;":"⥿","&dfr;":"𝔡","&dharl;":"⇃","&dharr;":"⇂","&diam;":"⋄","&diamond;":"⋄","&diamondsuit;":"♦","&diams;":"♦","&die;":"¨","&digamma;":"ϝ","&disin;":"⋲","&div;":"÷","&divide":"÷","&divide;":"÷","&divideontimes;":"⋇","&divonx;":"⋇","&djcy;":"ђ","&dlcorn;":"⌞","&dlcrop;":"⌍","&dollar;":"$","&dopf;":"𝕕","&dot;":"˙","&doteq;":"≐","&doteqdot;":"≑","&dotminus;":"∸","&dotplus;":"∔","&dotsquare;":"⊡","&doublebarwedge;":"⌆","&downarrow;":"↓","&downdownarrows;":"⇊","&downharpoonleft;":"⇃","&downharpoonright;":"⇂","&drbkarow;":"⤐","&drcorn;":"⌟","&drcrop;":"⌌","&dscr;":"𝒹","&dscy;":"ѕ","&dsol;":"⧶","&dstrok;":"đ","&dtdot;":"⋱","&dtri;":"▿","&dtrif;":"▾","&duarr;":"⇵","&duhar;":"⥯","&dwangle;":"⦦","&dzcy;":"џ","&dzigrarr;":"⟿","&eDDot;":"⩷","&eDot;":"≑","&eacute":"é","&eacute;":"é","&easter;":"⩮","&ecaron;":"ě","&ecir;":"≖","&ecirc":"ê","&ecirc;":"ê","&ecolon;":"≕","&ecy;":"э","&edot;":"ė","&ee;":"ⅇ","&efDot;":"≒","&efr;":"𝔢","&eg;":"⪚","&egrave":"è","&egrave;":"è","&egs;":"⪖","&egsdot;":"⪘","&el;":"⪙","&elinters;":"⏧","&ell;":"ℓ","&els;":"⪕","&elsdot;":"⪗","&emacr;":"ē","&empty;":"∅","&emptyset;":"∅","&emptyv;":"∅","&emsp13;":" ","&emsp14;":" ","&emsp;":" ","&eng;":"ŋ","&ensp;":" ","&eogon;":"ę","&eopf;":"𝕖","&epar;":"⋕","&eparsl;":"⧣","&eplus;":"⩱","&epsi;":"ε","&epsilon;":"ε","&epsiv;":"ϵ","&eqcirc;":"≖","&eqcolon;":"≕","&eqsim;":"≂","&eqslantgtr;":"⪖","&eqslantless;":"⪕","&equals;":"=","&equest;":"≟","&equiv;":"≡","&equivDD;":"⩸","&eqvparsl;":"⧥","&erDot;":"≓","&erarr;":"⥱","&escr;":"ℯ","&esdot;":"≐","&esim;":"≂","&eta;":"η","&eth":"ð","&eth;":"ð","&euml":"ë","&euml;":"ë","&euro;":"€","&excl;":"!","&exist;":"∃","&expectation;":"ℰ","&exponentiale;":"ⅇ","&fallingdotseq;":"≒","&fcy;":"ф","&female;":"♀","&ffilig;":"ﬃ","&fflig;":"ﬀ","&ffllig;":"ﬄ","&ffr;":"𝔣","&filig;":"ﬁ","&fjlig;":"fj","&flat;":"♭","&fllig;":"ﬂ","&fltns;":"▱","&fnof;":"ƒ","&fopf;":"𝕗","&forall;":"∀","&fork;":"⋔","&forkv;":"⫙","&fpartint;":"⨍","&frac12":"½","&frac12;":"½","&frac13;":"⅓","&frac14":"¼","&frac14;":"¼","&frac15;":"⅕","&frac16;":"⅙","&frac18;":"⅛","&frac23;":"⅔","&frac25;":"⅖","&frac34":"¾","&frac34;":"¾","&frac35;":"⅗","&frac38;":"⅜","&frac45;":"⅘","&frac56;":"⅚","&frac58;":"⅝","&frac78;":"⅞","&frasl;":"⁄","&frown;":"⌢","&fscr;":"𝒻","&gE;":"≧","&gEl;":"⪌","&gacute;":"ǵ","&gamma;":"γ","&gammad;":"ϝ","&gap;":"⪆","&gbreve;":"ğ","&gcirc;":"ĝ","&gcy;":"г","&gdot;":"ġ","&ge;":"≥","&gel;":"⋛","&geq;":"≥","&geqq;":"≧","&geqslant;":"⩾","&ges;":"⩾","&gescc;":"⪩","&gesdot;":"⪀","&gesdoto;":"⪂","&gesdotol;":"⪄","&gesl;":"⋛︀","&gesles;":"⪔","&gfr;":"𝔤","&gg;":"≫","&ggg;":"⋙","&gimel;":"ℷ","&gjcy;":"ѓ","&gl;":"≷","&glE;":"⪒","&gla;":"⪥","&glj;":"⪤","&gnE;":"≩","&gnap;":"⪊","&gnapprox;":"⪊","&gne;":"⪈","&gneq;":"⪈","&gneqq;":"≩","&gnsim;":"⋧","&gopf;":"𝕘","&grave;":"`","&gscr;":"ℊ","&gsim;":"≳","&gsime;":"⪎","&gsiml;":"⪐","&gt":">","&gt;":">","&gtcc;":"⪧","&gtcir;":"⩺","&gtdot;":"⋗","&gtlPar;":"⦕","&gtquest;":"⩼","&gtrapprox;":"⪆","&gtrarr;":"⥸","&gtrdot;":"⋗","&gtreqless;":"⋛","&gtreqqless;":"⪌","&gtrless;":"≷","&gtrsim;":"≳","&gvertneqq;":"≩︀","&gvnE;":"≩︀","&hArr;":"⇔","&hairsp;":" ","&half;":"½","&hamilt;":"ℋ","&hardcy;":"ъ","&harr;":"↔","&harrcir;":"⥈","&harrw;":"↭","&hbar;":"ℏ","&hcirc;":"ĥ","&hearts;":"♥","&heartsuit;":"♥","&hellip;":"…","&hercon;":"⊹","&hfr;":"𝔥","&hksearow;":"⤥","&hkswarow;":"⤦","&hoarr;":"⇿","&homtht;":"∻","&hookleftarrow;":"↩","&hookrightarrow;":"↪","&hopf;":"𝕙","&horbar;":"―","&hscr;":"𝒽","&hslash;":"ℏ","&hstrok;":"ħ","&hybull;":"⁃","&hyphen;":"‐","&iacute":"í","&iacute;":"í","&ic;":"⁣","&icirc":"î","&icirc;":"î","&icy;":"и","&iecy;":"е","&iexcl":"¡","&iexcl;":"¡","&iff;":"⇔","&ifr;":"𝔦","&igrave":"ì","&igrave;":"ì","&ii;":"ⅈ","&iiiint;":"⨌","&iiint;":"∭","&iinfin;":"⧜","&iiota;":"℩","&ijlig;":"ĳ","&imacr;":"ī","&image;":"ℑ","&imagline;":"ℐ","&imagpart;":"ℑ","&imath;":"ı","&imof;":"⊷","&imped;":"Ƶ","&in;":"∈","&incare;":"℅","&infin;":"∞","&infintie;":"⧝","&inodot;":"ı","&int;":"∫","&intcal;":"⊺","&integers;":"ℤ","&intercal;":"⊺","&intlarhk;":"⨗","&intprod;":"⨼","&iocy;":"ё","&iogon;":"į","&iopf;":"𝕚","&iota;":"ι","&iprod;":"⨼","&iquest":"¿","&iquest;":"¿","&iscr;":"𝒾","&isin;":"∈","&isinE;":"⋹","&isindot;":"⋵","&isins;":"⋴","&isinsv;":"⋳","&isinv;":"∈","&it;":"⁢","&itilde;":"ĩ","&iukcy;":"і","&iuml":"ï","&iuml;":"ï","&jcirc;":"ĵ","&jcy;":"й","&jfr;":"𝔧","&jmath;":"ȷ","&jopf;":"𝕛","&jscr;":"𝒿","&jsercy;":"ј","&jukcy;":"є","&kappa;":"κ","&kappav;":"ϰ","&kcedil;":"ķ","&kcy;":"к","&kfr;":"𝔨","&kgreen;":"ĸ","&khcy;":"х","&kjcy;":"ќ","&kopf;":"𝕜","&kscr;":"𝓀","&lAarr;":"⇚","&lArr;":"⇐","&lAtail;":"⤛","&lBarr;":"⤎","&lE;":"≦","&lEg;":"⪋","&lHar;":"⥢","&lacute;":"ĺ","&laemptyv;":"⦴","&lagran;":"ℒ","&lambda;":"λ","&lang;":"⟨","&langd;":"⦑","&langle;":"⟨","&lap;":"⪅","&laquo":"«","&laquo;":"«","&larr;":"←","&larrb;":"⇤","&larrbfs;":"⤟","&larrfs;":"⤝","&larrhk;":"↩","&larrlp;":"↫","&larrpl;":"⤹","&larrsim;":"⥳","&larrtl;":"↢","&lat;":"⪫","&latail;":"⤙","&late;":"⪭","&lates;":"⪭︀","&lbarr;":"⤌","&lbbrk;":"❲","&lbrace;":"{","&lbrack;":"[","&lbrke;":"⦋","&lbrksld;":"⦏","&lbrkslu;":"⦍","&lcaron;":"ľ","&lcedil;":"ļ","&lceil;":"⌈","&lcub;":"{","&lcy;":"л","&ldca;":"⤶","&ldquo;":"“","&ldquor;":"„","&ldrdhar;":"⥧","&ldrushar;":"⥋","&ldsh;":"↲","&le;":"≤","&leftarrow;":"←","&leftarrowtail;":"↢","&leftharpoondown;":"↽","&leftharpoonup;":"↼","&leftleftarrows;":"⇇","&leftrightarrow;":"↔","&leftrightarrows;":"⇆","&leftrightharpoons;":"⇋","&leftrightsquigarrow;":"↭","&leftthreetimes;":"⋋","&leg;":"⋚","&leq;":"≤","&leqq;":"≦","&leqslant;":"⩽","&les;":"⩽","&lescc;":"⪨","&lesdot;":"⩿","&lesdoto;":"⪁","&lesdotor;":"⪃","&lesg;":"⋚︀","&lesges;":"⪓","&lessapprox;":"⪅","&lessdot;":"⋖","&lesseqgtr;":"⋚","&lesseqqgtr;":"⪋","&lessgtr;":"≶","&lesssim;":"≲","&lfisht;":"⥼","&lfloor;":"⌊","&lfr;":"𝔩","&lg;":"≶","&lgE;":"⪑","&lhard;":"↽","&lharu;":"↼","&lharul;":"⥪","&lhblk;":"▄","&ljcy;":"љ","&ll;":"≪","&llarr;":"⇇","&llcorner;":"⌞","&llhard;":"⥫","&lltri;":"◺","&lmidot;":"ŀ","&lmoust;":"⎰","&lmoustache;":"⎰","&lnE;":"≨","&lnap;":"⪉","&lnapprox;":"⪉","&lne;":"⪇","&lneq;":"⪇","&lneqq;":"≨","&lnsim;":"⋦","&loang;":"⟬","&loarr;":"⇽","&lobrk;":"⟦","&longleftarrow;":"⟵","&longleftrightarrow;":"⟷","&longmapsto;":"⟼","&longrightarrow;":"⟶","&looparrowleft;":"↫","&looparrowright;":"↬","&lopar;":"⦅","&lopf;":"𝕝","&loplus;":"⨭","&lotimes;":"⨴","&lowast;":"∗","&lowbar;":"_","&loz;":"◊","&lozenge;":"◊","&lozf;":"⧫","&lpar;":"(","&lparlt;":"⦓","&lrarr;":"⇆","&lrcorner;":"⌟","&lrhar;":"⇋","&lrhard;":"⥭","&lrm;":"‎","&lrtri;":"⊿","&lsaquo;":"‹","&lscr;":"𝓁","&lsh;":"↰","&lsim;":"≲","&lsime;":"⪍","&lsimg;":"⪏","&lsqb;":"[","&lsquo;":"‘","&lsquor;":"‚","&lstrok;":"ł","&lt":"<","&lt;":"<","&ltcc;":"⪦","&ltcir;":"⩹","&ltdot;":"⋖","&lthree;":"⋋","&ltimes;":"⋉","&ltlarr;":"⥶","&ltquest;":"⩻","&ltrPar;":"⦖","&ltri;":"◃","&ltrie;":"⊴","&ltrif;":"◂","&lurdshar;":"⥊","&luruhar;":"⥦","&lvertneqq;":"≨︀","&lvnE;":"≨︀","&mDDot;":"∺","&macr":"¯","&macr;":"¯","&male;":"♂","&malt;":"✠","&maltese;":"✠","&map;":"↦","&mapsto;":"↦","&mapstodown;":"↧","&mapstoleft;":"↤","&mapstoup;":"↥","&marker;":"▮","&mcomma;":"⨩","&mcy;":"м","&mdash;":"—","&measuredangle;":"∡","&mfr;":"𝔪","&mho;":"℧","&micro":"µ","&micro;":"µ","&mid;":"∣","&midast;":"*","&midcir;":"⫰","&middot":"·","&middot;":"·","&minus;":"−","&minusb;":"⊟","&minusd;":"∸","&minusdu;":"⨪","&mlcp;":"⫛","&mldr;":"…","&mnplus;":"∓","&models;":"⊧","&mopf;":"𝕞","&mp;":"∓","&mscr;":"𝓂","&mstpos;":"∾","&mu;":"μ","&multimap;":"⊸","&mumap;":"⊸","&nGg;":"⋙̸","&nGt;":"≫⃒","&nGtv;":"≫̸","&nLeftarrow;":"⇍","&nLeftrightarrow;":"⇎","&nLl;":"⋘̸","&nLt;":"≪⃒","&nLtv;":"≪̸","&nRightarrow;":"⇏","&nVDash;":"⊯","&nVdash;":"⊮","&nabla;":"∇","&nacute;":"ń","&nang;":"∠⃒","&nap;":"≉","&napE;":"⩰̸","&napid;":"≋̸","&napos;":"ŉ","&napprox;":"≉","&natur;":"♮","&natural;":"♮","&naturals;":"ℕ","&nbsp":" ","&nbsp;":" ","&nbump;":"≎̸","&nbumpe;":"≏̸","&ncap;":"⩃","&ncaron;":"ň","&ncedil;":"ņ","&ncong;":"≇","&ncongdot;":"⩭̸","&ncup;":"⩂","&ncy;":"н","&ndash;":"–","&ne;":"≠","&neArr;":"⇗","&nearhk;":"⤤","&nearr;":"↗","&nearrow;":"↗","&nedot;":"≐̸","&nequiv;":"≢","&nesear;":"⤨","&nesim;":"≂̸","&nexist;":"∄","&nexists;":"∄","&nfr;":"𝔫","&ngE;":"≧̸","&nge;":"≱","&ngeq;":"≱","&ngeqq;":"≧̸","&ngeqslant;":"⩾̸","&nges;":"⩾̸","&ngsim;":"≵","&ngt;":"≯","&ngtr;":"≯","&nhArr;":"⇎","&nharr;":"↮","&nhpar;":"⫲","&ni;":"∋","&nis;":"⋼","&nisd;":"⋺","&niv;":"∋","&njcy;":"њ","&nlArr;":"⇍","&nlE;":"≦̸","&nlarr;":"↚","&nldr;":"‥","&nle;":"≰","&nleftarrow;":"↚","&nleftrightarrow;":"↮","&nleq;":"≰","&nleqq;":"≦̸","&nleqslant;":"⩽̸","&nles;":"⩽̸","&nless;":"≮","&nlsim;":"≴","&nlt;":"≮","&nltri;":"⋪","&nltrie;":"⋬","&nmid;":"∤","&nopf;":"𝕟","&not":"¬","&not;":"¬","&notin;":"∉","&notinE;":"⋹̸","&notindot;":"⋵̸","&notinva;":"∉","&notinvb;":"⋷","&notinvc;":"⋶","&notni;":"∌","&notniva;":"∌","&notnivb;":"⋾","&notnivc;":"⋽","&npar;":"∦","&nparallel;":"∦","&nparsl;":"⫽⃥","&npart;":"∂̸","&npolint;":"⨔","&npr;":"⊀","&nprcue;":"⋠","&npre;":"⪯̸","&nprec;":"⊀","&npreceq;":"⪯̸","&nrArr;":"⇏","&nrarr;":"↛","&nrarrc;":"⤳̸","&nrarrw;":"↝̸","&nrightarrow;":"↛","&nrtri;":"⋫","&nrtrie;":"⋭","&nsc;":"⊁","&nsccue;":"⋡","&nsce;":"⪰̸","&nscr;":"𝓃","&nshortmid;":"∤","&nshortparallel;":"∦","&nsim;":"≁","&nsime;":"≄","&nsimeq;":"≄","&nsmid;":"∤","&nspar;":"∦","&nsqsube;":"⋢","&nsqsupe;":"⋣","&nsub;":"⊄","&nsubE;":"⫅̸","&nsube;":"⊈","&nsubset;":"⊂⃒","&nsubseteq;":"⊈","&nsubseteqq;":"⫅̸","&nsucc;":"⊁","&nsucceq;":"⪰̸","&nsup;":"⊅","&nsupE;":"⫆̸","&nsupe;":"⊉","&nsupset;":"⊃⃒","&nsupseteq;":"⊉","&nsupseteqq;":"⫆̸","&ntgl;":"≹","&ntilde":"ñ","&ntilde;":"ñ","&ntlg;":"≸","&ntriangleleft;":"⋪","&ntrianglelefteq;":"⋬","&ntriangleright;":"⋫","&ntrianglerighteq;":"⋭","&nu;":"ν","&num;":"#","&numero;":"№","&numsp;":" ","&nvDash;":"⊭","&nvHarr;":"⤄","&nvap;":"≍⃒","&nvdash;":"⊬","&nvge;":"≥⃒","&nvgt;":">⃒","&nvinfin;":"⧞","&nvlArr;":"⤂","&nvle;":"≤⃒","&nvlt;":"<⃒","&nvltrie;":"⊴⃒","&nvrArr;":"⤃","&nvrtrie;":"⊵⃒","&nvsim;":"∼⃒","&nwArr;":"⇖","&nwarhk;":"⤣","&nwarr;":"↖","&nwarrow;":"↖","&nwnear;":"⤧","&oS;":"Ⓢ","&oacute":"ó","&oacute;":"ó","&oast;":"⊛","&ocir;":"⊚","&ocirc":"ô","&ocirc;":"ô","&ocy;":"о","&odash;":"⊝","&odblac;":"ő","&odiv;":"⨸","&odot;":"⊙","&odsold;":"⦼","&oelig;":"œ","&ofcir;":"⦿","&ofr;":"𝔬","&ogon;":"˛","&ograve":"ò","&ograve;":"ò","&ogt;":"⧁","&ohbar;":"⦵","&ohm;":"Ω","&oint;":"∮","&olarr;":"↺","&olcir;":"⦾","&olcross;":"⦻","&oline;":"‾","&olt;":"⧀","&omacr;":"ō","&omega;":"ω","&omicron;":"ο","&omid;":"⦶","&ominus;":"⊖","&oopf;":"𝕠","&opar;":"⦷","&operp;":"⦹","&oplus;":"⊕","&or;":"∨","&orarr;":"↻","&ord;":"⩝","&order;":"ℴ","&orderof;":"ℴ","&ordf":"ª","&ordf;":"ª","&ordm":"º","&ordm;":"º","&origof;":"⊶","&oror;":"⩖","&orslope;":"⩗","&orv;":"⩛","&oscr;":"ℴ","&oslash":"ø","&oslash;":"ø","&osol;":"⊘","&otilde":"õ","&otilde;":"õ","&otimes;":"⊗","&otimesas;":"⨶","&ouml":"ö","&ouml;":"ö","&ovbar;":"⌽","&par;":"∥","&para":"¶","&para;":"¶","&parallel;":"∥","&parsim;":"⫳","&parsl;":"⫽","&part;":"∂","&pcy;":"п","&percnt;":"%","&period;":".","&permil;":"‰","&perp;":"⊥","&pertenk;":"‱","&pfr;":"𝔭","&phi;":"φ","&phiv;":"ϕ","&phmmat;":"ℳ","&phone;":"☎","&pi;":"π","&pitchfork;":"⋔","&piv;":"ϖ","&planck;":"ℏ","&planckh;":"ℎ","&plankv;":"ℏ","&plus;":"+","&plusacir;":"⨣","&plusb;":"⊞","&pluscir;":"⨢","&plusdo;":"∔","&plusdu;":"⨥","&pluse;":"⩲","&plusmn":"±","&plusmn;":"±","&plussim;":"⨦","&plustwo;":"⨧","&pm;":"±","&pointint;":"⨕","&popf;":"𝕡","&pound":"£","&pound;":"£","&pr;":"≺","&prE;":"⪳","&prap;":"⪷","&prcue;":"≼","&pre;":"⪯","&prec;":"≺","&precapprox;":"⪷","&preccurlyeq;":"≼","&preceq;":"⪯","&precnapprox;":"⪹","&precneqq;":"⪵","&precnsim;":"⋨","&precsim;":"≾","&prime;":"′","&primes;":"ℙ","&prnE;":"⪵","&prnap;":"⪹","&prnsim;":"⋨","&prod;":"∏","&profalar;":"⌮","&profline;":"⌒","&profsurf;":"⌓","&prop;":"∝","&propto;":"∝","&prsim;":"≾","&prurel;":"⊰","&pscr;":"𝓅","&psi;":"ψ","&puncsp;":" ","&qfr;":"𝔮","&qint;":"⨌","&qopf;":"𝕢","&qprime;":"⁗","&qscr;":"𝓆","&quaternions;":"ℍ","&quatint;":"⨖","&quest;":"?","&questeq;":"≟","&quot":'"',"&quot;":'"',"&rAarr;":"⇛","&rArr;":"⇒","&rAtail;":"⤜","&rBarr;":"⤏","&rHar;":"⥤","&race;":"∽̱","&racute;":"ŕ","&radic;":"√","&raemptyv;":"⦳","&rang;":"⟩","&rangd;":"⦒","&range;":"⦥","&rangle;":"⟩","&raquo":"»","&raquo;":"»","&rarr;":"→","&rarrap;":"⥵","&rarrb;":"⇥","&rarrbfs;":"⤠","&rarrc;":"⤳","&rarrfs;":"⤞","&rarrhk;":"↪","&rarrlp;":"↬","&rarrpl;":"⥅","&rarrsim;":"⥴","&rarrtl;":"↣","&rarrw;":"↝","&ratail;":"⤚","&ratio;":"∶","&rationals;":"ℚ","&rbarr;":"⤍","&rbbrk;":"❳","&rbrace;":"}","&rbrack;":"]","&rbrke;":"⦌","&rbrksld;":"⦎","&rbrkslu;":"⦐","&rcaron;":"ř","&rcedil;":"ŗ","&rceil;":"⌉","&rcub;":"}","&rcy;":"р","&rdca;":"⤷","&rdldhar;":"⥩","&rdquo;":"”","&rdquor;":"”","&rdsh;":"↳","&real;":"ℜ","&realine;":"ℛ","&realpart;":"ℜ","&reals;":"ℝ","&rect;":"▭","&reg":"®","&reg;":"®","&rfisht;":"⥽","&rfloor;":"⌋","&rfr;":"𝔯","&rhard;":"⇁","&rharu;":"⇀","&rharul;":"⥬","&rho;":"ρ","&rhov;":"ϱ","&rightarrow;":"→","&rightarrowtail;":"↣","&rightharpoondown;":"⇁","&rightharpoonup;":"⇀","&rightleftarrows;":"⇄","&rightleftharpoons;":"⇌","&rightrightarrows;":"⇉","&rightsquigarrow;":"↝","&rightthreetimes;":"⋌","&ring;":"˚","&risingdotseq;":"≓","&rlarr;":"⇄","&rlhar;":"⇌","&rlm;":"‏","&rmoust;":"⎱","&rmoustache;":"⎱","&rnmid;":"⫮","&roang;":"⟭","&roarr;":"⇾","&robrk;":"⟧","&ropar;":"⦆","&ropf;":"𝕣","&roplus;":"⨮","&rotimes;":"⨵","&rpar;":")","&rpargt;":"⦔","&rppolint;":"⨒","&rrarr;":"⇉","&rsaquo;":"›","&rscr;":"𝓇","&rsh;":"↱","&rsqb;":"]","&rsquo;":"’","&rsquor;":"’","&rthree;":"⋌","&rtimes;":"⋊","&rtri;":"▹","&rtrie;":"⊵","&rtrif;":"▸","&rtriltri;":"⧎","&ruluhar;":"⥨","&rx;":"℞","&sacute;":"ś","&sbquo;":"‚","&sc;":"≻","&scE;":"⪴","&scap;":"⪸","&scaron;":"š","&sccue;":"≽","&sce;":"⪰","&scedil;":"ş","&scirc;":"ŝ","&scnE;":"⪶","&scnap;":"⪺","&scnsim;":"⋩","&scpolint;":"⨓","&scsim;":"≿","&scy;":"с","&sdot;":"⋅","&sdotb;":"⊡","&sdote;":"⩦","&seArr;":"⇘","&searhk;":"⤥","&searr;":"↘","&searrow;":"↘","&sect":"§","&sect;":"§","&semi;":";","&seswar;":"⤩","&setminus;":"∖","&setmn;":"∖","&sext;":"✶","&sfr;":"𝔰","&sfrown;":"⌢","&sharp;":"♯","&shchcy;":"щ","&shcy;":"ш","&shortmid;":"∣","&shortparallel;":"∥","&shy":"­","&shy;":"­","&sigma;":"σ","&sigmaf;":"ς","&sigmav;":"ς","&sim;":"∼","&simdot;":"⩪","&sime;":"≃","&simeq;":"≃","&simg;":"⪞","&simgE;":"⪠","&siml;":"⪝","&simlE;":"⪟","&simne;":"≆","&simplus;":"⨤","&simrarr;":"⥲","&slarr;":"←","&smallsetminus;":"∖","&smashp;":"⨳","&smeparsl;":"⧤","&smid;":"∣","&smile;":"⌣","&smt;":"⪪","&smte;":"⪬","&smtes;":"⪬︀","&softcy;":"ь","&sol;":"/","&solb;":"⧄","&solbar;":"⌿","&sopf;":"𝕤","&spades;":"♠","&spadesuit;":"♠","&spar;":"∥","&sqcap;":"⊓","&sqcaps;":"⊓︀","&sqcup;":"⊔","&sqcups;":"⊔︀","&sqsub;":"⊏","&sqsube;":"⊑","&sqsubset;":"⊏","&sqsubseteq;":"⊑","&sqsup;":"⊐","&sqsupe;":"⊒","&sqsupset;":"⊐","&sqsupseteq;":"⊒","&squ;":"□","&square;":"□","&squarf;":"▪","&squf;":"▪","&srarr;":"→","&sscr;":"𝓈","&ssetmn;":"∖","&ssmile;":"⌣","&sstarf;":"⋆","&star;":"☆","&starf;":"★","&straightepsilon;":"ϵ","&straightphi;":"ϕ","&strns;":"¯","&sub;":"⊂","&subE;":"⫅","&subdot;":"⪽","&sube;":"⊆","&subedot;":"⫃","&submult;":"⫁","&subnE;":"⫋","&subne;":"⊊","&subplus;":"⪿","&subrarr;":"⥹","&subset;":"⊂","&subseteq;":"⊆","&subseteqq;":"⫅","&subsetneq;":"⊊","&subsetneqq;":"⫋","&subsim;":"⫇","&subsub;":"⫕","&subsup;":"⫓","&succ;":"≻","&succapprox;":"⪸","&succcurlyeq;":"≽","&succeq;":"⪰","&succnapprox;":"⪺","&succneqq;":"⪶","&succnsim;":"⋩","&succsim;":"≿","&sum;":"∑","&sung;":"♪","&sup1":"¹","&sup1;":"¹","&sup2":"²","&sup2;":"²","&sup3":"³","&sup3;":"³","&sup;":"⊃","&supE;":"⫆","&supdot;":"⪾","&supdsub;":"⫘","&supe;":"⊇","&supedot;":"⫄","&suphsol;":"⟉","&suphsub;":"⫗","&suplarr;":"⥻","&supmult;":"⫂","&supnE;":"⫌","&supne;":"⊋","&supplus;":"⫀","&supset;":"⊃","&supseteq;":"⊇","&supseteqq;":"⫆","&supsetneq;":"⊋","&supsetneqq;":"⫌","&supsim;":"⫈","&supsub;":"⫔","&supsup;":"⫖","&swArr;":"⇙","&swarhk;":"⤦","&swarr;":"↙","&swarrow;":"↙","&swnwar;":"⤪","&szlig":"ß","&szlig;":"ß","&target;":"⌖","&tau;":"τ","&tbrk;":"⎴","&tcaron;":"ť","&tcedil;":"ţ","&tcy;":"т","&tdot;":"⃛","&telrec;":"⌕","&tfr;":"𝔱","&there4;":"∴","&therefore;":"∴","&theta;":"θ","&thetasym;":"ϑ","&thetav;":"ϑ","&thickapprox;":"≈","&thicksim;":"∼","&thinsp;":" ","&thkap;":"≈","&thksim;":"∼","&thorn":"þ","&thorn;":"þ","&tilde;":"˜","&times":"×","&times;":"×","&timesb;":"⊠","&timesbar;":"⨱","&timesd;":"⨰","&tint;":"∭","&toea;":"⤨","&top;":"⊤","&topbot;":"⌶","&topcir;":"⫱","&topf;":"𝕥","&topfork;":"⫚","&tosa;":"⤩","&tprime;":"‴","&trade;":"™","&triangle;":"▵","&triangledown;":"▿","&triangleleft;":"◃","&trianglelefteq;":"⊴","&triangleq;":"≜","&triangleright;":"▹","&trianglerighteq;":"⊵","&tridot;":"◬","&trie;":"≜","&triminus;":"⨺","&triplus;":"⨹","&trisb;":"⧍","&tritime;":"⨻","&trpezium;":"⏢","&tscr;":"𝓉","&tscy;":"ц","&tshcy;":"ћ","&tstrok;":"ŧ","&twixt;":"≬","&twoheadleftarrow;":"↞","&twoheadrightarrow;":"↠","&uArr;":"⇑","&uHar;":"⥣","&uacute":"ú","&uacute;":"ú","&uarr;":"↑","&ubrcy;":"ў","&ubreve;":"ŭ","&ucirc":"û","&ucirc;":"û","&ucy;":"у","&udarr;":"⇅","&udblac;":"ű","&udhar;":"⥮","&ufisht;":"⥾","&ufr;":"𝔲","&ugrave":"ù","&ugrave;":"ù","&uharl;":"↿","&uharr;":"↾","&uhblk;":"▀","&ulcorn;":"⌜","&ulcorner;":"⌜","&ulcrop;":"⌏","&ultri;":"◸","&umacr;":"ū","&uml":"¨","&uml;":"¨","&uogon;":"ų","&uopf;":"𝕦","&uparrow;":"↑","&updownarrow;":"↕","&upharpoonleft;":"↿","&upharpoonright;":"↾","&uplus;":"⊎","&upsi;":"υ","&upsih;":"ϒ","&upsilon;":"υ","&upuparrows;":"⇈","&urcorn;":"⌝","&urcorner;":"⌝","&urcrop;":"⌎","&uring;":"ů","&urtri;":"◹","&uscr;":"𝓊","&utdot;":"⋰","&utilde;":"ũ","&utri;":"▵","&utrif;":"▴","&uuarr;":"⇈","&uuml":"ü","&uuml;":"ü","&uwangle;":"⦧","&vArr;":"⇕","&vBar;":"⫨","&vBarv;":"⫩","&vDash;":"⊨","&vangrt;":"⦜","&varepsilon;":"ϵ","&varkappa;":"ϰ","&varnothing;":"∅","&varphi;":"ϕ","&varpi;":"ϖ","&varpropto;":"∝","&varr;":"↕","&varrho;":"ϱ","&varsigma;":"ς","&varsubsetneq;":"⊊︀","&varsubsetneqq;":"⫋︀","&varsupsetneq;":"⊋︀","&varsupsetneqq;":"⫌︀","&vartheta;":"ϑ","&vartriangleleft;":"⊲","&vartriangleright;":"⊳","&vcy;":"в","&vdash;":"⊢","&vee;":"∨","&veebar;":"⊻","&veeeq;":"≚","&vellip;":"⋮","&verbar;":"|","&vert;":"|","&vfr;":"𝔳","&vltri;":"⊲","&vnsub;":"⊂⃒","&vnsup;":"⊃⃒","&vopf;":"𝕧","&vprop;":"∝","&vrtri;":"⊳","&vscr;":"𝓋","&vsubnE;":"⫋︀","&vsubne;":"⊊︀","&vsupnE;":"⫌︀","&vsupne;":"⊋︀","&vzigzag;":"⦚","&wcirc;":"ŵ","&wedbar;":"⩟","&wedge;":"∧","&wedgeq;":"≙","&weierp;":"℘","&wfr;":"𝔴","&wopf;":"𝕨","&wp;":"℘","&wr;":"≀","&wreath;":"≀","&wscr;":"𝓌","&xcap;":"⋂","&xcirc;":"◯","&xcup;":"⋃","&xdtri;":"▽","&xfr;":"𝔵","&xhArr;":"⟺","&xharr;":"⟷","&xi;":"ξ","&xlArr;":"⟸","&xlarr;":"⟵","&xmap;":"⟼","&xnis;":"⋻","&xodot;":"⨀","&xopf;":"𝕩","&xoplus;":"⨁","&xotime;":"⨂","&xrArr;":"⟹","&xrarr;":"⟶","&xscr;":"𝓍","&xsqcup;":"⨆","&xuplus;":"⨄","&xutri;":"△","&xvee;":"⋁","&xwedge;":"⋀","&yacute":"ý","&yacute;":"ý","&yacy;":"я","&ycirc;":"ŷ","&ycy;":"ы","&yen":"¥","&yen;":"¥","&yfr;":"𝔶","&yicy;":"ї","&yopf;":"𝕪","&yscr;":"𝓎","&yucy;":"ю","&yuml":"ÿ","&yuml;":"ÿ","&zacute;":"ź","&zcaron;":"ž","&zcy;":"з","&zdot;":"ż","&zeetrf;":"ℨ","&zeta;":"ζ","&zfr;":"𝔷","&zhcy;":"ж","&zigrarr;":"⇝","&zopf;":"𝕫","&zscr;":"𝓏","&zwj;":"‍","&zwnj;":"‌"},characters:{"Æ":"&AElig;","&":"&amp;","Á":"&Aacute;","Ă":"&Abreve;","Â":"&Acirc;","А":"&Acy;","𝔄":"&Afr;","À":"&Agrave;","Α":"&Alpha;","Ā":"&Amacr;","⩓":"&And;","Ą":"&Aogon;","𝔸":"&Aopf;","⁡":"&af;","Å":"&angst;","𝒜":"&Ascr;","≔":"&coloneq;","Ã":"&Atilde;","Ä":"&Auml;","∖":"&ssetmn;","⫧":"&Barv;","⌆":"&doublebarwedge;","Б":"&Bcy;","∵":"&because;","ℬ":"&bernou;","Β":"&Beta;","𝔅":"&Bfr;","𝔹":"&Bopf;","˘":"&breve;","≎":"&bump;","Ч":"&CHcy;","©":"&copy;","Ć":"&Cacute;","⋒":"&Cap;","ⅅ":"&DD;","ℭ":"&Cfr;","Č":"&Ccaron;","Ç":"&Ccedil;","Ĉ":"&Ccirc;","∰":"&Cconint;","Ċ":"&Cdot;","¸":"&cedil;","·":"&middot;","Χ":"&Chi;","⊙":"&odot;","⊖":"&ominus;","⊕":"&oplus;","⊗":"&otimes;","∲":"&cwconint;","”":"&rdquor;","’":"&rsquor;","∷":"&Proportion;","⩴":"&Colone;","≡":"&equiv;","∯":"&DoubleContourIntegral;","∮":"&oint;","ℂ":"&complexes;","∐":"&coprod;","∳":"&awconint;","⨯":"&Cross;","𝒞":"&Cscr;","⋓":"&Cup;","≍":"&asympeq;","⤑":"&DDotrahd;","Ђ":"&DJcy;","Ѕ":"&DScy;","Џ":"&DZcy;","‡":"&ddagger;","↡":"&Darr;","⫤":"&DoubleLeftTee;","Ď":"&Dcaron;","Д":"&Dcy;","∇":"&nabla;","Δ":"&Delta;","𝔇":"&Dfr;","´":"&acute;","˙":"&dot;","˝":"&dblac;","`":"&grave;","˜":"&tilde;","⋄":"&diamond;","ⅆ":"&dd;","𝔻":"&Dopf;","¨":"&uml;","⃜":"&DotDot;","≐":"&esdot;","⇓":"&dArr;","⇐":"&lArr;","⇔":"&iff;","⟸":"&xlArr;","⟺":"&xhArr;","⟹":"&xrArr;","⇒":"&rArr;","⊨":"&vDash;","⇑":"&uArr;","⇕":"&vArr;","∥":"&spar;","↓":"&downarrow;","⤓":"&DownArrowBar;","⇵":"&duarr;","̑":"&DownBreve;","⥐":"&DownLeftRightVector;","⥞":"&DownLeftTeeVector;","↽":"&lhard;","⥖":"&DownLeftVectorBar;","⥟":"&DownRightTeeVector;","⇁":"&rightharpoondown;","⥗":"&DownRightVectorBar;","⊤":"&top;","↧":"&mapstodown;","𝒟":"&Dscr;","Đ":"&Dstrok;","Ŋ":"&ENG;","Ð":"&ETH;","É":"&Eacute;","Ě":"&Ecaron;","Ê":"&Ecirc;","Э":"&Ecy;","Ė":"&Edot;","𝔈":"&Efr;","È":"&Egrave;","∈":"&isinv;","Ē":"&Emacr;","◻":"&EmptySmallSquare;","▫":"&EmptyVerySmallSquare;","Ę":"&Eogon;","𝔼":"&Eopf;","Ε":"&Epsilon;","⩵":"&Equal;","≂":"&esim;","⇌":"&rlhar;","ℰ":"&expectation;","⩳":"&Esim;","Η":"&Eta;","Ë":"&Euml;","∃":"&exist;","ⅇ":"&exponentiale;","Ф":"&Fcy;","𝔉":"&Ffr;","◼":"&FilledSmallSquare;","▪":"&squf;","𝔽":"&Fopf;","∀":"&forall;","ℱ":"&Fscr;","Ѓ":"&GJcy;",">":"&gt;","Γ":"&Gamma;","Ϝ":"&Gammad;","Ğ":"&Gbreve;","Ģ":"&Gcedil;","Ĝ":"&Gcirc;","Г":"&Gcy;","Ġ":"&Gdot;","𝔊":"&Gfr;","⋙":"&ggg;","𝔾":"&Gopf;","≥":"&geq;","⋛":"&gtreqless;","≧":"&geqq;","⪢":"&GreaterGreater;","≷":"&gtrless;","⩾":"&ges;","≳":"&gtrsim;","𝒢":"&Gscr;","≫":"&gg;","Ъ":"&HARDcy;","ˇ":"&caron;","^":"&Hat;","Ĥ":"&Hcirc;","ℌ":"&Poincareplane;","ℋ":"&hamilt;","ℍ":"&quaternions;","─":"&boxh;","Ħ":"&Hstrok;","≏":"&bumpeq;","Е":"&IEcy;","Ĳ":"&IJlig;","Ё":"&IOcy;","Í":"&Iacute;","Î":"&Icirc;","И":"&Icy;","İ":"&Idot;","ℑ":"&imagpart;","Ì":"&Igrave;","Ī":"&Imacr;","ⅈ":"&ii;","∬":"&Int;","∫":"&int;","⋂":"&xcap;","⁣":"&ic;","⁢":"&it;","Į":"&Iogon;","𝕀":"&Iopf;","Ι":"&Iota;","ℐ":"&imagline;","Ĩ":"&Itilde;","І":"&Iukcy;","Ï":"&Iuml;","Ĵ":"&Jcirc;","Й":"&Jcy;","𝔍":"&Jfr;","𝕁":"&Jopf;","𝒥":"&Jscr;","Ј":"&Jsercy;","Є":"&Jukcy;","Х":"&KHcy;","Ќ":"&KJcy;","Κ":"&Kappa;","Ķ":"&Kcedil;","К":"&Kcy;","𝔎":"&Kfr;","𝕂":"&Kopf;","𝒦":"&Kscr;","Љ":"&LJcy;","<":"&lt;","Ĺ":"&Lacute;","Λ":"&Lambda;","⟪":"&Lang;","ℒ":"&lagran;","↞":"&twoheadleftarrow;","Ľ":"&Lcaron;","Ļ":"&Lcedil;","Л":"&Lcy;","⟨":"&langle;","←":"&slarr;","⇤":"&larrb;","⇆":"&lrarr;","⌈":"&lceil;","⟦":"&lobrk;","⥡":"&LeftDownTeeVector;","⇃":"&downharpoonleft;","⥙":"&LeftDownVectorBar;","⌊":"&lfloor;","↔":"&leftrightarrow;","⥎":"&LeftRightVector;","⊣":"&dashv;","↤":"&mapstoleft;","⥚":"&LeftTeeVector;","⊲":"&vltri;","⧏":"&LeftTriangleBar;","⊴":"&trianglelefteq;","⥑":"&LeftUpDownVector;","⥠":"&LeftUpTeeVector;","↿":"&upharpoonleft;","⥘":"&LeftUpVectorBar;","↼":"&lharu;","⥒":"&LeftVectorBar;","⋚":"&lesseqgtr;","≦":"&leqq;","≶":"&lg;","⪡":"&LessLess;","⩽":"&les;","≲":"&lsim;","𝔏":"&Lfr;","⋘":"&Ll;","⇚":"&lAarr;","Ŀ":"&Lmidot;","⟵":"&xlarr;","⟷":"&xharr;","⟶":"&xrarr;","𝕃":"&Lopf;","↙":"&swarrow;","↘":"&searrow;","↰":"&lsh;","Ł":"&Lstrok;","≪":"&ll;","⤅":"&Map;","М":"&Mcy;"," ":"&MediumSpace;","ℳ":"&phmmat;","𝔐":"&Mfr;","∓":"&mp;","𝕄":"&Mopf;","Μ":"&Mu;","Њ":"&NJcy;","Ń":"&Nacute;","Ň":"&Ncaron;","Ņ":"&Ncedil;","Н":"&Ncy;","​":"&ZeroWidthSpace;","\n":"&NewLine;","𝔑":"&Nfr;","⁠":"&NoBreak;"," ":"&nbsp;","ℕ":"&naturals;","⫬":"&Not;","≢":"&nequiv;","≭":"&NotCupCap;","∦":"&nspar;","∉":"&notinva;","≠":"&ne;","≂̸":"&nesim;","∄":"&nexists;","≯":"&ngtr;","≱":"&ngeq;","≧̸":"&ngeqq;","≫̸":"&nGtv;","≹":"&ntgl;","⩾̸":"&nges;","≵":"&ngsim;","≎̸":"&nbump;","≏̸":"&nbumpe;","⋪":"&ntriangleleft;","⧏̸":"&NotLeftTriangleBar;","⋬":"&ntrianglelefteq;","≮":"&nlt;","≰":"&nleq;","≸":"&ntlg;","≪̸":"&nLtv;","⩽̸":"&nles;","≴":"&nlsim;","⪢̸":"&NotNestedGreaterGreater;","⪡̸":"&NotNestedLessLess;","⊀":"&nprec;","⪯̸":"&npreceq;","⋠":"&nprcue;","∌":"&notniva;","⋫":"&ntriangleright;","⧐̸":"&NotRightTriangleBar;","⋭":"&ntrianglerighteq;","⊏̸":"&NotSquareSubset;","⋢":"&nsqsube;","⊐̸":"&NotSquareSuperset;","⋣":"&nsqsupe;","⊂⃒":"&vnsub;","⊈":"&nsubseteq;","⊁":"&nsucc;","⪰̸":"&nsucceq;","⋡":"&nsccue;","≿̸":"&NotSucceedsTilde;","⊃⃒":"&vnsup;","⊉":"&nsupseteq;","≁":"&nsim;","≄":"&nsimeq;","≇":"&ncong;","≉":"&napprox;","∤":"&nsmid;","𝒩":"&Nscr;","Ñ":"&Ntilde;","Ν":"&Nu;","Œ":"&OElig;","Ó":"&Oacute;","Ô":"&Ocirc;","О":"&Ocy;","Ő":"&Odblac;","𝔒":"&Ofr;","Ò":"&Ograve;","Ō":"&Omacr;","Ω":"&ohm;","Ο":"&Omicron;","𝕆":"&Oopf;","“":"&ldquo;","‘":"&lsquo;","⩔":"&Or;","𝒪":"&Oscr;","Ø":"&Oslash;","Õ":"&Otilde;","⨷":"&Otimes;","Ö":"&Ouml;","‾":"&oline;","⏞":"&OverBrace;","⎴":"&tbrk;","⏜":"&OverParenthesis;","∂":"&part;","П":"&Pcy;","𝔓":"&Pfr;","Φ":"&Phi;","Π":"&Pi;","±":"&pm;","ℙ":"&primes;","⪻":"&Pr;","≺":"&prec;","⪯":"&preceq;","≼":"&preccurlyeq;","≾":"&prsim;","″":"&Prime;","∏":"&prod;","∝":"&vprop;","𝒫":"&Pscr;","Ψ":"&Psi;",'"':"&quot;","𝔔":"&Qfr;","ℚ":"&rationals;","𝒬":"&Qscr;","⤐":"&drbkarow;","®":"&reg;","Ŕ":"&Racute;","⟫":"&Rang;","↠":"&twoheadrightarrow;","⤖":"&Rarrtl;","Ř":"&Rcaron;","Ŗ":"&Rcedil;","Р":"&Rcy;","ℜ":"&realpart;","∋":"&niv;","⇋":"&lrhar;","⥯":"&duhar;","Ρ":"&Rho;","⟩":"&rangle;","→":"&srarr;","⇥":"&rarrb;","⇄":"&rlarr;","⌉":"&rceil;","⟧":"&robrk;","⥝":"&RightDownTeeVector;","⇂":"&downharpoonright;","⥕":"&RightDownVectorBar;","⌋":"&rfloor;","⊢":"&vdash;","↦":"&mapsto;","⥛":"&RightTeeVector;","⊳":"&vrtri;","⧐":"&RightTriangleBar;","⊵":"&trianglerighteq;","⥏":"&RightUpDownVector;","⥜":"&RightUpTeeVector;","↾":"&upharpoonright;","⥔":"&RightUpVectorBar;","⇀":"&rightharpoonup;","⥓":"&RightVectorBar;","ℝ":"&reals;","⥰":"&RoundImplies;","⇛":"&rAarr;","ℛ":"&realine;","↱":"&rsh;","⧴":"&RuleDelayed;","Щ":"&SHCHcy;","Ш":"&SHcy;","Ь":"&SOFTcy;","Ś":"&Sacute;","⪼":"&Sc;","Š":"&Scaron;","Ş":"&Scedil;","Ŝ":"&Scirc;","С":"&Scy;","𝔖":"&Sfr;","↑":"&uparrow;","Σ":"&Sigma;","∘":"&compfn;","𝕊":"&Sopf;","√":"&radic;","□":"&square;","⊓":"&sqcap;","⊏":"&sqsubset;","⊑":"&sqsubseteq;","⊐":"&sqsupset;","⊒":"&sqsupseteq;","⊔":"&sqcup;","𝒮":"&Sscr;","⋆":"&sstarf;","⋐":"&Subset;","⊆":"&subseteq;","≻":"&succ;","⪰":"&succeq;","≽":"&succcurlyeq;","≿":"&succsim;","∑":"&sum;","⋑":"&Supset;","⊃":"&supset;","⊇":"&supseteq;","Þ":"&THORN;","™":"&trade;","Ћ":"&TSHcy;","Ц":"&TScy;","\t":"&Tab;","Τ":"&Tau;","Ť":"&Tcaron;","Ţ":"&Tcedil;","Т":"&Tcy;","𝔗":"&Tfr;","∴":"&therefore;","Θ":"&Theta;","  ":"&ThickSpace;"," ":"&thinsp;","∼":"&thksim;","≃":"&simeq;","≅":"&cong;","≈":"&thkap;","𝕋":"&Topf;","⃛":"&tdot;","𝒯":"&Tscr;","Ŧ":"&Tstrok;","Ú":"&Uacute;","↟":"&Uarr;","⥉":"&Uarrocir;","Ў":"&Ubrcy;","Ŭ":"&Ubreve;","Û":"&Ucirc;","У":"&Ucy;","Ű":"&Udblac;","𝔘":"&Ufr;","Ù":"&Ugrave;","Ū":"&Umacr;",_:"&lowbar;","⏟":"&UnderBrace;","⎵":"&bbrk;","⏝":"&UnderParenthesis;","⋃":"&xcup;","⊎":"&uplus;","Ų":"&Uogon;","𝕌":"&Uopf;","⤒":"&UpArrowBar;","⇅":"&udarr;","↕":"&varr;","⥮":"&udhar;","⊥":"&perp;","↥":"&mapstoup;","↖":"&nwarrow;","↗":"&nearrow;","ϒ":"&upsih;","Υ":"&Upsilon;","Ů":"&Uring;","𝒰":"&Uscr;","Ũ":"&Utilde;","Ü":"&Uuml;","⊫":"&VDash;","⫫":"&Vbar;","В":"&Vcy;","⊩":"&Vdash;","⫦":"&Vdashl;","⋁":"&xvee;","‖":"&Vert;","∣":"&smid;","|":"&vert;","❘":"&VerticalSeparator;","≀":"&wreath;"," ":"&hairsp;","𝔙":"&Vfr;","𝕍":"&Vopf;","𝒱":"&Vscr;","⊪":"&Vvdash;","Ŵ":"&Wcirc;","⋀":"&xwedge;","𝔚":"&Wfr;","𝕎":"&Wopf;","𝒲":"&Wscr;","𝔛":"&Xfr;","Ξ":"&Xi;","𝕏":"&Xopf;","𝒳":"&Xscr;","Я":"&YAcy;","Ї":"&YIcy;","Ю":"&YUcy;","Ý":"&Yacute;","Ŷ":"&Ycirc;","Ы":"&Ycy;","𝔜":"&Yfr;","𝕐":"&Yopf;","𝒴":"&Yscr;","Ÿ":"&Yuml;","Ж":"&ZHcy;","Ź":"&Zacute;","Ž":"&Zcaron;","З":"&Zcy;","Ż":"&Zdot;","Ζ":"&Zeta;","ℨ":"&zeetrf;","ℤ":"&integers;","𝒵":"&Zscr;","á":"&aacute;","ă":"&abreve;","∾":"&mstpos;","∾̳":"&acE;","∿":"&acd;","â":"&acirc;","а":"&acy;","æ":"&aelig;","𝔞":"&afr;","à":"&agrave;","ℵ":"&aleph;","α":"&alpha;","ā":"&amacr;","⨿":"&amalg;","∧":"&wedge;","⩕":"&andand;","⩜":"&andd;","⩘":"&andslope;","⩚":"&andv;","∠":"&angle;","⦤":"&ange;","∡":"&measuredangle;","⦨":"&angmsdaa;","⦩":"&angmsdab;","⦪":"&angmsdac;","⦫":"&angmsdad;","⦬":"&angmsdae;","⦭":"&angmsdaf;","⦮":"&angmsdag;","⦯":"&angmsdah;","∟":"&angrt;","⊾":"&angrtvb;","⦝":"&angrtvbd;","∢":"&angsph;","⍼":"&angzarr;","ą":"&aogon;","𝕒":"&aopf;","⩰":"&apE;","⩯":"&apacir;","≊":"&approxeq;","≋":"&apid;","'":"&apos;","å":"&aring;","𝒶":"&ascr;","*":"&midast;","ã":"&atilde;","ä":"&auml;","⨑":"&awint;","⫭":"&bNot;","≌":"&bcong;","϶":"&bepsi;","‵":"&bprime;","∽":"&bsim;","⋍":"&bsime;","⊽":"&barvee;","⌅":"&barwedge;","⎶":"&bbrktbrk;","б":"&bcy;","„":"&ldquor;","⦰":"&bemptyv;","β":"&beta;","ℶ":"&beth;","≬":"&twixt;","𝔟":"&bfr;","◯":"&xcirc;","⨀":"&xodot;","⨁":"&xoplus;","⨂":"&xotime;","⨆":"&xsqcup;","★":"&starf;","▽":"&xdtri;","△":"&xutri;","⨄":"&xuplus;","⤍":"&rbarr;","⧫":"&lozf;","▴":"&utrif;","▾":"&dtrif;","◂":"&ltrif;","▸":"&rtrif;","␣":"&blank;","▒":"&blk12;","░":"&blk14;","▓":"&blk34;","█":"&block;","=⃥":"&bne;","≡⃥":"&bnequiv;","⌐":"&bnot;","𝕓":"&bopf;","⋈":"&bowtie;","╗":"&boxDL;","╔":"&boxDR;","╖":"&boxDl;","╓":"&boxDr;","═":"&boxH;","╦":"&boxHD;","╩":"&boxHU;","╤":"&boxHd;","╧":"&boxHu;","╝":"&boxUL;","╚":"&boxUR;","╜":"&boxUl;","╙":"&boxUr;","║":"&boxV;","╬":"&boxVH;","╣":"&boxVL;","╠":"&boxVR;","╫":"&boxVh;","╢":"&boxVl;","╟":"&boxVr;","⧉":"&boxbox;","╕":"&boxdL;","╒":"&boxdR;","┐":"&boxdl;","┌":"&boxdr;","╥":"&boxhD;","╨":"&boxhU;","┬":"&boxhd;","┴":"&boxhu;","⊟":"&minusb;","⊞":"&plusb;","⊠":"&timesb;","╛":"&boxuL;","╘":"&boxuR;","┘":"&boxul;","└":"&boxur;","│":"&boxv;","╪":"&boxvH;","╡":"&boxvL;","╞":"&boxvR;","┼":"&boxvh;","┤":"&boxvl;","├":"&boxvr;","¦":"&brvbar;","𝒷":"&bscr;","⁏":"&bsemi;","\\":"&bsol;","⧅":"&bsolb;","⟈":"&bsolhsub;","•":"&bullet;","⪮":"&bumpE;","ć":"&cacute;","∩":"&cap;","⩄":"&capand;","⩉":"&capbrcup;","⩋":"&capcap;","⩇":"&capcup;","⩀":"&capdot;","∩︀":"&caps;","⁁":"&caret;","⩍":"&ccaps;","č":"&ccaron;","ç":"&ccedil;","ĉ":"&ccirc;","⩌":"&ccups;","⩐":"&ccupssm;","ċ":"&cdot;","⦲":"&cemptyv;","¢":"&cent;","𝔠":"&cfr;","ч":"&chcy;","✓":"&checkmark;","χ":"&chi;","○":"&cir;","⧃":"&cirE;","ˆ":"&circ;","≗":"&cire;","↺":"&olarr;","↻":"&orarr;","Ⓢ":"&oS;","⊛":"&oast;","⊚":"&ocir;","⊝":"&odash;","⨐":"&cirfnint;","⫯":"&cirmid;","⧂":"&cirscir;","♣":"&clubsuit;",":":"&colon;",",":"&comma;","@":"&commat;","∁":"&complement;","⩭":"&congdot;","𝕔":"&copf;","℗":"&copysr;","↵":"&crarr;","✗":"&cross;","𝒸":"&cscr;","⫏":"&csub;","⫑":"&csube;","⫐":"&csup;","⫒":"&csupe;","⋯":"&ctdot;","⤸":"&cudarrl;","⤵":"&cudarrr;","⋞":"&curlyeqprec;","⋟":"&curlyeqsucc;","↶":"&curvearrowleft;","⤽":"&cularrp;","∪":"&cup;","⩈":"&cupbrcap;","⩆":"&cupcap;","⩊":"&cupcup;","⊍":"&cupdot;","⩅":"&cupor;","∪︀":"&cups;","↷":"&curvearrowright;","⤼":"&curarrm;","⋎":"&cuvee;","⋏":"&cuwed;","¤":"&curren;","∱":"&cwint;","⌭":"&cylcty;","⥥":"&dHar;","†":"&dagger;","ℸ":"&daleth;","‐":"&hyphen;","⤏":"&rBarr;","ď":"&dcaron;","д":"&dcy;","⇊":"&downdownarrows;","⩷":"&eDDot;","°":"&deg;","δ":"&delta;","⦱":"&demptyv;","⥿":"&dfisht;","𝔡":"&dfr;","♦":"&diams;","ϝ":"&gammad;","⋲":"&disin;","÷":"&divide;","⋇":"&divonx;","ђ":"&djcy;","⌞":"&llcorner;","⌍":"&dlcrop;",$:"&dollar;","𝕕":"&dopf;","≑":"&eDot;","∸":"&minusd;","∔":"&plusdo;","⊡":"&sdotb;","⌟":"&lrcorner;","⌌":"&drcrop;","𝒹":"&dscr;","ѕ":"&dscy;","⧶":"&dsol;","đ":"&dstrok;","⋱":"&dtdot;","▿":"&triangledown;","⦦":"&dwangle;","џ":"&dzcy;","⟿":"&dzigrarr;","é":"&eacute;","⩮":"&easter;","ě":"&ecaron;","≖":"&eqcirc;","ê":"&ecirc;","≕":"&eqcolon;","э":"&ecy;","ė":"&edot;","≒":"&fallingdotseq;","𝔢":"&efr;","⪚":"&eg;","è":"&egrave;","⪖":"&eqslantgtr;","⪘":"&egsdot;","⪙":"&el;","⏧":"&elinters;","ℓ":"&ell;","⪕":"&eqslantless;","⪗":"&elsdot;","ē":"&emacr;","∅":"&varnothing;"," ":"&emsp13;"," ":"&emsp14;"," ":"&emsp;","ŋ":"&eng;"," ":"&ensp;","ę":"&eogon;","𝕖":"&eopf;","⋕":"&epar;","⧣":"&eparsl;","⩱":"&eplus;","ε":"&epsilon;","ϵ":"&varepsilon;","=":"&equals;","≟":"&questeq;","⩸":"&equivDD;","⧥":"&eqvparsl;","≓":"&risingdotseq;","⥱":"&erarr;","ℯ":"&escr;","η":"&eta;","ð":"&eth;","ë":"&euml;","€":"&euro;","!":"&excl;","ф":"&fcy;","♀":"&female;","ﬃ":"&ffilig;","ﬀ":"&fflig;","ﬄ":"&ffllig;","𝔣":"&ffr;","ﬁ":"&filig;",fj:"&fjlig;","♭":"&flat;","ﬂ":"&fllig;","▱":"&fltns;","ƒ":"&fnof;","𝕗":"&fopf;","⋔":"&pitchfork;","⫙":"&forkv;","⨍":"&fpartint;","½":"&half;","⅓":"&frac13;","¼":"&frac14;","⅕":"&frac15;","⅙":"&frac16;","⅛":"&frac18;","⅔":"&frac23;","⅖":"&frac25;","¾":"&frac34;","⅗":"&frac35;","⅜":"&frac38;","⅘":"&frac45;","⅚":"&frac56;","⅝":"&frac58;","⅞":"&frac78;","⁄":"&frasl;","⌢":"&sfrown;","𝒻":"&fscr;","⪌":"&gtreqqless;","ǵ":"&gacute;","γ":"&gamma;","⪆":"&gtrapprox;","ğ":"&gbreve;","ĝ":"&gcirc;","г":"&gcy;","ġ":"&gdot;","⪩":"&gescc;","⪀":"&gesdot;","⪂":"&gesdoto;","⪄":"&gesdotol;","⋛︀":"&gesl;","⪔":"&gesles;","𝔤":"&gfr;","ℷ":"&gimel;","ѓ":"&gjcy;","⪒":"&glE;","⪥":"&gla;","⪤":"&glj;","≩":"&gneqq;","⪊":"&gnapprox;","⪈":"&gneq;","⋧":"&gnsim;","𝕘":"&gopf;","ℊ":"&gscr;","⪎":"&gsime;","⪐":"&gsiml;","⪧":"&gtcc;","⩺":"&gtcir;","⋗":"&gtrdot;","⦕":"&gtlPar;","⩼":"&gtquest;","⥸":"&gtrarr;","≩︀":"&gvnE;","ъ":"&hardcy;","⥈":"&harrcir;","↭":"&leftrightsquigarrow;","ℏ":"&plankv;","ĥ":"&hcirc;","♥":"&heartsuit;","…":"&mldr;","⊹":"&hercon;","𝔥":"&hfr;","⤥":"&searhk;","⤦":"&swarhk;","⇿":"&hoarr;","∻":"&homtht;","↩":"&larrhk;","↪":"&rarrhk;","𝕙":"&hopf;","―":"&horbar;","𝒽":"&hscr;","ħ":"&hstrok;","⁃":"&hybull;","í":"&iacute;","î":"&icirc;","и":"&icy;","е":"&iecy;","¡":"&iexcl;","𝔦":"&ifr;","ì":"&igrave;","⨌":"&qint;","∭":"&tint;","⧜":"&iinfin;","℩":"&iiota;","ĳ":"&ijlig;","ī":"&imacr;","ı":"&inodot;","⊷":"&imof;","Ƶ":"&imped;","℅":"&incare;","∞":"&infin;","⧝":"&infintie;","⊺":"&intercal;","⨗":"&intlarhk;","⨼":"&iprod;","ё":"&iocy;","į":"&iogon;","𝕚":"&iopf;","ι":"&iota;","¿":"&iquest;","𝒾":"&iscr;","⋹":"&isinE;","⋵":"&isindot;","⋴":"&isins;","⋳":"&isinsv;","ĩ":"&itilde;","і":"&iukcy;","ï":"&iuml;","ĵ":"&jcirc;","й":"&jcy;","𝔧":"&jfr;","ȷ":"&jmath;","𝕛":"&jopf;","𝒿":"&jscr;","ј":"&jsercy;","є":"&jukcy;","κ":"&kappa;","ϰ":"&varkappa;","ķ":"&kcedil;","к":"&kcy;","𝔨":"&kfr;","ĸ":"&kgreen;","х":"&khcy;","ќ":"&kjcy;","𝕜":"&kopf;","𝓀":"&kscr;","⤛":"&lAtail;","⤎":"&lBarr;","⪋":"&lesseqqgtr;","⥢":"&lHar;","ĺ":"&lacute;","⦴":"&laemptyv;","λ":"&lambda;","⦑":"&langd;","⪅":"&lessapprox;","«":"&laquo;","⤟":"&larrbfs;","⤝":"&larrfs;","↫":"&looparrowleft;","⤹":"&larrpl;","⥳":"&larrsim;","↢":"&leftarrowtail;","⪫":"&lat;","⤙":"&latail;","⪭":"&late;","⪭︀":"&lates;","⤌":"&lbarr;","❲":"&lbbrk;","{":"&lcub;","[":"&lsqb;","⦋":"&lbrke;","⦏":"&lbrksld;","⦍":"&lbrkslu;","ľ":"&lcaron;","ļ":"&lcedil;","л":"&lcy;","⤶":"&ldca;","⥧":"&ldrdhar;","⥋":"&ldrushar;","↲":"&ldsh;","≤":"&leq;","⇇":"&llarr;","⋋":"&lthree;","⪨":"&lescc;","⩿":"&lesdot;","⪁":"&lesdoto;","⪃":"&lesdotor;","⋚︀":"&lesg;","⪓":"&lesges;","⋖":"&ltdot;","⥼":"&lfisht;","𝔩":"&lfr;","⪑":"&lgE;","⥪":"&lharul;","▄":"&lhblk;","љ":"&ljcy;","⥫":"&llhard;","◺":"&lltri;","ŀ":"&lmidot;","⎰":"&lmoustache;","≨":"&lneqq;","⪉":"&lnapprox;","⪇":"&lneq;","⋦":"&lnsim;","⟬":"&loang;","⇽":"&loarr;","⟼":"&xmap;","↬":"&rarrlp;","⦅":"&lopar;","𝕝":"&lopf;","⨭":"&loplus;","⨴":"&lotimes;","∗":"&lowast;","◊":"&lozenge;","(":"&lpar;","⦓":"&lparlt;","⥭":"&lrhard;","‎":"&lrm;","⊿":"&lrtri;","‹":"&lsaquo;","𝓁":"&lscr;","⪍":"&lsime;","⪏":"&lsimg;","‚":"&sbquo;","ł":"&lstrok;","⪦":"&ltcc;","⩹":"&ltcir;","⋉":"&ltimes;","⥶":"&ltlarr;","⩻":"&ltquest;","⦖":"&ltrPar;","◃":"&triangleleft;","⥊":"&lurdshar;","⥦":"&luruhar;","≨︀":"&lvnE;","∺":"&mDDot;","¯":"&strns;","♂":"&male;","✠":"&maltese;","▮":"&marker;","⨩":"&mcomma;","м":"&mcy;","—":"&mdash;","𝔪":"&mfr;","℧":"&mho;","µ":"&micro;","⫰":"&midcir;","−":"&minus;","⨪":"&minusdu;","⫛":"&mlcp;","⊧":"&models;","𝕞":"&mopf;","𝓂":"&mscr;","μ":"&mu;","⊸":"&mumap;","⋙̸":"&nGg;","≫⃒":"&nGt;","⇍":"&nlArr;","⇎":"&nhArr;","⋘̸":"&nLl;","≪⃒":"&nLt;","⇏":"&nrArr;","⊯":"&nVDash;","⊮":"&nVdash;","ń":"&nacute;","∠⃒":"&nang;","⩰̸":"&napE;","≋̸":"&napid;","ŉ":"&napos;","♮":"&natural;","⩃":"&ncap;","ň":"&ncaron;","ņ":"&ncedil;","⩭̸":"&ncongdot;","⩂":"&ncup;","н":"&ncy;","–":"&ndash;","⇗":"&neArr;","⤤":"&nearhk;","≐̸":"&nedot;","⤨":"&toea;","𝔫":"&nfr;","↮":"&nleftrightarrow;","⫲":"&nhpar;","⋼":"&nis;","⋺":"&nisd;","њ":"&njcy;","≦̸":"&nleqq;","↚":"&nleftarrow;","‥":"&nldr;","𝕟":"&nopf;","¬":"&not;","⋹̸":"&notinE;","⋵̸":"&notindot;","⋷":"&notinvb;","⋶":"&notinvc;","⋾":"&notnivb;","⋽":"&notnivc;","⫽⃥":"&nparsl;","∂̸":"&npart;","⨔":"&npolint;","↛":"&nrightarrow;","⤳̸":"&nrarrc;","↝̸":"&nrarrw;","𝓃":"&nscr;","⊄":"&nsub;","⫅̸":"&nsubseteqq;","⊅":"&nsup;","⫆̸":"&nsupseteqq;","ñ":"&ntilde;","ν":"&nu;","#":"&num;","№":"&numero;"," ":"&numsp;","⊭":"&nvDash;","⤄":"&nvHarr;","≍⃒":"&nvap;","⊬":"&nvdash;","≥⃒":"&nvge;",">⃒":"&nvgt;","⧞":"&nvinfin;","⤂":"&nvlArr;","≤⃒":"&nvle;","<⃒":"&nvlt;","⊴⃒":"&nvltrie;","⤃":"&nvrArr;","⊵⃒":"&nvrtrie;","∼⃒":"&nvsim;","⇖":"&nwArr;","⤣":"&nwarhk;","⤧":"&nwnear;","ó":"&oacute;","ô":"&ocirc;","о":"&ocy;","ő":"&odblac;","⨸":"&odiv;","⦼":"&odsold;","œ":"&oelig;","⦿":"&ofcir;","𝔬":"&ofr;","˛":"&ogon;","ò":"&ograve;","⧁":"&ogt;","⦵":"&ohbar;","⦾":"&olcir;","⦻":"&olcross;","⧀":"&olt;","ō":"&omacr;","ω":"&omega;","ο":"&omicron;","⦶":"&omid;","𝕠":"&oopf;","⦷":"&opar;","⦹":"&operp;","∨":"&vee;","⩝":"&ord;","ℴ":"&oscr;","ª":"&ordf;","º":"&ordm;","⊶":"&origof;","⩖":"&oror;","⩗":"&orslope;","⩛":"&orv;","ø":"&oslash;","⊘":"&osol;","õ":"&otilde;","⨶":"&otimesas;","ö":"&ouml;","⌽":"&ovbar;","¶":"&para;","⫳":"&parsim;","⫽":"&parsl;","п":"&pcy;","%":"&percnt;",".":"&period;","‰":"&permil;","‱":"&pertenk;","𝔭":"&pfr;","φ":"&phi;","ϕ":"&varphi;","☎":"&phone;","π":"&pi;","ϖ":"&varpi;","ℎ":"&planckh;","+":"&plus;","⨣":"&plusacir;","⨢":"&pluscir;","⨥":"&plusdu;","⩲":"&pluse;","⨦":"&plussim;","⨧":"&plustwo;","⨕":"&pointint;","𝕡":"&popf;","£":"&pound;","⪳":"&prE;","⪷":"&precapprox;","⪹":"&prnap;","⪵":"&prnE;","⋨":"&prnsim;","′":"&prime;","⌮":"&profalar;","⌒":"&profline;","⌓":"&profsurf;","⊰":"&prurel;","𝓅":"&pscr;","ψ":"&psi;"," ":"&puncsp;","𝔮":"&qfr;","𝕢":"&qopf;","⁗":"&qprime;","𝓆":"&qscr;","⨖":"&quatint;","?":"&quest;","⤜":"&rAtail;","⥤":"&rHar;","∽̱":"&race;","ŕ":"&racute;","⦳":"&raemptyv;","⦒":"&rangd;","⦥":"&range;","»":"&raquo;","⥵":"&rarrap;","⤠":"&rarrbfs;","⤳":"&rarrc;","⤞":"&rarrfs;","⥅":"&rarrpl;","⥴":"&rarrsim;","↣":"&rightarrowtail;","↝":"&rightsquigarrow;","⤚":"&ratail;","∶":"&ratio;","❳":"&rbbrk;","}":"&rcub;","]":"&rsqb;","⦌":"&rbrke;","⦎":"&rbrksld;","⦐":"&rbrkslu;","ř":"&rcaron;","ŗ":"&rcedil;","р":"&rcy;","⤷":"&rdca;","⥩":"&rdldhar;","↳":"&rdsh;","▭":"&rect;","⥽":"&rfisht;","𝔯":"&rfr;","⥬":"&rharul;","ρ":"&rho;","ϱ":"&varrho;","⇉":"&rrarr;","⋌":"&rthree;","˚":"&ring;","‏":"&rlm;","⎱":"&rmoustache;","⫮":"&rnmid;","⟭":"&roang;","⇾":"&roarr;","⦆":"&ropar;","𝕣":"&ropf;","⨮":"&roplus;","⨵":"&rotimes;",")":"&rpar;","⦔":"&rpargt;","⨒":"&rppolint;","›":"&rsaquo;","𝓇":"&rscr;","⋊":"&rtimes;","▹":"&triangleright;","⧎":"&rtriltri;","⥨":"&ruluhar;","℞":"&rx;","ś":"&sacute;","⪴":"&scE;","⪸":"&succapprox;","š":"&scaron;","ş":"&scedil;","ŝ":"&scirc;","⪶":"&succneqq;","⪺":"&succnapprox;","⋩":"&succnsim;","⨓":"&scpolint;","с":"&scy;","⋅":"&sdot;","⩦":"&sdote;","⇘":"&seArr;","§":"&sect;",";":"&semi;","⤩":"&tosa;","✶":"&sext;","𝔰":"&sfr;","♯":"&sharp;","щ":"&shchcy;","ш":"&shcy;","­":"&shy;","σ":"&sigma;","ς":"&varsigma;","⩪":"&simdot;","⪞":"&simg;","⪠":"&simgE;","⪝":"&siml;","⪟":"&simlE;","≆":"&simne;","⨤":"&simplus;","⥲":"&simrarr;","⨳":"&smashp;","⧤":"&smeparsl;","⌣":"&ssmile;","⪪":"&smt;","⪬":"&smte;","⪬︀":"&smtes;","ь":"&softcy;","/":"&sol;","⧄":"&solb;","⌿":"&solbar;","𝕤":"&sopf;","♠":"&spadesuit;","⊓︀":"&sqcaps;","⊔︀":"&sqcups;","𝓈":"&sscr;","☆":"&star;","⊂":"&subset;","⫅":"&subseteqq;","⪽":"&subdot;","⫃":"&subedot;","⫁":"&submult;","⫋":"&subsetneqq;","⊊":"&subsetneq;","⪿":"&subplus;","⥹":"&subrarr;","⫇":"&subsim;","⫕":"&subsub;","⫓":"&subsup;","♪":"&sung;","¹":"&sup1;","²":"&sup2;","³":"&sup3;","⫆":"&supseteqq;","⪾":"&supdot;","⫘":"&supdsub;","⫄":"&supedot;","⟉":"&suphsol;","⫗":"&suphsub;","⥻":"&suplarr;","⫂":"&supmult;","⫌":"&supsetneqq;","⊋":"&supsetneq;","⫀":"&supplus;","⫈":"&supsim;","⫔":"&supsub;","⫖":"&supsup;","⇙":"&swArr;","⤪":"&swnwar;","ß":"&szlig;","⌖":"&target;","τ":"&tau;","ť":"&tcaron;","ţ":"&tcedil;","т":"&tcy;","⌕":"&telrec;","𝔱":"&tfr;","θ":"&theta;","ϑ":"&vartheta;","þ":"&thorn;","×":"&times;","⨱":"&timesbar;","⨰":"&timesd;","⌶":"&topbot;","⫱":"&topcir;","𝕥":"&topf;","⫚":"&topfork;","‴":"&tprime;","▵":"&utri;","≜":"&trie;","◬":"&tridot;","⨺":"&triminus;","⨹":"&triplus;","⧍":"&trisb;","⨻":"&tritime;","⏢":"&trpezium;","𝓉":"&tscr;","ц":"&tscy;","ћ":"&tshcy;","ŧ":"&tstrok;","⥣":"&uHar;","ú":"&uacute;","ў":"&ubrcy;","ŭ":"&ubreve;","û":"&ucirc;","у":"&ucy;","ű":"&udblac;","⥾":"&ufisht;","𝔲":"&ufr;","ù":"&ugrave;","▀":"&uhblk;","⌜":"&ulcorner;","⌏":"&ulcrop;","◸":"&ultri;","ū":"&umacr;","ų":"&uogon;","𝕦":"&uopf;","υ":"&upsilon;","⇈":"&uuarr;","⌝":"&urcorner;","⌎":"&urcrop;","ů":"&uring;","◹":"&urtri;","𝓊":"&uscr;","⋰":"&utdot;","ũ":"&utilde;","ü":"&uuml;","⦧":"&uwangle;","⫨":"&vBar;","⫩":"&vBarv;","⦜":"&vangrt;","⊊︀":"&vsubne;","⫋︀":"&vsubnE;","⊋︀":"&vsupne;","⫌︀":"&vsupnE;","в":"&vcy;","⊻":"&veebar;","≚":"&veeeq;","⋮":"&vellip;","𝔳":"&vfr;","𝕧":"&vopf;","𝓋":"&vscr;","⦚":"&vzigzag;","ŵ":"&wcirc;","⩟":"&wedbar;","≙":"&wedgeq;","℘":"&wp;","𝔴":"&wfr;","𝕨":"&wopf;","𝓌":"&wscr;","𝔵":"&xfr;","ξ":"&xi;","⋻":"&xnis;","𝕩":"&xopf;","𝓍":"&xscr;","ý":"&yacute;","я":"&yacy;","ŷ":"&ycirc;","ы":"&ycy;","¥":"&yen;","𝔶":"&yfr;","ї":"&yicy;","𝕪":"&yopf;","𝓎":"&yscr;","ю":"&yucy;","ÿ":"&yuml;","ź":"&zacute;","ž":"&zcaron;","з":"&zcy;","ż":"&zdot;","ζ":"&zeta;","𝔷":"&zfr;","ж":"&zhcy;","⇝":"&zigrarr;","𝕫":"&zopf;","𝓏":"&zscr;","‍":"&zwj;","‌":"&zwnj;"}}};

/***/ }),

/***/ "./node_modules/html-entities/lib/numeric-unicode-map.js":
/*!***************************************************************!*\
  !*** ./node_modules/html-entities/lib/numeric-unicode-map.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.numericUnicodeMap={0:65533,128:8364,130:8218,131:402,132:8222,133:8230,134:8224,135:8225,136:710,137:8240,138:352,139:8249,140:338,142:381,145:8216,146:8217,147:8220,148:8221,149:8226,150:8211,151:8212,152:732,153:8482,154:353,155:8250,156:339,158:382,159:376};

/***/ }),

/***/ "./node_modules/html-entities/lib/surrogate-pairs.js":
/*!***********************************************************!*\
  !*** ./node_modules/html-entities/lib/surrogate-pairs.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
Object.defineProperty(exports, "__esModule", ({value:true}));exports.fromCodePoint=String.fromCodePoint||function(astralCodePoint){return String.fromCharCode(Math.floor((astralCodePoint-65536)/1024)+55296,(astralCodePoint-65536)%1024+56320)};exports.getCodePoint=String.prototype.codePointAt?function(input,position){return input.codePointAt(position)}:function(input,position){return(input.charCodeAt(position)-55296)*1024+input.charCodeAt(position+1)-56320+65536};exports.highSurrogateFrom=55296;exports.highSurrogateTo=56319;

/***/ }),

/***/ "./src/AssetManager.ts":
/*!*****************************!*\
  !*** ./src/AssetManager.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AssetManager = void 0;
class AssetManager {
    constructor(stage) {
        this.stage = stage;
        this.spriteSheets = [];
        this.spriteSheetsJSON = [];
        this.preloader = new createjs.LoadQueue();
        this.eventAllLoaded = new createjs.Event("allAssetsLoaded", true, false);
    }
    onLoaded(e) {
        console.log("asset loaded: " + e.item.src + " | asset type: " + e.item.type);
        switch (e.item.type) {
            case "json":
                let spriteSheetID = e.item.id;
                this.spriteSheetsJSON[spriteSheetID] = e.result;
                break;
            case "image":
                let id = e.item.id;
                let image = e.result;
                let data = this.spriteSheetsJSON[id];
                data.images = [image];
                let spriteSheet = new createjs.SpriteSheet(data);
                this.spriteSheets[id] = spriteSheet;
                break;
        }
    }
    onError(e) {
        console.log("ASSETMANAGER ERROR > Error Loading asset");
    }
    onComplete(e) {
        console.log(">> All assets loaded");
        this.spriteSheetsJSON = null;
        this.preloader.removeAllEventListeners();
        this.stage.dispatchEvent(this.eventAllLoaded);
    }
    getSprite(...args) {
        let [spriteSheetID, animationID, x, y] = args;
        let sprite = new createjs.Sprite(this.spriteSheets[spriteSheetID]);
        sprite.name = spriteSheetID;
        sprite.gotoAndStop(animationID);
        if (x == undefined) {
            x = 0;
            y = 0;
        }
        sprite.x = x;
        sprite.y = y;
        return sprite;
    }
    getSpriteSheet(spriteSheetID) {
        return this.spriteSheets[spriteSheetID];
    }
    loadAssets(manifest) {
        createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin, createjs.FlashAudioPlugin]);
        createjs.Sound.alternateExtensions = ["mp3", "wav"];
        this.preloader.installPlugin(createjs.Sound);
        this.preloader.on("fileload", this.onLoaded, this);
        this.preloader.on("error", this.onError, this);
        this.preloader.on("complete", this.onComplete, this);
        this.preloader.setMaxConnections(1);
        this.preloader.loadManifest(manifest);
    }
}
exports.AssetManager = AssetManager;


/***/ }),

/***/ "./src/Constants.ts":
/*!**************************!*\
  !*** ./src/Constants.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TESLA_IMPACT_DAMAGE = exports.TESLA_ROUND = exports.TESLA = exports.RAILGUN_SPEED = exports.RAILGUN_FIRE_DELAY = exports.RAILGUN_RELOAD_DELAY = exports.RAILGUN_MAG_SIZE = exports.RAILGUN_AMMO_MAX = exports.RAILGUN_DAMAGE = exports.RAILGUN_ROUND = exports.RAILGUN = exports.LASER_SPEED = exports.LASER_FIRE_DELAY = exports.LASER_RELOAD_DELAY = exports.LASER_MAG_SIZE = exports.LASER_AMMO_MAX = exports.LASER_DAMAGE = exports.LASER_ROUND = exports.LASER = exports.PISTOL_SPEED = exports.PISTOL_FIRE_DELAY = exports.PISTOL_RELOAD_DELAY = exports.PISTOL_MAG_SIZE = exports.PISTOL_AMMO_MAX = exports.PISTOL_DAMAGE = exports.PISTOL_ROUND = exports.PISTOL = exports.DEF_FIRE_DELAY = exports.DEF_PROJECTILE_DAMAGE = exports.DEF_PROJECTILE_SPEED = exports.PLAYER_PROJECTILE_MAX = exports.PROJECTILE_MAX = exports.LEVEL_SEVEN_THRESHOLD = exports.LEVEL_SIX_THRESHOLD = exports.LEVEL_FIVE_THRESHOLD = exports.LEVEL_FOUR_THRESHOLD = exports.LEVEL_THREE_THRESHOLD = exports.LEVEL_TWO_THRESHOLD = exports.LEVEL_ONE_THRESHOLD = exports.PICKUP_MAX = exports.ENEMY_MAX = exports.I_FRAMES_DEFAULT = exports.DEFAULT_HEALTH = exports.DEFAULT_SPEED = exports.DEFAULT_VOLUME = exports.FRAME_RATE = exports.HEIGHT_IN_TILES = exports.WIDTH_IN_TILES = exports.STAGE_HEIGHT = exports.STAGE_WIDTH = void 0;
exports.ASSET_MANIFEST = exports.LEVEL_DATA = exports.RIGHT_TO_BACK = exports.LEFT_TO_BACK = exports.FORWARD_RIGHT = exports.FORWARD_LEFT = exports.BACKCURVE_RIGHT = exports.BACKCURVE_LEFT = exports.BLANK = exports.FLOOR = exports.LEFT_CORNER = exports.RIGHT_CORNER = exports.FRONT_WALL = exports.BACK_WALL = exports.LEFT_WALL = exports.RIGHT_WALL = exports.NUMBER_OF_LEVELS = exports.ALIEN_CONTACT_DAMAGE = exports.ALIEN_BEAM_SPEED = exports.ALIEN_BEAM_DELAY = exports.ALIEN_BEAM_DAMAGE = exports.ALIEN_ROUND = exports.ALIEN_BEAM = exports.ROCKET_SPEED = exports.ROCKET_FIRE_DELAY = exports.ROCKET_RELOAD_DELAY = exports.ROCKET_SPLASH_DAMAGE = exports.ROCKET_IMPACT_DAMAGE = exports.ROCKET_MAG_SIZE = exports.ROCKET_AMMO_MAX = exports.ROCKET_ROUND = exports.ROCKET = exports.TESLA_SPEED = exports.TESLA_FIRE_DELAY = exports.TESLA_RELOAD_DELAY = exports.TESLA_MAG_SIZE = exports.TESLA_AMMO_MAX = exports.TESLA_CHAIN_DAMAGE = void 0;
exports.STAGE_WIDTH = 600;
exports.STAGE_HEIGHT = 600;
exports.WIDTH_IN_TILES = exports.STAGE_WIDTH / 40;
exports.HEIGHT_IN_TILES = exports.STAGE_HEIGHT / 40;
exports.FRAME_RATE = 30;
exports.DEFAULT_VOLUME = 1;
exports.DEFAULT_SPEED = 5;
exports.DEFAULT_HEALTH = 10;
exports.I_FRAMES_DEFAULT = 1000;
exports.ENEMY_MAX = 25;
exports.PICKUP_MAX = 4;
exports.LEVEL_ONE_THRESHOLD = 6;
exports.LEVEL_TWO_THRESHOLD = 12;
exports.LEVEL_THREE_THRESHOLD = 18;
exports.LEVEL_FOUR_THRESHOLD = 24;
exports.LEVEL_FIVE_THRESHOLD = 30;
exports.LEVEL_SIX_THRESHOLD = 36;
exports.LEVEL_SEVEN_THRESHOLD = 42;
exports.PROJECTILE_MAX = 20;
exports.PLAYER_PROJECTILE_MAX = 20;
exports.DEF_PROJECTILE_SPEED = 10;
exports.DEF_PROJECTILE_DAMAGE = 2;
exports.DEF_FIRE_DELAY = 500;
exports.PISTOL = "pistol";
exports.PISTOL_ROUND = "sprites/firstplayable/bullet";
exports.PISTOL_DAMAGE = 2;
exports.PISTOL_AMMO_MAX = 200;
exports.PISTOL_MAG_SIZE = 6;
exports.PISTOL_RELOAD_DELAY = 2000;
exports.PISTOL_FIRE_DELAY = 500;
exports.PISTOL_SPEED = 10;
exports.LASER = "laser";
exports.LASER_ROUND = "sprites/firstplayable/laser";
exports.LASER_DAMAGE = 3;
exports.LASER_AMMO_MAX = 100;
exports.LASER_MAG_SIZE = 10;
exports.LASER_RELOAD_DELAY = 2500;
exports.LASER_FIRE_DELAY = 250;
exports.LASER_SPEED = 8;
exports.RAILGUN = "railgun";
exports.RAILGUN_ROUND = "sprites/firstplayable/railgun bullet";
exports.RAILGUN_DAMAGE = 8;
exports.RAILGUN_AMMO_MAX = 80;
exports.RAILGUN_MAG_SIZE = 4;
exports.RAILGUN_RELOAD_DELAY = 3000;
exports.RAILGUN_FIRE_DELAY = 1666;
exports.RAILGUN_SPEED = 15;
exports.TESLA = "tesla";
exports.TESLA_ROUND = "sprites/firstplayable/electric bullet";
exports.TESLA_IMPACT_DAMAGE = 2;
exports.TESLA_CHAIN_DAMAGE = 2;
exports.TESLA_AMMO_MAX = 50;
exports.TESLA_MAG_SIZE = 4;
exports.TESLA_RELOAD_DELAY = 3000;
exports.TESLA_FIRE_DELAY = 1333;
exports.TESLA_SPEED = 5;
exports.ROCKET = "rocket";
exports.ROCKET_ROUND = "sprites/firstplayable/rocket";
exports.ROCKET_AMMO_MAX = 16;
exports.ROCKET_MAG_SIZE = 1;
exports.ROCKET_IMPACT_DAMAGE = 12;
exports.ROCKET_SPLASH_DAMAGE = 8;
exports.ROCKET_RELOAD_DELAY = 4000;
exports.ROCKET_FIRE_DELAY = 2333;
exports.ROCKET_SPEED = 10;
exports.ALIEN_BEAM = "alien_beam";
exports.ALIEN_ROUND = "sprites/firstplayable/bullet";
exports.ALIEN_BEAM_DAMAGE = 2;
exports.ALIEN_BEAM_DELAY = 2000;
exports.ALIEN_BEAM_SPEED = 7;
exports.ALIEN_CONTACT_DAMAGE = 1;
exports.NUMBER_OF_LEVELS = 5;
exports.RIGHT_WALL = "sprites/firstplayable/wall right 1";
exports.LEFT_WALL = "sprites/firstplayable/wall left 1";
exports.BACK_WALL = "sprites/firstplayable/wall back1";
exports.FRONT_WALL = "sprites/firstplayable/wall forward 1";
exports.RIGHT_CORNER = "sprites/firstplayable/wall small right 1";
exports.LEFT_CORNER = "sprites/firstplayable/wall small left 1";
exports.FLOOR = "sprites/firstplayable/floor1";
exports.BLANK = "sprites/firstplayable/blanktile";
exports.BACKCURVE_LEFT = "sprites/firstplayable/wall back curve left 1";
exports.BACKCURVE_RIGHT = "sprites/firstplayable/wall back curve right 1";
exports.FORWARD_LEFT = "sprites/firstplayable/wall forward left 1";
exports.FORWARD_RIGHT = "sprites/firstplayable/wall forward right 1";
exports.LEFT_TO_BACK = "sprites/firstplayable/wall left to back";
exports.RIGHT_TO_BACK = "sprites/firstplayable/wall right to back";
exports.LEVEL_DATA = [
    [
        [exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK],
        [exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.FORWARD_RIGHT, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.FORWARD_LEFT],
        [exports.BLANK, exports.FORWARD_RIGHT, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACKCURVE_RIGHT, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.BLANK, exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.BLANK, exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.BLANK, exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_TO_BACK, exports.FRONT_WALL, exports.FRONT_WALL, exports.RIGHT_TO_BACK, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.BLANK, exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.BACKCURVE_LEFT, exports.BACK_WALL, exports.BACK_WALL, exports.BACKCURVE_RIGHT, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.BLANK, exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.BLANK, exports.RIGHT_CORNER, exports.FRONT_WALL, exports.FRONT_WALL, exports.RIGHT_TO_BACK, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.FORWARD_RIGHT, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACKCURVE_RIGHT, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_TO_BACK, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.LEFT_CORNER],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK],
        [exports.RIGHT_CORNER, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.LEFT_CORNER, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK],
        [exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK],
    ],
    [
        [exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK],
        [exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK],
        [exports.BLANK, exports.BLANK, exports.BLANK, exports.FORWARD_RIGHT, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.FORWARD_LEFT, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK],
        [exports.BLANK, exports.BLANK, exports.BLANK, exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK],
        [exports.BLANK, exports.BLANK, exports.BLANK, exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.BACKCURVE_LEFT, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.FORWARD_LEFT, exports.BLANK],
        [exports.BLANK, exports.BLANK, exports.BLANK, exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL, exports.BLANK],
        [exports.BLANK, exports.BLANK, exports.BLANK, exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL, exports.BLANK],
        [exports.BLANK, exports.BLANK, exports.BLANK, exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.LEFT_TO_BACK, exports.FRONT_WALL, exports.RIGHT_TO_BACK, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL, exports.BLANK],
        [exports.BLANK, exports.BLANK, exports.BLANK, exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.BACKCURVE_LEFT, exports.BACK_WALL, exports.BACKCURVE_RIGHT, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL, exports.BLANK],
        [exports.BLANK, exports.BLANK, exports.BLANK, exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL, exports.BLANK],
        [exports.BLANK, exports.BLANK, exports.BLANK, exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_TO_BACK, exports.FRONT_WALL, exports.FRONT_WALL, exports.LEFT_CORNER, exports.BLANK],
        [exports.BLANK, exports.BLANK, exports.BLANK, exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK],
        [exports.BLANK, exports.BLANK, exports.BLANK, exports.RIGHT_CORNER, exports.FRONT_WALL, exports.RIGHT_TO_BACK, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK],
        [exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.RIGHT_CORNER, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.LEFT_CORNER, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK],
        [exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK],
    ],
    [
        [exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK],
        [exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK],
        [exports.BLANK, exports.FORWARD_RIGHT, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.FORWARD_LEFT, exports.BLANK, exports.BLANK, exports.BLANK],
        [exports.BLANK, exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL, exports.BLANK, exports.BLANK, exports.BLANK],
        [exports.BLANK, exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.LEFT_TO_BACK, exports.RIGHT_TO_BACK, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.BACKCURVE_LEFT, exports.BACK_WALL, exports.FORWARD_LEFT, exports.BLANK],
        [exports.BLANK, exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL, exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL, exports.BLANK],
        [exports.BLANK, exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL, exports.RIGHT_CORNER, exports.FRONT_WALL, exports.RIGHT_TO_BACK, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL, exports.BLANK],
        [exports.BLANK, exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.BACKCURVE_LEFT, exports.BACK_WALL, exports.BACK_WALL, exports.BACKCURVE_RIGHT, exports.FLOOR, exports.FLOOR, exports.LEFT_TO_BACK, exports.RIGHT_TO_BACK, exports.FLOOR, exports.LEFT_WALL, exports.BLANK],
        [exports.BLANK, exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL, exports.RIGHT_WALL, exports.FLOOR, exports.LEFT_WALL, exports.BLANK],
        [exports.BLANK, exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL, exports.RIGHT_WALL, exports.FLOOR, exports.LEFT_WALL, exports.BLANK],
        [exports.BLANK, exports.RIGHT_CORNER, exports.FRONT_WALL, exports.RIGHT_TO_BACK, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.BACKCURVE_LEFT, exports.BACKCURVE_RIGHT, exports.FLOOR, exports.LEFT_WALL, exports.BLANK],
        [exports.BLANK, exports.BLANK, exports.BLANK, exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL, exports.BLANK],
        [exports.BLANK, exports.BLANK, exports.BLANK, exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_TO_BACK, exports.FRONT_WALL, exports.FRONT_WALL, exports.LEFT_CORNER, exports.BLANK],
        [exports.BLANK, exports.BLANK, exports.BLANK, exports.RIGHT_CORNER, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.LEFT_CORNER, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK],
        [exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK],
    ],
    [
        [exports.BLANK, exports.FORWARD_RIGHT, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.FORWARD_LEFT, exports.BLANK, exports.BLANK, exports.BLANK, exports.FORWARD_RIGHT, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.FORWARD_LEFT, exports.BLANK],
        [exports.FORWARD_RIGHT, exports.BACKCURVE_RIGHT, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.BACKCURVE_LEFT, exports.FORWARD_LEFT, exports.BLANK, exports.FORWARD_RIGHT, exports.BACKCURVE_RIGHT, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.BACKCURVE_LEFT, exports.FORWARD_LEFT],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL, exports.BLANK, exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.BACKCURVE_LEFT, exports.BACK_WALL, exports.BACKCURVE_RIGHT, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_CORNER, exports.RIGHT_TO_BACK, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_TO_BACK, exports.LEFT_CORNER],
        [exports.BLANK, exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL, exports.BLANK],
        [exports.BLANK, exports.RIGHT_CORNER, exports.RIGHT_TO_BACK, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_TO_BACK, exports.LEFT_CORNER, exports.BLANK],
        [exports.BLANK, exports.BLANK, exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL, exports.BLANK, exports.BLANK],
        [exports.BLANK, exports.BLANK, exports.RIGHT_CORNER, exports.RIGHT_TO_BACK, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_TO_BACK, exports.LEFT_CORNER, exports.BLANK, exports.BLANK],
        [exports.BLANK, exports.BLANK, exports.BLANK, exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL, exports.BLANK, exports.BLANK, exports.BLANK],
        [exports.BLANK, exports.BLANK, exports.BLANK, exports.RIGHT_CORNER, exports.RIGHT_TO_BACK, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_TO_BACK, exports.LEFT_CORNER, exports.BLANK, exports.BLANK, exports.BLANK],
        [exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.RIGHT_CORNER, exports.RIGHT_TO_BACK, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_TO_BACK, exports.LEFT_CORNER, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK],
        [exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.RIGHT_CORNER, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.LEFT_CORNER, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK, exports.BLANK],
    ],
    [
        [exports.RIGHT_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.BACK_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.BACK_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.BACK_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_CORNER, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.LEFT_CORNER],
    ],
    [
        [exports.RIGHT_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.BACK_WALL, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.BACK_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.BACK_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.BACK_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_CORNER, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.LEFT_CORNER],
    ],
    [
        [exports.RIGHT_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.BACK_WALL, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.BACK_WALL, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.BACK_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.BACK_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.BACK_WALL, exports.FLOOR, exports.FLOOR, exports.BACK_WALL, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_WALL, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.FLOOR, exports.LEFT_WALL],
        [exports.RIGHT_CORNER, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.FRONT_WALL, exports.LEFT_CORNER],
    ],
];
exports.ASSET_MANIFEST = [
    {
        type: "json",
        src: "./lib/spritesheets/sprites.json",
        id: "sprites",
        data: 0
    },
    {
        type: "image",
        src: "./lib/spritesheets/sprites.png",
        id: "sprites",
        data: 0
    },
    {
        type: "json",
        src: "./lib/spritesheets/glyphs.json",
        id: "glyphs",
        data: 0
    },
    {
        type: "image",
        src: "./lib/spritesheets/glyphs.png",
        id: "glyphs",
        data: 0
    },
    {
        type: "sound",
        src: "./lib/sounds/Ammo.wav",
        id: "Ammo",
        data: 2
    },
    {
        type: "sound",
        src: "./lib/sounds/Combat.wav",
        id: "Combat",
        data: 1
    },
    {
        type: "sound",
        src: "./lib/sounds/EnemyDeath.wav",
        id: "EnemyDeath",
        data: 6
    },
    {
        type: "sound",
        src: "./lib/sounds/EnemyHurt.wav",
        id: "EnemyHurt",
        data: 6
    },
    {
        type: "sound",
        src: "./lib/sounds/Heal.wav",
        id: "Heal",
        data: 2
    },
    {
        type: "sound",
        src: "./lib/sounds/Laser.wav",
        id: "Laser",
        data: 4
    },
    {
        type: "sound",
        src: "./lib/sounds/MainMenu.wav",
        id: "MainMenu",
        data: 1
    },
    {
        type: "sound",
        src: "./lib/sounds/MainMenuAlt.wav",
        id: "MainMenuAlt",
        data: 1
    },
    {
        type: "sound",
        src: "./lib/sounds/Pause.wav",
        id: "Pause",
        data: 1
    },
    {
        type: "sound",
        src: "./lib/sounds/Pistol.wav",
        id: "Pistol",
        data: 4
    },
    {
        type: "sound",
        src: "./lib/sounds/PlayerDamage.wav",
        id: "PlayerDamage",
        data: 1
    },
    {
        type: "sound",
        src: "./lib/sounds/PlayerDeath.wav",
        id: "PlayerDeath",
        data: 1
    },
    {
        type: "sound",
        src: "./lib/sounds/Railgun.wav",
        id: "Railgun",
        data: 1
    },
    {
        type: "sound",
        src: "./lib/sounds/Select.wav",
        id: "Select",
        data: 2
    },
    {
        type: "sound",
        src: "./lib/sounds/Unpause.wav",
        id: "Unpause",
        data: 1
    }
];


/***/ }),

/***/ "./src/Enemy.ts":
/*!**********************!*\
  !*** ./src/Enemy.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Enemy = void 0;
const GameCharacter_1 = __webpack_require__(/*! ./GameCharacter */ "./src/GameCharacter.ts");
const Toolkit_1 = __webpack_require__(/*! ./Toolkit */ "./src/Toolkit.ts");
class Enemy extends GameCharacter_1.GameCharacter {
    constructor(stage, assetManager, player, placeInArray) {
        super(stage, assetManager, "sprites/firstplayable/smol boi front");
        this.melee = "melee";
        this.ranged = "ranged";
        this.boss = "boss";
        this._healthMax = 5;
        this._health = 5;
        this.player = player;
        this.shooting = false;
        this._enemyType = this.melee;
        this._used = false;
        this.shooting = false;
        this._state = GameCharacter_1.GameCharacter.STATE_MOVING;
        this._speed = 2;
        this.eventPlayerHit = new createjs.Event("playerHit", true, false);
        this.eventEnemyKilled = new createjs.Event("enemyKilled", true, false);
        this._arrayNumber = placeInArray;
    }
    get used() {
        return this._used;
    }
    set used(value) {
        this._used = value;
    }
    get enemyType() {
        return this._enemyType;
    }
    set enemyType(value) {
        this._enemyType = value;
    }
    get arrayNumber() {
        return this._arrayNumber;
    }
    onKilled() {
        this._state = GameCharacter_1.GameCharacter.STATE_DEAD;
        this.reset();
    }
    trackPlayer(player) {
        if (this._state == GameCharacter_1.GameCharacter.STATE_PAUSED || this._state == GameCharacter_1.GameCharacter.STATE_DEAD)
            return;
        this.player = player;
        this._sprite.play();
        this._state = GameCharacter_1.GameCharacter.STATE_MOVING;
    }
    reset() {
        this._sprite.gotoAndStop("sprites/firstplayable/smol boi front");
        this._sprite.x = 300;
        this._sprite.y = 300;
        this._speed = 2;
        this._health = this._healthMax;
        this._state = GameCharacter_1.GameCharacter.STATE_IDLE;
        this._used = false;
        this._enemyType = this.melee;
        this._colliding = false;
        this.removeFromStage();
    }
    killed() {
        this.stopMovement();
        this.onKilled();
    }
    update() {
        if (this._state == GameCharacter_1.GameCharacter.STATE_DEAD || this._state == GameCharacter_1.GameCharacter.STATE_PAUSED || this._state == GameCharacter_1.GameCharacter.STATE_IDLE) {
            return;
        }
        ;
        this._colliding = false;
        if (this._sprite.x > this.player.sprite.x) {
            this.deltaX = -1;
        }
        else if (this._sprite.x < this.player.sprite.x) {
            this.deltaX = 1;
        }
        else
            (this.deltaX = 0);
        if (this._sprite.y > this.player.sprite.y) {
            this.deltaY = -1;
        }
        else if (this._sprite.y < this.player.sprite.y) {
            this.deltaY = 1;
        }
        else
            (this.deltaY = 0);
        this._sprite.x += this.deltaX * this._speed;
        this._sprite.y += this.deltaY * this._speed;
        if (this.player.state == GameCharacter_1.GameCharacter.STATE_DEAD)
            return;
        if ((0, Toolkit_1.boxHit)(this._sprite, this.player.sprite)) {
            this._colliding = true;
            this.sprite.dispatchEvent(this.eventPlayerHit);
            this.returnToLastPosition();
        }
    }
    takeDamage(value) {
        if (this._state == GameCharacter_1.GameCharacter.STATE_DEAD || this._state == GameCharacter_1.GameCharacter.STATE_DYING || this._state == GameCharacter_1.GameCharacter.STATE_PAUSED)
            return;
        if (value <= 0 || value >= Number.MAX_SAFE_INTEGER || value <= Number.MIN_SAFE_INTEGER)
            return;
        this._health -= value;
        if (this._health < 0) {
            this._health = 0;
        }
        if (this.health == 0) {
            this.killed();
            this.stage.dispatchEvent(this.eventEnemyKilled);
        }
    }
}
exports.Enemy = Enemy;


/***/ }),

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! createjs */ "./node_modules/createjs/builds/1.0.0/createjs.min.js");
const Constants_1 = __webpack_require__(/*! ./Constants */ "./src/Constants.ts");
const AssetManager_1 = __webpack_require__(/*! ./AssetManager */ "./src/AssetManager.ts");
const UserInterface_1 = __webpack_require__(/*! ./UserInterface */ "./src/UserInterface.ts");
const ScreenManager_1 = __webpack_require__(/*! ./ScreenManager */ "./src/ScreenManager.ts");
const Player_1 = __webpack_require__(/*! ./Player */ "./src/Player.ts");
const Enemy_1 = __webpack_require__(/*! ./Enemy */ "./src/Enemy.ts");
const GameCharacter_1 = __webpack_require__(/*! ./GameCharacter */ "./src/GameCharacter.ts");
const Projectile_1 = __webpack_require__(/*! ./Projectile */ "./src/Projectile.ts");
const Inventory_1 = __webpack_require__(/*! ./Inventory */ "./src/Inventory.ts");
const Toolkit_1 = __webpack_require__(/*! ./Toolkit */ "./src/Toolkit.ts");
const Tile_1 = __webpack_require__(/*! ./Tile */ "./src/Tile.ts");
const Pickup_1 = __webpack_require__(/*! ./Pickup */ "./src/Pickup.ts");
const LevelManager_1 = __webpack_require__(/*! ./LevelManager */ "./src/LevelManager.ts");
const Settings_1 = __webpack_require__(/*! ./Settings */ "./src/Settings.ts");
let stage;
let canvas;
let assetManager;
let upKey = false;
let downKey = false;
let leftKey = false;
let rightKey = false;
let spacePress = false;
let escapePress = false;
let escapeUp = true;
let paused = false;
let iFramesActive = false;
let projectileTimerActive = false;
let fireDelayActive = false;
let shiftPress = false;
let shiftUp = true;
let LKey = false;
let LUp = true;
let gameStarted = false;
let weaponNum = 0;
let stageNum = 1;
let loopingProps;
let player;
let enemyPool = [];
let enemyInventories = [];
let projectilePool = [];
let playerProjectilePool = [];
let tilePool = [];
let levelData = [];
let pickupPool = [];
let userInterface;
let screenManager;
let newProjectile;
let newEnemy;
let newPickup;
let newTile;
let playerInventory;
let levelManager;
let poolManager;
let settings;
let invincibleTimer;
let collisionTimer;
let fireDelayTimer;
function onReady(e) {
    console.log(">> spritesheet loaded – ready to add sprites to game");
    settings = new Settings_1.Settings();
    loopingProps = new createjs.PlayPropsConfig();
    loopingProps.set({ loop: -1, volume: settings.volume });
    screenManager = new ScreenManager_1.ScreenManager(stage, assetManager);
    levelManager = new LevelManager_1.LevelManager(stage);
    player = new Player_1.Player(stage, assetManager);
    playerInventory = new Inventory_1.Inventory(player);
    userInterface = new UserInterface_1.UserInterface(stage, assetManager, player, screenManager, playerInventory, settings, levelManager);
    newTile = new Tile_1.Tile(stage, assetManager, "");
    for (let i = 0; i < Constants_1.ENEMY_MAX; i++) {
        enemyPool.push(new Enemy_1.Enemy(stage, assetManager, player, i));
    }
    for (let i = 0; i < Constants_1.ENEMY_MAX; i++) {
        enemyInventories.push(new Inventory_1.Inventory(enemyPool[i]));
    }
    for (let i = 0; i < Constants_1.PROJECTILE_MAX; i++) {
        projectilePool.push(new Projectile_1.Projectile(stage, assetManager, "sprites/firstplayable/bullet"));
    }
    for (let i = 0; i < Constants_1.PLAYER_PROJECTILE_MAX; i++) {
        playerProjectilePool.push(new Projectile_1.Projectile(stage, assetManager, "sprites/firstplayable/bullet"));
        playerProjectilePool[i].passIn(player, playerInventory);
    }
    for (let i = 0; i < (Constants_1.HEIGHT_IN_TILES); i++) {
        tilePool.push(new Array());
        for (let j = 0; j < Constants_1.WIDTH_IN_TILES; j++) {
            tilePool[i].push(new Tile_1.Tile(stage, assetManager, "sprites/firstplayable/floor1"));
            tilePool[i][j].setPosition(i * 40, j * 40);
        }
    }
    for (let i = Constants_1.NUMBER_OF_LEVELS; i < Constants_1.NUMBER_OF_LEVELS; i++) {
        levelData.push(new Array());
        for (let j = 0; j < Constants_1.HEIGHT_IN_TILES; j++) {
            levelData[i].push(new Array());
            for (let k = 0; k < Constants_1.HEIGHT_IN_TILES; k++) {
                levelData[i][j].fill(Constants_1.LEVEL_DATA[i][j][k]);
            }
        }
    }
    for (let i = 0; i < Constants_1.PICKUP_MAX; i++) {
        pickupPool.push(new Pickup_1.Pickup(stage, assetManager, player));
    }
    stage.on("playerKilled", onGameEvent);
    stage.on("playerDamaged", onGameEvent);
    stage.on("gameStarted", onGameEvent);
    stage.on("gameReset", onGameEvent);
    stage.on("titleActive", onGameEvent);
    stage.on("gameWin", onGameEvent);
    stage.on("openSettings", onGameEvent);
    stage.on("closeSettings", onGameEvent);
    stage.on("gamePaused", onGameEvent);
    stage.on("gameUnpaused", onGameEvent);
    stage.on("playerHit", onGameEvent);
    stage.on("enemyKilled", onGameEvent);
    stage.on("pickupMedkit", onGameEvent);
    stage.on("pickupAmmo", onGameEvent);
    stage.on("spawnWave", onGameEvent);
    stage.on("completeLevel", onGameEvent);
    stage.on("loadNextLevel", onGameEvent);
    createjs.Ticker.framerate = Constants_1.FRAME_RATE;
    createjs.Ticker.on("tick", onTick);
    console.log(">> game ready");
    screenManager.showTitleScreen();
}
function onGameEvent(e) {
    console.log("called onGameEvent");
    switch (e.type) {
        case "playerKilled":
            userInterface.removeAll();
            player.removeFromStage();
            hideLevel();
            resetPools();
            screenManager.showGameOverScreen();
            break;
        case "playerHit":
            if (iFramesActive == true)
                return;
            iFramesActive = true;
            player.takeDamage(Constants_1.ALIEN_CONTACT_DAMAGE);
            invincibleTimer = window.setInterval(onInvincibleTimer, Constants_1.I_FRAMES_DEFAULT);
            createjs.Sound.play("PlayerDamage", { volume: settings.volume });
            break;
        case "enemyKilled":
            console.log("received dispatch: enemyKilled");
            levelManager.defeatedEnemies++;
            console.log(levelManager.defeatedEnemies);
            levelManager.readyToSpawn = true;
            userInterface.incrementScore();
            userInterface.updateHUD();
            createjs.Sound.play("EnemyDeath", { volume: settings.volume });
            let rng = (0, Toolkit_1.randomMe)(1, 20);
            console.log("rng:" + rng);
            if (rng == 20) {
                for (let pickup of pickupPool) {
                    if (!pickup.used) {
                        pickup.onDrop(100, 100);
                    }
                }
            }
            break;
        case "gameStarted":
            console.log("received dispatch: gameStarted ");
            screenManager.showGame();
            showLevel();
            screenManager.dispatchNextLevel();
            player.addToStage();
            player.startMovement();
            console.log(player.state);
            userInterface.showPlayerHUD();
            gameStarted = true;
            createjs.Sound.stop();
            createjs.Sound.play("Combat", loopingProps);
            break;
        case "gameReset":
            player.reset();
            userInterface.reset();
            hideLevel();
            screenManager.showTitleScreen();
            levelManager.reset();
            gameStarted == false;
            resetPools();
            break;
        case "titleActive":
            resetPools();
            console.log("received dispatch: titleActive ");
            hideLevel();
            createjs.Sound.play("MainMenu", loopingProps);
            userInterface.showStartMenu();
            userInterface.onStartClick();
            userInterface.onSettingsClick();
            break;
        case "gameWin":
            screenManager.showWinScreen();
            userInterface.removeAll();
            hideLevel();
            player.removeFromStage();
            player.reset();
            resetPools();
            levelManager.reset();
            createjs.Sound.stop();
            createjs.Sound.play("MainMenuAlt", loopingProps);
            break;
        case "openSettings":
            console.log("recieved dispatch: openSettings");
            screenManager.pauseGame();
            userInterface.showSettingsMenu();
            createjs.Sound.play("Pause", { volume: settings.volume });
            break;
        case "closeSettings":
            console.log("recieved dispatch: closeSettings");
            userInterface.hideSettingsMenu();
            screenManager.unpauseGame();
            createjs.Sound.play("Unpause", { volume: settings.volume });
            break;
        case "gamePaused":
            if (paused == true)
                return;
            paused = true;
            console.log("recieved dispatch: gamePaused");
            player.pause();
            for (let projectile of projectilePool) {
                if (projectile.used)
                    projectile.gamePaused = true;
            }
            for (let projectile of playerProjectilePool) {
                if (projectile.used)
                    projectile.gamePaused = true;
            }
            for (let enemy of enemyPool) {
                if (enemy.used)
                    enemy.pause();
            }
            break;
        case "gameUnpaused":
            if (paused == false)
                return;
            paused = false;
            console.log("recieved dispatch: gameUnpaused");
            player.unpause();
            for (let projectile of projectilePool) {
                if (projectile.used)
                    projectile.gamePaused = false;
            }
            for (let projectile of playerProjectilePool) {
                if (projectile.used)
                    projectile.gamePaused = false;
            }
            for (let enemy of enemyPool) {
                if (enemy.used)
                    enemy.unpause();
            }
            break;
        case "pickupMedkit":
            console.log("received dispatch: pickupHealth");
            player.heal();
            createjs.Sound.play("Heal", { volume: settings.volume });
            break;
        case "pickupAmmo":
            console.log("received dispatch: pickupAmmo");
            playerInventory.refillAmmo();
            createjs.Sound.play("Ammo", { volume: settings.volume });
            break;
        case "spawnWave":
            console.log("received dispatch: spawnWave");
            console.log(levelManager.enemiesSpawned, levelManager.threshold);
            if (levelManager.enemiesSpawned > levelManager.threshold)
                return;
            for (let i = 0; i < levelManager.activeLevel; i++) {
                console.log("spawning enemy");
                onAddEnemy();
                levelManager.enemiesSpawned++;
            }
            break;
        case "completeLevel":
            console.log("received dispatch: completeLevel");
            if (levelManager.activeLevel >= 4) {
                console.log("game.ts dispatching winScreen");
                screenManager.dispatchWinScreen();
                resetPools();
                return;
            }
            else {
                screenManager.showLevelComplete();
                player.pause();
                levelManager.resetForNextLevel();
                resetPools();
                gameStarted = false;
            }
            break;
        case "loadNextLevel":
            console.log("received dispatch: loadNextLevel");
            console.log("active level: " + levelManager.activeLevel);
            resetPools();
            screenManager.showGame();
            player.unpause();
            showLevel();
            loadLevel(levelManager.activeLevel);
            player.addToStage();
            setPlayerSpawn();
            player.startMovement();
            gameStarted = true;
            console.log(player.state);
            userInterface.showPlayerHUD();
            break;
    }
}
function addProjectile() {
    if (escapePress == true || player.state == GameCharacter_1.GameCharacter.STATE_DEAD || gameStarted == false)
        return;
    if (playerInventory.currentWeaponAmmo == 0)
        return;
    for (newProjectile of playerProjectilePool) {
        if (newProjectile.used == false) {
            newProjectile.used = true;
            newProjectile.passIn(player, playerInventory);
            newProjectile.activate();
            playerInventory.decrementAmmo();
            createjs.Sound.play(playerInventory.currentWeaponSound, { volume: settings.volume });
            break;
        }
    }
}
function addPickUp() {
    if (escapePress == true)
        return;
    for (newPickup of pickupPool) {
        console.log("adding pickup");
        if (newPickup.used == false) {
            newPickup.used = true;
            newPickup.randomizeType();
            newPickup.addToStage();
            break;
        }
    }
}
function startFireDelayTimer() {
    if (fireDelayActive == true)
        return;
    fireDelayActive = true;
    addProjectile();
    fireDelayTimer = window.setInterval(onFireDelayTimer, playerInventory.fireDelay);
}
function onFireDelayTimer() {
    fireDelayActive = false;
    window.clearInterval(fireDelayTimer);
}
function addEnemyProjectile() {
    if (escapePress == true || player.state == GameCharacter_1.GameCharacter.STATE_IDLE)
        return;
    for (newProjectile of projectilePool) {
        if (newProjectile.used == false) {
            newProjectile.used = true;
            newProjectile.passIn(player, playerInventory);
            newProjectile.activate();
            break;
        }
    }
}
function setPlayerSpawn() {
    let maxX;
    let minX;
    let maxY;
    let minY;
    switch (levelManager.activeLevel) {
        case 1:
            minX = 300;
            maxX = 300;
            minY = 300;
            maxY = 300;
            break;
        case 2:
            minX = 400;
            maxX = 400;
            minY = 300;
            maxY = 300;
            break;
        case 3:
            minX = 300;
            maxX = 300;
            minY = 200;
            maxY = 200;
            break;
        case 4:
            minX = 300;
            maxX = 300;
            minY = 300;
            maxY = 300;
            break;
        case 5:
            break;
        case 6:
            break;
        case 7:
            break;
    }
    player.sprite.x = (0, Toolkit_1.randomMe)(minX, maxX);
    player.sprite.y = (0, Toolkit_1.randomMe)(minY, maxY);
}
function onAddEnemy() {
    if (escapePress == true)
        return;
    for (newEnemy of enemyPool) {
        if (newEnemy.used == false) {
            newEnemy.used = true;
            newEnemy.addToStage();
            let maxX;
            let minX;
            let maxY;
            let minY;
            switch (levelManager.activeLevel) {
                case 1:
                    minX = 100;
                    maxX = 300;
                    minY = 150;
                    maxY = 300;
                    break;
                case 2:
                    minX = 200;
                    maxX = 350;
                    minY = 100;
                    maxY = 250;
                    break;
                case 3:
                    minX = 200;
                    maxX = 350;
                    minY = 400;
                    maxY = 500;
                    break;
                case 4:
                    minX = 150;
                    maxX = 450;
                    minY = 150;
                    maxY = 450;
                    break;
                case 5:
                    break;
                case 6:
                    break;
                case 7:
                    break;
            }
            newEnemy.sprite.x = (0, Toolkit_1.randomMe)(minX, maxX);
            newEnemy.sprite.y = (0, Toolkit_1.randomMe)(minY, maxY);
            console.log(newEnemy);
            break;
        }
    }
}
function showLevel() {
    for (let array of tilePool) {
        for (let tile of array) {
            tile.addToStage();
        }
    }
}
function hideLevel() {
    for (let array of tilePool) {
        for (let tile of array) {
            tile.removeFromStage();
        }
    }
}
function loadLevel(value) {
    let i = value - 1;
    for (let j = 0; j < Constants_1.HEIGHT_IN_TILES; j++) {
        for (let k = 0; k < Constants_1.WIDTH_IN_TILES; k++) {
            tilePool[k][j].sprite.gotoAndStop(Constants_1.LEVEL_DATA[i][j][k]);
        }
    }
}
function resetPools() {
    for (let enemy of enemyPool) {
        if (enemy.used)
            enemy.reset();
    }
    for (let projectile of projectilePool) {
        if (projectile.used)
            projectile.reset();
    }
    for (let projectile of playerProjectilePool) {
        if (projectile.used)
            projectile.reset();
    }
    for (let pickup of pickupPool) {
        if (pickup.used)
            pickup.reset();
    }
}
function onInvincibleTimer() {
    window.clearInterval(invincibleTimer);
    iFramesActive = false;
    console.log("I frames no longer active");
}
function startCollsionTimer() {
    if (projectileTimerActive == true)
        return;
    projectileTimerActive = true;
    collisionTimer = window.setInterval(onCollsionTimer, 3);
}
function onCollsionTimer() {
    projectileTimerActive = false;
    projectileEnemyCollision();
}
function projectileEnemyCollision() {
    for (let projectile of playerProjectilePool) {
        if (!projectile.used)
            continue;
        for (let enemy of enemyPool) {
            if (!enemy.used)
                continue;
            if ((0, Toolkit_1.radiusHit)(enemy.sprite, 16, projectile.sprite, 2)) {
                if (enemy.state == GameCharacter_1.GameCharacter.STATE_DEAD || enemy.state == GameCharacter_1.GameCharacter.STATE_DYING || enemy.state == GameCharacter_1.GameCharacter.STATE_IDLE)
                    continue;
                console.log("hit!");
                enemy.takeDamage(projectile.damage);
                projectile.secondaryEffect(enemy);
                createjs.Sound.play("EnemyHurt", { volume: settings.volume });
            }
        }
    }
}
function projectilePlayerCollision() {
    for (let projectile of projectilePool) {
        if (!projectile.used)
            return;
        if ((0, Toolkit_1.radiusHit)(projectile.sprite, 2, player.sprite, 16)) {
            player.takeDamage(Constants_1.PISTOL_DAMAGE);
            projectile.reset();
        }
    }
}
function tileCollisionDetection() {
    for (let tile of tilePool) {
        for (let i = 0; i < Constants_1.WIDTH_IN_TILES; i++) {
            if (tile[i].sprite.currentAnimation == "sprites/firstplayable/floor1")
                continue;
            for (let enemy of enemyPool) {
                if (!enemy.used)
                    continue;
                if ((0, Toolkit_1.boxHit)(enemy.sprite, tile[i].sprite)) {
                    enemy.colliding = true;
                    enemy.returnToLastPosition();
                }
            }
            for (let projectile of playerProjectilePool) {
                if (!projectile.used)
                    continue;
                if ((0, Toolkit_1.boxHit)(projectile.sprite, tile[i].sprite)) {
                    console.log("projectile hit a wall");
                    projectile.secondaryEffect(newTile);
                }
            }
            if ((0, Toolkit_1.boxHit)(player.sprite, tile[i].sprite)) {
                player.colliding = true;
                player.returnToLastPosition();
            }
        }
    }
}
function enemyEnemyCollision() {
    for (let enemy of enemyPool) {
        if (!enemy.used)
            continue;
        for (let enemy2 of enemyPool) {
            if (!enemy2.used)
                continue;
            if (enemy.arrayNumber == enemy2.arrayNumber)
                continue;
            if ((0, Toolkit_1.boxHit)(enemy.sprite, enemy2.sprite)) {
                enemy.returnToLastPosition();
            }
        }
    }
}
function playerEnemyCollision() {
    for (let enemy of enemyPool) {
        if (!enemy.used)
            continue;
        if ((0, Toolkit_1.boxHit)(enemy.sprite, player.sprite)) {
            player.returnToLastPosition();
        }
    }
}
function monitorKeys() {
    if (upKey == true) {
        player.direction = GameCharacter_1.GameCharacter.DIR_UP;
    }
    if (downKey == true) {
        player.direction = GameCharacter_1.GameCharacter.DIR_DOWN;
    }
    if (leftKey == true) {
        player.direction = GameCharacter_1.GameCharacter.DIR_LEFT;
    }
    if (rightKey == true) {
        player.direction = GameCharacter_1.GameCharacter.DIR_RIGHT;
    }
    if (rightKey == false && leftKey == false && upKey == false && downKey == false) {
        player.direction = GameCharacter_1.GameCharacter.DIR_NEUTRAL;
    }
    if (spacePress == true) {
        startFireDelayTimer();
    }
    if (shiftPress == true) {
        console.log("attempting weapon swap");
        if (shiftUp == false || paused == true)
            return;
        console.log("changing weapons");
        shiftUp = false;
        weaponNum++;
        if (weaponNum > 2) {
            weaponNum = 0;
        }
        switch (weaponNum) {
            case 0:
                playerInventory.currentWeapon = Constants_1.PISTOL;
                break;
            case 1:
                playerInventory.currentWeapon = Constants_1.LASER;
                break;
            case 2:
                playerInventory.currentWeapon = Constants_1.RAILGUN;
                break;
        }
    }
    if (LKey == true) {
        console.log("attempting stage swap");
        if (LUp == false || paused == true)
            return;
        console.log("changing stage");
        LUp = false;
        stageNum++;
        if (stageNum > 7) {
            stageNum = 1;
        }
        switch (stageNum) {
            case 1:
                loadLevel(1);
                break;
            case 2:
                loadLevel(2);
                break;
            case 3:
                loadLevel(3);
                break;
            case 4:
                loadLevel(4);
                break;
            case 5:
                loadLevel(5);
                break;
            case 6:
                loadLevel(6);
                break;
            case 7:
                loadLevel(7);
                break;
        }
    }
    if (escapePress == true) {
        if (escapeUp == true)
            return;
        if (paused == true)
            return;
        console.log("escape toggle active");
        screenManager.openSettings();
    }
    if (escapePress == false) {
        if (escapeUp == true)
            return;
        if (paused == false)
            return;
        console.log("escape toggle inactive");
        screenManager.closeSettings();
    }
}
document.onkeydown = onKeyDown;
document.onkeyup = onKeyUp;
function onKeyDown(e) {
    if (e.key == 'w' || e.key == 'W') {
        upKey = true;
    }
    else if (e.key == 's' || e.key == 'S') {
        downKey = true;
    }
    else if (e.key == 'a' || e.key == 'A') {
        leftKey = true;
    }
    else if (e.key == 'd' || e.key == 'D') {
        rightKey = true;
    }
    if (e.key == " ") {
        spacePress = true;
    }
    if (e.key == "Escape") {
        if (escapeUp = true) {
            escapePress = !escapePress;
        }
        escapeUp = false;
    }
    if (e.key == "Shift") {
        shiftPress = true;
    }
    if (e.key == "l" || e.key == "L") {
        LKey = true;
    }
}
function onKeyUp(e) {
    if (e.key == 'w' || e.key == 'W') {
        upKey = false;
    }
    else if (e.key == 's' || e.key == 'S') {
        downKey = false;
    }
    else if (e.key == 'a' || e.key == 'A') {
        leftKey = false;
    }
    else if (e.key == 'd' || e.key == 'D') {
        rightKey = false;
    }
    if (e.key == " ") {
        spacePress = false;
    }
    if (e.key == "Escape") {
        escapeUp = true;
    }
    if (e.key == "Shift") {
        shiftPress = false;
        shiftUp = true;
    }
    if (e.key == "l" || e.key == "L") {
        LKey = false;
        LUp = true;
    }
}
function onTick(e) {
    document.getElementById("fps").innerHTML = String(createjs.Ticker.getMeasuredFPS());
    if (player.colliding == false) {
        player.setLastPosition();
    }
    monitorKeys();
    player.update();
    for (let enemy of enemyPool) {
        if (enemy.used && enemy.colliding == false) {
            enemy.setLastPosition();
        }
    }
    for (let projectile of playerProjectilePool) {
        if (projectile.used)
            projectile.update();
    }
    for (let enemy of enemyPool) {
        if (enemy.used) {
            enemy.trackPlayer(player);
            enemy.update();
        }
    }
    for (let pickup of pickupPool) {
        if (pickup.used) {
            pickup.update();
        }
    }
    userInterface.updateHUD();
    startCollsionTimer();
    tileCollisionDetection();
    enemyEnemyCollision();
    playerEnemyCollision();
    settings.update(userInterface.volume);
    levelManager.checkWinCondition();
    if (gameStarted == true && paused == false) {
        levelManager.checkWaveStatus();
    }
    playerInventory.update();
    playerInventory.WeaponSpriteDirection(player);
    stage.update();
}
function main() {
    canvas = document.getElementById("game-canvas");
    canvas.width = Constants_1.STAGE_WIDTH;
    canvas.height = Constants_1.STAGE_HEIGHT;
    stage = new createjs.StageGL(canvas, { antialias: true });
    stage.enableMouseOver(10);
    assetManager = new AssetManager_1.AssetManager(stage);
    stage.on("allAssetsLoaded", onReady, null, true);
    assetManager.loadAssets(Constants_1.ASSET_MANIFEST);
}
main();


/***/ }),

/***/ "./src/GameCharacter.ts":
/*!******************************!*\
  !*** ./src/GameCharacter.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GameCharacter = void 0;
const Constants_1 = __webpack_require__(/*! ./Constants */ "./src/Constants.ts");
class GameCharacter {
    constructor(stage, assetManager, animation) {
        this.stage = stage;
        this._state = GameCharacter.STATE_IDLE;
        this._stateBeforePause = GameCharacter.STATE_IDLE;
        this._speed = Constants_1.DEFAULT_SPEED;
        this._health = Constants_1.DEFAULT_HEALTH;
        this._deltaX = 0;
        this._deltaY = 0;
        this._direction = GameCharacter.DIR_NEUTRAL;
        this._facing = GameCharacter.DIR_DOWN;
        this._healthMax = Constants_1.DEFAULT_HEALTH;
        this._moving = false;
        this._idleAnimating = false;
        this._sprite = assetManager.getSprite("sprites", animation, Constants_1.STAGE_WIDTH / 2, Constants_1.STAGE_HEIGHT / 2);
        this._lastX = this._sprite.x;
        this._lastY = this._sprite.y;
        this._colliding = false;
        this._weaponSprite = assetManager.getSprite("sprites", "sprites/firstplayable/pistol front", this._sprite.x, this._sprite.y);
    }
    set speed(value) {
        this._speed = value;
    }
    get speed() {
        return this._speed;
    }
    set direction(value) {
        this._direction = value;
    }
    get direction() {
        return this._direction;
    }
    set facing(value) {
        this._facing = value;
    }
    get facing() {
        return this._facing;
    }
    get state() {
        return this._state;
    }
    get health() {
        return this._health;
    }
    get sprite() {
        return this._sprite;
    }
    get weaponSprite() {
        return this._weaponSprite;
    }
    set healthMax(value) {
        this._healthMax = value;
    }
    get healthMax() {
        return this._healthMax;
    }
    get deltaX() {
        return this._deltaX;
    }
    set deltaX(value) {
        this._deltaX = value;
    }
    get deltaY() {
        return this._deltaY;
    }
    set deltaY(value) {
        this._deltaY = value;
    }
    get lastX() {
        return this._lastX;
    }
    set lastX(value) {
        this._lastX = value;
    }
    get lastY() {
        return this._lastY;
    }
    set lastY(value) {
        this._lastY = value;
    }
    get colliding() {
        return this._colliding;
    }
    set colliding(value) {
        this._colliding = value;
    }
    addToStage() {
        this.stage.addChild(this._sprite);
        this.stage.setChildIndex(this._sprite, this.stage.numChildren);
    }
    removeFromStage() {
        this._sprite.stop();
        this._weaponSprite.stop();
        this.stage.removeChild(this._sprite);
        this.stage.removeChild(this._weaponSprite);
    }
    movingDirection() {
        if (this._state == GameCharacter.STATE_DEAD || this._state == GameCharacter.STATE_PAUSED) {
            return;
        }
        ;
        switch (this._direction) {
            case GameCharacter.DIR_UP:
                this._deltaX = 0;
                this._deltaY = -1;
                this._sprite.gotoAndPlay("sprites/firstplayable/player back");
                this._weaponSprite.x = this._sprite.x;
                this._weaponSprite.y = this._sprite.y - this._sprite.getBounds().height / 2;
                this._facing = GameCharacter.DIR_UP;
                this._moving = true;
                break;
            case GameCharacter.DIR_DOWN:
                this._deltaX = 0;
                this._deltaY = 1;
                this._sprite.gotoAndPlay("sprites/firstplayable/player forward");
                this._weaponSprite.x = this._sprite.x;
                this._weaponSprite.y = this._sprite.y;
                this._facing = GameCharacter.DIR_DOWN;
                this._moving = true;
                break;
            case GameCharacter.DIR_LEFT:
                this._deltaX = -1;
                this._deltaY = 0;
                this._sprite.gotoAndPlay("sprites/firstplayable/player left");
                this._weaponSprite.x = this._sprite.x - this._sprite.getBounds().width / 2;
                this._weaponSprite.y = this._sprite.y;
                this._facing = GameCharacter.DIR_LEFT;
                this._moving = true;
                break;
            case GameCharacter.DIR_RIGHT:
                this._deltaX = 1;
                this._deltaY = 0;
                this._sprite.gotoAndPlay("sprites/firstplayable/player right");
                this._weaponSprite.x = this._sprite.x + this._sprite.getBounds().width / 2;
                this._weaponSprite.y = this._sprite.y;
                this._facing = GameCharacter.DIR_RIGHT;
                this._moving;
                break;
            case GameCharacter.DIR_NEUTRAL:
                this._deltaX = 0;
                this._deltaY = 0;
                this._moving = false;
                break;
        }
    }
    idleDirection() {
        if (this._moving == true) {
            this._idleAnimating = false;
            return;
        }
        if (this._idleAnimating == true) {
            return;
        }
        this._idleAnimating = true;
        switch (this._facing) {
            case GameCharacter.DIR_DOWN:
                this._sprite.gotoAndPlay("sprites/firstplayable/player forward idle");
                break;
            case GameCharacter.DIR_UP:
                this._sprite.gotoAndPlay("sprites/firstplayable/player back idle");
                break;
            case GameCharacter.DIR_LEFT:
                this._sprite.gotoAndPlay("sprites/firstplayable/player left idle");
                break;
            case GameCharacter.DIR_RIGHT:
                this._sprite.gotoAndPlay("sprites/firstplayable/player right idle");
                break;
        }
    }
    stopMovement() {
        if (this._state == GameCharacter.STATE_DEAD || this._state == GameCharacter.STATE_PAUSED) {
            return;
        }
        ;
        this._sprite.stop();
        this._weaponSprite.stop();
        this._state = GameCharacter.STATE_IDLE;
    }
    startMovement() {
        if (this._state == GameCharacter.STATE_DEAD || this._state == GameCharacter.STATE_PAUSED) {
            return;
        }
        ;
        console.log("started movement");
        this.sprite.play();
        this.weaponSprite.play();
        this._state = GameCharacter.STATE_MOVING;
    }
    update() {
        this.movingDirection();
        if (this._state == GameCharacter.STATE_DEAD || this._state == GameCharacter.STATE_PAUSED || this._state == GameCharacter.STATE_IDLE) {
            return;
        }
        ;
        this.idleDirection();
        this._sprite.x += this._deltaX * this.speed;
        this._sprite.y += this._deltaY * this.speed;
        this._weaponSprite.x += this._deltaX * this.speed;
        this._weaponSprite.y += this._deltaY * this.speed;
        this._colliding = false;
    }
    pause() {
        this._stateBeforePause = this._state;
        console.log("state before pausing: " + this._stateBeforePause);
        this._state = GameCharacter.STATE_PAUSED;
    }
    unpause() {
        this._state = this._stateBeforePause;
        console.log("state after pausing: " + this._state);
    }
    setLastPosition() {
        this.lastX = this._sprite.x;
        this.lastY = this._sprite.y;
    }
    returnToLastPosition() {
        this._sprite.x = this._lastX;
        this._sprite.y = this._lastY;
    }
}
exports.GameCharacter = GameCharacter;
GameCharacter.STATE_IDLE = 0;
GameCharacter.STATE_ATTACKING = 1;
GameCharacter.STATE_MOVING = 2;
GameCharacter.STATE_DYING = 3;
GameCharacter.STATE_DEAD = 4;
GameCharacter.STATE_PAUSED = 99;
GameCharacter.DIR_UP = 0;
GameCharacter.DIR_DOWN = 1;
GameCharacter.DIR_LEFT = 2;
GameCharacter.DIR_RIGHT = 3;
GameCharacter.DIR_NE = 4;
GameCharacter.DIR_SE = 5;
GameCharacter.DIR_SW = 6;
GameCharacter.DIR_NW = 7;
GameCharacter.DIR_NEUTRAL = 99;


/***/ }),

/***/ "./src/Inventory.ts":
/*!**************************!*\
  !*** ./src/Inventory.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Inventory = void 0;
const Constants_1 = __webpack_require__(/*! ./Constants */ "./src/Constants.ts");
const GameCharacter_1 = __webpack_require__(/*! ./GameCharacter */ "./src/GameCharacter.ts");
class Inventory {
    constructor(gameCharacter) {
        this.gameCharacter = gameCharacter;
        this._currentWeapon = Constants_1.PISTOL;
        this._currentReloadDelay = Constants_1.PISTOL_RELOAD_DELAY;
        this._pistolAmmo = Constants_1.PISTOL_AMMO_MAX;
        this._railgunAmmo = Constants_1.RAILGUN_AMMO_MAX;
        this._rocketAmmo = Constants_1.ROCKET_AMMO_MAX;
        this._teslagunAmmo = Constants_1.TESLA_AMMO_MAX;
        this._laserAmmo = Constants_1.LASER_AMMO_MAX;
        this._currentWeaponAmmo = this._pistolAmmo;
        this._currentWeaponSound = "Pistol";
    }
    set currentWeapon(value) {
        this._currentWeapon = value;
    }
    get currentWeapon() {
        return this._currentWeapon;
    }
    get pistolAmmo() {
        return this._pistolAmmo;
    }
    get laserAmmo() {
        return this._laserAmmo;
    }
    get railgunAmmo() {
        return this._railgunAmmo;
    }
    get teslagunAmmo() {
        return this._teslagunAmmo;
    }
    get rocketAmmo() {
        return this._rocketAmmo;
    }
    get fireDelay() {
        return this._currentFireDelay;
    }
    get weaponDamage() {
        return this._currentWeaponDamage;
    }
    get splashDamage() {
        return this._splashDamage;
    }
    get currentProjectileSpeed() {
        return this._currentProjectileSpeed;
    }
    get currentProjectileSprite() {
        return this._currentProjectileSprite;
    }
    get currentWeaponSprite() {
        return this._currentWeaponSprite;
    }
    get currentWeaponAmmo() {
        return this._currentWeaponAmmo;
    }
    set currentWeaponAmmo(value) {
        this._currentWeaponAmmo = value;
    }
    get currentWeaponSound() {
        return this._currentWeaponSound;
    }
    checkEquippedWeapon() {
        switch (this._currentWeapon) {
            case Constants_1.PISTOL:
                this._currentFireDelay = Constants_1.PISTOL_FIRE_DELAY;
                this._currentWeaponDamage = Constants_1.PISTOL_DAMAGE;
                this._splashDamage = 0;
                this._currentWeaponSprite = "";
                this._currentProjectileSprite = Constants_1.PISTOL_ROUND;
                this._currentProjectileSpeed = Constants_1.PISTOL_SPEED;
                this._currentWeaponAmmo = this._pistolAmmo;
                this._currentWeaponSound = "Pistol";
                break;
            case Constants_1.TESLA:
                this._currentFireDelay = Constants_1.TESLA_FIRE_DELAY;
                this._currentWeaponDamage = Constants_1.TESLA_IMPACT_DAMAGE;
                this._splashDamage = Constants_1.TESLA_CHAIN_DAMAGE;
                this._currentProjectileSprite = Constants_1.TESLA_ROUND;
                this._currentProjectileSpeed = Constants_1.TESLA_SPEED;
                this._currentWeaponAmmo = this._teslagunAmmo;
                break;
            case Constants_1.LASER:
                this._currentFireDelay = Constants_1.LASER_FIRE_DELAY;
                this._currentWeaponDamage = Constants_1.LASER_DAMAGE;
                this._splashDamage = 0;
                this._currentProjectileSprite = Constants_1.LASER_ROUND;
                this._currentProjectileSpeed = Constants_1.LASER_SPEED;
                this._currentWeaponAmmo = this._laserAmmo;
                this._currentWeaponSound = "Laser";
                break;
            case Constants_1.ROCKET:
                this._currentFireDelay = Constants_1.ROCKET_FIRE_DELAY;
                this._currentWeaponDamage = Constants_1.ROCKET_IMPACT_DAMAGE;
                this._splashDamage = Constants_1.ROCKET_SPLASH_DAMAGE;
                this._currentProjectileSprite = Constants_1.ROCKET_ROUND;
                this._currentProjectileSpeed = Constants_1.ROCKET_SPEED;
                this._currentWeaponAmmo = this._rocketAmmo;
                break;
            case Constants_1.RAILGUN:
                this._currentFireDelay = Constants_1.RAILGUN_FIRE_DELAY;
                this._currentWeaponDamage = Constants_1.RAILGUN_DAMAGE;
                this._splashDamage = 0;
                this._currentProjectileSprite = Constants_1.RAILGUN_ROUND;
                this._currentProjectileSpeed = Constants_1.RAILGUN_SPEED;
                this._currentWeaponAmmo = this._railgunAmmo;
                this._currentWeaponSound = "Railgun";
                break;
            case Constants_1.ALIEN_BEAM:
                this._currentFireDelay = Constants_1.ALIEN_BEAM_DELAY;
                this._currentWeaponDamage = Constants_1.ALIEN_BEAM_DAMAGE;
                this._splashDamage = 0;
                this._currentProjectileSprite = Constants_1.ALIEN_ROUND;
                this._currentProjectileSpeed = Constants_1.ALIEN_BEAM_SPEED;
            default:
                this._currentFireDelay = Constants_1.DEF_FIRE_DELAY;
                this._currentWeaponDamage = Constants_1.DEF_PROJECTILE_DAMAGE;
                this._splashDamage = 0;
                this._currentProjectileSpeed = Constants_1.DEF_PROJECTILE_SPEED;
                this._currentProjectileSprite = Constants_1.PISTOL_ROUND;
                break;
        }
    }
    update() {
        this.checkEquippedWeapon();
    }
    refillAmmo() {
        this._pistolAmmo = Constants_1.PISTOL_AMMO_MAX;
        this._laserAmmo = Constants_1.LASER_AMMO_MAX;
        this._teslagunAmmo = Constants_1.TESLA_AMMO_MAX;
        this._rocketAmmo = Constants_1.ROCKET_AMMO_MAX;
        this._railgunAmmo = Constants_1.RAILGUN_AMMO_MAX;
    }
    decrementAmmo() {
        switch (this._currentWeapon) {
            case Constants_1.PISTOL:
                this._pistolAmmo--;
                break;
            case Constants_1.LASER:
                this._laserAmmo--;
                break;
            case Constants_1.RAILGUN:
                this._railgunAmmo--;
                break;
            case Constants_1.ROCKET:
                this._rocketAmmo--;
                break;
            case Constants_1.TESLA:
                this._teslagunAmmo--;
                break;
        }
    }
    WeaponSpriteDirection(gameCharacter) {
        switch (gameCharacter.facing) {
            case GameCharacter_1.GameCharacter.DIR_DOWN:
                if (this._currentWeapon == Constants_1.PISTOL) {
                    this.gameCharacter.weaponSprite.gotoAndStop("sprites/firstplayable/pistol front");
                }
                else if (this._currentWeapon == Constants_1.LASER) {
                    this.gameCharacter.weaponSprite.gotoAndStop("sprites/firstplayable/lazer gun front");
                }
                else if (this._currentWeapon == Constants_1.RAILGUN) {
                    this.gameCharacter.weaponSprite.gotoAndStop("sprites/firstplayable/railgun front");
                }
                break;
            case GameCharacter_1.GameCharacter.DIR_UP:
                if (this._currentWeapon == Constants_1.PISTOL) {
                    this.gameCharacter.weaponSprite.gotoAndStop("sprites/firstplayable/pistol back");
                }
                else if (this._currentWeapon == Constants_1.LASER) {
                    this.gameCharacter.weaponSprite.gotoAndStop("sprites/firstplayable/lazer gun back");
                }
                else if (this._currentWeapon == Constants_1.RAILGUN) {
                    this.gameCharacter.weaponSprite.gotoAndStop("sprites/firstplayable/railgun back");
                }
                break;
            case GameCharacter_1.GameCharacter.DIR_LEFT:
                if (this._currentWeapon == Constants_1.PISTOL) {
                    this.gameCharacter.weaponSprite.gotoAndStop("sprites/firstplayable/pistol left");
                }
                else if (this._currentWeapon == Constants_1.LASER) {
                    this.gameCharacter.weaponSprite.gotoAndStop("sprites/firstplayable/lazer gun left");
                }
                else if (this._currentWeapon == Constants_1.RAILGUN) {
                    this.gameCharacter.weaponSprite.gotoAndStop("sprites/firstplayable/railgun left");
                }
                break;
            case GameCharacter_1.GameCharacter.DIR_RIGHT:
                if (this._currentWeapon == Constants_1.PISTOL) {
                    this.gameCharacter.weaponSprite.gotoAndStop("sprites/firstplayable/pistol right");
                }
                else if (this._currentWeapon == Constants_1.LASER) {
                    this.gameCharacter.weaponSprite.gotoAndStop("sprites/firstplayable/lazer gun right");
                }
                else if (this._currentWeapon == Constants_1.RAILGUN) {
                    this.gameCharacter.weaponSprite.gotoAndStop("sprites/firstplayable/railgun right");
                }
                break;
        }
    }
}
exports.Inventory = Inventory;


/***/ }),

/***/ "./src/LevelManager.ts":
/*!*****************************!*\
  !*** ./src/LevelManager.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LevelManager = void 0;
const Constants_1 = __webpack_require__(/*! ./Constants */ "./src/Constants.ts");
class LevelManager {
    constructor(stage) {
        this.stage = stage;
        this._activeLevel = 1;
        this._enemiesSpawned = 0;
        this._readyToSpawn = true;
        this._threshold = 0;
        this._defeatedEnemies = 0;
        this.eventCompleteLevel = new createjs.Event("completeLevel", true, false);
        this.eventSpawnWave = new createjs.Event("spawnWave", true, false);
    }
    get activeLevel() {
        return this._activeLevel;
    }
    set activeLevel(value) {
        this._activeLevel = value;
    }
    get defeatedEnemies() {
        return this._defeatedEnemies;
    }
    set defeatedEnemies(value) {
        this._defeatedEnemies = value;
    }
    get enemiesSpawned() {
        return this._enemiesSpawned;
    }
    set enemiesSpawned(value) {
        this._enemiesSpawned = value;
    }
    get readyToSpawn() {
        return this._readyToSpawn;
    }
    set readyToSpawn(value) {
        this._readyToSpawn = value;
    }
    get threshold() {
        return this._threshold;
    }
    checkWinCondition() {
        switch (this._activeLevel) {
            case 1:
                this._threshold = Constants_1.LEVEL_ONE_THRESHOLD;
                if (this._defeatedEnemies >= Constants_1.LEVEL_ONE_THRESHOLD) {
                    this.stage.dispatchEvent(this.eventCompleteLevel);
                    this._activeLevel++;
                }
                break;
            case 2:
                this._threshold = Constants_1.LEVEL_TWO_THRESHOLD;
                if (this._defeatedEnemies >= Constants_1.LEVEL_TWO_THRESHOLD) {
                    this.stage.dispatchEvent(this.eventCompleteLevel);
                    this._activeLevel++;
                }
                break;
            case 3:
                this._threshold = Constants_1.LEVEL_THREE_THRESHOLD;
                if (this._defeatedEnemies >= Constants_1.LEVEL_THREE_THRESHOLD) {
                    this.stage.dispatchEvent(this.eventCompleteLevel);
                    this._activeLevel++;
                }
                break;
            case 4:
                this._threshold = Constants_1.LEVEL_FOUR_THRESHOLD;
                if (this._defeatedEnemies >= Constants_1.LEVEL_FOUR_THRESHOLD) {
                    this.stage.dispatchEvent(this.eventCompleteLevel);
                    this._activeLevel++;
                }
            case 5:
                this._threshold = Constants_1.LEVEL_FIVE_THRESHOLD;
                if (this._defeatedEnemies >= Constants_1.LEVEL_FIVE_THRESHOLD) {
                    this.stage.dispatchEvent(this.eventCompleteLevel);
                    this._activeLevel++;
                }
            case 6:
                this._threshold = Constants_1.LEVEL_SIX_THRESHOLD;
                if (this._defeatedEnemies >= Constants_1.LEVEL_SIX_THRESHOLD) {
                    this.stage.dispatchEvent(this.eventCompleteLevel);
                    this._activeLevel++;
                }
            case 7:
                this._threshold = Constants_1.LEVEL_SEVEN_THRESHOLD;
                if (this._defeatedEnemies >= Constants_1.LEVEL_SEVEN_THRESHOLD) {
                    this.stage.dispatchEvent(this.eventCompleteLevel);
                    this._activeLevel++;
                }
        }
    }
    resetForNextLevel() {
        this._defeatedEnemies = 0;
        this._enemiesSpawned = 0;
    }
    reset() {
        this._activeLevel = 1;
        this._defeatedEnemies = 0;
        this._enemiesSpawned = 0;
    }
    checkWaveStatus() {
        if (this._readyToSpawn == false) {
            return;
        }
        if (this._defeatedEnemies % this._activeLevel == 0 || this._enemiesSpawned == 0) {
            this.stage.dispatchEvent(this.eventSpawnWave);
            console.log("event dispatched: spawnWave");
            this._readyToSpawn = false;
        }
    }
}
exports.LevelManager = LevelManager;


/***/ }),

/***/ "./src/Pickup.ts":
/*!***********************!*\
  !*** ./src/Pickup.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Pickup = void 0;
const GameCharacter_1 = __webpack_require__(/*! ./GameCharacter */ "./src/GameCharacter.ts");
const Toolkit_1 = __webpack_require__(/*! ./Toolkit */ "./src/Toolkit.ts");
class Pickup {
    constructor(stage, assetManager, player) {
        this.medkit = "sprites/firstplayable/medkit";
        this.ammoBox = "sprites/firstplayable/ammo";
        this.typeMedkit = "medkit";
        this.typeAmmo = "ammo";
        this.stage = stage;
        this.player = player;
        this._pickupType = this.typeMedkit;
        this._used = false;
        this._sprite = assetManager.getSprite("sprites", this.typeMedkit, 50, 50);
        this._hit = false;
        this.eventPickupAmmo = new createjs.Event("pickupAmmo", true, false);
        this.eventPickupMedkit = new createjs.Event("pickupMedkit", true, false);
    }
    get pickupType() {
        return this._pickupType;
    }
    set pickupType(value) {
        this._pickupType = value;
    }
    get used() {
        return this._used;
    }
    set used(value) {
        this._used = value;
    }
    checkType() {
        if (this.pickupType == this.typeMedkit) {
            this._sprite.gotoAndStop(this.medkit);
        }
        else if (this.pickupType == this.typeAmmo) {
            this._sprite.gotoAndStop(this.ammoBox);
        }
    }
    update() {
        if (this.player.state == GameCharacter_1.GameCharacter.STATE_PAUSED)
            return;
        this.checkType();
        if (this._hit == true)
            return;
        if ((0, Toolkit_1.boxHit)(this._sprite, this.player.sprite)) {
            this._hit = true;
            console.log(this._pickupType);
            if (this._pickupType == this.typeMedkit) {
                this.stage.dispatchEvent(this.eventPickupMedkit);
                console.log("dispatching event: pickupMedkit");
                this.removeFromStage();
            }
            else if (this._pickupType == this.typeAmmo) {
                this.stage.dispatchEvent(this.eventPickupAmmo);
                console.log("dispatching event: pickupAmmo");
                this.removeFromStage();
            }
        }
    }
    addToStage() {
        this.checkType();
        this._used = true;
        this.stage.addChild(this._sprite);
    }
    removeFromStage() {
        this.stage.removeChild(this._sprite);
        this.reset();
    }
    randomizeType() {
        let randomize;
        console.log("randomizing");
        randomize = (0, Toolkit_1.randomMe)(0, 1);
        if (randomize == 0) {
            this._pickupType = this.typeAmmo;
        }
        else if (randomize == 1) {
            this._pickupType = this.typeMedkit;
        }
        console.log(this._pickupType);
    }
    setPostion(valueX, valueY) {
        this._sprite.x = valueX;
        this._sprite.y = valueY;
    }
    reset() {
        this._used = false;
        this._hit = false;
        this.stage.removeChild(this._sprite);
    }
    onDrop(valueX, valueY) {
        this.randomizeType();
        this.setPostion(valueX, valueY);
        this.addToStage();
    }
}
exports.Pickup = Pickup;


/***/ }),

/***/ "./src/Player.ts":
/*!***********************!*\
  !*** ./src/Player.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Player = void 0;
const Constants_1 = __webpack_require__(/*! ./Constants */ "./src/Constants.ts");
const GameCharacter_1 = __webpack_require__(/*! ./GameCharacter */ "./src/GameCharacter.ts");
class Player extends GameCharacter_1.GameCharacter {
    constructor(stage, assetManager) {
        super(stage, assetManager, "sprites/firstplayable/player forward");
        this.eventKilled = new createjs.Event("playerKilled", true, false);
        this.eventReloading = new createjs.Event("reloading", true, false);
        this.shooting = false;
    }
    onKilled() {
        this._state = GameCharacter_1.GameCharacter.STATE_DEAD;
        createjs.Tween.get(this._sprite, { useTicks: true }).to({ alpha: 0 }, 30).wait(5).call(() => {
            this.dispatchKilled();
        }, null, this);
    }
    onDamaged() {
    }
    onReload() {
    }
    killed() {
        this.stopMovement();
        this.onKilled();
    }
    reset() {
        this._sprite.gotoAndStop("sprites/firstplayable/player forward");
        this.stopMovement();
        this._sprite.x = 300;
        this._sprite.y = 300;
        this._speed = Constants_1.DEFAULT_SPEED;
        this._health = Constants_1.DEFAULT_HEALTH;
        this._state = GameCharacter_1.GameCharacter.STATE_IDLE;
        createjs.Tween.removeTweens(this._sprite);
        this._sprite.alpha = 1;
    }
    takeDamage(value) {
        if (this._state == GameCharacter_1.GameCharacter.STATE_DEAD || this._state == GameCharacter_1.GameCharacter.STATE_DYING || this._state == GameCharacter_1.GameCharacter.STATE_PAUSED)
            return;
        if (value <= 0 || value >= Number.MAX_SAFE_INTEGER || value <= Number.MIN_SAFE_INTEGER)
            return;
        this._health -= value;
        if (this._health < 0) {
            this._health = 0;
        }
        if (this.health == 0) {
            this.killed();
        }
    }
    update() {
        super.update();
    }
    dispatchKilled() {
        this.stage.dispatchEvent(this.eventKilled);
        console.log("dispatched event: playerKilled");
    }
    heal() {
        this._health += 50;
        if (this._health > this._healthMax) {
            this._health = this._healthMax;
        }
    }
    addToStage() {
        this.stage.addChild(this._sprite);
        this.stage.addChild(this.weaponSprite);
        this.stage.setChildIndex(this._sprite, this.stage.numChildren);
        this.stage.setChildIndex(this._weaponSprite, this.stage.numChildren);
    }
}
exports.Player = Player;


/***/ }),

/***/ "./src/Projectile.ts":
/*!***************************!*\
  !*** ./src/Projectile.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Projectile = void 0;
const Constants_1 = __webpack_require__(/*! ./Constants */ "./src/Constants.ts");
const GameCharacter_1 = __webpack_require__(/*! ./GameCharacter */ "./src/GameCharacter.ts");
const Enemy_1 = __webpack_require__(/*! ./Enemy */ "./src/Enemy.ts");
class Projectile {
    constructor(stage, assetManager, animation) {
        this.stage = stage;
        this._speed = Constants_1.DEF_PROJECTILE_SPEED;
        this._damage = Constants_1.DEF_PROJECTILE_DAMAGE;
        this._sprite = assetManager.getSprite("sprites", animation, 0, 0);
        this._used = false;
        this._bounces = 0;
        this.deltaX = 0;
        this.deltaY = 0;
        this._gamePaused = false;
        this._shouldBounce = false;
    }
    get speed() {
        return this._speed;
    }
    get damage() {
        return this._damage;
    }
    get bounces() {
        return this._bounces;
    }
    get sprite() {
        return this._sprite;
    }
    get used() {
        return this._used;
    }
    get controllerInventory() {
        return this._inventory;
    }
    set used(value) {
        this._used = value;
    }
    get gamePaused() {
        return this._gamePaused;
    }
    set gamePaused(value) {
        this._gamePaused = value;
    }
    get gamecharacter() {
        return this._gameCharacter;
    }
    set gamecharacter(value) {
        this._gameCharacter = value;
    }
    passIn(gameCharacter, inventory) {
        this._gameCharacter = gameCharacter;
        this._inventory = inventory;
    }
    reset() {
        this._damage = Constants_1.DEF_PROJECTILE_DAMAGE;
        this._speed = Constants_1.DEF_PROJECTILE_SPEED;
        this._used = false;
        this.deltaX = 0;
        this.deltaY = 0;
        this.stage.removeChild(this._sprite);
        this._bounces = 0;
    }
    activate() {
        switch (this.gamecharacter.facing) {
            case GameCharacter_1.GameCharacter.DIR_UP:
                this.deltaX = 0;
                this.deltaY = -1;
                this._sprite.rotation = 90;
                break;
            case GameCharacter_1.GameCharacter.DIR_DOWN:
                this.deltaX = 0;
                this.deltaY = 1;
                this._sprite.rotation = 270;
                break;
            case GameCharacter_1.GameCharacter.DIR_LEFT:
                this.deltaX = -1;
                this.deltaY = 0;
                this._sprite.rotation = 0;
                break;
            case GameCharacter_1.GameCharacter.DIR_RIGHT:
                this.deltaX = 1;
                this.deltaY = 0;
                this._sprite.rotation = 180;
                break;
        }
        this.used = true;
        this._sprite.x = this.gamecharacter.sprite.x;
        this._sprite.y = this.gamecharacter.sprite.y;
        console.log("about to add projectile of type to stage: " + this.controllerInventory.currentProjectileSprite);
        this.stage.addChild(this._sprite);
        this.applyWeaponCharacteristics();
        console.log("added projectile of type: " + this.controllerInventory.currentProjectileSprite);
    }
    applyWeaponCharacteristics() {
        this._damage = this.controllerInventory.weaponDamage;
        this._speed = this.controllerInventory.currentProjectileSpeed;
        this._sprite.gotoAndStop(this.controllerInventory.currentProjectileSprite);
    }
    update() {
        if (this._gamePaused == true)
            return;
        this._sprite.x += this.deltaX * this._speed;
        this._sprite.y += this.deltaY * this._speed;
        if (this._sprite.x > Constants_1.STAGE_WIDTH + this._sprite.getBounds().width
            || this._sprite.x < 0 - this._sprite.getBounds().width
            || this._sprite.y > Constants_1.STAGE_HEIGHT + this._sprite.getBounds().height
            || this._sprite.y < 0 - this._sprite.getBounds().height) {
            this.used = false;
            this._sprite.stop();
            this.stage.removeChild(this._sprite);
            this.reset();
            console.log("projectile reclaimed");
        }
    }
    secondaryEffect(collsionTrigger) {
        switch (this.controllerInventory.currentWeapon) {
            case Constants_1.PISTOL:
                this.reset();
                break;
            case Constants_1.LASER:
                if (collsionTrigger.constructor.name == Enemy_1.Enemy.name)
                    return;
                this._bounces++;
                if (this._sprite.rotation == 90 || this._sprite.rotation == 270) {
                    this.deltaY = -this.deltaY;
                }
                ;
                if (this._sprite.rotation == 0 || this._sprite.rotation == 180) {
                    this.deltaX = -this.deltaX;
                }
                ;
                if (this._bounces >= 5) {
                    this.reset();
                }
                break;
            case Constants_1.RAILGUN:
                if (collsionTrigger.constructor.name == Enemy_1.Enemy.name)
                    return;
                this.reset();
                break;
            case Constants_1.ROCKET:
                this.reset();
                break;
            case Constants_1.TESLA:
                this.reset();
                break;
            case Constants_1.ALIEN_BEAM:
                this.reset();
                break;
            default:
                this.reset();
                break;
        }
    }
}
exports.Projectile = Projectile;


/***/ }),

/***/ "./src/ScreenManager.ts":
/*!******************************!*\
  !*** ./src/ScreenManager.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ScreenManager = void 0;
class ScreenManager {
    constructor(stage, assetManager) {
        this.stage = stage;
        this.titleScreen = new createjs.Container();
        this.titleScreen.addChild(assetManager.getSprite("sprites", "sprites/other/titleScreen", 300, 300));
        this.gameOverScreen = new createjs.Container();
        this.gameOverScreen.addChild(assetManager.getSprite("sprites", "sprites/other/gameOverScreen", 300, 300));
        let gameOverSprite = assetManager.getSprite("sprites", "sprites/other/gameOverScreen", 300, 300);
        this.gameOverScreen.addChild(gameOverSprite);
        this.gameScreen = assetManager.getSprite("sprites", "sprites/other/background", 0, 0);
        this.winScreen = new createjs.Container();
        let winSprite = assetManager.getSprite("sprites", "sprites/other/winScreen", 300, 300);
        this.winScreen.addChild(winSprite);
        this.levelCompleteScreen = new createjs.Container();
        let levelCompleteSprite = assetManager.getSprite("sprites", "sprites/other/levelComplete", 300, 300);
        this.levelCompleteScreen.addChild(levelCompleteSprite);
        this.eventStartGame = new createjs.Event("gameStarted", true, false);
        this.eventResetGame = new createjs.Event("gameReset", true, false);
        this.eventTitleActive = new createjs.Event("titleActive", true, false);
        this.eventWin = new createjs.Event("gameWin", true, false);
        this.eventOpenSettings = new createjs.Event("openSettings", true, false);
        this.eventCloseSettings = new createjs.Event("closeSettings", true, false);
        this.eventPaused = new createjs.Event("gamePaused", true, false);
        this.eventUnpaused = new createjs.Event("gameUnpaused", true, false);
        this.eventLoadNextLevel = new createjs.Event("loadNextLevel", true, false);
    }
    hideAll() {
        this.stage.removeChild(this.titleScreen);
        this.stage.removeChild(this.gameOverScreen);
        this.stage.removeChild(this.gameScreen);
        this.stage.removeChild(this.winScreen);
        this.stage.removeChild(this.levelCompleteScreen);
    }
    showTitleScreen() {
        this.hideAll();
        this.stage.addChildAt(this.titleScreen, 0);
        this.stage.dispatchEvent(this.eventTitleActive);
        console.log("event dispatched: titleActive ");
    }
    startDispatch() {
        this.stage.dispatchEvent(this.eventStartGame);
        console.log("event dispatched: startGame ");
    }
    openSettings() {
        this.stage.dispatchEvent(this.eventOpenSettings);
        console.log("event dispatched: openSettings");
    }
    closeSettings() {
        this.stage.dispatchEvent(this.eventCloseSettings);
        console.log("event dispatched: closeSettings");
    }
    pauseGame() {
        this.stage.dispatchEvent(this.eventPaused);
        console.log("event dispatched: gamePaused");
    }
    unpauseGame() {
        this.stage.dispatchEvent(this.eventUnpaused);
        console.log("event dispatched: gameUnpaused");
    }
    dispatchWinScreen() {
        this.stage.dispatchEvent(this.eventWin);
    }
    showGame() {
        this.hideAll();
        this.gameScreen.x = 300;
        this.gameScreen.y = 300;
        this.stage.addChild(this.gameScreen);
    }
    showGameOverScreen() {
        this.hideAll();
        this.gameOverScreen.x = 0;
        this.gameOverScreen.y = 0;
        this.stage.addChild(this.gameOverScreen);
        this.gameOverScreen.on("click", () => {
            this.stage.dispatchEvent(this.eventResetGame);
        });
    }
    showWinScreen() {
        this.hideAll();
        this.winScreen.x = 0;
        this.winScreen.y = 0;
        this.stage.addChild(this.winScreen);
        this.winScreen.on("click", () => {
            this.stage.dispatchEvent(this.eventResetGame);
        });
    }
    showLevelComplete() {
        this.hideAll();
        this.levelCompleteScreen.x = 0;
        this.levelCompleteScreen.y = 0;
        this.stage.addChild(this.levelCompleteScreen);
        this.levelCompleteScreen.on("click", () => {
            this.dispatchNextLevel();
        });
    }
    dispatchNextLevel() {
        this.stage.dispatchEvent(this.eventLoadNextLevel);
    }
}
exports.ScreenManager = ScreenManager;


/***/ }),

/***/ "./src/Settings.ts":
/*!*************************!*\
  !*** ./src/Settings.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Settings = void 0;
const Constants_1 = __webpack_require__(/*! ./Constants */ "./src/Constants.ts");
class Settings {
    constructor() {
        this.volume = Constants_1.DEFAULT_VOLUME;
    }
    update(value) {
        this.volume = value;
    }
}
exports.Settings = Settings;


/***/ }),

/***/ "./src/Tile.ts":
/*!*********************!*\
  !*** ./src/Tile.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Tile = void 0;
class Tile {
    constructor(stage, assetManager, animation) {
        this.stage = stage;
        this._sprite = assetManager.getSprite("sprites", animation);
    }
    get sprite() {
        return this._sprite;
    }
    setPosition(valueX, valueY) {
        this._sprite.x = valueX;
        this._sprite.y = valueY;
    }
    addToStage() {
        this.stage.addChild(this._sprite);
    }
    removeFromStage() {
        this.stage.removeChild(this._sprite);
    }
}
exports.Tile = Tile;


/***/ }),

/***/ "./src/Toolkit.ts":
/*!************************!*\
  !*** ./src/Toolkit.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.radiusHit = exports.pointHit = exports.boxHit = exports.randomMe = void 0;
function randomMe(low, high) {
    let randomNum = 0;
    randomNum = Math.floor(Math.random() * (high - low + 1)) + low;
    return randomNum;
}
exports.randomMe = randomMe;
function boxHit(sprite1, sprite2) {
    let width1 = sprite1.getBounds().width;
    let height1 = sprite1.getBounds().height;
    let width2 = sprite2.getBounds().width;
    let height2 = sprite2.getBounds().height;
    if ((sprite1.x + width1 > sprite2.x) &&
        (sprite1.y + height1 > sprite2.y) &&
        (sprite1.x < sprite2.x + width2) &&
        (sprite1.y < sprite2.y + height2)) {
        return true;
    }
    else {
        return false;
    }
}
exports.boxHit = boxHit;
function pointHit(sprite1, sprite2, sprite1HitX = 0, sprite1HitY = 0, stage = null) {
    if (stage != null) {
        let markerPoint = sprite1.localToGlobal(sprite1HitX, sprite1HitY);
        let marker = new createjs.Shape();
        marker.graphics.beginFill("#FF00EC");
        marker.graphics.drawRect(0, 0, 4, 4);
        marker.regX = 2;
        marker.regY = 2;
        marker.x = markerPoint.x;
        marker.y = markerPoint.y;
        marker.cache(0, 0, 4, 4);
        stage.addChild(marker);
    }
    let point = sprite1.localToLocal(sprite1HitX, sprite1HitY, sprite2);
    if (sprite2.hitTest(point.x, point.y)) {
        return true;
    }
    else {
        return false;
    }
}
exports.pointHit = pointHit;
function radiusHit(sprite1, radius1, sprite2, radius2) {
    let a = sprite1.x - sprite2.x;
    let b = sprite1.y - sprite2.y;
    let c = Math.sqrt((a * a) + (b * b));
    if (c <= (radius1 + radius2)) {
        return true;
    }
    else {
        return false;
    }
}
exports.radiusHit = radiusHit;


/***/ }),

/***/ "./src/UserInterface.ts":
/*!******************************!*\
  !*** ./src/UserInterface.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserInterface = void 0;
class UserInterface {
    constructor(stage, assetManager, player, screenManager, inventory, settings, levelManager) {
        this.stage = stage;
        this.txtScore = new createjs.BitmapText("0", assetManager.getSpriteSheet("glyphs"));
        this.txtScore.x = 290;
        this.txtScore.y = 15;
        this.txtScore.letterSpacing = 1;
        this.txtAmmo = new createjs.BitmapText("0", assetManager.getSpriteSheet("glyphs"));
        this.txtAmmo.x = 525;
        this.txtAmmo.y = 15;
        this.txtAmmo.letterSpacing = 1;
        this.txtObjective = new createjs.BitmapText("0", assetManager.getSpriteSheet("glyphs"));
        this.txtObjective.x = 125;
        this.txtObjective.y = 55;
        this.txtAmmo.letterSpacing = 1;
        this.startButton = new createjs.Sprite(assetManager.getSpriteSheet("sprites"));
        this.startButton.gotoAndStop("sprites/button/up");
        this.settingsButton = new createjs.Sprite(assetManager.getSpriteSheet("sprites"));
        this.settingsButton.gotoAndStop("sprites/button/settingsUp");
        this.pauseOverlay = new createjs.Sprite(assetManager.getSpriteSheet("sprites"));
        this.pauseOverlay.gotoAndStop("sprites/other/pauseOverlay");
        this.settingsHeader = new createjs.Sprite(assetManager.getSpriteSheet("sprites"));
        this.settingsHeader.gotoAndStop("sprites/other/settingsText");
        this.healthBar = new createjs.Sprite(assetManager.getSpriteSheet("sprites"));
        this.healthBar.gotoAndStop("sprites/other/healthBar");
        this.healthOutline = new createjs.Sprite(assetManager.getSpriteSheet("sprites"));
        this.healthOutline.gotoAndStop("sprites/other/healthOutline");
        this.soundDown = new createjs.Sprite(assetManager.getSpriteSheet("sprites"));
        this.soundDown.gotoAndStop("sprites/button/volUp");
        this.soundUp = new createjs.Sprite(assetManager.getSpriteSheet("sprites"));
        this.soundUp.gotoAndStop("sprites/button/volUp");
        this.controls = new createjs.Sprite(assetManager.getSpriteSheet("sprites"));
        this.controls.gotoAndStop("sprites/other/controls");
        this._paused = false;
        this.player = player;
        this.screenManager = screenManager;
        this.playerInventory = inventory;
        this._ammo = this.playerInventory.currentWeaponAmmo;
        this.settings = settings;
        this.levelManager = levelManager;
        this._enemiesRemaining = this.levelManager.threshold - this.levelManager.defeatedEnemies;
        this.volume = 1;
        this.ammoBacker = new createjs.Sprite(assetManager.getSpriteSheet("sprites"));
        this.ammoBacker.gotoAndStop("sprites/other/ammoUI");
        this.scoreBacker = new createjs.Sprite(assetManager.getSpriteSheet("sprites"));
        this.scoreBacker.gotoAndStop("sprites/other/score");
        this.enemiesLeft = new createjs.Sprite(assetManager.getSpriteSheet("sprites"));
        this.enemiesLeft.gotoAndStop("sprites/other/enemiesLeft");
        this.reset();
    }
    set score(value) {
        this._score = value;
        this.txtScore.text = String(this._score);
    }
    get score() {
        return this._score;
    }
    set paused(value) {
        this._paused = value;
    }
    get paused() {
        return this._paused;
    }
    set ammo(value) {
        this._ammo = value;
        this.txtAmmo.text = String(this._ammo);
    }
    get ammo() {
        return this._ammo;
    }
    set enemiesRemaining(value) {
        this._enemiesRemaining = value;
        this.txtObjective.text = String(this._enemiesRemaining);
    }
    reset() {
        this.score = 0;
        this.ammo = 0;
    }
    showStartMenu() {
        this.startButton.x = 200;
        this.startButton.y = 450;
        this.stage.addChild(this.startButton);
        this.settingsButton.x = 400;
        this.settingsButton.y = 450;
        this.settingsButton.scaleY = 1;
        this.stage.addChild(this.settingsButton);
    }
    onStartClick() {
        this.startButton.on("mouseover", () => {
            this.startButton.gotoAndStop("sprites/button/over");
        });
        this.startButton.on("mouseout", () => {
            this.startButton.gotoAndStop("sprites/button/up");
        });
        this.startButton.on("click", () => {
            createjs.Sound.play("Select", null, null, null, null, this.settings.volume);
            if (this._paused == true)
                return;
            this.screenManager.startDispatch();
        });
    }
    onSettingsClick() {
        this.settingsButton.on("mouseover", () => {
            this.settingsButton.gotoAndStop("sprites/button/settingsOver");
        });
        this.settingsButton.on("mouseout", () => {
            this.settingsButton.gotoAndStop("sprites/button/settingsUp");
        });
        this.settingsButton.on("click", () => {
            createjs.Sound.play("Select", null, null, null, null, this.settings.volume);
            if (this._paused == true)
                return;
            this.screenManager.openSettings();
        });
    }
    onSoundDownClick() {
        this.soundDown.on("mouseover", () => {
            this.soundDown.gotoAndStop("sprites/button/volDown");
        });
        this.soundDown.on("mouseout", () => {
            this.soundDown.gotoAndStop("sprites/button/volUp");
        });
        this.soundDown.on("click", () => {
            if (this.volume <= 0) {
                this.volume = 0;
                return;
            }
            this.volume -= 0.1;
            console.log(this.volume);
            createjs.Sound.play("Select", null, null, null, null, this.settings.volume);
        });
    }
    onSoundUpClick() {
        this.soundUp.on("mouseover", () => {
            this.soundUp.gotoAndStop("sprites/button/volDown");
        });
        this.soundUp.on("mouseout", () => {
            this.soundUp.gotoAndStop("sprites/button/volUp");
        });
        this.soundUp.on("click", () => {
            if (this.volume >= 1) {
                this.volume = 1;
                return;
            }
            this.volume += 0.1;
            console.log(this.volume);
            createjs.Sound.play("Select", null, null, null, null, this.settings.volume);
        });
    }
    removeAll() {
        this.stage.removeChild(this.startButton);
        this.stage.removeChild(this.settingsButton);
        this.stage.removeChild(this.pauseOverlay);
        this.stage.removeChild(this.healthBar);
        this.stage.removeChild(this.healthOutline);
        this.stage.removeChild(this.txtScore);
        this.stage.removeChild(this.txtScore);
        this.stage.removeChild(this.txtAmmo);
        this.stage.removeChild(this.txtObjective);
        this.stage.removeChild(this.soundDown);
        this.stage.removeChild(this.soundUp);
        this.stage.removeChild(this.controls);
        this.stage.removeChild(this.enemiesLeft);
        this.stage.removeChild(this.ammoBacker);
        this.stage.removeChild(this.scoreBacker);
    }
    showSettingsMenu() {
        this._paused = true;
        this.pauseOverlay.x = 300;
        this.pauseOverlay.y = 300;
        this.stage.addChild(this.pauseOverlay);
        this.settingsHeader.x = 300;
        this.settingsHeader.y = 100;
        this.stage.addChild(this.settingsHeader);
        this.soundDown.x = 200;
        this.soundDown.y = 200;
        this.stage.addChild(this.soundDown);
        this.soundUp.x = 400;
        this.soundUp.y = 200;
        this.stage.addChild(this.soundUp);
        this.controls.x = 300;
        this.controls.y = 400;
        this.stage.addChild(this.controls);
        this.onSoundDownClick();
        this.onSoundUpClick();
    }
    hideSettingsMenu() {
        this._paused = false;
        this.stage.removeChild(this.pauseOverlay);
        this.stage.removeChild(this.settingsHeader);
        this.stage.removeChild(this.soundDown);
        this.stage.removeChild(this.soundUp);
        this.stage.removeChild(this.controls);
    }
    showPlayerHUD() {
        this.healthBar.x = 15;
        this.healthBar.y = 30;
        this.healthBar.scaleY = 0.8;
        this.healthBar.alpha = 0.65;
        this.healthOutline.x = 10;
        this.healthOutline.y = 30;
        this.healthOutline.alpha = 0.65;
        this.healthOutline.scaleX = 1.05;
        this.scoreBacker.x = 275;
        this.scoreBacker.y = 30;
        this.scoreBacker.scaleX = 0.5;
        this.scoreBacker.scaleY = 0.5;
        this.ammoBacker.x = 500;
        this.ammoBacker.y = 30;
        this.ammoBacker.scaleX = 0.75;
        this.ammoBacker.scaleY = 0.75;
        this.enemiesLeft.x = 90;
        this.enemiesLeft.y = 70;
        this.enemiesLeft.scaleX = 0.5;
        this.enemiesLeft.scaleY = 0.5;
        this.stage.addChild(this.healthOutline);
        this.stage.addChild(this.healthBar);
        this.stage.addChild(this.scoreBacker);
        this.stage.addChild(this.ammoBacker);
        this.stage.addChild(this.enemiesLeft);
        this.stage.addChild(this.txtScore);
        this.stage.addChild(this.txtAmmo);
        this.stage.addChild(this.txtObjective);
    }
    updateHUD() {
        this._ammo = this.playerInventory.currentWeaponAmmo;
        this._enemiesRemaining = this.levelManager.threshold - this.levelManager.defeatedEnemies;
        let scaleFactor;
        scaleFactor = this.player.health / this.player.healthMax;
        this.healthBar.scaleX = scaleFactor;
        this.txtScore.text = this._score.toString();
        this.txtAmmo.text = this._ammo.toString();
        this.txtObjective.text = this._enemiesRemaining.toString();
    }
    incrementScore() {
        this._score++;
    }
}
exports.UserInterface = UserInterface;


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js":
/*!***************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WebSocketClient)
/* harmony export */ });
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var WebSocketClient = /*#__PURE__*/function () {
  /**
   * @param {string} url
   */
  function WebSocketClient(url) {
    _classCallCheck(this, WebSocketClient);

    this.client = new WebSocket(url);

    this.client.onerror = function (error) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_0__.log.error(error);
    };
  }
  /**
   * @param {(...args: any[]) => void} f
   */


  _createClass(WebSocketClient, [{
    key: "onOpen",
    value: function onOpen(f) {
      this.client.onopen = f;
    }
    /**
     * @param {(...args: any[]) => void} f
     */

  }, {
    key: "onClose",
    value: function onClose(f) {
      this.client.onclose = f;
    } // call f with the message string as the first argument

    /**
     * @param {(...args: any[]) => void} f
     */

  }, {
    key: "onMessage",
    value: function onMessage(f) {
      this.client.onmessage = function (e) {
        f(e.data);
      };
    }
  }]);

  return WebSocketClient;
}();



/***/ }),

/***/ "./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=3000&pathname=%2Fws&logging=info&reconnect=10":
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=3000&pathname=%2Fws&logging=info&reconnect=10 ***!
  \********************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
var __resourceQuery = "?protocol=ws%3A&hostname=0.0.0.0&port=3000&pathname=%2Fws&logging=info&reconnect=10";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/log.js */ "./node_modules/webpack/hot/log.js");
/* harmony import */ var webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_strip_ansi_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/strip-ansi/index.js */ "./node_modules/webpack-dev-server/client/modules/strip-ansi/index.js");
/* harmony import */ var _modules_strip_ansi_index_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_strip_ansi_index_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_parseURL_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/parseURL.js */ "./node_modules/webpack-dev-server/client/utils/parseURL.js");
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./socket.js */ "./node_modules/webpack-dev-server/client/socket.js");
/* harmony import */ var _overlay_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./overlay.js */ "./node_modules/webpack-dev-server/client/overlay.js");
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
/* harmony import */ var _utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/sendMessage.js */ "./node_modules/webpack-dev-server/client/utils/sendMessage.js");
/* harmony import */ var _utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/reloadApp.js */ "./node_modules/webpack-dev-server/client/utils/reloadApp.js");
/* harmony import */ var _utils_createSocketURL_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/createSocketURL.js */ "./node_modules/webpack-dev-server/client/utils/createSocketURL.js");
/* global __resourceQuery, __webpack_hash__ */
/// <reference types="webpack/module" />









/**
 * @typedef {Object} Options
 * @property {boolean} hot
 * @property {boolean} liveReload
 * @property {boolean} progress
 * @property {boolean | { warnings?: boolean, errors?: boolean }} overlay
 * @property {string} [logging]
 * @property {number} [reconnect]
 */

/**
 * @typedef {Object} Status
 * @property {boolean} isUnloading
 * @property {string} currentHash
 * @property {string} [previousHash]
 */

/**
 * @type {Status}
 */

var status = {
  isUnloading: false,
  // TODO Workaround for webpack v4, `__webpack_hash__` is not replaced without HotModuleReplacement
  // eslint-disable-next-line camelcase
  currentHash:  true ? __webpack_require__.h() : 0
};
/** @type {Options} */

var options = {
  hot: false,
  liveReload: false,
  progress: false,
  overlay: false
};
var parsedResourceQuery = (0,_utils_parseURL_js__WEBPACK_IMPORTED_MODULE_2__["default"])(__resourceQuery);

if (parsedResourceQuery.hot === "true") {
  options.hot = true;
  _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Hot Module Replacement enabled.");
}

if (parsedResourceQuery["live-reload"] === "true") {
  options.liveReload = true;
  _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Live Reloading enabled.");
}

if (parsedResourceQuery.logging) {
  options.logging = parsedResourceQuery.logging;
}

if (typeof parsedResourceQuery.reconnect !== "undefined") {
  options.reconnect = Number(parsedResourceQuery.reconnect);
}
/**
 * @param {string} level
 */


function setAllLogLevel(level) {
  // This is needed because the HMR logger operate separately from dev server logger
  webpack_hot_log_js__WEBPACK_IMPORTED_MODULE_0___default().setLogLevel(level === "verbose" || level === "log" ? "info" : level);
  (0,_utils_log_js__WEBPACK_IMPORTED_MODULE_5__.setLogLevel)(level);
}

if (options.logging) {
  setAllLogLevel(options.logging);
}

self.addEventListener("beforeunload", function () {
  status.isUnloading = true;
});
var onSocketMessage = {
  hot: function hot() {
    if (parsedResourceQuery.hot === "false") {
      return;
    }

    options.hot = true;
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Hot Module Replacement enabled.");
  },
  liveReload: function liveReload() {
    if (parsedResourceQuery["live-reload"] === "false") {
      return;
    }

    options.liveReload = true;
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Live Reloading enabled.");
  },
  invalid: function invalid() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("App updated. Recompiling..."); // Fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.

    if (options.overlay) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.hide)();
    }

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Invalid");
  },

  /**
   * @param {string} hash
   */
  hash: function hash(_hash) {
    status.previousHash = status.currentHash;
    status.currentHash = _hash;
  },
  logging: setAllLogLevel,

  /**
   * @param {boolean} value
   */
  overlay: function overlay(value) {
    if (typeof document === "undefined") {
      return;
    }

    options.overlay = value;
  },

  /**
   * @param {number} value
   */
  reconnect: function reconnect(value) {
    if (parsedResourceQuery.reconnect === "false") {
      return;
    }

    options.reconnect = value;
  },

  /**
   * @param {boolean} value
   */
  progress: function progress(value) {
    options.progress = value;
  },

  /**
   * @param {{ pluginName?: string, percent: number, msg: string }} data
   */
  "progress-update": function progressUpdate(data) {
    if (options.progress) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(data.pluginName ? "[".concat(data.pluginName, "] ") : "").concat(data.percent, "% - ").concat(data.msg, "."));
    }

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Progress", data);
  },
  "still-ok": function stillOk() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Nothing changed.");

    if (options.overlay) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.hide)();
    }

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("StillOk");
  },
  ok: function ok() {
    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Ok");

    if (options.overlay) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.hide)();
    }

    (0,_utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__["default"])(options, status);
  },
  // TODO: remove in v5 in favor of 'static-changed'

  /**
   * @param {string} file
   */
  "content-changed": function contentChanged(file) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(file ? "\"".concat(file, "\"") : "Content", " from static directory was changed. Reloading..."));
    self.location.reload();
  },

  /**
   * @param {string} file
   */
  "static-changed": function staticChanged(file) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("".concat(file ? "\"".concat(file, "\"") : "Content", " from static directory was changed. Reloading..."));
    self.location.reload();
  },

  /**
   * @param {Error[]} warnings
   * @param {any} params
   */
  warnings: function warnings(_warnings, params) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.warn("Warnings while compiling.");

    var printableWarnings = _warnings.map(function (error) {
      var _formatProblem = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.formatProblem)("warning", error),
          header = _formatProblem.header,
          body = _formatProblem.body;

      return "".concat(header, "\n").concat(_modules_strip_ansi_index_js__WEBPACK_IMPORTED_MODULE_1___default()(body));
    });

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Warnings", printableWarnings);

    for (var i = 0; i < printableWarnings.length; i++) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.warn(printableWarnings[i]);
    }

    var needShowOverlayForWarnings = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.warnings;

    if (needShowOverlayForWarnings) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.show)("warning", _warnings);
    }

    if (params && params.preventReloading) {
      return;
    }

    (0,_utils_reloadApp_js__WEBPACK_IMPORTED_MODULE_7__["default"])(options, status);
  },

  /**
   * @param {Error[]} errors
   */
  errors: function errors(_errors) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error("Errors while compiling. Reload prevented.");

    var printableErrors = _errors.map(function (error) {
      var _formatProblem2 = (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.formatProblem)("error", error),
          header = _formatProblem2.header,
          body = _formatProblem2.body;

      return "".concat(header, "\n").concat(_modules_strip_ansi_index_js__WEBPACK_IMPORTED_MODULE_1___default()(body));
    });

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Errors", printableErrors);

    for (var i = 0; i < printableErrors.length; i++) {
      _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(printableErrors[i]);
    }

    var needShowOverlayForErrors = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.errors;

    if (needShowOverlayForErrors) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.show)("error", _errors);
    }
  },

  /**
   * @param {Error} error
   */
  error: function error(_error) {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.error(_error);
  },
  close: function close() {
    _utils_log_js__WEBPACK_IMPORTED_MODULE_5__.log.info("Disconnected!");

    if (options.overlay) {
      (0,_overlay_js__WEBPACK_IMPORTED_MODULE_4__.hide)();
    }

    (0,_utils_sendMessage_js__WEBPACK_IMPORTED_MODULE_6__["default"])("Close");
  }
};
var socketURL = (0,_utils_createSocketURL_js__WEBPACK_IMPORTED_MODULE_8__["default"])(parsedResourceQuery);
(0,_socket_js__WEBPACK_IMPORTED_MODULE_3__["default"])(socketURL, onSocketMessage, options.reconnect);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/modules/logger/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/modules/logger/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client-src/modules/logger/SyncBailHookFake.js":
/*!*******************************************************!*\
  !*** ./client-src/modules/logger/SyncBailHookFake.js ***!
  \*******************************************************/
/***/ (function(module) {


/**
 * Client stub for tapable SyncBailHook
 */

module.exports = function clientTapableSyncBailHook() {
  return {
    call: function call() {}
  };
};

/***/ }),

/***/ "./node_modules/webpack/lib/logging/Logger.js":
/*!****************************************************!*\
  !*** ./node_modules/webpack/lib/logging/Logger.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }) !== "undefined" && iter[(typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }).iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

var LogType = Object.freeze({
  error:
  /** @type {"error"} */
  "error",
  // message, c style arguments
  warn:
  /** @type {"warn"} */
  "warn",
  // message, c style arguments
  info:
  /** @type {"info"} */
  "info",
  // message, c style arguments
  log:
  /** @type {"log"} */
  "log",
  // message, c style arguments
  debug:
  /** @type {"debug"} */
  "debug",
  // message, c style arguments
  trace:
  /** @type {"trace"} */
  "trace",
  // no arguments
  group:
  /** @type {"group"} */
  "group",
  // [label]
  groupCollapsed:
  /** @type {"groupCollapsed"} */
  "groupCollapsed",
  // [label]
  groupEnd:
  /** @type {"groupEnd"} */
  "groupEnd",
  // [label]
  profile:
  /** @type {"profile"} */
  "profile",
  // [profileName]
  profileEnd:
  /** @type {"profileEnd"} */
  "profileEnd",
  // [profileName]
  time:
  /** @type {"time"} */
  "time",
  // name, time as [seconds, nanoseconds]
  clear:
  /** @type {"clear"} */
  "clear",
  // no arguments
  status:
  /** @type {"status"} */
  "status" // message, arguments

});
exports.LogType = LogType;
/** @typedef {typeof LogType[keyof typeof LogType]} LogTypeEnum */

var LOG_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger raw log method");
var TIMERS_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger times");
var TIMERS_AGGREGATES_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; })("webpack logger aggregated times");

var WebpackLogger = /*#__PURE__*/function () {
  /**
   * @param {function(LogTypeEnum, any[]=): void} log log function
   * @param {function(string | function(): string): WebpackLogger} getChildLogger function to create child logger
   */
  function WebpackLogger(log, getChildLogger) {
    _classCallCheck(this, WebpackLogger);

    this[LOG_SYMBOL] = log;
    this.getChildLogger = getChildLogger;
  }

  _createClass(WebpackLogger, [{
    key: "error",
    value: function error() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this[LOG_SYMBOL](LogType.error, args);
    }
  }, {
    key: "warn",
    value: function warn() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this[LOG_SYMBOL](LogType.warn, args);
    }
  }, {
    key: "info",
    value: function info() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      this[LOG_SYMBOL](LogType.info, args);
    }
  }, {
    key: "log",
    value: function log() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      this[LOG_SYMBOL](LogType.log, args);
    }
  }, {
    key: "debug",
    value: function debug() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      this[LOG_SYMBOL](LogType.debug, args);
    }
  }, {
    key: "assert",
    value: function assert(assertion) {
      if (!assertion) {
        for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
          args[_key6 - 1] = arguments[_key6];
        }

        this[LOG_SYMBOL](LogType.error, args);
      }
    }
  }, {
    key: "trace",
    value: function trace() {
      this[LOG_SYMBOL](LogType.trace, ["Trace"]);
    }
  }, {
    key: "clear",
    value: function clear() {
      this[LOG_SYMBOL](LogType.clear);
    }
  }, {
    key: "status",
    value: function status() {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      this[LOG_SYMBOL](LogType.status, args);
    }
  }, {
    key: "group",
    value: function group() {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }

      this[LOG_SYMBOL](LogType.group, args);
    }
  }, {
    key: "groupCollapsed",
    value: function groupCollapsed() {
      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }

      this[LOG_SYMBOL](LogType.groupCollapsed, args);
    }
  }, {
    key: "groupEnd",
    value: function groupEnd() {
      for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        args[_key10] = arguments[_key10];
      }

      this[LOG_SYMBOL](LogType.groupEnd, args);
    }
  }, {
    key: "profile",
    value: function profile(label) {
      this[LOG_SYMBOL](LogType.profile, [label]);
    }
  }, {
    key: "profileEnd",
    value: function profileEnd(label) {
      this[LOG_SYMBOL](LogType.profileEnd, [label]);
    }
  }, {
    key: "time",
    value: function time(label) {
      this[TIMERS_SYMBOL] = this[TIMERS_SYMBOL] || new Map();
      this[TIMERS_SYMBOL].set(label, process.hrtime());
    }
  }, {
    key: "timeLog",
    value: function timeLog(label) {
      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);

      if (!prev) {
        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeLog()"));
      }

      var time = process.hrtime(prev);
      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
    }
  }, {
    key: "timeEnd",
    value: function timeEnd(label) {
      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);

      if (!prev) {
        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeEnd()"));
      }

      var time = process.hrtime(prev);
      this[TIMERS_SYMBOL].delete(label);
      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
    }
  }, {
    key: "timeAggregate",
    value: function timeAggregate(label) {
      var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);

      if (!prev) {
        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeAggregate()"));
      }

      var time = process.hrtime(prev);
      this[TIMERS_SYMBOL].delete(label);
      this[TIMERS_AGGREGATES_SYMBOL] = this[TIMERS_AGGREGATES_SYMBOL] || new Map();
      var current = this[TIMERS_AGGREGATES_SYMBOL].get(label);

      if (current !== undefined) {
        if (time[1] + current[1] > 1e9) {
          time[0] += current[0] + 1;
          time[1] = time[1] - 1e9 + current[1];
        } else {
          time[0] += current[0];
          time[1] += current[1];
        }
      }

      this[TIMERS_AGGREGATES_SYMBOL].set(label, time);
    }
  }, {
    key: "timeAggregateEnd",
    value: function timeAggregateEnd(label) {
      if (this[TIMERS_AGGREGATES_SYMBOL] === undefined) return;
      var time = this[TIMERS_AGGREGATES_SYMBOL].get(label);
      if (time === undefined) return;
      this[TIMERS_AGGREGATES_SYMBOL].delete(label);
      this[LOG_SYMBOL](LogType.time, [label].concat(_toConsumableArray(time)));
    }
  }]);

  return WebpackLogger;
}();

exports.Logger = WebpackLogger;

/***/ }),

/***/ "./node_modules/webpack/lib/logging/createConsoleLogger.js":
/*!*****************************************************************!*\
  !*** ./node_modules/webpack/lib/logging/createConsoleLogger.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __nested_webpack_require_10785__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof (typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }) !== "undefined" && iter[(typeof Symbol !== "undefined" ? Symbol : function (i) { return i; }).iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

var _require = __nested_webpack_require_10785__(/*! ./Logger */ "./node_modules/webpack/lib/logging/Logger.js"),
    LogType = _require.LogType;
/** @typedef {import("../../declarations/WebpackOptions").FilterItemTypes} FilterItemTypes */

/** @typedef {import("../../declarations/WebpackOptions").FilterTypes} FilterTypes */

/** @typedef {import("./Logger").LogTypeEnum} LogTypeEnum */

/** @typedef {function(string): boolean} FilterFunction */

/**
 * @typedef {Object} LoggerConsole
 * @property {function(): void} clear
 * @property {function(): void} trace
 * @property {(...args: any[]) => void} info
 * @property {(...args: any[]) => void} log
 * @property {(...args: any[]) => void} warn
 * @property {(...args: any[]) => void} error
 * @property {(...args: any[]) => void=} debug
 * @property {(...args: any[]) => void=} group
 * @property {(...args: any[]) => void=} groupCollapsed
 * @property {(...args: any[]) => void=} groupEnd
 * @property {(...args: any[]) => void=} status
 * @property {(...args: any[]) => void=} profile
 * @property {(...args: any[]) => void=} profileEnd
 * @property {(...args: any[]) => void=} logTime
 */

/**
 * @typedef {Object} LoggerOptions
 * @property {false|true|"none"|"error"|"warn"|"info"|"log"|"verbose"} level loglevel
 * @property {FilterTypes|boolean} debug filter for debug logging
 * @property {LoggerConsole} console the console to log to
 */

/**
 * @param {FilterItemTypes} item an input item
 * @returns {FilterFunction} filter function
 */


var filterToFunction = function filterToFunction(item) {
  if (typeof item === "string") {
    var regExp = new RegExp("[\\\\/]".concat(item.replace( // eslint-disable-next-line no-useless-escape
    /[-[\]{}()*+?.\\^$|]/g, "\\$&"), "([\\\\/]|$|!|\\?)"));
    return function (ident) {
      return regExp.test(ident);
    };
  }

  if (item && typeof item === "object" && typeof item.test === "function") {
    return function (ident) {
      return item.test(ident);
    };
  }

  if (typeof item === "function") {
    return item;
  }

  if (typeof item === "boolean") {
    return function () {
      return item;
    };
  }
};
/**
 * @enum {number}
 */


var LogLevel = {
  none: 6,
  false: 6,
  error: 5,
  warn: 4,
  info: 3,
  log: 2,
  true: 2,
  verbose: 1
};
/**
 * @param {LoggerOptions} options options object
 * @returns {function(string, LogTypeEnum, any[]): void} logging function
 */

module.exports = function (_ref) {
  var _ref$level = _ref.level,
      level = _ref$level === void 0 ? "info" : _ref$level,
      _ref$debug = _ref.debug,
      debug = _ref$debug === void 0 ? false : _ref$debug,
      console = _ref.console;
  var debugFilters = typeof debug === "boolean" ? [function () {
    return debug;
  }] :
  /** @type {FilterItemTypes[]} */
  [].concat(debug).map(filterToFunction);
  /** @type {number} */

  var loglevel = LogLevel["".concat(level)] || 0;
  /**
   * @param {string} name name of the logger
   * @param {LogTypeEnum} type type of the log entry
   * @param {any[]} args arguments of the log entry
   * @returns {void}
   */

  var logger = function logger(name, type, args) {
    var labeledArgs = function labeledArgs() {
      if (Array.isArray(args)) {
        if (args.length > 0 && typeof args[0] === "string") {
          return ["[".concat(name, "] ").concat(args[0])].concat(_toConsumableArray(args.slice(1)));
        } else {
          return ["[".concat(name, "]")].concat(_toConsumableArray(args));
        }
      } else {
        return [];
      }
    };

    var debug = debugFilters.some(function (f) {
      return f(name);
    });

    switch (type) {
      case LogType.debug:
        if (!debug) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins

        if (typeof console.debug === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.debug.apply(console, _toConsumableArray(labeledArgs()));
        } else {
          console.log.apply(console, _toConsumableArray(labeledArgs()));
        }

        break;

      case LogType.log:
        if (!debug && loglevel > LogLevel.log) return;
        console.log.apply(console, _toConsumableArray(labeledArgs()));
        break;

      case LogType.info:
        if (!debug && loglevel > LogLevel.info) return;
        console.info.apply(console, _toConsumableArray(labeledArgs()));
        break;

      case LogType.warn:
        if (!debug && loglevel > LogLevel.warn) return;
        console.warn.apply(console, _toConsumableArray(labeledArgs()));
        break;

      case LogType.error:
        if (!debug && loglevel > LogLevel.error) return;
        console.error.apply(console, _toConsumableArray(labeledArgs()));
        break;

      case LogType.trace:
        if (!debug) return;
        console.trace();
        break;

      case LogType.groupCollapsed:
        if (!debug && loglevel > LogLevel.log) return;

        if (!debug && loglevel > LogLevel.verbose) {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          if (typeof console.groupCollapsed === "function") {
            // eslint-disable-next-line node/no-unsupported-features/node-builtins
            console.groupCollapsed.apply(console, _toConsumableArray(labeledArgs()));
          } else {
            console.log.apply(console, _toConsumableArray(labeledArgs()));
          }

          break;
        }

      // falls through

      case LogType.group:
        if (!debug && loglevel > LogLevel.log) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins

        if (typeof console.group === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.group.apply(console, _toConsumableArray(labeledArgs()));
        } else {
          console.log.apply(console, _toConsumableArray(labeledArgs()));
        }

        break;

      case LogType.groupEnd:
        if (!debug && loglevel > LogLevel.log) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins

        if (typeof console.groupEnd === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.groupEnd();
        }

        break;

      case LogType.time:
        {
          if (!debug && loglevel > LogLevel.log) return;
          var ms = args[1] * 1000 + args[2] / 1000000;
          var msg = "[".concat(name, "] ").concat(args[0], ": ").concat(ms, " ms");

          if (typeof console.logTime === "function") {
            console.logTime(msg);
          } else {
            console.log(msg);
          }

          break;
        }

      case LogType.profile:
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        if (typeof console.profile === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.profile.apply(console, _toConsumableArray(labeledArgs()));
        }

        break;

      case LogType.profileEnd:
        // eslint-disable-next-line node/no-unsupported-features/node-builtins
        if (typeof console.profileEnd === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.profileEnd.apply(console, _toConsumableArray(labeledArgs()));
        }

        break;

      case LogType.clear:
        if (!debug && loglevel > LogLevel.log) return; // eslint-disable-next-line node/no-unsupported-features/node-builtins

        if (typeof console.clear === "function") {
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          console.clear();
        }

        break;

      case LogType.status:
        if (!debug && loglevel > LogLevel.info) return;

        if (typeof console.status === "function") {
          if (args.length === 0) {
            console.status();
          } else {
            console.status.apply(console, _toConsumableArray(labeledArgs()));
          }
        } else {
          if (args.length !== 0) {
            console.info.apply(console, _toConsumableArray(labeledArgs()));
          }
        }

        break;

      default:
        throw new Error("Unexpected LogType ".concat(type));
    }
  };

  return logger;
};

/***/ }),

/***/ "./node_modules/webpack/lib/logging/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/webpack/lib/logging/runtime.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __nested_webpack_require_20872__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var SyncBailHook = __nested_webpack_require_20872__(/*! tapable/lib/SyncBailHook */ "./client-src/modules/logger/SyncBailHookFake.js");

var _require = __nested_webpack_require_20872__(/*! ./Logger */ "./node_modules/webpack/lib/logging/Logger.js"),
    Logger = _require.Logger;

var createConsoleLogger = __nested_webpack_require_20872__(/*! ./createConsoleLogger */ "./node_modules/webpack/lib/logging/createConsoleLogger.js");
/** @type {createConsoleLogger.LoggerOptions} */


var currentDefaultLoggerOptions = {
  level: "info",
  debug: false,
  console: console
};
var currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);
/**
 * @param {string} name name of the logger
 * @returns {Logger} a logger
 */

exports.getLogger = function (name) {
  return new Logger(function (type, args) {
    if (exports.hooks.log.call(name, type, args) === undefined) {
      currentDefaultLogger(name, type, args);
    }
  }, function (childName) {
    return exports.getLogger("".concat(name, "/").concat(childName));
  });
};
/**
 * @param {createConsoleLogger.LoggerOptions} options new options, merge with old options
 * @returns {void}
 */


exports.configureDefaultLogger = function (options) {
  _extends(currentDefaultLoggerOptions, options);

  currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);
};

exports.hooks = {
  log: new SyncBailHook(["origin", "type", "args"])
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_22988__(moduleId) {
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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_22988__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__nested_webpack_require_22988__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__nested_webpack_require_22988__.o(definition, key) && !__nested_webpack_require_22988__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__nested_webpack_require_22988__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__nested_webpack_require_22988__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!********************************************!*\
  !*** ./client-src/modules/logger/index.js ***!
  \********************************************/
__nested_webpack_require_22988__.r(__webpack_exports__);
/* harmony export */ __nested_webpack_require_22988__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* reexport default export from named module */ webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__; }
/* harmony export */ });
/* harmony import */ var webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_22988__(/*! webpack/lib/logging/runtime.js */ "./node_modules/webpack/lib/logging/runtime.js");

}();
var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/modules/strip-ansi/index.js":
/*!****************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/modules/strip-ansi/index.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/strip-ansi/index.js":
/*!******************************************!*\
  !*** ./node_modules/strip-ansi/index.js ***!
  \******************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __nested_webpack_require_368__) {

__nested_webpack_require_368__.r(__webpack_exports__);
/* harmony export */ __nested_webpack_require_368__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ stripAnsi; }
/* harmony export */ });
/* harmony import */ var ansi_regex__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_368__(/*! ansi-regex */ "./node_modules/strip-ansi/node_modules/ansi-regex/index.js");

function stripAnsi(string) {
  if (typeof string !== 'string') {
    throw new TypeError("Expected a `string`, got `".concat(typeof string, "`"));
  }

  return string.replace((0,ansi_regex__WEBPACK_IMPORTED_MODULE_0__["default"])(), '');
}

/***/ }),

/***/ "./node_modules/strip-ansi/node_modules/ansi-regex/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/strip-ansi/node_modules/ansi-regex/index.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __nested_webpack_require_1387__) {

__nested_webpack_require_1387__.r(__webpack_exports__);
/* harmony export */ __nested_webpack_require_1387__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ansiRegex; }
/* harmony export */ });
function ansiRegex() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$onlyFirst = _ref.onlyFirst,
      onlyFirst = _ref$onlyFirst === void 0 ? false : _ref$onlyFirst;

  var pattern = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'].join('|');
  return new RegExp(pattern, onlyFirst ? undefined : 'g');
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_2352__(moduleId) {
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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_2352__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__nested_webpack_require_2352__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__nested_webpack_require_2352__.o(definition, key) && !__nested_webpack_require_2352__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__nested_webpack_require_2352__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__nested_webpack_require_2352__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!************************************************!*\
  !*** ./client-src/modules/strip-ansi/index.js ***!
  \************************************************/
__nested_webpack_require_2352__.r(__webpack_exports__);
/* harmony import */ var strip_ansi__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_2352__(/*! strip-ansi */ "./node_modules/strip-ansi/index.js");

/* harmony default export */ __webpack_exports__["default"] = (strip_ansi__WEBPACK_IMPORTED_MODULE_0__["default"]);
}();
var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay.js":
/*!***********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/overlay.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formatProblem": () => (/* binding */ formatProblem),
/* harmony export */   "show": () => (/* binding */ show),
/* harmony export */   "hide": () => (/* binding */ hide)
/* harmony export */ });
/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ansi-html-community */ "./node_modules/ansi-html-community/index.js");
/* harmony import */ var ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ansi_html_community__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var html_entities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! html-entities */ "./node_modules/html-entities/lib/index.js");
/* harmony import */ var html_entities__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(html_entities__WEBPACK_IMPORTED_MODULE_1__);
// The error overlay is inspired (and mostly copied) from Create React App (https://github.com/facebookincubator/create-react-app)
// They, in turn, got inspired by webpack-hot-middleware (https://github.com/glenjamin/webpack-hot-middleware).


var colors = {
  reset: ["transparent", "transparent"],
  black: "181818",
  red: "E36049",
  green: "B3CB74",
  yellow: "FFD080",
  blue: "7CAFC2",
  magenta: "7FACCA",
  cyan: "C3C2EF",
  lightgrey: "EBE7E3",
  darkgrey: "6D7891"
};
/** @type {HTMLIFrameElement | null | undefined} */

var iframeContainerElement;
/** @type {HTMLDivElement | null | undefined} */

var containerElement;
/** @type {Array<(element: HTMLDivElement) => void>} */

var onLoadQueue = [];
ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default().setColors(colors);

function createContainer() {
  iframeContainerElement = document.createElement("iframe");
  iframeContainerElement.id = "webpack-dev-server-client-overlay";
  iframeContainerElement.src = "about:blank";
  iframeContainerElement.style.position = "fixed";
  iframeContainerElement.style.left = 0;
  iframeContainerElement.style.top = 0;
  iframeContainerElement.style.right = 0;
  iframeContainerElement.style.bottom = 0;
  iframeContainerElement.style.width = "100vw";
  iframeContainerElement.style.height = "100vh";
  iframeContainerElement.style.border = "none";
  iframeContainerElement.style.zIndex = 9999999999;

  iframeContainerElement.onload = function () {
    containerElement =
    /** @type {Document} */

    /** @type {HTMLIFrameElement} */
    iframeContainerElement.contentDocument.createElement("div");
    containerElement.id = "webpack-dev-server-client-overlay-div";
    containerElement.style.position = "fixed";
    containerElement.style.boxSizing = "border-box";
    containerElement.style.left = 0;
    containerElement.style.top = 0;
    containerElement.style.right = 0;
    containerElement.style.bottom = 0;
    containerElement.style.width = "100vw";
    containerElement.style.height = "100vh";
    containerElement.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
    containerElement.style.color = "#E8E8E8";
    containerElement.style.fontFamily = "Menlo, Consolas, monospace";
    containerElement.style.fontSize = "large";
    containerElement.style.padding = "2rem";
    containerElement.style.lineHeight = "1.2";
    containerElement.style.whiteSpace = "pre-wrap";
    containerElement.style.overflow = "auto";
    var headerElement = document.createElement("span");
    headerElement.innerText = "Compiled with problems:";
    var closeButtonElement = document.createElement("button");
    closeButtonElement.innerText = "X";
    closeButtonElement.style.background = "transparent";
    closeButtonElement.style.border = "none";
    closeButtonElement.style.fontSize = "20px";
    closeButtonElement.style.fontWeight = "bold";
    closeButtonElement.style.color = "white";
    closeButtonElement.style.cursor = "pointer";
    closeButtonElement.style.cssFloat = "right"; // @ts-ignore

    closeButtonElement.style.styleFloat = "right";
    closeButtonElement.addEventListener("click", function () {
      hide();
    });
    containerElement.appendChild(headerElement);
    containerElement.appendChild(closeButtonElement);
    containerElement.appendChild(document.createElement("br"));
    containerElement.appendChild(document.createElement("br"));
    /** @type {Document} */

    /** @type {HTMLIFrameElement} */
    iframeContainerElement.contentDocument.body.appendChild(containerElement);
    onLoadQueue.forEach(function (onLoad) {
      onLoad(
      /** @type {HTMLDivElement} */
      containerElement);
    });
    onLoadQueue = [];
    /** @type {HTMLIFrameElement} */

    iframeContainerElement.onload = null;
  };

  document.body.appendChild(iframeContainerElement);
}
/**
 * @param {(element: HTMLDivElement) => void} callback
 */


function ensureOverlayExists(callback) {
  if (containerElement) {
    // Everything is ready, call the callback right away.
    callback(containerElement);
    return;
  }

  onLoadQueue.push(callback);

  if (iframeContainerElement) {
    return;
  }

  createContainer();
} // Successful compilation.


function hide() {
  if (!iframeContainerElement) {
    return;
  } // Clean up and reset internal state.


  document.body.removeChild(iframeContainerElement);
  iframeContainerElement = null;
  containerElement = null;
}
/**
 * @param {string} type
 * @param {string  | { file?: string, moduleName?: string, loc?: string, message?: string }} item
 * @returns {{ header: string, body: string }}
 */


function formatProblem(type, item) {
  var header = type === "warning" ? "WARNING" : "ERROR";
  var body = "";

  if (typeof item === "string") {
    body += item;
  } else {
    var file = item.file || ""; // eslint-disable-next-line no-nested-ternary

    var moduleName = item.moduleName ? item.moduleName.indexOf("!") !== -1 ? "".concat(item.moduleName.replace(/^(\s|\S)*!/, ""), " (").concat(item.moduleName, ")") : "".concat(item.moduleName) : "";
    var loc = item.loc;
    header += "".concat(moduleName || file ? " in ".concat(moduleName ? "".concat(moduleName).concat(file ? " (".concat(file, ")") : "") : file).concat(loc ? " ".concat(loc) : "") : "");
    body += item.message || "";
  }

  return {
    header: header,
    body: body
  };
} // Compilation with errors (e.g. syntax error or missing modules).

/**
 * @param {string} type
 * @param {Array<string  | { file?: string, moduleName?: string, loc?: string, message?: string }>} messages
 */


function show(type, messages) {
  ensureOverlayExists(function () {
    messages.forEach(function (message) {
      var entryElement = document.createElement("div");
      var typeElement = document.createElement("span");

      var _formatProblem = formatProblem(type, message),
          header = _formatProblem.header,
          body = _formatProblem.body;

      typeElement.innerText = header;
      typeElement.style.color = "#".concat(colors.red); // Make it look similar to our terminal.

      var text = ansi_html_community__WEBPACK_IMPORTED_MODULE_0___default()((0,html_entities__WEBPACK_IMPORTED_MODULE_1__.encode)(body));
      var messageTextNode = document.createElement("div");
      messageTextNode.innerHTML = text;
      entryElement.appendChild(typeElement);
      entryElement.appendChild(document.createElement("br"));
      entryElement.appendChild(document.createElement("br"));
      entryElement.appendChild(messageTextNode);
      entryElement.appendChild(document.createElement("br"));
      entryElement.appendChild(document.createElement("br"));
      /** @type {HTMLDivElement} */

      containerElement.appendChild(entryElement);
    });
  });
}



/***/ }),

/***/ "./node_modules/webpack-dev-server/client/socket.js":
/*!**********************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/socket.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clients/WebSocketClient.js */ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js");
/* harmony import */ var _utils_log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");
/* provided dependency */ var __webpack_dev_server_client__ = __webpack_require__(/*! ./node_modules/webpack-dev-server/client/clients/WebSocketClient.js */ "./node_modules/webpack-dev-server/client/clients/WebSocketClient.js");
/* global __webpack_dev_server_client__ */

 // this WebsocketClient is here as a default fallback, in case the client is not injected

/* eslint-disable camelcase */

var Client = // eslint-disable-next-line no-nested-ternary
typeof __webpack_dev_server_client__ !== "undefined" ? typeof __webpack_dev_server_client__.default !== "undefined" ? __webpack_dev_server_client__.default : __webpack_dev_server_client__ : _clients_WebSocketClient_js__WEBPACK_IMPORTED_MODULE_0__["default"];
/* eslint-enable camelcase */

var retries = 0;
var maxRetries = 10;
var client = null;
/**
 * @param {string} url
 * @param {{ [handler: string]: (data?: any, params?: any) => any }} handlers
 * @param {number} [reconnect]
 */

var socket = function initSocket(url, handlers, reconnect) {
  client = new Client(url);
  client.onOpen(function () {
    retries = 0;

    if (typeof reconnect !== "undefined") {
      maxRetries = reconnect;
    }
  });
  client.onClose(function () {
    if (retries === 0) {
      handlers.close();
    } // Try to reconnect.


    client = null; // After 10 retries stop trying, to prevent logspam.

    if (retries < maxRetries) {
      // Exponentially increase timeout to reconnect.
      // Respectfully copied from the package `got`.
      // eslint-disable-next-line no-restricted-properties
      var retryInMs = 1000 * Math.pow(2, retries) + Math.random() * 100;
      retries += 1;
      _utils_log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("Trying to reconnect...");
      setTimeout(function () {
        socket(url, handlers, reconnect);
      }, retryInMs);
    }
  });
  client.onMessage(
  /**
   * @param {any} data
   */
  function (data) {
    var message = JSON.parse(data);

    if (handlers[message.type]) {
      handlers[message.type](message.data, message.params);
    }
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (socket);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/createSocketURL.js":
/*!*************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/createSocketURL.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @param {{ protocol?: string, auth?: string, hostname?: string, port?: string, pathname?: string, search?: string, hash?: string, slashes?: boolean }} objURL
 * @returns {string}
 */
function format(objURL) {
  var protocol = objURL.protocol || "";

  if (protocol && protocol.substr(-1) !== ":") {
    protocol += ":";
  }

  var auth = objURL.auth || "";

  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ":");
    auth += "@";
  }

  var host = "";

  if (objURL.hostname) {
    host = auth + (objURL.hostname.indexOf(":") === -1 ? objURL.hostname : "[".concat(objURL.hostname, "]"));

    if (objURL.port) {
      host += ":".concat(objURL.port);
    }
  }

  var pathname = objURL.pathname || "";

  if (objURL.slashes) {
    host = "//".concat(host || "");

    if (pathname && pathname.charAt(0) !== "/") {
      pathname = "/".concat(pathname);
    }
  } else if (!host) {
    host = "";
  }

  var search = objURL.search || "";

  if (search && search.charAt(0) !== "?") {
    search = "?".concat(search);
  }

  var hash = objURL.hash || "";

  if (hash && hash.charAt(0) !== "#") {
    hash = "#".concat(hash);
  }

  pathname = pathname.replace(/[?#]/g,
  /**
   * @param {string} match
   * @returns {string}
   */
  function (match) {
    return encodeURIComponent(match);
  });
  search = search.replace("#", "%23");
  return "".concat(protocol).concat(host).concat(pathname).concat(search).concat(hash);
}
/**
 * @param {URL & { fromCurrentScript?: boolean }} parsedURL
 * @returns {string}
 */


function createSocketURL(parsedURL) {
  var hostname = parsedURL.hostname; // Node.js module parses it as `::`
  // `new URL(urlString, [baseURLString])` parses it as '[::]'

  var isInAddrAny = hostname === "0.0.0.0" || hostname === "::" || hostname === "[::]"; // why do we need this check?
  // hostname n/a for file protocol (example, when using electron, ionic)
  // see: https://github.com/webpack/webpack-dev-server/pull/384

  if (isInAddrAny && self.location.hostname && self.location.protocol.indexOf("http") === 0) {
    hostname = self.location.hostname;
  }

  var socketURLProtocol = parsedURL.protocol || self.location.protocol; // When https is used in the app, secure web sockets are always necessary because the browser doesn't accept non-secure web sockets.

  if (socketURLProtocol === "auto:" || hostname && isInAddrAny && self.location.protocol === "https:") {
    socketURLProtocol = self.location.protocol;
  }

  socketURLProtocol = socketURLProtocol.replace(/^(?:http|.+-extension|file)/i, "ws");
  var socketURLAuth = ""; // `new URL(urlString, [baseURLstring])` doesn't have `auth` property
  // Parse authentication credentials in case we need them

  if (parsedURL.username) {
    socketURLAuth = parsedURL.username; // Since HTTP basic authentication does not allow empty username,
    // we only include password if the username is not empty.

    if (parsedURL.password) {
      // Result: <username>:<password>
      socketURLAuth = socketURLAuth.concat(":", parsedURL.password);
    }
  } // In case the host is a raw IPv6 address, it can be enclosed in
  // the brackets as the brackets are needed in the final URL string.
  // Need to remove those as url.format blindly adds its own set of brackets
  // if the host string contains colons. That would lead to non-working
  // double brackets (e.g. [[::]]) host
  //
  // All of these web socket url params are optionally passed in through resourceQuery,
  // so we need to fall back to the default if they are not provided


  var socketURLHostname = (hostname || self.location.hostname || "localhost").replace(/^\[(.*)\]$/, "$1");
  var socketURLPort = parsedURL.port;

  if (!socketURLPort || socketURLPort === "0") {
    socketURLPort = self.location.port;
  } // If path is provided it'll be passed in via the resourceQuery as a
  // query param so it has to be parsed out of the querystring in order for the
  // client to open the socket to the correct location.


  var socketURLPathname = "/ws";

  if (parsedURL.pathname && !parsedURL.fromCurrentScript) {
    socketURLPathname = parsedURL.pathname;
  }

  return format({
    protocol: socketURLProtocol,
    auth: socketURLAuth,
    hostname: socketURLHostname,
    port: socketURLPort,
    pathname: socketURLPathname,
    slashes: true
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createSocketURL);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js":
/*!********************************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @returns {string}
 */
function getCurrentScriptSource() {
  // `document.currentScript` is the most accurate way to find the current script,
  // but is not supported in all browsers.
  if (document.currentScript) {
    return document.currentScript.getAttribute("src");
  } // Fallback to getting all scripts running in the document.


  var scriptElements = document.scripts || [];
  var scriptElementsWithSrc = Array.prototype.filter.call(scriptElements, function (element) {
    return element.getAttribute("src");
  });

  if (scriptElementsWithSrc.length > 0) {
    var currentScript = scriptElementsWithSrc[scriptElementsWithSrc.length - 1];
    return currentScript.getAttribute("src");
  } // Fail as there was no script to use.


  throw new Error("[webpack-dev-server] Failed to get current script source.");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getCurrentScriptSource);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/log.js":
/*!*************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/log.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "log": () => (/* binding */ log),
/* harmony export */   "setLogLevel": () => (/* binding */ setLogLevel)
/* harmony export */ });
/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/logger/index.js */ "./node_modules/webpack-dev-server/client/modules/logger/index.js");
/* harmony import */ var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__);

var name = "webpack-dev-server"; // default level is set on the client side, so it does not need
// to be set by the CLI or API

var defaultLevel = "info"; // options new options, merge with old options

/**
 * @param {false | true | "none" | "error" | "warn" | "info" | "log" | "verbose"} level
 * @returns {void}
 */

function setLogLevel(level) {
  _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().configureDefaultLogger({
    level: level
  });
}

setLogLevel(defaultLevel);
var log = _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().getLogger(name);


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/parseURL.js":
/*!******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/parseURL.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getCurrentScriptSource_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getCurrentScriptSource.js */ "./node_modules/webpack-dev-server/client/utils/getCurrentScriptSource.js");

/**
 * @param {string} resourceQuery
 * @returns {{ [key: string]: string | boolean }}
 */

function parseURL(resourceQuery) {
  /** @type {{ [key: string]: string }} */
  var options = {};

  if (typeof resourceQuery === "string" && resourceQuery !== "") {
    var searchParams = resourceQuery.substr(1).split("&");

    for (var i = 0; i < searchParams.length; i++) {
      var pair = searchParams[i].split("=");
      options[pair[0]] = decodeURIComponent(pair[1]);
    }
  } else {
    // Else, get the url from the <script> this file was called with.
    var scriptSource = (0,_getCurrentScriptSource_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
    var scriptSourceURL;

    try {
      // The placeholder `baseURL` with `window.location.href`,
      // is to allow parsing of path-relative or protocol-relative URLs,
      // and will have no effect if `scriptSource` is a fully valid URL.
      scriptSourceURL = new URL(scriptSource, self.location.href);
    } catch (error) {// URL parsing failed, do nothing.
      // We will still proceed to see if we can recover using `resourceQuery`
    }

    if (scriptSourceURL) {
      options = scriptSourceURL;
      options.fromCurrentScript = true;
    }
  }

  return options;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parseURL);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/reloadApp.js":
/*!*******************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/reloadApp.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! webpack/hot/emitter.js */ "./node_modules/webpack/hot/emitter.js");
/* harmony import */ var webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _log_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./log.js */ "./node_modules/webpack-dev-server/client/utils/log.js");


/** @typedef {import("../index").Options} Options
/** @typedef {import("../index").Status} Status

/**
 * @param {Options} options
 * @param {Status} status
 */

function reloadApp(_ref, status) {
  var hot = _ref.hot,
      liveReload = _ref.liveReload;

  if (status.isUnloading) {
    return;
  }

  var currentHash = status.currentHash,
      previousHash = status.previousHash;
  var isInitial = currentHash.indexOf(
  /** @type {string} */
  previousHash) >= 0;

  if (isInitial) {
    return;
  }
  /**
   * @param {Window} rootWindow
   * @param {number} intervalId
   */


  function applyReload(rootWindow, intervalId) {
    clearInterval(intervalId);
    _log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("App updated. Reloading...");
    rootWindow.location.reload();
  }

  var search = self.location.search.toLowerCase();
  var allowToHot = search.indexOf("webpack-dev-server-hot=false") === -1;
  var allowToLiveReload = search.indexOf("webpack-dev-server-live-reload=false") === -1;

  if (hot && allowToHot) {
    _log_js__WEBPACK_IMPORTED_MODULE_1__.log.info("App hot update...");
    webpack_hot_emitter_js__WEBPACK_IMPORTED_MODULE_0___default().emit("webpackHotUpdate", status.currentHash);

    if (typeof self !== "undefined" && self.window) {
      // broadcast update to window
      self.postMessage("webpackHotUpdate".concat(status.currentHash), "*");
    }
  } // allow refreshing the page only if liveReload isn't disabled
  else if (liveReload && allowToLiveReload) {
    var rootWindow = self; // use parent window for reload (in case we're in an iframe with no valid src)

    var intervalId = self.setInterval(function () {
      if (rootWindow.location.protocol !== "about:") {
        // reload immediately if protocol is valid
        applyReload(rootWindow, intervalId);
      } else {
        rootWindow = rootWindow.parent;

        if (rootWindow.parent === rootWindow) {
          // if parent equals current window we've reached the root which would continue forever, so trigger a reload anyways
          applyReload(rootWindow, intervalId);
        }
      }
    });
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reloadApp);

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/utils/sendMessage.js":
/*!*********************************************************************!*\
  !*** ./node_modules/webpack-dev-server/client/utils/sendMessage.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* global __resourceQuery WorkerGlobalScope */
// Send messages to the outside, so plugins can consume it.

/**
 * @param {string} type
 * @param {any} [data]
 */
function sendMsg(type, data) {
  if (typeof self !== "undefined" && (typeof WorkerGlobalScope === "undefined" || !(self instanceof WorkerGlobalScope))) {
    self.postMessage({
      type: "webpack".concat(type),
      data: data
    }, "*");
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendMsg);

/***/ }),

/***/ "./node_modules/webpack/hot/dev-server.js":
/*!************************************************!*\
  !*** ./node_modules/webpack/hot/dev-server.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/* globals __webpack_hash__ */
if (true) {
	var lastHash;
	var upToDate = function upToDate() {
		return lastHash.indexOf(__webpack_require__.h()) >= 0;
	};
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");
	var check = function check() {
		module.hot
			.check(true)
			.then(function (updatedModules) {
				if (!updatedModules) {
					log("warning", "[HMR] Cannot find update. Need to do a full reload!");
					log(
						"warning",
						"[HMR] (Probably because of restarting the webpack-dev-server)"
					);
					window.location.reload();
					return;
				}

				if (!upToDate()) {
					check();
				}

				__webpack_require__(/*! ./log-apply-result */ "./node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);

				if (upToDate()) {
					log("info", "[HMR] App is up to date.");
				}
			})
			.catch(function (err) {
				var status = module.hot.status();
				if (["abort", "fail"].indexOf(status) >= 0) {
					log(
						"warning",
						"[HMR] Cannot apply update. Need to do a full reload!"
					);
					log("warning", "[HMR] " + log.formatError(err));
					window.location.reload();
				} else {
					log("warning", "[HMR] Update failed: " + log.formatError(err));
				}
			});
	};
	var hotEmitter = __webpack_require__(/*! ./emitter */ "./node_modules/webpack/hot/emitter.js");
	hotEmitter.on("webpackHotUpdate", function (currentHash) {
		lastHash = currentHash;
		if (!upToDate() && module.hot.status() === "idle") {
			log("info", "[HMR] Checking for updates on the server...");
			check();
		}
	});
	log("info", "[HMR] Waiting for update signal from WDS...");
} else {}


/***/ }),

/***/ "./node_modules/webpack/hot/emitter.js":
/*!*********************************************!*\
  !*** ./node_modules/webpack/hot/emitter.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var EventEmitter = __webpack_require__(/*! events */ "./node_modules/events/events.js");
module.exports = new EventEmitter();


/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!******************************************************!*\
  !*** ./node_modules/webpack/hot/log-apply-result.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function (updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function (moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

	if (unacceptedModules.length > 0) {
		log(
			"warning",
			"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"
		);
		unacceptedModules.forEach(function (moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if (!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function (moduleId) {
			if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function (moduleId) {
			return typeof moduleId === "number";
		});
		if (numberIds)
			log(
				"info",
				'[HMR] Consider using the optimization.moduleIds: "named" for module names.'
			);
	}
};


/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!*****************************************!*\
  !*** ./node_modules/webpack/hot/log.js ***!
  \*****************************************/
/***/ ((module) => {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

function logGroup(logFn) {
	return function (level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

module.exports = function (level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

/* eslint-disable node/no-unsupported-features/node-builtins */
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
/* eslint-enable node/no-unsupported-features/node-builtins */

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function (level) {
	logLevel = level;
};

module.exports.formatError = function (err) {
	var message = err.message;
	var stack = err.stack;
	if (!stack) {
		return message;
	} else if (stack.indexOf(message) < 0) {
		return message + "\n" + stack;
	} else {
		return stack;
	}
};


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
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		try {
/******/ 			var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 			__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 			module = execOptions.module;
/******/ 			execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 		} catch(e) {
/******/ 			module.error = e;
/******/ 			throw e;
/******/ 		}
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/amd options */
/******/ 	(() => {
/******/ 		__webpack_require__.amdO = {};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("main." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("3993242b5a27ceffbd21")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "game-programming-createjs-webpack:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
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
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises;
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		// eslint-disable-next-line no-unused-vars
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId) {
/******/ 				return trackBlockingPromise(require.e(chunkId));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results);
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 					blockingPromises.push(promise);
/******/ 					waitForBlockingPromises(function () {
/******/ 						return setStatus("ready");
/******/ 					});
/******/ 					return promise;
/******/ 				case "prepare":
/******/ 					blockingPromises.push(promise);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises.length === 0) return fn();
/******/ 			var blocker = blockingPromises;
/******/ 			blockingPromises = [];
/******/ 			return Promise.all(blocker).then(function () {
/******/ 				return waitForBlockingPromises(fn);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						blockingPromises = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							},
/******/ 							[])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								} else {
/******/ 									return setStatus("ready").then(function () {
/******/ 										return updatedModules;
/******/ 									});
/******/ 								}
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error("apply() is only allowed in ready status");
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId) {
/******/ 			return new Promise((resolve, reject) => {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = (event) => {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		self["webpackHotUpdategame_programming_createjs_webpack"] = (chunkId, moreModules, runtime) => {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						!__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						__webpack_require__.o(installedChunks, chunkId) &&
/******/ 						installedChunks[chunkId] !== undefined
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = () => {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then((response) => {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__("./node_modules/webpack-dev-server/client/index.js?protocol=ws%3A&hostname=0.0.0.0&port=3000&pathname=%2Fws&logging=info&reconnect=10");
/******/ 	__webpack_require__("./node_modules/webpack/hot/dev-server.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/Game.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=build.js.map